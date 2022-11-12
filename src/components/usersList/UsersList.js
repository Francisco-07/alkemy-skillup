// Styles
import styled from './usersList.module.css'

// Icons
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs'

// Components
import Title from '../title/Title'
import SkeletonUsers from '../skeleton/SkeletonUsers'

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
      dispatch(resetUserStatus())
    }
    if (isSuccess) {
      dispatch(resetUserStatus())
    }
  }, [dispatch, isError, isSuccess])
  return (
    <div>
      <Title Size={'h1'} text={'Users list'} />

      <div className={styled.container}>
        {!users.data ? (
          <SkeletonUsers />
        ) : (
          <div className={styled.wrapper}>
            {users.data?.map((user, i) => {
              return (
                <div key={i} className={styled.usersContainer}>
                  <div>
                    {user.first_name} {user.last_name}
                  </div>

                  <div>{user.email}</div>
                  <Link to={`/user?id=${user.id}`}>Transfer</Link>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className={styled.pagination}>
        {prevPage === undefined ? (
          <div className={styled.disabledIcon}>
            <BsArrowLeftCircle />
          </div>
        ) : prevPage === '1' ? (
          <Link to={`/users`}>
            <BsArrowLeftCircle />
          </Link>
        ) : (
          <Link to={`/users?page=${prevPage}`}>
            <BsArrowLeftCircle />
          </Link>
        )}
        {nextPage === undefined ? (
          <div className={styled.disabledIcon}>
            <BsArrowRightCircle />
          </div>
        ) : (
          <Link to={`/users?page=${nextPage}`} className={styled.icon}>
            <BsArrowRightCircle />
          </Link>
        )}
      </div>
    </div>
  )
}
export default UsersList
