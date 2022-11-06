const User = () => {
  let query = new URLSearchParams(window.location.search)
  let userId = query.get('id')
  console.log(userId)
  return <div>User</div>
}
export default User
