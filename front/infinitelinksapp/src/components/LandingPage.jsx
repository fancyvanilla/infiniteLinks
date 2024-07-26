import { FiLink, FiShield, FiTrendingUp } from 'react-icons/fi';
import { useWallet } from '../contexts/WalletContext';

export default function LandingPage() {
  const { connectWallet } = useWallet();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">InfiniteLinks</h1>
          <button
            onClick={connectWallet}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center transition duration-300"
          >
            <FiLink className="mr-2" />
            Connect Wallet
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-center mb-8">Welcome to InfiniteLinks DeFi</h2>
        <p className="text-xl text-center mb-12">The future of decentralized finance is here. Connect your wallet to start your journey.</p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <FiShield className="text-4xl mb-4 text-blue-500" />
            <h3 className="text-xl font-bold mb-2">Secure Lending</h3>
            <p>Lend your assets with confidence, protected by smart contracts and robust security measures.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <FiTrendingUp className="text-4xl mb-4 text-green-500" />
            <h3 className="text-xl font-bold mb-2">Competitive Rates</h3>
            <p>Enjoy some of the most competitive interest rates in the DeFi space for both lending and borrowing.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <FiLink className="text-4xl mb-4 text-purple-500" />
            <h3 className="text-xl font-bold mb-2">Social Finance</h3>
            <p>Connect with friends, vouch for trusted borrowers, and build a stronger financial community.</p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 py-4 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 InfiniteLinks. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}