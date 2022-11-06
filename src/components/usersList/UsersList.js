// Styles
// import styled from './usersList.module.css'

// Libraries
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

// Redux
import { getAllUsers } from '../../features/account/accountSlice'

const UsersList = () => {
  const { users } = useSelector((state) => state.account)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])
  return (
    <div>
      {users.data?.map((user, i) => {
        return (
          <div style={{ border: '1px solid red' }} key={i}>
            <div>{user.first_name}</div>
            <Link to={`/user?id=${user.id}`}>Ver cuenta</Link>
          </div>
        )
      })}
    </div>
  )
}
export default UsersList
