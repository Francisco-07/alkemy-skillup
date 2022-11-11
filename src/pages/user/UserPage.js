// Components
import User from '../../components/user/User'

// Styles
import styled from './userPage.module.css'

const UserPage = () => {
  return (
    <section className={styled.container}>
      <User />
    </section>
  )
}
export default UserPage
