// Libraries
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

// Components
import Btn from '../Btn/Btn'

// Styles
import styled from './register.module.css'

// Redux
import { register, reset } from '../../features/auth/authSlice'

const Register = () => {
  const token = JSON.parse(localStorage.getItem('token'))

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  })

  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const { first_name, last_name, email, password } = formData

  const { isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        confirmButtonColor: '#58c1f5',
      })
    }
    if (isSuccess) {
      Swal.fire({
        icon: 'success',
        title: 'User registered successful',
        showConfirmButton: false,
        timer: 1500,
      })
      navigate('/login')
    }
    if (token?.accessToken) {
      navigate('/')
    }

    dispatch(reset())
  }, [token?.accessToken, isSuccess, isError, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      first_name,
      last_name,
      email,
      password,
      roleId: 1,
      points: 0,
    }
    if (
      email === '' ||
      password === '' ||
      first_name === '' ||
      last_name === ''
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Complete all fields',
        confirmButtonColor: '#58c1f5',
      })
      return
    }
    if (email !== '' && !regex.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid email',
        confirmButtonColor: '#58c1f5',
      })
      return
    }
    dispatch(register(userData))
  }

  return (
    <>
      <h2>Sign up</h2>
      <form onSubmit={onSubmit} className={styled.container}>
        <div>
          <div>
            <label>First name</label>
          </div>
          <input
            type='text'
            id='first_name'
            name='first_name'
            value={first_name}
            onChange={onChange}
          />
        </div>
        <div>
          <div>
            <label>Last name</label>
          </div>
          <input
            type='text'
            id='last_name'
            name='last_name'
            value={last_name}
            onChange={onChange}
          />
        </div>
        <div>
          <div>
            <label>Email</label>
          </div>
          <input
            type='string'
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
        <div>
          <Btn text='Sign up' variant={'primary'} type={'submit'} />
        </div>
      </form>
    </>
  )
}
export default Register
