import axios from 'axios'

// Get paginated users

const getPaginatedUsers = async (page) => {
  const token = JSON.parse(localStorage.getItem('token'))
  const config = {
    headers: {
      Authorization: 'Bearer ' + token.accessToken,
    },
  }

  if (!page) {
    const res = await axios.get(`users`, config)
    return res.data
  }
  if (page) {
    const res = await axios.get(`users/?page=${page}`, config)
    return res.data
  }
}

const userService = {
  getPaginatedUsers,
}

export default userService
