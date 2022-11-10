// Styles
import styled from './transaction.module.css'

// Libraries
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

// Redux
import { singleTransaction } from '../../features/transaction/transactionSlice'
import {
  editConcept,
  resetEditConceptStatus,
} from '../../features/editConcept/editConceptSlice'

const Transaction = () => {
  const { transaction } = useSelector((state) => state.transaction)
  const { isSuccess, isError } = useSelector((state) => state.editConcept)
  const [concept, setConcept] = useState('Edit')

  const conceptArray = ['Payment', 'Bills']
  let query = new URLSearchParams(window.location.search)
  let id = Number(query.get('id'))
  console.log(isError)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(singleTransaction(id))
  }, [dispatch, id, transaction.concept])

  useEffect(() => {
    if (isSuccess) {
      Swal.fire('good')
      dispatch(resetEditConceptStatus())
    }
  }, [isSuccess, dispatch])

  useEffect(() => {
    setConcept(transaction?.concept)
  }, [transaction?.concept])

  const tditConcept = (e) => {
    e.preventDefault()

    const data = {
      amount: transaction.amount,
      concept: concept,
      date: transaction.date,
      type: transaction.type,
      accountId: transaction.accountId,
      userId: transaction.userId,
      to_account_id: transaction.to_account_id,
    }
    if (concept !== 'Edit') {
      dispatch(editConcept({ id, data }))
    }
  }

  return (
    <div className={styled.container}>
      <h1 className={styled.title}>Transaction details</h1>
      <div className={styled.wrapper}>
        <form onSubmit={tditConcept}>
          <h2>Transaction ID: {transaction.id}</h2>
          <h2>Amount: ${transaction.amount}</h2>
          <div>
            <h2>
              Concept:
              {transaction?.concept === 'Deposit' ? (
                'Deposit'
              ) : (
                <select
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                >
                  {conceptArray.map((concept, i) => (
                    <option key={i} value={concept}>
                      {concept}
                    </option>
                  ))}
                </select>
              )}
            </h2>
          </div>
          <h2>Transfered to account ID: {transaction.to_account_id}</h2>
          <button type='submit'>save</button>
        </form>
      </div>
    </div>
  )
}
export default Transaction
