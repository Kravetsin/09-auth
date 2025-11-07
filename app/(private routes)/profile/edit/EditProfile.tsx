"use client";
import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { updateProfile } from "@/lib/api/clientApi";

interface UserProps {
  user: User;
}

export default function EditProfile({ user }: UserProps) {
  const router = useRouter();
  const [username, setUserName] = useState(user.username);
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile({
        email: user.email,
        username,
      });
      router.push(`/profile`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    router.push("/profile");
  };
  return (
    <>
      {user.avatar && (
        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />
      )}

      <form onSubmit={handleSave} className={css.profileInfo}>
        <div className={css.usernameWrapper}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            className={css.input}
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <p>Email: {user.email ? user.email : "unknown"}</p>

        <div className={css.actions}>
          <button type="submit" className={css.saveButton} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className={css.cancelButton}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
