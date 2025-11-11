"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./login.module.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`შეყვანილი მონაცემები:\nEmail: ${form.email}\nPassword: ${form.password}`);
  };

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : ""}`}>
      <button className={styles.modeToggle} onClick={() => setIsDarkMode(!isDarkMode)}>
        {isDarkMode ? "☀️" : "🌙"}
      </button>

      <div className={styles.formBox}>
       <Link href="../">
          <Image src="/image/icon.png" alt="Music Icon" width={60} height={60} className={styles.icon} />
       </Link>
        <h2 className={styles.title}>Log  In</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Maill"
            value={form.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Log In
          </button>
        </form>

        <p className={styles.registerText}>
          You don't have an account.{" "}
          <Link href="/Register" className={styles.link}>
            Registration
          </Link>
        </p>
      </div>
    </div>
  );
}
