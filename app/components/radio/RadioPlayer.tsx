"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./radio.module.css";

interface Radio {
  name: string;
  url: string;
  logo: string;
}

const RadioPlayer: React.FC = () => {
  const [radios, setRadios] = useState<Radio[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showAll, setShowAll] = useState<boolean>(false); // მართავს სრული/მინი სიის გადართვას

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch("/api/radios")
      .then((res) => res.json())
      .then((data) => setRadios(data))
      .catch((err) => console.error("რადიო ვერ ჩაიტვირთა:", err));
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const currentRadio = radios[currentIndex];

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => setIsMuted((prev) => !prev);

  const nextRadio = () => {
    setCurrentIndex((prev) => (prev + 1) % radios.length);
    setIsPlaying(false);
  };

  const prevRadio = () => {
    setCurrentIndex((prev) => (prev - 1 + radios.length) % radios.length);
    setIsPlaying(false);
  };

  const filteredRadios = radios.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  // მხოლოდ 3 რადიო ჩვენება, თუ showAll == false
  const radiosToShow = showAll ? filteredRadios : filteredRadios.slice(0, 3);

  return (
    <div className={styles.playerContainer}>
      <div className={styles.playerBox}>
        <h2 className={styles.title}>📻 Radio</h2>

        <input
          type="text"
          placeholder="🔍 მოძებნე არხი..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
        />

        {currentRadio && (
          <>
            <div className={styles.currentRadio}>
              <Image
                src={currentRadio.logo}
                alt={currentRadio.name}
                width={180}
                height={180}
                className={styles.radioLogo}
              />
              <h3 className={styles.radioName}>{currentRadio.name}</h3>
            </div>

            <div className={styles.playersBox}>
              <button onClick={prevRadio} className={styles.playerButton}>
                <Image
                  src="/image/playicon/backicon.svg"
                  alt="Previous"
                  width={40}
                  height={40}
                />
              </button>

              <button onClick={togglePlay} className={styles.playerButton}>
                <Image
                  src={
                    isPlaying
                      ? "/image/playicon/pauseicon.svg"
                      : "/image/playicon/playimg.svg"
                  }
                  alt={isPlaying ? "Pause" : "Play"}
                  width={50}
                  height={50}
                />
              </button>

              <button onClick={nextRadio} className={styles.playerButton}>
                <Image
                  src="/image/playicon/nexticon.svg"
                  alt="Next"
                  width={40}
                  height={40}
                />
              </button>

              <div className={styles.volumeControl}>
                <button onClick={toggleMute} className={styles.muteBtn}>
                  {isMuted ? "🔇" : "🔊"}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className={styles.volumeSlider}
                />
              </div>
            </div>

            <audio
              ref={audioRef}
              src={currentRadio.url}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              autoPlay={isPlaying}
            />
          </>
        )}

        <div className={styles.radioList}>
          {radiosToShow.map((radio, index) => (
            <div
              key={index}
              className={`${styles.radioItem} ${
                index === currentIndex ? styles.active : ""
              }`}
              onClick={() => {
                setCurrentIndex(index);
                setIsPlaying(true);
              }}
            >
              <Image
                src={radio.logo}
                alt={radio.name}
                width={50}
                height={50}
                className={styles.radioItemLogo}
              />
              <span className={styles.radioName}>{radio.name}</span>
            </div>
          ))}

          {filteredRadios.length > 3 && (
            <button
              className={styles.showAllButton}
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "აკეცვა ⬆️" : "ყველა რადიო ⬇️"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RadioPlayer;
