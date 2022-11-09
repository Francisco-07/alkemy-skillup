// Componetns
import Transactions from '../../components/transactions/Transactions'

// Styles
import styled from './transactionsPage.module.css'

const TransactionsPage = () => {
  return (
    <div className={styled.container}>
      <Transactions />
    </div>
  )
}
export default TransactionsPage
