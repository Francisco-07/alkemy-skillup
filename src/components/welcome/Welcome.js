// Icon
import LogoLoginIcon from '../../assets/icons/LogoLoginIcon'

// Styles
import styled from './welcome.module.css'

const Welcome = () => {
  return (
    <div className={styled.container}>
      <div>
        <LogoLoginIcon />
      </div>
      <h1>
        <div>Welcome to</div>
        <div>AlkyBank</div>
      </h1>
      <div>
        <span>Fast. Secure. Trustworthy.</span>
      </div>
    </div>
  )
}

export default Welcome
