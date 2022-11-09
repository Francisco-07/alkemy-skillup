// Icons
import DashboardIcon from '../../assets/icons/DashboardIcon'
import AddMoneyIcon from '../../assets/icons/AddMoneyIcon'
import Logo from '../../assets/icons/Logo'
import SendMoneyIcon from '../../assets/icons/SendMoney'
import TransactionsIcon from '../../assets/icons/TransactionsIcon'

// Libraries
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Redux
import { logout, reset } from '../../features/auth/authSlice'
import { resetAccountState } from '../../features/account/accountSlice'

// Styles
import styled from './navbar.module.css'

const Navbar = () => {
  const [menu, setMenu] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const openOrClose = () => {
    setMenu(!menu)
  }

  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    dispatch(resetAccountState())
    navigate('/')
  }

  return (
    <header>
      <div>
        <div className={styled.btn} onClick={openOrClose}>
          x
        </div>
        <div
          className={styled.container}
          style={{ left: `${menu ? 0 : -100}%` }}
        >
          <nav className={styled.wrapper}>
            <div className={styled.logo}>
              <Logo />
              <h2>Alkybank</h2>
            </div>
            <h5>Manage</h5>
            {user ? (
              <ul>
                <li>
                  <Link to='/'>
                    <DashboardIcon />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to='/transactions'>
                    <TransactionsIcon />
                    Transactions
                  </Link>
                </li>
                <li>
                  <Link to='/charge'>
                    <AddMoneyIcon />
                    Add money
                  </Link>
                </li>
                <li>
                  <Link to='/users'>
                    <SendMoneyIcon />
                    Send money
                  </Link>
                </li>
                <li>
                  <Link to={'/login'} onClick={onLogout}>
                    <AddMoneyIcon />
                    Logout
                  </Link>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <Link to='/register'>
                    <TransactionsIcon />
                    Register
                  </Link>
                </li>
                <li>
                  <Link to='/login'>
                    <AddMoneyIcon />
                    Login
                  </Link>
                </li>
              </ul>
            )}
          </nav>
          {user ? (
            <div>
              <div>Logged user</div>
              <div>
                {user.first_name} {user.last_name}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}

export default Navbar
