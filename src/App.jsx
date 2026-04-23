import { Routes, Route } from 'react-router-dom'
import ContactsList from './routes/ContactsList'
import ContactDetail from './routes/ContactDetail'
import AddContact from './routes/AddContact'
import EditContact from './routes/EditContact'
import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ContactsList />} />
        <Route path="/contact/:id" element={<ContactDetail />} />
        <Route path="/add" element={<AddContact />} />
        <Route path="/edit/:id" element={<EditContact />} />
      </Routes>
    </div>
  )
}

export default App
