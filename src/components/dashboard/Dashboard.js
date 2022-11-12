// Libraries
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Components
import Title from '../../components/title/Title'

// Styles
import styled from './dashboard.module.css'

import SkeletonDashboard from '../skeleton/SkeletonDashboard'

// Icons
import { BsWallet } from 'react-icons/bs'
import { AiOutlineDollarCircle } from 'react-icons/ai'
import { BiPaperPlane } from 'react-icons/bi'

// redux
import {
  getPaginatedTransactions,
  resetTransactionStatus,
} from '../../features/transaction/transactionSlice'

const Dashboard = () => {
  const { transactions, isError, isSuccess } = useSelector(
    (state) => state.transaction
  )

  const dispatch = useDispatch()

  const totalCharged = transactions.data
    ?.filter((item) => {
      return item.concept === 'Deposit'
    })
    .reduce((totalPayment, item) => {
      return totalPayment + Number(item.amount)
    }, 0)

  const totalPayments = transactions.data
    ?.filter((item) => {
      return item.concept !== 'Deposit'
    })
    .reduce((totalPayment, item) => {
      return totalPayment + Number(item.amount)
    }, 0)

  const myCash = Number(totalCharged) - Number(totalPayments)

  useEffect(() => {
    dispatch(getPaginatedTransactions())
  }, [dispatch])

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
      <Title Size={'h1'} text={'Dashboard'} />

      {!transactions.data ? (
        <SkeletonDashboard />
      ) : (
        <div>
          <div className={styled.balance}>
            <div className={styled.box}>
              <BsWallet />
              <h4>Total balance</h4>
              <div>{!myCash ? '$0' : `$${myCash}`}</div>
            </div>
            <div className={styled.box}>
              <AiOutlineDollarCircle />
              <h4>All Charges</h4>
              <div>${totalCharged}</div>
            </div>
            <div className={styled.box}>
              <BiPaperPlane />
              <h4>All Payments</h4>
              <div>${totalPayments}</div>
            </div>
          </div>
          {transactions.data.length === 0 ? (
            <h2 className={styled.title}>No transactions found</h2>
          ) : (
            <div>
              <h2 className={styled.title}>Last transactions</h2>
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
                    {transactions.data?.slice(0, 4).map((t, i) => (
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
          )}
        </div>
      )}
    </>
  )
}
export default Dashboard
