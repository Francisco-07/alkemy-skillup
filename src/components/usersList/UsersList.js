// Styles
import styled from './usersList.module.css'

// Libraries
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'

// Redux
import {
  getPaginatedUsers,
  resetUserStatus,
} from '../../features/user/userSlice'

const UsersList = () => {
  const { users, isError, isSuccess } = useSelector((state) => state.user)

  const [nextPage, setNextPage] = useState(0)
  const [prevPage, setPrevPage] = useState(0)

  const [searchParams] = useSearchParams()
  let query = new URLSearchParams(window.location.search)
  let queriPage = Number(query.get('page'))

  const nextPageQuery = users.nextPage?.split('=')[1]
  const prevPageQuery = users.previousPage?.split('=')[1]

  const dispatch = useDispatch()

  useEffect(() => {
    setNextPage(nextPageQuery)
  }, [setNextPage, nextPageQuery, searchParams])

  useEffect(() => {
    setPrevPage(prevPageQuery)
  }, [setPrevPage, prevPageQuery, searchParams])

  useEffect(() => {
    dispatch(getPaginatedUsers(queriPage))
  }, [dispatch, queriPage])

  useEffect(() => {
    if (isError) {
      console.log(isError)
    }
    if (isSuccess) {
      console.log(isSuccess)
    }
    dispatch(resetUserStatus())
  }, [dispatch, isError, isSuccess])
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
      </div>
      <div className={styled.pagination}>
        <div>pagination</div>
        <div>
          {prevPage === undefined ? null : prevPage === '1' ? (
            <Link to={`/users`}>back</Link>
          ) : (
            <Link to={`/users?page=${prevPage}`}>back</Link>
          )}
          {nextPage === undefined ? null : (
            <Link to={`/users?page=${nextPage}`}>next</Link>
          )}
        </div>
      </div>
    </div>
  )
}
export default UsersList
