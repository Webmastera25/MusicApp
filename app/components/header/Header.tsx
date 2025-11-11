'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar/search";
import styles from "./header.module.css";

export default function Header({ onSearch }: { onSearch?: (query: string) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.navItem}>
        <div className={styles.item}>
          <Image src="/image/icon.png" alt="Music Icon" width={50} height={50} className={styles.icon} />
        </div>
        <div className={styles.item}>
          <Image src="/image/home.png" alt="home icon" width={50} height={50} />
        </div>
        </Link>

        <div className={styles.search}>
          <SearchBar onSearch={onSearch ?? (() => {})} />
        </div>

        <div className={styles.navbarLink}>
          <div className={styles.playlist}>
            <Image src="/image/playlist.svg" alt="playlist" width={35} height={35} />
            <Link href="/YourPlaylist/" className={styles.navList}>Your Playlist</Link>
          </div>

          <div className={styles.addMusic}>
            <Link href="/AddPlaylist/">
              <Image src="/image/addplaylist.svg" alt="add playlist" width={35} height={35} />
            </Link>
          </div>

          <div className={styles.user}>
            <div className={styles.userRegister}>
              <Link href="/Login" className={styles.pare}>
                <Image src="/image/person.svg" alt="person icon" width={35} height={35} />
                <span className={styles.userText}>LogIn</span>
              </Link>
            </div>
            <div className={styles.userRegister}>
              <Link href="/Register" className={styles.pare}>
                <Image src="/image/person.svg" alt="person icon" width={35} height={35} />
                <span className={styles.userText}>Register</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
