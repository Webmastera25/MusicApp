'use client'

import Image from "next/image";
import styles from "./page.module.css";
import Header from "./components/header/Header";
import { useState, useRef, useEffect } from "react";
import songs from "./songs.json";
import Player from "./components/player/Player";
import { Content } from "./components/content/Content";
import { Footer } from "./components/footer/Footer";

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

 
  // When currentSong or isPlaying changes -> ensure audio element loads the new src and plays if needed
  useEffect(() => {
    if (!audioRef.current) return;

    // reset time/load the new source
    try {
      // Pause first to avoid race
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      // Ensure browser re-reads the <source> element
      audioRef.current.load();
    } catch (err) {
      // ignore
    }

    if (isPlaying) {
      audioRef.current
        .play()
        .catch((err) => {
          // autoplay policies may block play(); but because play is triggered by user click it should normally succeed.
          console.warn("play() failed:", err);
        });
    } else {
      // keep paused
      audioRef.current.pause();
    }
  }, [currentIndex, currentSong.id, isPlaying]); // depend on id to ensure re-run on new song

  return (
    <div className={styles.page}>
      <header>

        <Header />
        
      </header>
      <main className={styles.main}>

        <Content />
        
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
        }}/>
      </main>
      <footer className={styles.footer}>
            <Footer />
      </footer>
    </div>
  );
}
