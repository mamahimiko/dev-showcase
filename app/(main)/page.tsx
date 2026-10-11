import { createClient } from "@/lib/supabase/server-client";
import { getHomePost } from "@/lib/supabase/queries";
import HomePosts from "../components/Homepost";
import Hero from "../components/Hero";
import HomePostWrapper from "../components/HomePostWrapper";

export const revalidate = 600;
export default async function Home() {
  return (
    <div className="bg-base-white">
      <main className="flex flex-col items-center">
        <Hero />
        <HomePostWrapper />
      </main>
    </div>
  );
}
