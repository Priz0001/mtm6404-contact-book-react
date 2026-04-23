import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { doc, getDoc, deleteDoc } from 'firebase/firestore'
import db from '../../db'

function ContactDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [contact, setContact] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    getDoc(doc(db, 'contacts', id))
      .then((document) => {
        if (document.exists()) {
          setContact({
            id: document.id,
            firstName: document.data().firstName,
            lastName: document.data().lastName,
            email: document.data().email,
            phone: document.data().phone
          })
        }
        setLoading(false)
      })
  }, [id])

  const handleDelete = async () => {
    setIsDeleting(true)

    await deleteDoc(doc(db, 'contacts', id)).then(() => {
      setIsDeleting(false)
      navigate('/')
    })
  }

  if (loading) {
    return <div className="contact-detail-container"><p className="loading">Loading contact...</p></div>
  }

  if (!contact) {
    return (
      <div className="contact-detail-container">
        <p className="no-contacts">Contact not found.</p>
        <Link to="/" className="btn btn-primary">« Back to Contacts</Link>
      </div>
    )
  }

  return (
    <div className="contact-detail-container">
      <div className="contact-detail-header">
        <Link to="/" className="btn btn-back">« Back to Contacts</Link>
      </div>

      <div className="contact-detail-card">
        <div className="detail-section">
          <h1 className="contact-detail-title">
            {contact.firstName} {contact.lastName}
          </h1>
        </div>

        <div className="detail-section">
          <h2 className="detail-label">Email</h2>
          <p className="detail-value">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
        </div>

        <div className="detail-section">
          <h2 className="detail-label">Phone</h2>
          <p className="detail-value">
            <a href={`tel:${contact.phone}`}>{contact.phone}</a>
          </p>
        </div>

        <div className="detail-actions">
          <Link to={`/edit/${contact.id}`} className="btn btn-edit">Edit Contact</Link>
          <button className="btn btn-delete" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete Contact'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContactDetail
