// Libraries
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Styles
import styled from './dashboard.module.css'

// redux
import {
  createAccount,
  getMyAccount,
  getMyTransactions,
} from '../../features/account/accountSlice'

const Dashboard = () => {
  const { myAccount, transactions } = useSelector((state) => state.account)

  const dispatch = useDispatch()
  const createAcc = () => {
    dispatch(createAccount())
  }

  useEffect(() => {
    dispatch(getMyTransactions())

    dispatch(getMyAccount())
  }, [dispatch])
  return (
    <>
      <h1>Dashboard</h1>
      <div>
        <h2>Total balance</h2>
        <div>${myAccount?.money}</div>
        <div>
          <h2>Last transactions</h2>
          {transactions.data?.map((t, i) => {
            return (
              <div key={i} className={styled.transactionsList}>
                <div>{t.amount}</div>
                <div>{t.concept}</div>
              </div>
            )
          })}
        </div>
      </div>
      <button onClick={createAcc}>crear cuenta</button>
    </>
  )
}
export default Dashboard
