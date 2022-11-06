// Components
import Register from '../../components/register/Register'
import Welcome from '../../components/welcome/Welcome'

// Styles
import styled from './registerPage.module.css'

const RegisterPage = () => {
  return (
    <section className={styled.container}>
      <div className={styled.wrapper}>
        <div>
          <Welcome />
        </div>
        <div>
          <Register />
        </div>
      </div>
    </section>
  )
}
export default RegisterPage
