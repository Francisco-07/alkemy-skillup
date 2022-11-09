// Libraries
import { useState } from 'react'
import { useDispatch } from 'react-redux'

// Styles
import styled from './user.module.css'

// redux
import { sendMoney } from '../../features/account/accountSlice'

const User = () => {
  const [topup, setTopup] = useState(0)
  const [concept, setConcept] = useState('Payment')
  const dispatch = useDispatch()

  const conceptArray = ['Payment', 'Bills']

  const onChange = (e) => {
    setTopup(e.target.value)
  }

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
