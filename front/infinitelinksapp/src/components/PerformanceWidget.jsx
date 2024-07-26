import { FiArrowUp, FiArrowDown } from 'react-icons/fi'
import { SiBitcoin, SiEthereum } from 'react-icons/si'
import { BiCoin } from 'react-icons/bi'

export default function PerformanceWidget() {
  return (
    <div className="w-full md:w-1/2 px-6 py-6">
      <div className="bg-gradient-to-br from-indigo-600 to-blue-500 rounded-lg shadow-xl p-6">
        <h4 className="text-2xl font-semibold text-white mb-4">Market Performance</h4>
        <div className="space-y-4">
          {[
            { name: 'APT', icon: BiCoin, value: 25.50, change: 5.2 },
            { name: 'BTC', icon: SiBitcoin, value: 50000, change: 2.1 },
            { name: 'ETH', icon: SiEthereum, value: 3000, change: -1.5 },
          ].map((coin) => (
            <div key={coin.name} className="flex items-center justify-between">
              <div className="flex items-center">
                <coin.icon className="h-6 w-6 mr-2 text-white" />
                <span className="text-lg text-white">{coin.name}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xl text-white mr-2">${coin.value.toLocaleString()}</span>
                <span className={`flex items-center ${coin.change >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                  {coin.change >= 0 ? <FiArrowUp className="h-5 w-5" /> : <FiArrowDown className="h-5 w-5" />}
                  {Math.abs(coin.change)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}