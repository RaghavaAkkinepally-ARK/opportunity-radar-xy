"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("opportunity_radar_user");
    
    if (!user) {
      router.push("/login");
    } else {
      const parsed = JSON.parse(user);
      if (!parsed.skills || parsed.skills.length === 0) {
        router.push("/onboarding");
      } else {
        router.push("/dashboard");
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
}
