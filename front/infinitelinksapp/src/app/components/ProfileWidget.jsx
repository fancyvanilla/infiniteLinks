import { FiUser, FiDollarSign, FiStar } from 'react-icons/fi'

export default function ProfileWidget() {
  return (
    <div className="w-full md:w-1/2 px-6 py-6">
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-xl p-6">
        <div className="flex items-center mb-4">
          <FiUser className="h-12 w-12 text-white mr-4" />
          <h4 className="text-2xl font-semibold text-white">Your Profile</h4>
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <FiDollarSign className="h-6 w-6 text-white mr-2" />
            <p className="text-xl text-white">Balance: $10,000</p>
          </div>
          <div className="flex items-center">
            <FiStar className="h-6 w-6 text-white mr-2" />
            <p className="text-xl text-white">Credit Score: 750</p>
          </div>
        </div>
        <div className="mt-4">
          <button className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition duration-300">Manage Profile</button>
        </div>
      </div>
    </div>
  )
}