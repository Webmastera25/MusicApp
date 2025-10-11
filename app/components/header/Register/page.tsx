"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    personalId: "",
    email: "",
    password: "",
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("შეყვანილი მონაცემები:", form);
  };

  return (
    <div className={`${styles.page} ${isDarkMode ? styles.dark : styles.light}`}>
      <nav className={styles.navbar}>
        <Image src="/image/music-icon.png" alt="Icon" width={40} height={40} />
        <Link href="/" className={styles.navItem}>მთავარი</Link>
        <Link href="/header/navbar/Register" className={styles.navRegistration}>რეგისტრაცია</Link>
      </nav>

      <div className={styles.registerBox}>
        <div className={styles.registerForm}>
          <h2 className={styles.h2}>საიტზე რეგისტრაცია</h2>
          <form onSubmit={handleSubmit}>
            <input
              className={styles.input}
              type="text"
              name="firstName"
              placeholder="სახელი"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <br />
            <input
              className={styles.input}
              type="text"
              name="lastName"
              placeholder="გვარი"
              value={form.lastName}
              onChange={handleChange}
              required
            />
            <br />
            <input
              className={styles.input}
              type="text"
              name="personalId"
              placeholder="პირადი ნომერი"
              value={form.personalId}
              onChange={handleChange}
              required
            />
            <br />
            <input
              className={styles.input}
              type="email"
              name="email"
              placeholder="ელ-ფოსტა"
              value={form.email}
              onChange={handleChange}
              required
            />
            <br />
            <input
              className={styles.input}
              type="password"
              name="password"
              placeholder="პაროლი"
              value={form.password}
              onChange={handleChange}
              required
            />
            <br />
            <button type="submit" className={styles.button}>დარეგისტრირდი</button>
          </form>
        </div>
      </div>
    </div>
  );
}
