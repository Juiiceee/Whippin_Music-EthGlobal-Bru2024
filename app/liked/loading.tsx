"use client"
import { BounceLoader } from "react-spinners"

import Box from "@/components/Box"

export default function Loading() {
  return (
    <Box className="h-full flex justify-center items-center">
      <BounceLoader color="#7700ff" size={40} />
    </Box>
  )
}
