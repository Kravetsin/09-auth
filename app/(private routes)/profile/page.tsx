import Link from "next/link";
import css from "./ProfilePage.module.css";
import Image from "next/image";
import { getServerMe } from "@/lib/api/serverApi";
import { SITE_NAME } from "@/config/metaData";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getServerMe();
  const title =
    SITE_NAME + " - " + (user?.username + " profile" || "Profile page");
  const description =
    "Manage your profile and account settings on " + SITE_NAME;
  return {
    title,
    description,
  };
}

export default async function ProfilePage() {
  const user = await getServerMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          {user.avatar && (
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          )}
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </main>
  );
}
