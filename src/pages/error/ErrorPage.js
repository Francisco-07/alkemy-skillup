// Libraries
import { Link } from 'react-router-dom'

// Styles
import styled from './errorPage.module.css'

function ErrorPage() {
  return (
    <>
      <section className={styled.errorPage}>
        <div className={styled.container}>
          <div className={styled.textContainer}>
            <h1>Ooops!</h1>
            <p className={styled.message}>
              We can't seem to find the page you're looking for.
            </p>
            <span className={`${styled.bold} ${styled.mr}`}>Error 404.</span>
            <span>Not found</span>

            <Link className={`${styled.bold} ${styled.link}`} to={'/dashboard'}>
              <p className={styled.linkText}>Go back to homepage</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default ErrorPage