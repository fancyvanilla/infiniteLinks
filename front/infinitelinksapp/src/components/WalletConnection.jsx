'use client'
import { useState, useEffect } from 'react'
import { FiLink } from 'react-icons/fi'

export default function WalletConnection({ onConnect }) {
  const [wallet, setWallet] = useState(null)

  useEffect(() => {
    // Check if Petra wallet is available
    if ('aptos' in window) {
      setWallet(window.aptos)
    } else {
      console.log('Petra wallet is not available')
    }
  }, [])

  const connectWallet = async () => {
    if (wallet) {
      try {
        const response = await wallet.connect()
        console.log(response) // The response contains the wallet address
        onConnect(response.address)
      } catch (error) {
        console.error('Failed to connect wallet:', error)
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <button
        onClick={connectWallet}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center transition duration-300"
      >
        <FiLink className="mr-2" />
        Connect Petra Wallet
      </button>
    </div>
  )
}