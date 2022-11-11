// Icon
import Logo from '../../assets/icons/Logo'

// Styles
import styled from './welcome.module.css'

const Welcome = () => {
  return (
    <div className={styled.container}>
      <div>
        <Logo fill='#58c1f5' width={120} height={120} />
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
