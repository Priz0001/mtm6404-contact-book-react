import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore'
import db from '../../db'

function ContactsList() {
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const q = query(collection(db, 'contacts'), orderBy('lastName'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = []
            snapshot.forEach((doc) => data.push({
                id: doc.id,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                email: doc.data().email,
                phone: doc.data().phone
            }))
            setContacts(data)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    const filteredContacts = contacts.filter((contact) => {
        const searchLower = searchTerm.toLowerCase()
        return (
            contact.firstName.toLowerCase().includes(searchLower) ||
            contact.lastName.toLowerCase().includes(searchLower)
        )
    })

    return (
        <div className="contacts-container">
            <h1>Contact Book</h1>

            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search by first or last name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            {loading ? (
                <p className="loading">Loading contacts...</p>
            ) : contacts.length === 0 ? (
                <p className="no-contacts">No contacts found. Add your first contact!</p>
            ) : filteredContacts.length === 0 ? (
                <p className="no-contacts">No contacts match your search.</p>
            ) : (
                <div className="contacts-list">
                    <table className="contacts-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredContacts.map((contact) => (
                                <tr key={contact.id} className="contact-row">
                                    <td className="contact-name">
                                        <Link to={`/contact/${contact.id}`} className="contact-link">
                                            {contact.lastName}, {contact.firstName}
                                        </Link>
                                    </td>
                                    <td className="contact-email">{contact.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="contacts-footer">
                <Link to="/add" className="btn btn-primary">Add New Contact</Link>
            </div>

        </div>
    )
}

export default ContactsList
