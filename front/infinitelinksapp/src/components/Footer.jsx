import { FiHeart } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-6 flex items-center justify-center">
        <span className="text-sm">Made with</span>
        <FiHeart className="mx-1 text-red-500" />
        <span className="text-sm">by infiniteLinks Team</span>
      </div>
    </footer>
  )
}