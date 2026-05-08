import { useState } from 'react'
import OTPForm from './OTPForm'
import api from '../services/api'

const LoginForm = () => {
  const [mobile, setMobile] = useState('')
  const [showOtp, setShowOtp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [decodedOtp, setDecodedOtp] = useState('')

  const sendOtp = async () => {
    try {
      setLoading(true)

      const response = await api.post('/otp-send', { mobile })

      console.log("login otp=======", response.data)

      const otpEncoded = response?.data?.result?.response?.otp

      const otpDecoded = otpEncoded ? atob(otpEncoded) : null

      console.log("Decoded OTP =======", otpDecoded)

      if (response?.data?.result?.success) {
        setDecodedOtp(otpDecoded)  // ✅ save to state
        setShowOtp(true)
        alert('OTP Sent Successfully')
      } else {
        alert('Failed To Send OTP')
      }

    } catch (error) {
      console.log(error)
      alert('OTP Send Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      <div className='bg-white shadow-xl rounded-xl p-8 w-full max-w-md'>
        <h1 className='text-3xl font-bold text-center text-blue-600 mb-6'>
          Mobile Login
        </h1>

        <input
          type='text'
          placeholder='Enter Mobile Number'
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className='w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none focus:ring-2 focus:ring-blue-400'
        />

        <button
          onClick={sendOtp}
          className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300'
        >
          {loading ? 'Sending...' : 'Send OTP'}
        </button>

        {showOtp && <OTPForm mobile={mobile} decodedOtp={decodedOtp} />}
      </div>
    </div>
  )
}

export default LoginForm