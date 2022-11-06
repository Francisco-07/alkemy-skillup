// // Libraries
// import { useState, useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'

// // Redux
// import { register, reset } from '../../features/auth/authSlice'

// const Register = () => {
//   const token = JSON.parse(localStorage.getItem('token'))

//   const dispatch = useDispatch()

//   const [money, setMoney] = useState(0)
//   const deposit = {
//     type: 'topup',
//     concept: 'Deposit',
//     amount: 200,
//   }

//   const { isError, isSuccess, message } = useSelector((state) => state.auth)

//   useEffect(() => {
//     if (isError) {
//     }
//     if (isSuccess) {
//     }

//     dispatch(reset())
//   }, [])

//   const onChange = (e) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }))
//   }

//   const onSubmit = (e) => {
//     e.preventDefault()
//     const userData = {
//       first_name,
//       last_name,
//       email,
//       password,
//       roleId: 1,
//       points: 0,
//     }
//     dispatch(register(userData))
//   }

//   return (
//     <>
//       <section>
//         <h2>Sign up</h2>
//       </section>
//       <form onSubmit={onSubmit}>
//         <div>
//           <div>
//             <div>
//               <label>First name</label>
//             </div>
//             <input
//               type='text'
//               id='first_name'
//               name='first_name'
//               value={first_name}
//               onChange={onChange}
//             />
//           </div>
//           <div>
//             <div>
//               <label>Last name</label>
//             </div>
//             <input
//               type='text'
//               id='last_name'
//               name='last_name'
//               value={last_name}
//               onChange={onChange}
//             />
//           </div>
//           <div>
//             <div>
//               <label>Email</label>
//             </div>
//             <input
//               type='string'
//               id='email'
//               name='email'
//               value={email}
//               onChange={onChange}
//             />
//           </div>
//           <div>
//             <div>
//               <label>Password</label>
//             </div>
//             <input
//               type='password'
//               id='password'
//               name='password'
//               value={password}
//               onChange={onChange}
//             />
//           </div>
//         </div>
//       </form>
//     </>
//   )
// }
// export default Register
