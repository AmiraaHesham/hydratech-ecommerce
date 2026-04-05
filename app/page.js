"use client"
import { useRouter } from "next/navigation";
// import Header from "./user/components/Header";
// import Homepage from "./user/pages/home/page";
// import Searchpage from "./user/pages/search/page";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;
  useEffect(() => {
    // غيّر '/ar' إلى الرابط اللي عايزه
    console.log(role);
    if (
      role === "user" || role === ""

    ) {
      router.replace('/user/home'); // استخدم replace عشان ما يبقاش في التاريخ
    } else {
      router.replace('/admin/pages/Dashboard');
    }
  }, []);

  return null;

}
