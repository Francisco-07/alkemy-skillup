// Icons
import Logo from '../../assets/icons/Logo'
import { MdNotes } from 'react-icons/md'
import { RiDashboardFill } from 'react-icons/ri'
import { GoDiffAdded } from 'react-icons/go'
import { IoIosSend } from 'react-icons/io'
import { ImExit, ImEnter } from 'react-icons/im'
import { FiUserPlus } from 'react-icons/fi'
import { GiHamburgerMenu, GiTireIronCross } from 'react-icons/gi'

// Libraries
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

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
    Swal.fire({
      icon: 'success',
      title: 'User Loged out',
      showConfirmButton: false,
      timer: 1500,
    })
    navigate('/')
  }

  return (
    <header>
      <div>
        <div className={styled.btn} onClick={openOrClose}>
          {menu ? <GiTireIronCross /> : <GiHamburgerMenu />}
        </div>
        <div
          className={styled.container}
          style={{ left: `${menu ? 0 : -100}%` }}
        >
          <nav className={styled.wrapper}>
            <div className={styled.logo}>
              <Logo fill='#fff' width={40} height={40} />
              <h2>Alkybank</h2>
            </div>
            <div>
              <h5>Manage</h5>
              {user ? (
                <ul>
                  <li>
                    <Link to='/'>
                      <RiDashboardFill />
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to='/transactions'>
                      <MdNotes />
                      Transactions
                    </Link>
                  </li>
                  <li>
                    <Link to='/charge'>
                      <GoDiffAdded />
                      Add money
                    </Link>
                  </li>
                  <li>
                    <Link to='/users'>
                      <IoIosSend />
                      Send money
                    </Link>
                  </li>
                  <li>
                    <Link to={'/login'} onClick={onLogout}>
                      <ImExit />
                      Logout
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <Link to='/register'>
                      <FiUserPlus />
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link to='/login'>
                      <ImEnter />
                      Login
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            {user ? (
              <div>
                <div>Logged as</div>
                <h4>
                  {user.first_name} {user.last_name}
                </h4>
              </div>
            ) : null}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
