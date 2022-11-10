// Components
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Transaction from './components/transaction/Transaction'

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
import { Navigate, Outlet, Routes, Route } from 'react-router-dom'

const PrivateRoutes = () => {
  const token = JSON.parse(localStorage.getItem('token'))
  return token?.accessToken ? <Outlet /> : <Navigate to='/login' />
}

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route exact path='/' element={<HomePage />} />
            <Route path='/users' element={<UsersListPage />} />
            <Route path='/user' element={<UserPage />} />
            <Route path='/charge' element={<ChargeMoneyPage />} />
            <Route path='/transactions' element={<TransactionsPage />} />
            <Route path='/transaction' element={<Transaction />} />
          </Route>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
