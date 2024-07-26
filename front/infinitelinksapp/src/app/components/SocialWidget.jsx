import { FiUserPlus, FiThumbsUp } from 'react-icons/fi'

export default function SocialWidget() {
  return (
    <div className="w-full md:w-1/2 px-6 py-6">
      <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg shadow-xl p-6">
        <h4 className="text-2xl font-semibold text-white mb-4">InfiniteLinks Social</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white bg-opacity-20 p-3 rounded-lg">
            <div className="flex items-center">
              <img src="https://via.placeholder.com/40" alt="User" className="rounded-full mr-3" />
              <div>
                <p className="text-white font-semibold">Alice Johnson</p>
                <p className="text-sm text-gray-200">Requesting $500 loan</p>
              </div>
            </div>
            <button className="bg-white text-purple-600 px-3 py-1 rounded-full text-sm font-semibold hover:bg-gray-100 transition duration-300 flex items-center">
              <FiThumbsUp className="h-4 w-4 mr-1" /> Vouch
            </button>
          </div>
          <div className="flex items-center justify-between bg-white bg-opacity-20 p-3 rounded-lg">
            <div className="flex items-center">
              <img src="https://via.placeholder.com/40" alt="User" className="rounded-full mr-3" />
              <div>
                <p className="text-white font-semibold">Bob Smith</p>
                <p className="text-sm text-gray-200">New connection request</p>
              </div>
            </div>
            <button className="bg-white text-purple-600 px-3 py-1 rounded-full text-sm font-semibold hover:bg-gray-100 transition duration-300 flex items-center">
              <FiUserPlus className="h-4 w-4 mr-1" /> Connect
            </button>
          </div>
        </div>
        <div className="mt-4">
          <input type="text" placeholder="Search friends..." className="w-full bg-white bg-opacity-20 text-white placeholder-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white" />
        </div>
      </div>
    </div>
  )
}



