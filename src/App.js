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
import TransactionsPage from './pages/transactions/TransactionsPage'
import ErrorPage from './pages/error/ErrorPage'

// Libraries
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/users' element={<UsersListPage />} />
          <Route path='/user' element={<UserPage />} />
          <Route path='/charge' element={<ChargeMoneyPage />} />
          <Route path='/transactions' element={<TransactionsPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
