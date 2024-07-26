import { FiDollarSign, FiTrendingUp } from 'react-icons/fi'

export default function ActivityWidget() {
  return (
    <div className="w-full md:w-1/2 px-6 py-6">
      <div className="bg-gradient-to-br from-green-500 to-teal-400 rounded-lg shadow-xl p-6">
        <h4 className="text-2xl font-semibold text-white mb-4">Recent Activity</h4>
        <div className="space-y-4">
          <div className="flex items-center bg-white bg-opacity-20 p-3 rounded-lg">
            <FiDollarSign className="h-8 w-8 text-white mr-3" />
            <div>
              <p className="text-white font-semibold">Loan Repayment</p>
              <p className="text-sm text-gray-200">$200 paid to InfiniteLinks Pool</p>
            </div>
          </div>
          <div className="flex items-center bg-white bg-opacity-20 p-3 rounded-lg">
            <FiTrendingUp className="h-8 w-8 text-white mr-3" />
            <div>
              <p className="text-white font-semibold">Interest Earned</p>
              <p className="text-sm text-gray-200">$50 from your lending activities</p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <p className="text-white text-lg">Total Borrowed</p>
            <p className="text-2xl font-bold text-white">$1,000</p>
          </div>
          <div>
            <p className="text-white text-lg">Total Lent</p>
            <p className="text-2xl font-bold text-white">$5,000</p>
          </div>
        </div>
      </div>
    </div>
  )
}