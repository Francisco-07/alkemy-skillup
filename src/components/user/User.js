// Libraries
import { useState } from 'react'
import { useDispatch } from 'react-redux'

// redux
import { sendMoney } from '../../features/account/accountSlice'

const User = () => {
  const [topup, setTopup] = useState(0)
  const [concept, setConcept] = useState('Payment')
  const dispatch = useDispatch()
  let query = new URLSearchParams(window.location.search)
  let testt = query.get('id')
  console.log(testt)

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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2>Charge money</h2>
      <form onSubmit={send}>
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
          <button type='submit'>send</button>
        </div>
      </form>
    </div>
  )
}
export default User
