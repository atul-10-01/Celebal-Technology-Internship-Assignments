import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserForm from './components/UserForm'
import SuccessPage from './components/SuccessPage'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
