import styles from "./FormField.module.scss"

const FormField = ({ label, placeholder, value, onChange, type }) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  )
}

export default FormField