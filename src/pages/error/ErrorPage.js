// Libraries
import { Link } from 'react-router-dom'

// Styles
import styled from './errorPage.module.css'

function ErrorPage() {
  return (
    <>
      <div className={styled.container}>
        <div className={styled.wrapper}>
          <h1>Ooops!</h1>
          <p>We can't seem to find the page you're looking for.</p>
          <h2>Error 404.</h2>
          <span>Not found</span>
          <Link to={'/'} className={styled.link}>
            Go back to homepage
          </Link>
        </div>
      </div>
    </>
  )
}

export default ErrorPage
