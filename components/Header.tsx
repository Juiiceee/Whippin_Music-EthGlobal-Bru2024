"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Utilize next/navigation instead of next/router
import { twMerge } from 'tailwind-merge';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { Core } from '@walletconnect/core';
import { Web3Wallet } from '@walletconnect/web3wallet';
import { useUser } from '@/hooks/useUser'; // Adjust path as per your project structure
import { registerOrUpdateUser } from '@/utils/Auth'; // Adjust path as per your project structure

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const { user } = useUser();

  const core = new Core({
    projectId: '6ade5834c9a3026c8b07e18c5e65aa57'
  });

  const metadata = {
    name: 'Whippin-Musique',
    description: 'AppKit Example',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  };

  const initWeb3Wallet = async () => {
    const web3wallet = await Web3Wallet.init({
      core,
      metadata
    });

    core.on('session_proposal', async (proposal: { id?: any; params?: any; }) => {
      const { params } = proposal;
      const { requiredNamespaces } = params;
      
      // Accept the session proposal
      await web3wallet.approveSession({
        id: proposal.id,
        namespaces: requiredNamespaces
      });

      // Extract the address of the user
      const { accounts } = params;
      const ethAddress = accounts[0].split(':')[2];

      // Register or update the user in Supabase
      await registerOrUpdateUser(ethAddress);
    });
  };

  useEffect(() => {
    initWeb3Wallet();
  }, []);

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
        <w3m-button />
      </div>
      {children}
    </div>
  );
};

export default Header;
