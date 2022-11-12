// Libraries
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

// Styles
import styled from './login.module.css'

// Components
import Btn from '../Btn/Btn'

// Redux
import { login, reset, logedUser } from '../../features/auth/authSlice'
import { createAccount } from '../../features/account/accountSlice'

function Login() {
  const token = JSON.parse(localStorage.getItem('token'))

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const { email, password } = formData

  const { isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid credentials!',
        confirmButtonColor: '#58c1f5',
      })
      dispatch(reset())
      return
    }
    if (isSuccess) {
      Swal.fire({
        icon: 'success',
        title: 'Login successful',

        showConfirmButton: false,
        timer: 1500,
      })
      dispatch(logedUser())
      dispatch(createAccount())
      navigate('/')
    }

    if (token?.accessToken) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, message, navigate, dispatch, token?.accessToken, isSuccess])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (email === '' || password === '') {
      Swal.fire({
        icon: 'error',
        title: 'Invalid credentials!',
        confirmButtonColor: '#58c1f5',
      })
      return
    }
    if (email !== '' && !regex.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid credentials!',
        confirmButtonColor: '#58c1f5',
      })
      return
    } else {
      dispatch(
        login({
          email,
          password,
        })
      )
    }
  }

  return (
    <>
      <h2>Login</h2>
      <section>
        <form onSubmit={onSubmit} className={styled.container}>
          <div>
            <div>
              <label>Email</label>
            </div>
            <input
              type='text'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
            />
          </div>
          <div>
            <div>
              <label>Password</label>
            </div>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
            />
          </div>

          <Btn text='Login' variant={'primary'} type={'submit'} />

          <div>
            <span>
              New user?{' '}
              <Link to={'/register'}>
                <b>Sign up</b>
              </Link>
            </span>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
