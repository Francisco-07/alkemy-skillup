// Components
import Login from '../../components/login/Login'
import Welcome from '../../components/welcome/Welcome'

// Styles
import styled from './loginPage.module.css'

const LoginPage = () => {
  return (
    <div className={styled.container}>
      <div className={styled.wrapper}>
        <div>
          <Welcome />
        </div>
        <div>
          <Login />
        </div>
      </div>
    </div>
  )
}
export default LoginPage
