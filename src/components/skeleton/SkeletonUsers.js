import styled from './skeletonUsers.module.css'

const SkeletonUsers = () => {
  const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <div className={styled.wrapper}>
      {skeletonArray.map((item, i) => {
        return (
          <div key={i} className={styled.usersContainer}>
            {item}
          </div>
        )
      })}
    </div>
  )
}
export default SkeletonUsers
