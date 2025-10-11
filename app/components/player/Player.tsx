"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

// სიმღერის ტიპი
interface PlayerProps {
  currentSong: {
    id: number;
    title: string;
    artist: string;
    audioSrc: string;
    coverSrc?: string;
    category?: string;
  };

  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;

  // <-- აქ შეუშვი null
  audioRef: React.RefObject<HTMLAudioElement | null>;
  discRef: React.RefObject<HTMLImageElement | null>;

  currentTime: number;
  duration: number;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTimeUpdate: () => void;
  onLoadedMetadata: () => void;
  onEnded: () => void;
  volume: number;
  setVolume: (volume: number) => void;
  isShuffle: boolean;
  toggleShuffle: () => void;
  isRepeat: boolean;
  toggleRepeat: () => void;
  playbackRate: number;
  changePlaybackRate: () => void;
}


export default function Player({
  currentSong,
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  audioRef,
  currentTime,
  duration,
  onSeek,
  onTimeUpdate,
  onLoadedMetadata,
  onEnded,
  volume,
  setVolume,
  isShuffle,
  toggleShuffle,
  isRepeat,
  toggleRepeat,
  playbackRate,
  changePlaybackRate,
  discRef,
}: PlayerProps) {
  // ანიმაციური ბარების რეფერენსები
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // ყოველი სიმღერის გასაშვები რაოდენობა (play count)
  const playCountRef = useRef<{ [songId: number]: number }>({});

  // დღიური ჰიტების state (სია იმ სიმღერების ID-ებით, რომლებიც 5-ჯერ ან მეტჯერ ჩაირთო)
  const [dailyHits, setDailyHits] = useState<number[]>([]);

  // როცა სიმღერა უკრავს, გავზარდოთ მისი Play Count
  useEffect(() => {
    if (isPlaying && currentSong) {
      const id = currentSong.id;
      playCountRef.current[id] = (playCountRef.current[id] || 0) + 1;

      console.log(`"${currentSong.title}" დაკრულია ${playCountRef.current[id]}-ჯერ.`);

      // თუ სიმღერა 5-ჯერ გაშვდა — დავამატოთ "დღის ჰიტებში"
      if (playCountRef.current[id] === 5) {
        setDailyHits((prev) => [...prev, id]);
        console.log(`✅ "${currentSong.title}" დაემატა დღეს ჰიტებში!`);
      }
    }
  }, [isPlaying, currentSong]);

  // AudioContext-ის და Analyser-ის შექმნა Web Audio API-სთვის და MediaElementSource (გადაკეთება სიმღერის ცვლილებებზე)
  useEffect(() => {
    if (!audioRef.current) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioCtxRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      analyserRef.current.smoothingTimeConstant = 0.6;
    }

    // recreate source when the audio element or song changes
    if (audioCtxRef.current && analyserRef.current) {
      // disconnect previous source if exists
      if (sourceRef.current) {
        try {
          sourceRef.current.disconnect();
        } catch (err) {}
        sourceRef.current = null;
      }

      try {
        sourceRef.current = audioCtxRef.current.createMediaElementSource(audioRef.current);
        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioCtxRef.current.destination);
      } catch (err) {
        // sometimes createMediaElementSource throws if called multiple times on same element
        console.warn("createMediaElementSource error:", err);
      }
    }
    // we want to re-run when the audio element or song changes; parent ensures audio element is recreated by key
  }, [audioRef, currentSong.id]);

  // Web Audio API-ის გამოყენებით ანიმაციური ბარების დახატვა
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const analyser = analyserRef.current;

    if (!canvas || !ctx || !analyser) return;

    // Canvas-ის ზომების კონფიგურაცია
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 540 * dpr;
    canvas.height = 540 * dpr;
    canvas.style.width = "540px";
    canvas.style.height = "540px";
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
    ctx.scale(dpr, dpr);

    analyser.fftSize = 512;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    let rotationAngle = 0;

    // ანიმაციური ფრეიმების დახატვა
    const renderFrame = () => {
      const shouldAnimate = isPlaying && volume > 0;

      analyser.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();

      // ცენტრში გადატანა
      ctx.translate(canvas.width / (2 * dpr), canvas.height / (2 * dpr));

      // ბარების გარშემო დატრიალება
      if (shouldAnimate) {
        rotationAngle += 0.005;
      }

      ctx.rotate(rotationAngle);

      const baseRadius = 140;
      const amplitude = 190;
      const barCount = 228;
      const angleStep = (Math.PI * 9) / barCount;

      for (let i = 0; i < barCount; i++) {
        const angle = i * angleStep;
        const index = Math.floor((i / barCount) * dataArray.length);
        const value = dataArray[index] ?? 0;

        const barLength = (value / 255) * amplitude;
        const xStart = Math.cos(angle) * baseRadius;
        const yStart = Math.sin(angle) * baseRadius;
        const xEnd = Math.cos(angle) * (baseRadius + barLength);
        const yEnd = Math.sin(angle) * (baseRadius + barLength);

        const hue = (i / barCount) * 360;
        ctx.strokeStyle = `hsl(${hue}, 100%, 60%)`;
        ctx.lineWidth = 2;

        // ხაზი
        ctx.beginPath();
        ctx.moveTo(xStart, yStart);
        ctx.lineTo(xEnd, yEnd);
        ctx.stroke();

        // წერტილი ხაზის ბოლოს
        ctx.beginPath();
        ctx.arc(xEnd, yEnd, 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;
        ctx.shadowBlur = 5;
        ctx.shadowColor = `hsl(${hue}, 100%, 60%)`;
        ctx.fill();
      }

      ctx.restore();
      animationFrameRef.current = requestAnimationFrame(renderFrame);
    };

    renderFrame();

    // cleanup — როცა კომპონენტი იშლება ან ხდება ცვლილება
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, currentSong.id, volume]);

  // დისკის ანიმაცია გაჩერდეს/გააგრძელოს პაუზის დროს
  useEffect(() => {
    if (discRef.current) {
      discRef.current.style.animationPlayState = isPlaying ? "running" : "paused";
    }
  }, [isPlaying, discRef]);
// შეამატე Player-ში
useEffect(() => {
  const el = audioRef.current;
  if (!el) {
    console.warn("audioRef.current is null in Player effect");
    return;
  }

  // თუ გვაქვს AudioContext და ის suspended არის — ვცდილობთ resume-ს (user gesture საჭიროების შემთხვევაში)
  if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
    audioCtxRef.current
      .resume()
      .then(() => {
        // resumed
      })
      .catch((e) => {
        console.warn("AudioContext resume() failed:", e);
      });
  }

  // სინქრონიზაცია volume / playbackRate
  try {
    el.volume = volume;
    el.playbackRate = playbackRate;
  } catch (e) {
    // ignore
  }


  console.log("Player effect: isPlaying=", isPlaying, "audio.src=", el.src);

  if (isPlaying) {
    el.play().catch((err) => {
      console.warn("audio.play() rejected in Player:", err);
    });
  } else {
    el.pause();
  }
}, [isPlaying, currentSong.id, volume, playbackRate, audioRef]);

  // დროის ფორმატირება წუთებად და წამებად
  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // მთლიან UI-ს დაბრუნება
  return (
    <div className={styles.playerContainer}>
      <div className={styles.playerBox} style={{ position: "relative" }}>
        {/* აქტიური სიმღერის ვიზუალი */}
        {currentSong && (
          <>
            <canvas className={styles.canvas} ref={canvasRef} width={540} height={540} />
            <img
              src={currentSong.coverSrc || "/image/DISC.jpeg"}
              alt="Disc"
              width={350}
              height={350}
              className={styles.rotatingIcon}
              ref={discRef}
            />

            <div className={styles.playerText} style={{ position: "relative", zIndex: 2 }}>
              <span>{currentSong.artist}</span>
              <h6>{currentSong.title}</h6>
            </div>

            {/* important: give audio a key so React recreates element on song change */}
            <audio
              key={currentSong.id}
              ref={audioRef}
              onTimeUpdate={onTimeUpdate}
              onLoadedMetadata={onLoadedMetadata}
              onEnded={onEnded}
              controls={false}
              style={{ display: "none" }}
            >
              <source src={currentSong.audioSrc} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </>
        )}

        {/* პროგრესბარი */}
        <div className={styles.progressContainer}>
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            step="1"
            onChange={onSeek}
            className={styles.progressBar}
            style={{
              background: duration ? `linear-gradient(to right, red ${(currentTime / duration) * 100}%, white ${(currentTime / duration) * 100}%)` : undefined,
            }}
          />
        </div>

        {/* მართვის ღილაკები */}
        <div className={styles.playersBox}>
          <button onClick={toggleRepeat} className={styles.playerButton}>
            <Image
              src="/image/playicon/replayicon.svg"
              alt="Repeat"
              width={40}
              height={40}
              style={{ filter: isRepeat ? "invert(60%)" : "none" }}
            />
          </button>

          <button onClick={onPrev} className={styles.playerButton}>
            <Image src="/image/playicon/backicon.svg" alt="Previous" width={40} height={40} />
          </button>

          <button onClick={onPlayPause} className={styles.playerButton}>
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

          <button onClick={onNext} className={styles.playerButton}>
            <Image src="/image/playicon/nexticon.svg" alt="Next" width={40} height={40} />
          </button>

          <button onClick={toggleShuffle} className={styles.playerButton}>
            <Image
              src="/image/playicon/randomicon.svg"
              alt="Shuffle"
              width={40}
              height={40}
              style={{ filter: isShuffle ? "invert(60%)" : "none" }}
            />
          </button>
        </div>

        {/* ხმის კონტროლი და სიჩქარის შეცვლა */}
        <div className={styles.volumeContainer}>
          <button onClick={() => setVolume(volume > 0 ? 0 : 1)} className={styles.playerButton}>
            <Image
              src={
                volume > 0
                  ? "/image/playicon/volumeicon.svg"
                  : "/image/playicon/muteicon.svg"
              }
              alt="Volume"
              width={40}
              height={40}
            />
          </button>

          <button onClick={changePlaybackRate} className={styles.playbackRateBtn}>
            Speed: {playbackRate}x
          </button>

          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className={styles.volumeSlider}
            style={{
              background: `linear-gradient(to right, red ${volume * 100}%, white ${volume * 100}%)`,
            }}
          />
          <span>{Math.round(volume * 100)}%</span>

          <button onClick={() => setVolume(volume > 0 ? 0 : 1)} className={styles.playerButton}>
            <Image
              src={
                volume > 0
                  ? "/image/playicon/muteicon.svg"
                  : "/image/playicon/volumeicon.svg"
              }
              alt="Volume"
              width={40}
              height={40}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
