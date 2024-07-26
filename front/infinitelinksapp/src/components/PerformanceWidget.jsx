'use client'
import React from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { BiCoin } from 'react-icons/bi';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CURRENT_PRICE = 8.50;
const PRICE_CHANGE = 0.75;

export default function AptosPerformanceWidget() {
  // Generate static data for the last week
  const generateStaticData = () => {
    const data = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      data.push({
        time: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        value: CURRENT_PRICE - (Math.random() - 0.5) * 2,
      });
    }
    return data;
  };

  const aptData = generateStaticData();

  return (
    <div className="w-full md:w-1/2 px-6 py-6">
      <div className="bg-gradient-to-br from-indigo-600 to-blue-500 rounded-lg shadow-xl p-6">
        <h4 className="text-2xl font-semibold text-white mb-4">APT Performance</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BiCoin className="h-6 w-6 mr-2 text-white" />
              <span className="text-lg text-white">APT</span>
            </div>
            <div className="flex items-center">
              <span className="text-xl text-white mr-2">
                ${CURRENT_PRICE.toFixed(2)}
              </span>
              <span className={`flex items-center ${PRICE_CHANGE >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                {PRICE_CHANGE >= 0 ? <FiArrowUp className="h-5 w-5" /> : <FiArrowDown className="h-5 w-5" />}
                {Math.abs(PRICE_CHANGE).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
        <div className="mt-6 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={aptData}>
              <XAxis 
                dataKey="time" 
                stroke="#ffffff"
                angle={-45}
                textAnchor="end"
                height={40}
                interval={0}
              />
              <YAxis 
                domain={['auto', 'auto']} 
                stroke="#ffffff"
                tickFormatter={(value) => `$${value.toFixed(2)}`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line 
                type="monotone"
                dataKey="value" 
                stroke="#ffd700" 
                strokeWidth={2}
                dot={{ fill: '#ffd700', strokeWidth: 2 }}
                isAnimationActive={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}