// Styles
import styled from './transaction.module.css'

// Components
import Title from '../title/Title'

// Libraries
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

// Redux
import { singleTransaction } from '../../features/transaction/transactionSlice'
import { getSingleUser } from '../../features/user/userSlice'
import {
  editConcept,
  resetEditConceptStatus,
} from '../../features/editConcept/editConceptSlice'
import Btn from '../Btn/Btn'

const Transaction = () => {
  const { transaction } = useSelector((state) => state.transaction)
  const { isSuccess, isError } = useSelector((state) => state.editConcept)
  const { user } = useSelector((state) => state.user)
  const [concept, setConcept] = useState('Edit')

  const conceptArray = ['Payment', 'Bills']
  let query = new URLSearchParams(window.location.search)
  let id = Number(query.get('id'))
  console.log(isError)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(singleTransaction(id))
    dispatch(getSingleUser(transaction.to_account_id))
  }, [dispatch, id, transaction.concept, transaction.to_account_id])

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
      <Title Size={'h1'} text={'Transaction details'} />
      <div className={styled.wrapper}>
        <form onSubmit={tditConcept}>
          <h2>Transaction ID: {transaction.id}</h2>
          <h2>Amount: ${transaction.amount}</h2>
          <h2>
            To user: {user.first_name} {user.last_name}
          </h2>
          <h2>Email: {user.email}</h2>
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
          <Btn type={'submit'} text={'save'} variant={'secondary'} />
        </form>
      </div>
    </div>
  )
}
export default Transaction
