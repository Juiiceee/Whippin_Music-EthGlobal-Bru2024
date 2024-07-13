// useLoadSongUrl.ts
import { Song } from "@/types";

const useLoadSongUrl = (song: Song) => {
  if (!song) {
    return "";
  }

  // Supposons que song.song_path contient l'URL directe de la chanson
  return song.song_path;
};

export default useLoadSongUrl;
