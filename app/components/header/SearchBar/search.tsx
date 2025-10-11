"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./search.module.css";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className={styles.searchContainer}>
      <Image
            src="/image/loop.png"
            alt="loop"
            width={35}
            height={35}
            className={styles.loop}
          />
      <input
        type="text"
        placeholder="What Du You Want To Play"
        value={query}
        onChange={handleInputChange}
        className={styles.searchInput}
      />
    </div>
  );
}
