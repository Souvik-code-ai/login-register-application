import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import authStore from '../store/authStore'

const HomePage = () => {
  const logout = authStore((state) => state.logout)
  const user = authStore((state) => state.user)
  const navigate = useNavigate()

  const fetchSellerProfile = async () => {
    const response = await api.post(`/post-details?user_id=${user?.id}`)
    return response.data
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['sellerProfile', user?.id],
    queryFn: fetchSellerProfile,
    enabled: !!user?.id
  })

  // ✅ correct path
  const seller = data?.result?.response

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <h1 className='text-3xl font-bold text-blue-600 animate-pulse'>Loading...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <h1 className='text-2xl font-bold text-red-500'>Error Fetching Profile</h1>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-100 p-4 md:p-8'>
      <div className='max-w-6xl mx-auto'>

        {/* Header */}
        <div className='bg-white shadow-lg rounded-xl p-5 flex justify-between items-center'>
          <div>
            <h1 className='text-3xl font-bold text-blue-600'>Seller Dashboard</h1>
            <p className='text-gray-500 mt-1'>Welcome, {seller?.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className='bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg'
          >
            Logout
          </button>
        </div>

        {/* Profile Card */}
        <div className='bg-white shadow-lg rounded-xl p-6 mt-6 text-center'>
          <img
            src={
              seller?.profile_img
                ? `https://d32neyt9p9wyaf.cloudfront.net/storage/${seller.profile_img}`
                : 'https://placehold.co/150x150'
            }
            alt='profile'
            className='w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-500'
          />
          <h2 className='text-2xl font-bold mt-4'>{seller?.name}</h2>
          <p className='text-gray-500'>{seller?.email}</p>
          <p className='text-gray-500'>{seller?.mobile}</p>
          <div className='mt-4'>
            <span className='bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm'>
              {seller?.status === '1' ? 'Active Seller' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Seller Info */}
        <div className='bg-white shadow-lg rounded-xl p-6 mt-6'>
          <h2 className='text-2xl font-bold text-gray-700 mb-6'>Seller Information</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <p className='text-gray-500'>Company Name</p>
              <h3 className='font-semibold text-lg'>{seller?.company_name || 'N/A'}</h3>
            </div>
            <div>
              <p className='text-gray-500'>GST Number</p>
              <h3 className='font-semibold text-lg'>{seller?.gst_no || 'N/A'}</h3>
            </div>
            <div>
              <p className='text-gray-500'>PAN Number</p>
              <h3 className='font-semibold text-lg'>{seller?.pan_no || 'N/A'}</h3>
            </div>
            <div>
              <p className='text-gray-500'>Location ID</p>
              <h3 className='font-semibold text-lg'>{seller?.location_id || 'N/A'}</h3>
            </div>
            <div>
              <p className='text-gray-500'>Address</p>
              <h3 className='font-semibold text-lg'>{seller?.address || 'N/A'}</h3>
            </div>
            <div>
              <p className='text-gray-500'>State</p>
              <h3 className='font-semibold text-lg'>{seller?.state_name || 'N/A'}</h3>
            </div>
            <div>
              <p className='text-gray-500'>District</p>
              <h3 className='font-semibold text-lg'>{seller?.district_name || 'N/A'}</h3>
            </div>
            <div>
              <p className='text-gray-500'>Zipcode</p>
              <h3 className='font-semibold text-lg'>{seller?.zipcode || 'N/A'}</h3>
            </div>
            <div>
              <p className='text-gray-500'>Login Via</p>
              <h3 className='font-semibold text-lg'>{seller?.login_via || 'N/A'}</h3>
            </div>
            <div>
              <p className='text-gray-500'>Total Posts</p>
              <h3 className='font-semibold text-lg'>{seller?.user_post_count ?? 0}</h3>
            </div>
          </div>
        </div>

        {/* Related Data / Products */}
        <div className='bg-white shadow-lg rounded-xl p-6 mt-6'>
          <h2 className='text-2xl font-bold text-gray-700 mb-6'>Seller Products</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {seller?.related_data?.length > 0 ? (
              seller.related_data.map((product) => (
                <div
                  key={product.id}
                  className='border rounded-lg overflow-hidden hover:shadow-xl transition duration-300'
                >
                  <img
                    src={product.image || 'https://placehold.co/300x200'}
                    alt={product.name}
                    className='w-full h-48 object-cover'
                  />
                  <div className='p-4'>
                    <h3 className='text-lg font-bold'>{product.name}</h3>
                    <p className='text-gray-500 mt-2'>₹ {product.price}</p>
                    <button className='mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg'>
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-gray-500'>No Products Available</p>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default HomePage