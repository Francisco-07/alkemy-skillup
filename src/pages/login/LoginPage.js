// Components
import Login from '../../components/login/Login'
import Welcome from '../../components/welcome/Welcome'

// Styles
import styled from './loginPage.module.css'

const LoginPage = () => {
  return (
    <section className={styled.container}>
      <div className={styled.wrapper}>
        <div>
          <Welcome />
        </div>
        <div>
          <Login />
        </div>
      </div>
    </section>
  )
}
export default LoginPage
