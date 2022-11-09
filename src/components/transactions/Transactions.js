// Libraries
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

// Styles
import styled from './transactions.module.css'

// redux
import {
  getPaginatedTransactions,
  resetAccountProcess,
} from '../../features/account/accountSlice'

const Transactions = () => {
  const [page, setPage] = useState(0)
  const { transactions, isError, isSuccess } = useSelector(
    (state) => state.account
  )

  let query = new URLSearchParams(window.location.search)
  let queriPage = Number(query.get('page'))

  const nextPage = transactions.nextPage?.split('=')[1]
  const prevPage = transactions.previousPage?.split('=')[1]

  const dispatch = useDispatch()

  const nextPageClick = () => {
    setPage(nextPage)
  }
  const prevPageClick = () => {
    setPage(prevPage)
  }

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
    dispatch(resetAccountProcess())
  }, [dispatch, isError, isSuccess])
  return (
    <div className={styled.container}>
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
        {prevPage === '1' ? (
          <Link onClick={prevPageClick} to={`/transactions`}>
            back
          </Link>
        ) : (
          <Link onClick={prevPageClick} to={`/transactions?page=${prevPage}`}>
            back
          </Link>
        )}
        <Link onClick={nextPageClick} to={`/transactions?page=${nextPage}`}>
          next
        </Link>
      </div>
    </div>
  )
}
export default Transactions
