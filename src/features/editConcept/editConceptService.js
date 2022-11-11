import axios from 'axios'

// Edit transaction concept
const editConcept = async ({ id, data }) => {
  const token = JSON.parse(localStorage.getItem('token'))
  const config = {
    headers: {
      Authorization: 'Bearer ' + token.accessToken,
    },
  }

  const res = await axios.put(`transactions/${id}`, data, config)
  return res.data
}

const editConceptService = {
  editConcept,
}

export default editConceptService
