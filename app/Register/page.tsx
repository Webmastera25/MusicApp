"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./register.module.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("პაროლები არ ემთხვევა!");
      return;
    }

    alert(`რეგისტრაციის მონაცემები:\nსახელი: ${form.name}\nელ-ფოსტა: ${form.email}`);
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
        <h2 className={styles.title}>Registration</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
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
            placeholder="Paswword"
            value={form.password}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Comfirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Registration
          </button>
        </form>

        <p className={styles.loginText}>
          Do you have account?{" "}
          <Link href="/Login" className={styles.link}>
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
