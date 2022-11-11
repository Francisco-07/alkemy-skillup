// Components
import UsersList from '../../components/usersList/UsersList'

// Styles
import styled from './userListPage.module.css'

const UsersListPage = () => {
  return (
    <section className={styled.container}>
      <UsersList />
    </section>
  )
}
export default UsersListPage
