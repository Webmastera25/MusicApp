// Header.tsx
'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar/search";
import styles from "./header.module.css";

export default function Header ({ onSearch }: { onSearch?: (query: string) => void })  {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    return (
      <header className={styles.header}>
          <nav className={styles.navbar}>
          <Link href="/" className={styles.navItem}>
            <Image src="/image/home.png" alt="homeicon" width={50} height={50} />
          </Link>

            <div className={styles.search}>
            <SearchBar onSearch={onSearch ?? (() => {})} />

            </div>

            <div className={styles.navbarLink}>
               <div className={styles.playlist}>
                  <Image src="/image/playlist.svg" alt="playlist" width={35} height={35} />
                  <Link href="./Playlists" className={styles.navList}>Your Playlist</Link>
               </div>
                 
                 <div className={styles.addMusic}>
                      <Link href="./addplaylist">
                            <Image src="/image/addplaylist.svg" alt="addplaylist" width={35} height={35}  />
                      </Link>
                 </div>
                  
                  <div className={styles.userRegister}> 
                      <Link href="./user">
                            <Image src="/image/person.svg" alt="personicon" width={35} height={35} />
                      </Link>
                  </div>
          </div>
    </nav>
      </header>
    );
  }
  