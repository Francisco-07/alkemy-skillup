import axios from 'axios'

// Get all accounts
const createAccount = async () => {
  // Token
  const token = JSON.parse(localStorage.getItem('token'))

  const acc = {
    creationDate: '2022-10-26 10:00:00',
    money: 0,
    isBlocked: false,
    userId: 1,
  }

  const config = {
    headers: {
      Authorization: 'Bearer ' + token.accessToken,
    },
  }

  const res = await axios.post('accounts', acc, config)
  console.log(res)
  return res.data
}

// Get all accounts
// const getAllAccounts = async () => {
//   // Token
//   const token = JSON.parse(localStorage.getItem('token'))

//   const config = {
//     headers: {
//       Authorization: 'Bearer ' + token.accessToken,
//     },
//   }
//   const res = await axios.get('accounts', config)
//   console.log(res)
//   return res.data
// }

// Get my account
const getMyAccount = async () => {
  const token = JSON.parse(localStorage.getItem('token'))
  const config = {
    headers: {
      Authorization: 'Bearer ' + token.accessToken,
    },
  }
  // user
  const user = JSON.parse(localStorage.getItem('user'))
  const accounts = await axios.get('accounts', config)
  const myAccount = accounts.data.data.find((id) => id.userId === user.id)

  let count = 2
  while (!myAccount) {
    const res = await axios.get(`accounts/?page=${count}`, config)
    const myAccount = res.data.data.find((id) => id.userId === user.id)
    count++
    if (myAccount) {
      return myAccount
    }
  }
  if (myAccount) {
    const res = await axios.get(`accounts/${myAccount.id}`, config)

    return res.data
  }
}

// get my account transactions

const getMyTransactions = async () => {
  const token = JSON.parse(localStorage.getItem('token'))
  const config = {
    headers: {
      Authorization: 'Bearer ' + token.accessToken,
    },
  }

  const res = await axios.get('transactions', config)
  console.log(res)
  return res.data
}

// charge money

const chargeMoney = async () => {
  const token = JSON.parse(localStorage.getItem('token'))
  const config = {
    headers: {
      Authorization: 'Bearer ' + token.accessToken,
    },
  }
  const user = JSON.parse(localStorage.getItem('user'))
  const accounts = await axios.get('accounts', config)
  let myAccount = accounts.data.data.find((id) => id.userId === user.id)
  let count = 2
  while (!myAccount) {
    const res = await axios.get(`accounts/?page=${count}`, config)
    myAccount = res.data.data.find((id) => id.userId === user.id)
    count++
  }

  if (myAccount) {
    const deposit = {
      type: 'topup',
      concept: 'Deposit',
      amount: 200,
    }
    await axios.post(`accounts/${myAccount.id}`, deposit, config)

    return
  }
}

// Get all users

const getAllUsers = async () => {
  const token = JSON.parse(localStorage.getItem('token'))
  const config = {
    headers: {
      Authorization: 'Bearer ' + token.accessToken,
    },
  }

  const res = await axios.get('users', config)
  console.log(res)
  return res.data
}

const accountService = {
  createAccount,
  getMyAccount,
  getMyTransactions,
  chargeMoney,
  getAllUsers,
}

export default accountService
