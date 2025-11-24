'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./playlists.module.css";
import Header from "../components/header/Header";

interface Song {
  id: number;
  artist: string;
  title: string;
  image: string;
  url: string;
}

export default function YourPlaylist() {
  const [playlist, setPlaylist] = useState<Song[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("userPlaylist");
    if (stored) {
      setPlaylist(JSON.parse(stored));
    }
  }, []);

  const removeSong = (id: number) => {
    const updated = playlist.filter((song) => song.id !== id);
    setPlaylist(updated);
    localStorage.setItem("userPlaylist", JSON.stringify(updated));
  };

  return (
    <div className={styles.page}>
          <Header/>
      <h1 className={styles.title}>🎧 Your Playlist</h1>
      {playlist.length === 0 ? (
        <p>No songs added yet.</p>
      ) : (
        <div className={styles.grid}>
          {playlist.map((song) => (
            <div key={song.id} className={styles.card}>
              <Image src={song.image} alt={song.title} width={200} height={200} style={{ borderRadius: "12px" }} />
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
              <button onClick={() => removeSong(song.id)} className={styles.removeBtn}>
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}

      
    </div>
  );
}

