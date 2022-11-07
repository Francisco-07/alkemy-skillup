// Libraries
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
// redux
import {
  chargeMoney,
  resetAccountProcess,
} from '../../features/account/accountSlice'

const ChargeMoney = () => {
  const [topup, setTopup] = useState(0)
  const dispatch = useDispatch()

  const { isError, isSuccess } = useSelector((state) => state.account)
  useEffect(() => {
    if (isError) {
      Swal.fire('Error al depositar')
    }
    if (isSuccess) {
      Swal.fire('Depositado con exito')
    }
    dispatch(resetAccountProcess())
  }, [isError, dispatch, isSuccess])
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
