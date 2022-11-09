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

// Get my account

const getMyAccount = async () => {
  const token = await JSON.parse(localStorage.getItem('token'))
  const config = {
    headers: {
      Authorization: 'Bearer ' + token.accessToken,
    },
  }
  // user
  const user = await JSON.parse(localStorage.getItem('user'))
  const accounts = await axios.get('accounts', config)
  const myAccount = await accounts.data.data.find((id) => id.userId === user.id)

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

// charge money

const chargeMoney = async (deposit) => {
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
    await axios.post(`accounts/${myAccount.id}`, deposit, config)

    return
  }
}

// send money

const sendMoney = async (payment) => {
  let query = new URLSearchParams(window.location.search)
  let querid = Number(query.get('id'))
  console.log(querid)

  console.log('queri', querid)
  const token = JSON.parse(localStorage.getItem('token'))
  const config = {
    headers: {
      Authorization: 'Bearer ' + token.accessToken,
    },
  }
  const accounts = await axios.get('accounts', config)
  let myAccount = await accounts.data.data.find((id) => id.userId === querid)
  let count = 2
  while (!myAccount) {
    const res = await axios.get(`accounts/?page=${count}`, config)
    myAccount = await res.data.data.find((id) => id.userId === querid)
    count++
    console.log(res.data)
    if (res.data.nextPage === null) {
      throw Object.assign(new Error('Account not found'), { code: 402 })
    }
  }

  if (myAccount) {
    await axios.post(`accounts/${myAccount.id}`, payment, config)

    return
  }
}

const accountService = {
  createAccount,
  getMyAccount,
  chargeMoney,
  sendMoney,
}

export default accountService
