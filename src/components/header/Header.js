// Libraries
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// Redux
import { logout, reset } from '../../features/auth/authSlice'

// Styles
import styled from './header.module.css'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  return (
    <header className={styled.container}>
      <nav>
        {!user ? (
          <ul>
            <li>
              <Link to='/'>home</Link>
            </li>
            <li>
              <Link to='/login'>login</Link>
            </li>
            <li>
              <Link to='/register'>register</Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to='/'>home</Link>
            </li>
            <li>
              <Link to='/login' onClick={onLogout}>
                logout
              </Link>
            </li>
            <li>
              <Link to='/test'>
                {user.first_name} {user.last_name}
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  )
}
export default Header
