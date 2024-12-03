import { useState } from "react"
import useUser from "../../api/useUser"
import { errorToast, successToast } from "../../lib/toast"
import { useDispatch } from "react-redux"
import { setUser } from "../../store/reducers/userSlice"
import FormField from "../../components/Input/FormField/FormField"
import styles from "./Login.module.scss"
import { Link } from "react-router-dom"

const SubmitButton = ({ label, onClick }) => {
  return (
    <div className={styles.sub} onClick={onClick}>{label}</div>
  )
}

const Login = () => {
  const { login, userLoading } = useUser()
  const dispatch = useDispatch()

  const [formField, setFormField] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = () => {
    if (!userLoading && formField.email != "" && formField.password != "") {
      login(formField, (res, err) => {
        if (err) {
          errorToast(
            "Error logging in",
          )
          return
        }
        console.log(res)
        dispatch(setUser(res.data))
        successToast("Logged in successfully")
      })
      setFormField({
        email: "",
        password: "",
      })
    }
  }
  return (
    <div className={styles.main_container}>
      <div className={styles.form_container}>
        <FormField label={"Email"} placeholder={"Enter email here..."} value={formField.email} onChange={(e) => setFormField({
          ...formField,
          email: e.target.value,
        })} type={"email"} />
        <FormField label={"Password"} placeholder={"Enter password here..."} value={formField.password} onChange={(e) => setFormField({
          ...formField,
          password: e.target.value,
        })} type={"password"} />
        <SubmitButton label={"Login now!"} onClick={handleSubmit} />
        <span><p>Don't have an account?</p><Link to="/auth/register">Register</Link></span>
      </div>
    </div>
  )
}

export default Login