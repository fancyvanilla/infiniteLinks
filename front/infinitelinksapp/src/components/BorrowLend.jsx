'use client'
import { useState } from 'react'
import { FiSearch, FiDollarSign, FiArrowUpCircle, FiArrowDownCircle } from 'react-icons/fi'

const mockAssets = [
  { symbol: 'USDT', name: 'Tether', apy: 3.5, icon: '💵' },
  { symbol: 'ETH', name: 'Ethereum', apy: 2.8, icon: '💎' },
  { symbol: 'BTC', name: 'Bitcoin', apy: 2.1, icon: '🔶' },
  { symbol: 'USDC', name: 'USD Coin', apy: 3.2, icon: '💲' },
  { symbol: 'DAI', name: 'Dai', apy: 3.0, icon: '🔸' },
]

export default function Borrow() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [amount, setAmount] = useState('')

  const filteredAssets = mockAssets.filter(asset =>
    asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = () => {
    if (selectedAsset && amount) {
      console.log(`${amount} ${selectedAsset.symbol}`)
      setAmount('')
      setSelectedAsset(null)
    }
  }

  return (
    <div className="w-full md:w-1/2 px-6 py-6">
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-2xl font-semibold text-white">InfiniteLinks DeFi</h4>
          <div className="flex space-x-2">
          </div>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search assets..."
            className="w-full bg-white bg-opacity-20 text-white placeholder-gray-300 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
        </div>
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {filteredAssets.map(asset => (
            <div 
              key={asset.symbol} 
              className={`flex items-center justify-between bg-white bg-opacity-20 p-3 rounded-lg cursor-pointer transition duration-300 ${selectedAsset?.symbol === asset.symbol ? 'ring-2 ring-pink' : 'hover:bg-opacity-30'}`}
              onClick={() => setSelectedAsset(asset)}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{asset.icon}</span>
                <div>
                  <p className="text-white font-semibold">{asset.symbol}</p>
                  <p className="text-sm text-gray-200">{asset.name}</p>
                </div>
              </div>
              <p className="text-sm text-green-300">APY: {asset.apy}%</p>
            </div>
          ))}
        </div>
        {selectedAsset && (
          <div className="mt-4 flex items-center space-x-2">
            <input
              type="number"
              placeholder="Amount"
              className="flex-grow bg-white bg-opacity-20 text-white placeholder-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300 flex items-center"
              onClick={handleSubmit}
            >
              <FiDollarSign className="mr-1" />
              Borrow
            </button>
          </div>
        )}
      </div>
    </div>
  )
}