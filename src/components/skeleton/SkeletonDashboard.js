import styled from './skeletonDashboard.module.css'

const SkeletonDashboard = ({ transactions }) => {
  return (
    <>
      <div>
        <div className={styled.balance}>
          <div className={styled.box}></div>
          <div className={styled.box}></div>
          <div className={styled.box}></div>
        </div>
        <div className={styled.wrapper}>
          <h2 className={styled.title}>Last transactions</h2>
          <table className={styled.tableContainer}></table>
        </div>
      </div>
    </>
  )
}
export default SkeletonDashboard
