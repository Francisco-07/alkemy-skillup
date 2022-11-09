import axios from 'axios'

const getPaginatedTransactions = async (page) => {
  const token = JSON.parse(localStorage.getItem('token'))
  const config = {
    headers: {
      Authorization: 'Bearer ' + token.accessToken,
    },
  }
  if (!page) {
    const res = await axios.get(`transactions/`, config)
    return res.data
  }
  if (page) {
    const res = await axios.get(`transactions/?page=${page}`, config)
    return res.data
  }
}

const accountService = {
  getPaginatedTransactions,
}

export default accountService
