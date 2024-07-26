import { FiHome, FiCreditCard, FiDollarSign, FiUsers, FiBarChart2, FiX } from 'react-icons/fi'

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`fixed inset-y-0 left-0 w-64 bg-gray-800 transition duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-between p-4">
        <div className="text-2xl font-bold text-white">InfiniteLinks</div>
        <button onClick={toggleSidebar} className="lg:hidden">
          <FiX className="h-6 w-6 text-white" />
        </button>
      </div>
      <nav className="mt-5">
        <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700">
          <FiHome className="h-6 w-6 mr-3" />
          Dashboard
        </a>
        <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-300 hover:bg-gray-700">
          <FiCreditCard className="h-6 w-6 mr-3" />
          Lend
        </a>
        <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-300 hover:bg-gray-700">
          <FiDollarSign className="h-6 w-6 mr-3" />
          Borrow
        </a>
        <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-300 hover:bg-gray-700">
          <FiUsers className="h-6 w-6 mr-3" />
          Social
        </a>
        <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-300 hover:bg-gray-700">
          <FiBarChart2 className="h-6 w-6 mr-3" />
          Analytics
        </a>
      </nav>
    </div>
  )
}


