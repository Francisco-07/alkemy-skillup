// Styles
import styled from './transaction.module.css'

// Components
import Title from '../title/Title'

// Libraries
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

// Redux
import { singleTransaction } from '../../features/transaction/transactionSlice'

import {
  editConcept,
  resetEditConceptStatus,
} from '../../features/editConcept/editConceptSlice'
import Btn from '../Btn/Btn'

const Transaction = () => {
  const { transaction } = useSelector((state) => state.transaction)
  const { isSuccess, isError } = useSelector((state) => state.editConcept)

  const navigate = useNavigate()

  const [concept, setConcept] = useState('Edit')

  const conceptArray = ['Payment', 'Bills', 'Expenses', 'Other']
  let query = new URLSearchParams(window.location.search)
  let id = Number(query.get('id'))

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(singleTransaction(id))
  }, [dispatch, id])

  const onClick = () => {
    navigate('/transactions')
  }

  useEffect(() => {
    if (isError) {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        confirmButtonColor: '#58c1f5',
      })
    }
    if (isSuccess) {
      Swal.fire({
        icon: 'success',
        title: 'Concept change saved',
        showConfirmButton: false,
        timer: 1500,
      })
      dispatch(resetEditConceptStatus())
      navigate('/transactions')
    }
  }, [isSuccess, isError, dispatch, navigate])

  useEffect(() => {
    setConcept(transaction?.concept)
  }, [transaction?.concept])

  const submitConcept = (e) => {
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
        <form onSubmit={submitConcept}>
          <h2>Transaction ID: {transaction.id}</h2>
          <h2>Amount: ${transaction.amount}</h2>
          <h2>From account ID: {transaction.accountId}</h2>
          <h2>Transfered to account ID: {transaction.to_account_id}</h2>
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
          {transaction?.concept === 'Deposit' ? (
            <Btn
              type={'submit'}
              text={'Go back'}
              variant={'secondary'}
              action={onClick}
            />
          ) : (
            <Btn type={'submit'} text={'Save'} variant={'secondary'} />
          )}
        </form>
      </div>
    </div>
  )
}
export default Transaction
