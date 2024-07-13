"use client"

import AuthModal from "@/components/AuthModal"
import UploadModal from "@/components/UploadModal"
import { useEffect, useState, ReactNode } from "react"

interface ModalProviderProps {
  children: ReactNode
}

export default function ModalProvider({ children }: ModalProviderProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      {children}
      <AuthModal />
      <UploadModal />
    </>
  )
}
