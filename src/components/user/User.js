// Libraries
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

// Styles
import styled from './user.module.css'

// redux
import {
  sendMoney,
  resetAccountStatus,
} from '../../features/account/accountSlice'

const User = () => {
  const [topup, setTopup] = useState(0)
  const [concept, setConcept] = useState('Payment')
  const dispatch = useDispatch()
  const { isError, isSuccess } = useSelector((state) => state.account)

  const conceptArray = ['Payment', 'Bills']

  const onChange = (e) => {
    setTopup(e.target.value)
  }

  useEffect(() => {
    if (isError) {
      Swal.fire('Error al depositar')
    }
    if (isSuccess) {
      Swal.fire('Depositado con exito')
    }
    dispatch(resetAccountStatus())
  }, [isError, dispatch, isSuccess])

  const send = (e) => {
    e.preventDefault()
    const payment = {
      type: 'payment',
      concept: concept,
      amount: topup,
    }
    dispatch(sendMoney(payment))
  }

  return (
    <div className={styled.container}>
      <h1 className={styled.title}>Transfer Money</h1>
      <form onSubmit={send} className={styled.formContainer}>
        <div>Amount</div>
        <div>
          <input
            type='number'
            id='topup'
            name='topup'
            value={topup}
            onChange={onChange}
          />
        </div>
        <div>
          <select value={concept} onChange={(e) => setConcept(e.target.value)}>
            {conceptArray.map((concept, i) => (
              <option key={i} value={concept}>
                {concept}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type='submit' className={styled.btn}>
            send
          </button>
        </div>
      </form>
    </div>
  )
}
export default User
