// Libraries
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'

// Icons
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs'

// Components
import Title from '../title/Title'
import SkeletonTransactions from '../skeleton/SkeletonTransactions'

// Styles
import styled from './transactions.module.css'

// redux
import {
  getPaginatedTransactions,
  resetTransactionStatus,
} from '../../features/transaction/transactionSlice'

const Transactions = () => {
  const [nextPage, setNextPage] = useState(0)
  const [prevPage, setPrevPage] = useState(0)
  const { transactions, isError, isSuccess } = useSelector(
    (state) => state.transaction
  )
  const [searchParams] = useSearchParams()
  let query = new URLSearchParams(window.location.search)
  let queriPage = Number(query.get('page'))

  const nextPageQuery = transactions.nextPage?.split('=')[1]
  const prevPageQuery = transactions.previousPage?.split('=')[1]

  const dispatch = useDispatch()

  useEffect(() => {
    setNextPage(nextPageQuery)
  }, [setNextPage, nextPageQuery, searchParams])

  useEffect(() => {
    setPrevPage(prevPageQuery)
  }, [setPrevPage, prevPageQuery, searchParams])

  useEffect(() => {
    dispatch(getPaginatedTransactions(queriPage))
  }, [dispatch, queriPage])

  useEffect(() => {
    if (isError) {
      dispatch(resetTransactionStatus())
    }
    if (isSuccess) {
      dispatch(resetTransactionStatus())
    }
  }, [dispatch, isError, isSuccess])
  return (
    <>
      <Title Size={'h1'} text={'Transactions'} />
      <div>
        <div>
          {transactions.data?.length === 0 ? (
            <div className={styled.emptyArray}>
              <h2 className={styled.title}>No transactions found</h2>
            </div>
          ) : (
            <div className={styled.tableContainer}>
              {!transactions.data ? (
                <SkeletonTransactions />
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Concept</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Amount</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.data?.map((t, i) => (
                      <tr key={i}>
                        <td>{t.concept}</td>
                        <td>{t.date.split('T')[0]}</td>
                        <td>done</td>
                        <td>${t.amount}</td>
                        <td className={styled.td}>
                          <Link to={`/transaction?id=${t.id}`}>Detalles</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
      {transactions.data?.length === 0 ? null : (
        <div className={styled.pagination}>
          {prevPage === undefined ? (
            <div className={styled.disabledIcon}>
              <BsArrowLeftCircle />
            </div>
          ) : prevPage === '1' ? (
            <Link to={`/transactions`}>
              <BsArrowLeftCircle />
            </Link>
          ) : (
            <Link to={`/transactions?page=${prevPage}`}>
              <BsArrowLeftCircle />
            </Link>
          )}
          {nextPage === undefined ? (
            <div className={styled.disabledIcon}>
              <BsArrowRightCircle />
            </div>
          ) : (
            <Link to={`/transactions?page=${nextPage}`} className={styled.icon}>
              <BsArrowRightCircle />
            </Link>
          )}
        </div>
      )}
    </>
  )
}
export default Transactions
