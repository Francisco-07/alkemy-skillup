// Libraries
import { useState } from 'react'
import { useDispatch } from 'react-redux'

// redux
import { chargeMoney } from '../../features/account/accountSlice'

const SendMoney = () => {
  const [topup, setTopup] = useState(0)
  const [concept, setConcept] = useState('')
  const dispatch = useDispatch()

  const conceptArray = ['Payment', 'Bills']

  const onChange = (e) => {
    setTopup(e.target.value)
  }

  const charge = (e) => {
    e.preventDefault()
    const deposit = {
      type: 'topup',
      concept: 'Deposit',
      amount: topup,
    }
    dispatch(chargeMoney(deposit))
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
      <form onSubmit={charge}>
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
export default SendMoney
