import axios from 'axios'

// Paginated Transaction
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

// Single transaction
const singleTransaction = async (id) => {
  const token = JSON.parse(localStorage.getItem('token'))
  const config = {
    headers: {
      Authorization: 'Bearer ' + token.accessToken,
    },
  }

  const res = await axios.get(`transactions/${id}`, config)
  return res.data
}

const accountService = {
  getPaginatedTransactions,
  singleTransaction,
}

export default accountService
