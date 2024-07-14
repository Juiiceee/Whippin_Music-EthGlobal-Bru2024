"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import { FaUserAlt } from 'react-icons/fa'
import toast from 'react-hot-toast'

import Button from './Button'
import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import usePlayer from '@/hooks/usePlayer'
import { initWeb3Auth, login, logout, getAccounts, getBalance, signMessage } from '@/app/Auth'
import { IProvider } from "@web3auth/base"

interface HeaderProps {
  children: React.ReactNode
  className?: string
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  const player = usePlayer()
  const authModal = useAuthModal()
  const router = useRouter()
  const supabaseClient = useSupabaseClient()
  const { user } = useUser()

  useEffect(() => {
    const init = async () => {
      await initWeb3Auth();
    };
    init();
  }, []);

  const handleLogout = async () => {
    await logout();
    setLoggedIn(false);
    setProvider(null);
    setAddress(null);
    setBalance(null);
    toast.success('Logged out!');
  }

  const handleLoginClick = async () => {
    try {
      const web3authProvider = await login();
      if (web3authProvider) {
        setProvider(web3authProvider);
        setLoggedIn(true);
        const accounts = await getAccounts(web3authProvider);
        setAddress(accounts[0]);
        const balance = await getBalance(web3authProvider);
        setBalance(balance);
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  }

  return (
    <div className={twMerge(`h-fit bg-gradient-to-b from-purple-800 p-6`, className)}>
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button onClick={handleLogout} className="bg-white px-6 py-2">
                Logout
              </Button>
              <Button onClick={() => router.push('/account')} className="bg-white">
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button onClick={authModal.onOpen} className="bg-transparent text-neutral-300 font-medium">
                  Sign up
                </Button>
              </div>
              <div>
                <Button onClick={handleLoginClick} className="bg-white px-6 py-2">
                  Log in
                </Button>
              </div>
              {address && <p>Connected as: {address}</p>}
              {balance && <p>Balance: {balance} ETH</p>}
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}

export default Header
