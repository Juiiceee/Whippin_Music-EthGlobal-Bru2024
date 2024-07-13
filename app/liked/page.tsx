import getLikedSongs from "@/actions/getLikedSongs"
import Header from "@/components/Header"
import Image from "next/image"
import LikedContent from "./components/LikedContent"

export const revalidate = 0

export default async function Liked() {
  const songs = await getLikedSongs()

  return (
    <div>
      <Header>
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative w-32 h-32 lg:w-44 lg:h-44">
              <Image className="object-cover" src="/images/WhippinLogoNoBackground.png" alt="Licence" width={131} height={131} />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm">Paids songs</p>
              <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold">Songs Licenses</h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedContent songs={songs} />
    </div>
  )
}
