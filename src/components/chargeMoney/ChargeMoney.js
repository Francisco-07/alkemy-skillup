// Libraries
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

// redux
import {
  chargeMoney,
  resetAccountProcess,
} from '../../features/account/accountSlice'

// Styles
import styled from './chargeMoney.module.css'

const ChargeMoney = () => {
  const [topup, setTopup] = useState(0)
  const dispatch = useDispatch()

  const { isError, isSuccess } = useSelector((state) => state.account)
  //clean up before render test
  useEffect(() => {
    dispatch(resetAccountProcess())
  }, [dispatch])
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
    <div>
      <div className={styled.title}>
        <h1>Deposit</h1>
      </div>
      <div className={styled.container}>
        <form onSubmit={charge} className={styled.formContainer}>
          <h4>Amount</h4>
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
            <button type='submit' className={styled.btn}>
              Deposit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default ChargeMoney
