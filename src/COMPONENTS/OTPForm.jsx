import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import authStore from '../store/authStore'

const OTPForm = ({ mobile , decodedOtp}) => {
  const [otp, setOtp] = useState('')

  const navigate = useNavigate()

  const login = authStore((state) => state.login)

  const verifyOtp = async () => {
    try {
      if (otp !== decodedOtp) {
        alert('Invalid OTP')
        return
      }

      const response = await api.post('/login', { mobile })

      console.log("login response ========", response.data)

      const token = response.data?.result?.response?.token 
      const user = response.data?.result?.response?.data    

      console.log("token ====", token)
      console.log("user ====", user)

      if (token) {
        login(user, token)   // ✅ now correct
        navigate('/home')
      } else {
        navigate('/register', { state: { mobile } })
      }

    } catch (error) {
      console.log(error)
      alert('Login Failed')
    }
  }

  return (
    <div className='mt-6'>
      <input
        type='text'
        placeholder='Enter'
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className='w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none focus:ring-2 focus:ring-green-400'
      />

      
      <button
        onClick={verifyOtp}
        className='w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition duration-300'
      >
        Verify OTP
      </button>


    </div>
  )
}

export default OTPForm