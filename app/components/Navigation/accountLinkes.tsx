import { LogOut } from "@/actions/logout-action";
import { createClient } from "@/lib/supabase/server-client";
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
          <button>
            <Link href="/create/">Create Post</Link>
          </button>
          <button className="button" onClick={LogOut}>
            Log Out
          </button>
        </>
      ) : (
        <>
          <p>Hello guest!</p>

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
