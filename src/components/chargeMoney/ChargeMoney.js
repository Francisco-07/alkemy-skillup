// Libraries
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

// Components
import Title from '../title/Title'
import Btn from '../Btn/Btn'

// redux
import {
  chargeMoney,
  resetAccountStatus,
} from '../../features/account/accountSlice'

// Styles
import styled from './chargeMoney.module.css'

const ChargeMoney = () => {
  const [topup, setTopup] = useState(0)
  const dispatch = useDispatch()
  const { isError, isSuccess } = useSelector((state) => state.account)

  useEffect(() => {
    if (isError) {
      Swal.fire({
        icon: 'error',
        title: 'Deposit rejected',
        confirmButtonColor: '#58c1f5',
      })
    }
    if (isSuccess) {
      Swal.fire({
        icon: 'success',
        title: 'Deposit successful',
        confirmButtonColor: '#58c1f5',
      })
      setTopup(0)
    }
    dispatch(resetAccountStatus())
  }, [isError, dispatch, isSuccess])
  const onChange = (e) => {
    setTopup(e.target.value)
  }

  const charge = (e) => {
    e.preventDefault()
    if (topup === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Put an amount of money',
        confirmButtonColor: '#58c1f5',
      })
      return
    }
    const deposit = {
      type: 'topup',
      concept: 'Deposit',
      amount: topup,
    }
    dispatch(chargeMoney(deposit))
  }

  return (
    <div>
      <Title Size={'h1'} text={'Deposit'} />
      <div className={styled.container}>
        <form onSubmit={charge} className={styled.formContainer}>
          <h4>Amount in ARS$</h4>
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
            <Btn type={'submit'} variant={'secondary'} text='Deposit' />
          </div>
        </form>
      </div>
    </div>
  )
}
export default ChargeMoney
