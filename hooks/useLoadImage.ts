// useLoadImage.ts
import { Song } from "@/types";

const useLoadImage = (song: Song) => {
  if (!song) {
    return null;
  }

  // Supposons que song.imagePath contient l'URL directe de l'image
  return song.image_path;
};

export default useLoadImage;
