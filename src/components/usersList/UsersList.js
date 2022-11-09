// Styles
import styled from './usersList.module.css'

// Libraries
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

// Redux
import {
  getAllUsers,
  getPaginatedUsers,
} from '../../features/account/accountSlice'

const UsersList = () => {
  const [page, setPage] = useState(0)
  const { users } = useSelector((state) => state.account)
  const dispatch = useDispatch()

  let query = new URLSearchParams(window.location.search)
  let queriPage = Number(query.get('page'))

  const nextPage = users.nextPage?.split('=')[1]
  const prevPage = users.previousPage?.split('=')[1]

  const nextPageClick = () => {
    setPage(nextPage)
  }
  const prevPageClick = () => {
    setPage(prevPage)
  }

  useEffect(() => {
    dispatch(getPaginatedUsers(queriPage))
  }, [dispatch, queriPage])
  return (
    <div>
      <div className={styled.title}>
        <h1>Users List</h1>
      </div>
      <div className={styled.container}>
        <div className={styled.wrapper}>
          {users.data?.map((user, i) => {
            return (
              <div key={i} className={styled.usersContainer}>
                <div>
                  {user.first_name} {user.last_name}
                </div>

                <div>{user.email}</div>
                <Link to={`/user?id=${user.id}`}>Ver cuenta</Link>
              </div>
            )
          })}
        </div>
        <div>
          <div>pagination</div>
          {prevPage === '1' ? (
            <Link onClick={prevPageClick} to={`/users`}>
              back
            </Link>
          ) : (
            <Link onClick={prevPageClick} to={`/users?page=${prevPage}`}>
              back
            </Link>
          )}
          <Link onClick={nextPageClick} to={`/users?page=${nextPage}`}>
            next
          </Link>
        </div>
      </div>
    </div>
  )
}
export default UsersList
