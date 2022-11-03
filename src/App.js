// Components
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

// Pages
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/login/LoginPage'
import RegisterPage from './pages/register/RegisterPage'

// Libraries
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App