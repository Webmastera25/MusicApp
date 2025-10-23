'use client'

import styles from "./page.module.css";
import Header from "./components/header/Header";
import { useState, useRef, useEffect } from "react";
import songs from "./songs.json";
import Player from "./components/player/Player";
import { Content } from "./components/content/Content";
import { Footer } from "./components/footer/Footer";
import RadioPlayer from "./components/radio/RadioPlayer";

interface Song {
  id: number;
  title: string;
  artist: string;
  audioSrc: string;
  coverSrc?: string;
  category?: string;
}

export default function Home() {
  const playlist: Song[] = songs;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [activePlayer, setActivePlayer] = useState<'mp3' | 'radio'>('mp3');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const discRef = useRef<HTMLImageElement | null>(null);

  const currentSong = playlist[currentIndex];

  const togglePlayPause = () => setIsPlaying((prev) => !prev);

  const handleNext = () => {
    const nextIndex = isShuffle
      ? Math.floor(Math.random() * playlist.length)
      : (currentIndex + 1) % playlist.length;
    setCurrentIndex(nextIndex);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    const prevIndex = isShuffle
      ? Math.floor(Math.random() * playlist.length)
      : currentIndex === 0
        ? playlist.length - 1
        : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration || 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
      setCurrentTime(Number(e.target.value));
    }
  };

  const handleEnded = () => {
    if (isRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    } else {
      handleNext();
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;
    try {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.load();
    } catch (err) {}
    if (isPlaying) {
      audioRef.current.play().catch((err) => console.warn("play() failed:", err));
    } else {
      audioRef.current.pause();
    }
  }, [currentIndex, currentSong.id, isPlaying]);

  return (
    <div className={styles.page}>
      <header>
        <Header />
      </header>

      <main className={styles.main}>

        <Content />

 {/* --- რადიო და მუსიკის გადამრთველი ღილაკები --- */}
 <div className={styles.toggleButtons}>
          <button
            className={`${styles.toggleBtn} ${activePlayer === 'mp3' ? styles.active : ''}`}
            onClick={() => setActivePlayer('mp3')}
          >
            🎵 MP3 Player
          </button>

          <button
            className={`${styles.toggleBtn} ${activePlayer === 'radio' ? styles.active : ''}`}
            onClick={() => setActivePlayer('radio')}
          >
            📻 Radio
          </button>
        </div>


        {activePlayer === 'mp3' && (
          <Player
            currentSong={currentSong}
            isPlaying={isPlaying}
            onPlayPause={togglePlayPause}
            onNext={handleNext}
            onPrev={handlePrev}
            audioRef={audioRef}
            discRef={discRef}
            currentTime={currentTime}
            duration={duration}
            onSeek={handleSeek}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
            volume={volume}
            setVolume={setVolume}
            isShuffle={isShuffle}
            toggleShuffle={() => setIsShuffle((prev) => !prev)}
            isRepeat={isRepeat}
            toggleRepeat={() => setIsRepeat((prev) => !prev)}
            playbackRate={playbackRate}
            changePlaybackRate={() => {
              const rates = [1, 1.5, 2];
              const idx = rates.indexOf(playbackRate);
              setPlaybackRate(rates[(idx + 1) % rates.length]);
            }}
          />
        )}

        {activePlayer === 'radio' && <RadioPlayer />}
      </main>

      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}
