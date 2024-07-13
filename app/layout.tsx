// layout.tsx
import "./globals.css"
import { Figtree } from "next/font/google"

import Sidebar from "../components/Sidebar"
import SupabaseProvider from "@/providers/SupabaseProvider"
import UserProvider from "@/providers/UserProvider"
import ModalProvider from "@/providers/ModalProvider"
import ToasterProvider from "@/providers/ToasterProvider"
import getSongsByUserId from "@/actions/getSongsByUserId"
import Player from "@/components/Player"
import Header from "@/components/Header"

const figtree = Figtree({ subsets: ["latin"] })

export const metadata = {
  title: "Whippin Music App",
}

export const revalidate = 0

interface LayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: LayoutProps) {
  const userSongs = await getSongsByUserId()

  return (
    <html lang="en">
      <body className={figtree.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider>
              <Sidebar songs={userSongs}>
                  {children}
              </Sidebar>
              <Player />
            </ModalProvider>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
