'use client'

import Image from "next/image";
import styles from './content.module.css'
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import songs from '../../songs.json';

interface Song {
  id: number;
  artist: string;
  title: string;
  image?: string;
  cover?: string;
  audioSrc?: string;
  category?: string;
}

// მცირე დამხმარე: მონიშნავს თუ src არის remote (http/https)
const isRemote = (src?: string) => {
  return typeof src === 'string' && /^https?:\/\//i.test(src);
}

// Wrapper component — თუ remote არის, გამოვიყენებთ unoptimized prop-ს
function SafeImage({
  src,
  alt,
  width,
  height,
  style,
}: {
  src?: string;
  alt: string;
  width: number;
  height: number;
  style?: React.CSSProperties;
}) {
  if (!src) src = "/image/placeholder.png";
  if (isRemote(src)) {
    return <Image src={src} alt={alt} width={width} height={height} style={style} unoptimized />;
  }
  return <Image src={src} alt={alt} width={width} height={height} style={style} />;
}

export function Content() {
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Load playlist
  useEffect(() => {
    const stored = localStorage.getItem("userPlaylist");
    if (stored) {
      try {
        setPlaylist(JSON.parse(stored));
      } catch { setPlaylist([]); }
    }
  }, []);

  // Save playlist
  useEffect(() => {
    try {
      localStorage.setItem("userPlaylist", JSON.stringify(playlist));
    } catch {}
  }, [playlist]);

  const addToPlaylist = (song: Song) => {
    if (!playlist.find(s => s.id === song.id)) {
      setPlaylist([...playlist, song]);
      alert(`დაემატა: ${song.title}`);
    } else {
      alert(`სიმღერა უკვე დამატებულია: ${song.title}`);
    }
  };

  const weeklySongs = (songs as Song[]).filter(s => s.category === "weekly");
  const monthlySongs = (songs as Song[]).filter(s => s.category === "monthly");

  // Play/pause song
  const playSong = (song: Song) => {
    if (!song.audioSrc) return;

    if (currentSong?.id === song.id) {
      // toggle pause/play
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentSong(song);
      if (audioRef.current) {
        audioRef.current.src = song.audioSrc;
        audioRef.current.play();
      }
      setIsPlaying(true);
    }
  };

  return (
    <main className={styles.main}>
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />

      {/* Daylist */}
      <div className={styles.daylistContainer}>
        <div className={styles.daylistText}>
          <h1 className={styles.hit}>Hit of The Day</h1>
          <p className={styles.name}>Actor</p>
          <span className={styles.name}>Music Name</span>
        </div>
        <button
          className={styles.starButton}
          onClick={() =>
            addToPlaylist({
              id: 1,
              artist: "Actor",
              title: "Music Name",
              image: "/image/cards/minicard-1.jpg",
            })
          }
        >
          ⭐ Add to Playlist
        </button>
      </div>

      {/* Top Hits */}
      <div className={styles.hittContainer}>
        <div className={styles.topHits}>
          <div className={styles.topTexts}>
            <h1 className={styles.name}>Top Hits</h1>
            <Link href="/seeall" className={styles.names}>seeAll</Link>
          </div>
          <div className={styles.topCards}>
            {weeklySongs.slice(0, 4).map((song) => (
              <div key={song.id} className={styles.cards}>
                <SafeImage
                  src={song.cover ?? song.image ?? "/image/cards/card-1.jpg"}
                  alt={song.title}
                  width={200}
                  height={300}
                  style={{ borderRadius: "20px" }}
                />
    
                <h4 className={styles.name}>{song.artist}</h4>
                <span className={styles.musicName}>{song.title}</span>
            
                <button
                  className={styles.starButton}
                  onClick={() => addToPlaylist(song)}
                >
                  ⭐ Add to Playlist
                </button>

                <button
                    className={styles.playButtonCard}
                    onClick={() => playSong(song)}
                    aria-label={currentSong?.id === song.id && isPlaying ? "Pause" : "Play"}
                  >
                    {currentSong?.id === song.id && isPlaying ? (
                      /* Pause icon */
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="white"
                      >
                        <rect x="5" y="4" width="4" height="16" rx="1" />
                        <rect x="15" y="4" width="4" height="16" rx="1" />
                      </svg>
                    ) : (
                      /* Play icon */
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="white"
                      >
                        <path d="M5 3L19 12L5 21V3Z" />
                      </svg>
                    )}
                  </button>
              </div>
            ))}
          </div>
        </div>

        {/* Top Chart */}
        <div className={styles.topCharts}>
          <div className={styles.chartBox}>
            <h3 className={styles.name}>Top Chart</h3>
            <Link href="/seeall" className={styles.names}>seeAll</Link>
          </div>

          <div className={styles.minicardBox}>
            {weeklySongs.slice(0, 4).map((song, index) => (
              <div key={song.id} className={styles.miniCard}>
                <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>

                <SafeImage
                  src={song.cover ?? song.image ?? "/image/cards/minicard-1.jpg"}
                  alt={song.title}
                  width={80}
                  height={70}
                  style={{ borderRadius: "5px" }}
                />

                <p className={styles.name}>{song.artist}</p>
                <span className={styles.chartText}>{song.title}</span>
                
                <button
                  className={styles.starButton}
                  onClick={() => addToPlaylist(song)}
                >
                  ⭐
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top albums */}
      <div className={styles.topalbum}>
        <div className={styles.albumhead}>
          <h1 className={styles.name}>Top Album</h1>
        </div>
        <div className={styles.musicadd}>
          <div className={styles.topCards}>
            {monthlySongs.map((song) => (
              <div key={song.id} className={styles.cards}>
                <SafeImage
                  src={song.cover ?? song.image ?? "/image/cards/card-1.jpg"}
                  alt={song.title}
                  width={200}
                  height={300}
                  style={{ borderRadius: "20px" }}
                />
                <h4 className={styles.name}>{song.artist}</h4>
                <span className={styles.musicName}>{song.title}</span>

                <button
                    className={styles.playButtonCard}
                    onClick={() => playSong(song)}
                    aria-label={currentSong?.id === song.id && isPlaying ? "Pause" : "Play"}
                  >
                    {currentSong?.id === song.id && isPlaying ? (
                      /* Pause icon */
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="white"
                      >
                        <rect x="5" y="4" width="4" height="16" rx="1" />
                        <rect x="15" y="4" width="4" height="16" rx="1" />
                      </svg>
                    ) : (
                      /* Play icon */
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="white"
                      >
                        <path d="M5 3L19 12L5 21V3Z" />
                      </svg>
                    )}
                  </button>

                <button
                  className={styles.starButton}
                  onClick={() => addToPlaylist(song)}
                >
                  ⭐ Add to Playlist
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>



      <div className={styles.popArtist}></div>

      <div className={styles.weeklyHyts}></div>

      {/* Playlist preview */}
      <div className={styles.musicContainer}>

        
        <div className={styles.artistBox}>
          <h3>Your Playlist</h3>
          <div className={styles.playlist}>
            {playlist.slice(0, 6).map((p, i) => (
              <div key={p.id} className={styles.youPlay}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div className={styles.playlists}>
                  <SafeImage
                    src={p.image ?? p.cover ?? "/image/yourPlaylist/playlist-1.png"}
                    alt={p.title ?? ''}
                    width={183}
                    height={131}
                    style={{ borderRadius: "17px" }}
                  />
                  <h4 className={styles.name}>{p.artist}</h4>
                  <span className={styles.musicName}>{p.title}</span>

                  <button
                    className={styles.playButtonCard}
                    onClick={() => playSong(p)}
                  >
                    <Image
                      src={currentSong?.id === p.id && isPlaying ? "/image/playicon/pauseicon.svg" : "/image/playicon/playimg.svg"}
                      alt={currentSong?.id === p.id && isPlaying ? "Pause" : "Play"}
                      width={30}
                      height={30}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
