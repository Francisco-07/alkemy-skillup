// Libraries
// import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <>
      <div>{user?.first_name}</div>
      <div>{user?.last_name}</div>
    </>
  )
}
export default Profile
