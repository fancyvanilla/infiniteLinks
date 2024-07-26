'use client'
import React, { createContext, useState, useContext, useEffect } from 'react';

const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    if (window.aptos) {
      try {
        const response = await window.aptos.connect();
        setWalletAddress(response.address);
        setWalletConnected(true);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      console.log('Petra wallet is not available');
    }
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
    setWalletAddress('');
  };

  useEffect(() => {
    // Check if wallet is already connected
    if (window.aptos) {
      window.aptos.isConnected().then((connected) => {
        if (connected) {
          window.aptos.account().then((account) => {
            setWalletAddress(account.address);
            setWalletConnected(true);
          });
        }
      });
    }
  }, []);

  return (
    <WalletContext.Provider value={{ walletConnected, walletAddress, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}