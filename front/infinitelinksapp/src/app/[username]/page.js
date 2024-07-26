'use client'
import { useState } from 'react'
import Head from 'next/head'
import Navbar from '@/app/components/Navbar'
import Sidebar from '@/app/components/Sidebar'
import ProfileWidget from '@/app/components/ProfileWidget'
import PerformanceWidget from '@/app/components/PerformanceWidget'
import ActivityWidget from '@/app/components/ActivityWidget'
import SocialWidget from '@/app/components/SocialWidget'
import Footer from '@/app/components/Footer'
import { useWallet } from '@/contexts/WalletContext'
import LandingPage from '@/app/components/LandingPage'

export default function Dashboard({params}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { walletConnected, walletAddress } = useWallet()
  const {username}=params


  if (!walletConnected) {
    return <LandingPage />
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Head>
        <title>InfiniteLinks DeFi Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-3xl font-medium text-white mb-6">Welcome back, {username}!</h3>
            <div className="flex flex-wrap -mx-6">
              <ProfileWidget />
              <PerformanceWidget />
            </div>
            <div className="flex flex-wrap -mx-6 mt-6">
              <ActivityWidget />
              <SocialWidget />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}