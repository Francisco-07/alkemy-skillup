// Libraries
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Styles
import styled from './dashboard.module.css'

// Icons
import { BsWallet } from 'react-icons/bs'
import { AiOutlineDollarCircle } from 'react-icons/ai'
import { BiPaperPlane } from 'react-icons/bi'

// redux
import {
  createAccount,
  getMyTransactions,
  resetAccountProcess,
} from '../../features/account/accountSlice'

const Dashboard = () => {
  const { transactions, isError, isSuccess } = useSelector(
    (state) => state.account
  )

  const dispatch = useDispatch()
  const createAcc = () => {
    dispatch(createAccount())
  }

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

  const myCash = totalCharged - totalPayments

  useEffect(() => {
    dispatch(getMyTransactions())
  }, [dispatch])

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
    <>
      <div className={styled.title}>
        <h1>Dashboard</h1>
      </div>
      <div>
        <div className={styled.balance}>
          <div className={styled.box}>
            <BsWallet />
            <h4>Total balance</h4>
            <div>${myCash}</div>
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
        <div>
          <h2>Last transactions</h2>
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
      </div>

      <button onClick={createAcc}>crear cuenta</button>
    </>
  )
}
export default Dashboard
