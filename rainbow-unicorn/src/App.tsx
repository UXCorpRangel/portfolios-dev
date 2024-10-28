import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import './App.css'
import { ProjectDetails } from '@/pages/projects'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/projects/:slug' element={<ProjectDetails />} />
        <Route path='*' element={'404 - Page not found'} />
      </Routes>
    </Router>
  )
}

export default App
