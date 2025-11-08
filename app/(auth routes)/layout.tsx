"use client";
import css from "@/app/Home.module.css";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

type AuthProps = {
  children: React.ReactNode;
};
export default function AuthLayout({ children }: AuthProps) {
  const [loading, setLoading] = React.useState(true);

  const router = useRouter();
  useEffect(() => {
    router.refresh();
    setLoading(false);
  }, [router]);
  return <>{loading ? <div className={css.main}>Loading...</div> : children}</>;
}
