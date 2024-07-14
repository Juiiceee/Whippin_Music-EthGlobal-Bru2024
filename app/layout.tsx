import "./globals.css";
import { Figtree } from "next/font/google";
import Sidebar from "../components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from "@/components/Player";
import { Web3Modal } from "@/providers/web3Provider";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Whippin Music App",
};

export const revalidate = 0;

interface LayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: LayoutProps) {
  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className={figtree.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider>
              <Web3Modal>
                <Sidebar songs={userSongs}>{children}</Sidebar>
              </Web3Modal>
              <Player />
            </ModalProvider>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
