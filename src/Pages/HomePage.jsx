import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import authStore from '../store/authStore'

const HomePage = () => {
  const logout = authStore((state) => state.logout)

  const navigate = useNavigate()


  const fetchProfile = async () => {
    const response = await api.post('/post-details?user_id=90344')

    return response.data
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile
  })


  const handleLogout = () => {
    logout()
    navigate('/')
  }


  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <h1 className='text-3xl font-bold text-blue-600 animate-pulse'>
          Loading...
        </h1>
      </div>
    )
  }

  // Error State
  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <h1 className='text-2xl font-bold text-red-500'>
          Error Fetching Profile
        </h1>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-100 p-4 md:p-8'>
      {/* Main Container */}
      <div className='max-w-6xl mx-auto'>
        
        {/* Header */}
        <div className='bg-white shadow-lg rounded-xl p-5 flex flex-col md:flex-row justify-between items-center gap-4'>
          <div>
            <h1 className='text-3xl font-bold text-blue-600'>
              Seller Dashboard
            </h1>

            <p className='text-gray-500 mt-1'>
              Welcome to your profile page
            </p>
          </div>

          <button
            onClick={handleLogout}
            className='bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition duration-300'
          >
            Logout
          </button>
        </div>


        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8'>
          

          <div className='bg-white shadow-lg rounded-xl p-6 text-center'>
            <img
              src={
                data?.profile_image ||
                'https://via.placeholder.com/150'
              }
              alt='profile'
              className='w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-500'
            />

            <h2 className='text-2xl font-bold mt-4'>
              {data?.name || 'Seller Name'}
            </h2>

            <p className='text-gray-500 mt-2'>
              {data?.email || 'seller@email.com'}
            </p>

            <p className='text-gray-500'>
              {data?.mobile || '9876543210'}
            </p>

            <div className='mt-4'>
              <span className='bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm'>
                Active Seller
              </span>
            </div>
          </div>

     
          <div className='lg:col-span-2 bg-white shadow-lg rounded-xl p-6'>
            <h2 className='text-2xl font-bold text-gray-700 mb-6'>
              Seller Information
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              
              <div>
                <p className='text-gray-500'>Company Name</p>

                <h3 className='font-semibold text-lg'>
                  {data?.company_name || 'Demo Company'}
                </h3>
              </div>

              <div>
                <p className='text-gray-500'>GST Number</p>

                <h3 className='font-semibold text-lg'>
                  {data?.gst_no || 'GST12345'}
                </h3>
              </div>

              <div>
                <p className='text-gray-500'>PAN Number</p>

                <h3 className='font-semibold text-lg'>
                  {data?.pan_no || 'ABCDE1234F'}
                </h3>
              </div>

              <div>
                <p className='text-gray-500'>Location ID</p>

                <h3 className='font-semibold text-lg'>
                  {data?.location_id || '132050'}
                </h3>
              </div>
            </div>
          </div>
        </div>

     
        <div className='bg-white shadow-lg rounded-xl p-6 mt-8'>
          <h2 className='text-2xl font-bold text-gray-700 mb-6'>
            Seller Products
          </h2>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            
            {data?.products?.length > 0 ? (
              data.products.map((product) => (
                <div
                  key={product.id}
                  className='border rounded-lg overflow-hidden hover:shadow-xl transition duration-300'
                >
                  <img
                    src={
                      product.image ||
                      'https://via.placeholder.com/300'
                    }
                    alt={product.name}
                    className='w-full h-48 object-cover'
                  />

                  <div className='p-4'>
                    <h3 className='text-lg font-bold'>
                      {product.name}
                    </h3>

                    <p className='text-gray-500 mt-2'>
                      ₹ {product.price}
                    </p>

                    <button className='mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg'>
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-gray-500'>
                No Products Available
              </p>
            )}
          </div>
        </div>


        <div className='bg-white shadow-lg rounded-xl p-6 mt-8 overflow-auto'>
          <h2 className='text-2xl font-bold text-gray-700 mb-4'>
            API Response
          </h2>

          <pre className='bg-gray-100 p-4 rounded-lg text-sm overflow-auto'>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default HomePage