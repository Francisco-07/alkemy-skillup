// Componetns
import Transactions from '../../components/transactions/Transactions'

// Styles
import styled from './transactionsPage.module.css'

const TransactionsPage = () => {
  return (
    <section className={styled.container}>
      <Transactions />
    </section>
  )
}
export default TransactionsPage
