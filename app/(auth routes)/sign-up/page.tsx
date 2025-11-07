"use client";

import css from "./SignUpPage.module.css";
import { RegisterLoginRequest } from "@/types/user";
import { register } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isAxiosError } from "axios";
import { useAuthStore } from "@/lib/store/authStore";

const getUserData = (formData: FormData): RegisterLoginRequest => {
  return {
    email: (formData.get("email") as string) || "",
    password: (formData.get("password") as string) || "",
  };
};

export default function SignUpPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    try {
      const userData = getUserData(formData);
      const user = await register(userData);

      setUser(user);
      router.push("/profile");
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <main className={css.mainContent}>
      <form action={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign up</h1>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
}
