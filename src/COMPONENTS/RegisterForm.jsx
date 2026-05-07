import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import authStore from '../store/authStore'

const RegisterForm = ({ mobile }) => {
  const navigate = useNavigate()

  const login = authStore((state) => state.login)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()

      formData.append('user_type_id', data.user_type_id)
      formData.append('name', data.name)
      formData.append('mobile', mobile)
      formData.append('email', data.email)
      formData.append('company_name', data.company_name)
      formData.append('firebase_token', data.firebase_token)
      formData.append('installation_id', data.installation_id)
      formData.append('login_via', data.login_via)
      formData.append('gst_no', data.gst_no)
      formData.append('pan_no', data.pan_no)
      formData.append('location_id', data.location_id)

      if (data.profile_image[0]) {
        formData.append('profile_image', data.profile_image[0])
      }

      const response = await api.post('/register', formData)

      console.log(response.data)

      if (response.data?.token) {
        login(response.data.user, response.data.token)

        navigate('/home')
      }

      alert('Registration Successful')
    } catch (error) {
      console.log(error)
      alert('Registration Failed')
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      <div className='bg-white shadow-xl rounded-xl w-full max-w-3xl p-8'>
        <h1 className='text-3xl font-bold text-center text-blue-600 mb-8'>
          Register User
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid grid-cols-1 md:grid-cols-2 gap-5'
        >
       
          <div>
            <label className='block mb-2 font-medium'>
              User Type ID
            </label>

            <input
              type='number'
              placeholder='Enter User Type ID'
              {...register('user_type_id', {
                required: 'User Type ID is required'
              })}
              className='w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400'
            />

            {errors.user_type_id && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.user_type_id.message}
              </p>
            )}
          </div>

          <div>
            <label className='block mb-2 font-medium'>
              Full Name
            </label>

            <input
              type='text'
              placeholder='Enter Full Name'
              {...register('name', {
                required: 'Name is required'
              })}
              className='w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400'
            />

            {errors.name && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.name.message}
              </p>
            )}
          </div>

   
          <div>
            <label className='block mb-2 font-medium'>
              Mobile Number
            </label>

            <input
              type='text'
              value={mobile}
              readOnly
              className='w-full border border-gray-300 rounded-lg p-3 bg-gray-100'
            />
          </div>

 
          <div>
            <label className='block mb-2 font-medium'>
              Email
            </label>

            <input
              type='email'
              placeholder='Enter Email'
              {...register('email', {
                required: 'Email is required'
              })}
              className='w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400'
            />

            {errors.email && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.email.message}
              </p>
            )}
          </div>

        
          <div>
            <label className='block mb-2 font-medium'>
              Company Name
            </label>

            <input
              type='text'
              placeholder='Enter Company Name'
              {...register('company_name')}
              className='w-full border border-gray-300 rounded-lg p-3'
            />
          </div>


          <div>
            <label className='block mb-2 font-medium'>
              Firebase Token
            </label>

            <input
              type='text'
              placeholder='Firebase Token'
              {...register('firebase_token')}
              className='w-full border border-gray-300 rounded-lg p-3'
            />
          </div>


          <div>
            <label className='block mb-2 font-medium'>
              Installation ID
            </label>

            <input
              type='text'
              placeholder='Installation ID'
              {...register('installation_id')}
              className='w-full border border-gray-300 rounded-lg p-3'
            />
          </div>
          <div>
            <label className='block mb-2 font-medium'>
              Login Via
            </label>

            <select
              {...register('login_via')}
              className='w-full border border-gray-300 rounded-lg p-3'
            >
              <option value='ANDROID'>ANDROID</option>
              <option value='IOS'>IOS</option>
            </select>
          </div>

 
          <div>
            <label className='block mb-2 font-medium'>
              GST Number
            </label>

            <input
              type='text'
              placeholder='Enter GST Number'
              {...register('gst_no')}
              className='w-full border border-gray-300 rounded-lg p-3'
            />
          </div>

     
          <div>
            <label className='block mb-2 font-medium'>
              PAN Number
            </label>

            <input
              type='text'
              placeholder='Enter PAN Number'
              {...register('pan_no')}
              className='w-full border border-gray-300 rounded-lg p-3'
            />
          </div>


          <div>
            <label className='block mb-2 font-medium'>
              Location ID
            </label>

            <input
              type='number'
              placeholder='Enter Location ID'
              {...register('location_id')}
              className='w-full border border-gray-300 rounded-lg p-3'
            />
          </div>

      
          <div>
            <label className='block mb-2 font-medium'>
              Profile Image
            </label>

            <input
              type='file'
              {...register('profile_image')}
              className='w-full border border-gray-300 rounded-lg p-3'
            />
          </div>

   
          <div className='md:col-span-2'>
            <button
              type='submit'
              className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300'
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm