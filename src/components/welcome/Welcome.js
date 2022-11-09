// Icon
import LogoLoginIcon from '../../assets/icons/LogoLoginIcon'

// Styles
import styled from './welcome.module.css'

const Welcome = () => {
  return (
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
