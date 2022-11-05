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
const getAllAccounts = async () => {
  // Token
  const token = JSON.parse(localStorage.getItem('token'))

  const config = {
    headers: {
      Authorization: 'Bearer ' + token.accessToken,
    },
  }
  const res = await axios.get('accounts', config)
  console.log(res)
  return res.data
}

// Get my account
const getMyAccount = async () => {
  const token = JSON.parse(localStorage.getItem('token'))
  const config = {
    headers: {
      Authorization: 'Bearer ' + token.accessToken,
    },
  }
  // Token
  const user = JSON.parse(localStorage.getItem('user'))
  const accounts = await axios.get('accounts', config)

  let count = 2
  const myAccount = accounts?.data.data.find((id) => id.userId === user.id)
  console.log('accountmy', myAccount)
  while (!myAccount) {
    const res = await axios.get(`accounts/?page=${count}`, config)
    const myAccount = res.data.data.find((id) => id.userId === user.id)
    count++
    if (myAccount) {
      console.log(myAccount)
      return myAccount
    }
  }

  const res = await axios.get(`accounts/${myAccount.id}`, config)
  console.log(res)
  return res.data
}

const accountService = {
  createAccount,
  getAllAccounts,
  getMyAccount,
}

export default accountService
