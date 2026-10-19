import { LogOut } from "@/actions/logout-action";
import { createClient } from "@/lib/supabase/server-client";
import { Plus } from "lucide-react";
import Link from "next/link";

const AccountLinkes = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <div className="flex gap-4">
      {user ? (
        <>
          <button className="bg-purple py-2 px-4 rounded-full text-white flex gap-2">
            <Plus />
            <Link href="/create/">Create Post</Link>
          </button>
          <button className="" onClick={LogOut}>
            Log Out
          </button>
        </>
      ) : (
        <>
          <button>
            <Link href="/auth/login">Log in</Link>
          </button>
          <button>
            <Link href="/auth/signup">Sign In</Link>
          </button>
        </>
      )}
    </div>
  );
};

export default AccountLinkes;
