const Btn = ({ variant, action, text, type }) => {
  return (
    <button type={type} className={`btn btn-${variant}`} onClick={action}>
      {text}
    </button>
  )
}
export default Btn
