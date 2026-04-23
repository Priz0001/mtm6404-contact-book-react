import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import db from '../../db'

function AddContact() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    const contactsCollection = collection(db, 'contacts')
    await addDoc(contactsCollection, {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim()
    }).then((data) => {
      setIsSubmitting(false)
      navigate(`/contact/${data.id}`)
    })
  }

  return (
    <div className="contact-form-container">
      <div className="form-header">
        <Link to="/" className="btn btn-back">« Back to Contacts</Link>
      </div>

      <div className="contact-form-card">
        <h1>Add New Contact</h1>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="firstName" className="form-label">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`form-input ${errors.firstName ? 'form-input-error' : ''}`}
              placeholder="Enter first name"
              disabled={isSubmitting}
            />
            <span className={`field-error ${errors.firstName ? '' : 'hidden'}`}>{errors.firstName}</span>
          </div>

          <div className="form-group">
            <label htmlFor="lastName" className="form-label">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`form-input ${errors.lastName ? 'form-input-error' : ''}`}
              placeholder="Enter last name"
              disabled={isSubmitting}
            />
            {errors.lastName && <span className="field-error">{errors.lastName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'form-input-error' : ''}`}
              placeholder="Enter email address"
              disabled={isSubmitting}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter phone number (optional)"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding Contact...' : 'Add Contact'}
            </button>
            <Link
              to="/"
              className="btn btn-cancel"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddContact
