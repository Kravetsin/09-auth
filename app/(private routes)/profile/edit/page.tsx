import css from "./EditProfilePage.module.css";
import { getServerMe } from "@/lib/api/serverApi";
import EditProfile from "./EditProfile";

export default async function EditProfilePage() {
  const user = await getServerMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <EditProfile user={user} />
      </div>
    </main>
  );
}
