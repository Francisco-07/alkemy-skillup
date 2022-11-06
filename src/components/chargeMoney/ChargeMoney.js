// Libraries
import { useState } from 'react'
import { useDispatch } from 'react-redux'

// redux
import { chargeMoney } from '../../features/account/accountSlice'

const ChargeMoney = () => {
  const [topup, setTopup] = useState(0)
  const dispatch = useDispatch()

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
          <button type='submit'>charge</button>
        </div>
      </form>
    </div>
  )
}
export default ChargeMoney
