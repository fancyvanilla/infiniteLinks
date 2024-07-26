'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import ProfileWidget from '@/components/ProfileWidget'
import PerformanceWidget from '@/components/PerformanceWidget'
import ActivityWidget from '@/components/ActivityWidget'
import SocialWidget from '@/components/SocialWidget'
import Footer from '@/components/Footer'
import { useWallet } from '@/contexts/WalletContext'
import LandingPage from '@/components/LandingPage'
import Borrow from '@/components/BorrowLend'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { walletConnected, walletAddress } = useWallet()


  if (!walletConnected) {
    return <LandingPage />
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-3xl font-medium text-white mb-6">Welcome!</h3>
            <div className="flex flex-wrap -mx-6">
              <ProfileWidget />
              <PerformanceWidget />
            </div>
            <div className="flex flex-wrap -mx-6 mt-6">
              <Borrow/>
              <SocialWidget />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}