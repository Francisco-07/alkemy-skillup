// Libraries
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'

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
      console.log(isError)
    }
    if (isSuccess) {
      console.log(isSuccess)
    }
    dispatch(resetTransactionStatus())
  }, [dispatch, isError, isSuccess])
  return (
    <>
      <div className={styled.title}>
        <h1>Transactions</h1>
      </div>
      <div>
        <div>
          <div className={styled.tableContainer}>
            <table>
              <thead>
                <tr>
                  <th>Concept</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.data?.map((t, i) => (
                  <tr key={i}>
                    <td>{t.concept}</td>
                    <td>{t.date.split('T')[0]}</td>
                    <td>done</td>
                    <td>${t.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <div>pagination</div>
        {prevPage === undefined ? null : prevPage === '1' ? (
          <Link to={`/transactions`}>back</Link>
        ) : (
          <Link to={`/transactions?page=${prevPage}`}>back</Link>
        )}
        {nextPage === undefined ? null : (
          <Link to={`/transactions?page=${nextPage}`}>next</Link>
        )}
      </div>
    </>
  )
}
export default Transactions
