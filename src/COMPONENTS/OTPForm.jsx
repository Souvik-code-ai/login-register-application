import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import authStore from '../store/authStore'

const OTPForm = ({ mobile, serverOtp }) => {
  const [enteredOtp, setEnteredOtp] = useState('')

  const navigate = useNavigate()

  const login = authStore((state) => state.login)

  const verifyOtp = async () => {
    if (enteredOtp !== String(serverOtp)) {
      alert('Invalid OTP')
      return
    }

    try {
      const response = await api.post('/login', {
        mobile
      })

      if (response.data?.success) {
        login(response.data.user, response.data.token)

        navigate('/home')
      } else {
        navigate('/register', {
          state: { mobile }
        })
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
        placeholder='Enter OTP'
        value={enteredOtp}
        onChange={(e) => setEnteredOtp(e.target.value)}
        className='w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-green-400 mb-4'
      />

      <button
        onClick={verifyOtp}
        className='w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md transition duration-300'
      >
        Verify OTP
      </button>
    </div>
  )
}

export default OTPForm