// Libraries
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Redux
import {
  createAccount,
  getMyAccount,
} from '../../features/account/accountSlice'

const Profile = () => {
  const { user } = useSelector((state) => state.auth)
  const { myAccount } = useSelector((state) => state.account)
  const dispatch = useDispatch()
  const createAcc = () => {
    dispatch(createAccount())
  }
  useEffect(() => {
    dispatch(getMyAccount())
  }, [dispatch])
  return (
    <>
      <div>{user?.first_name}</div>
      <div>{user?.last_name}</div>
      <div>money {myAccount.money}</div>
      <button onClick={createAcc}>crear cuenta</button>
    </>
  )
}
export default Profile
