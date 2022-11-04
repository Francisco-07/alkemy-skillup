// // Libraries
// import axios from 'axios'

// // Token
// const token = JSON.parse(localStorage.getItem('user'))

// // Get loged user

// const getLogedUser = async () => {
//   const config = {
//     headers: {
//       Authorization: 'Bearer ' + token.accessToken,
//     },
//   }
//   const res = await axios.get('auth/me', config)
//   if (res.data) {
//     localStorage.setItem('test', JSON.stringify(res.data))
//   }
//   return res.data
// }

// export default getLogedUser
