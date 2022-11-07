// Components
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'

// Pages
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/login/LoginPage'
import RegisterPage from './pages/register/RegisterPage'
import UsersListPage from './pages/usersList/UsersListPage'
import UserPage from './pages/user/UserPage'
import ChargeMoneyPage from './pages/chargeMoney/ChargeMoneyPage'
import SendMoneyPage from './pages/sendMoney/SendMoneyPage'

// Libraries
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/users' element={<UsersListPage />} />
        <Route path='/user' element={<UserPage />} />
        <Route path='/charge' element={<ChargeMoneyPage />} />
        <Route path='/send' element={<SendMoneyPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
