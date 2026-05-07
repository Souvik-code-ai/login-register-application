import { useState } from 'react'
import api from '../services/api'
import OTPForm from './OTPForm'

const LoginForm = () => {
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState('')
  const [showOtp, setShowOtp] = useState(false)
  const [loading, setLoading] = useState(false)

  const sendOtp = async () => {
    try {
      setLoading(true)

      const response = await api.post('/otp-send', {
        mobile
      })

      const returnedOtp = response.data?.otp || '1234'

      setOtp(returnedOtp)
      setShowOtp(true)

      alert(`Testing OTP: ${returnedOtp}`)
    } catch (error) {
      console.log(error)
      alert('OTP Send Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
        <h2 className='text-3xl font-bold text-center mb-6 text-blue-600'>
          Mobile Login
        </h2>

        <input
          type='text'
          placeholder='Enter Mobile Number'
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className='w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-400 mb-4'
        />

        <button
          onClick={sendOtp}
          className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition duration-300'
        >
          {loading ? 'Sending...' : 'Send OTP'}
        </button>

        {showOtp && <OTPForm mobile={mobile} serverOtp={otp} />}
      </div>
    </div>
  )
}

export default LoginForm