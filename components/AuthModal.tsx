"use client"

import React, { useEffect } from "react"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"

import useAuthModal from "@/hooks/useAuthModal"

import Modal from "./Modal"
import { getURL } from "@/app/utils/getURL"
import { useUser } from "@/hooks/useUser"


const AuthModal: React.FC = () => {
  const { isOpen, onClose } = useAuthModal()
  const { user } = useUser()
  const supabaseClient = useSupabaseClient()  
  useEffect(() => {
    if (user) {
      onClose()
    }
  }, [user, onClose])

  return (
    <Modal isOpen={isOpen} onChange={onClose} title="Login" description="Please login to continue">

      <Auth
        supabaseClient={supabaseClient}
        providers={["google","discord","linkedin"]}
        redirectTo={getURL()}
        magicLink={true}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
        theme="dark"
      />
    </Modal>
  )
}


export default AuthModal
