import { useState } from "react"
import useUser from "../../api/useUser"
import { errorToast, successToast } from "../../lib/toast"
import { useDispatch } from "react-redux"
import { setUser } from "../../store/reducers/userSlice"
import FormField from "../../components/Input/FormField/FormField"
import styles from "./Register.module.scss"
import { Link } from "react-router-dom"

const SubmitButton = ({ label, onClick }) => {
  return (
    <div className={styles.sub} onClick={onClick}>{label}</div>
  )
}

const Register = () => {
  const { register, userLoading } = useUser()
  const dispatch = useDispatch()

  const [formField, setFormField] = useState({
    email: "",
    password: "",
    username: ""
  })

  const handleSubmit = () => {
    if (!userLoading && formField.email != "" && formField.password != "") {
      register(formField, (res, err) => {
        if (err) {
          errorToast(
            "Error logging in",
          )
          return
        }
        console.log(res)
        location.href = "/auth/login"
      })
      setFormField({
        email: "",
        password: "",
        username: ""
      })
    }
  }
  return (
    <div className={styles.main_container}>
      <div className={styles.form_container}>
        <FormField label={"Username"} placeholder={"Enter username here..."} value={formField.username} onChange={(e) => setFormField({
          ...formField,
          username: e.target.value,
        })} type={"text"} />
        <FormField label={"Email"} placeholder={"Enter email here..."} value={formField.email} onChange={(e) => setFormField({
          ...formField,
          email: e.target.value,
        })} type={"email"} />
        <FormField label={"Password"} placeholder={"Enter password here..."} value={formField.password} onChange={(e) => setFormField({
          ...formField,
          password: e.target.value,
        })} type={"password"} />
        <SubmitButton label={"Register now!"} onClick={handleSubmit} />
        <span><p>Already have an account?</p><Link to="/auth/login">Login</Link></span>
      </div>
    </div>
  )
}

export default Register