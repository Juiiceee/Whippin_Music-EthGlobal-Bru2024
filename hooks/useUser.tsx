"use client"

import { useEffect, useState, createContext, useContext } from "react"
import { useUser as useSupaUser, useSessionContext, User } from "@supabase/auth-helpers-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { UserDetails } from "@/types"

type UserContextType = {
  accessToken: string | null
  user: User | null
  userDetails: UserDetails | null
  isLoading: boolean
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export interface Props {
  [propName: string]: any
}

export const MyUserContextProvider = (props: Props) => {
  const supabaseClient = createClientComponentClient()
  const supaUser = useSupaUser()
  const { session, isLoading: isLoadingSession } = useSessionContext()
  const user = supaUser as User | null

  const [isLoadingData, setIsLoadingData] = useState(false)
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)

  const getUserDetails = () => supabaseClient
    .from('users')
    .select('*')
    .single()

  useEffect(() => {
    if (user && !isLoadingData && !userDetails) {
      setIsLoadingData(true)
      getUserDetails().then(({ data, error }) => {
        if (data) {
          setUserDetails(data)
        }
        setIsLoadingData(false)
      })
    } else if (!user && !isLoadingSession && !isLoadingData) {
      setUserDetails(null)
    }
  }, [user, isLoadingSession])

  const value = {
    accessToken: session?.access_token ?? null,
    user,
    userDetails,
    isLoading: isLoadingSession || isLoadingData,
  }

  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`)
  }
  return context
}
