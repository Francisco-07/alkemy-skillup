import LogoLoginIcon from '../../assets/icons/LogoLoginIcon'
import styled from './welcome.module.css'
const Welcome = () => {
  return (
    //flex column en login y welcome
    <div className={styled.container}>
      <div>
        <div className={styled.logo}>
          <LogoLoginIcon />
        </div>
        <h1 className={styled.title}>Welcome to</h1>
        <h1 className={styled.titleBrand}>AlkyBank</h1>
      </div>
      <div className={styled.span}>
        <span>Fast. Secure. Trustworthy.</span>
      </div>
    </div>
  )
}

export default Welcome
