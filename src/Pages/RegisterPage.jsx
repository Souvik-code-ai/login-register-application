import { useLocation } from 'react-router-dom'
import RegisterForm from '../components/RegisterForm'

const RegisterPage = () => {
  const location = useLocation()

  const mobile = location.state?.mobile

  return (
    <div>
      {/* <h2>Register User</h2> */}

      <RegisterForm mobile={mobile} />
    </div>
  )
}

export default RegisterPage