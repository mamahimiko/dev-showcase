import Link from "next/link";
import LoginForm from "./form";

const LoginPage = () => {
  return (
    <div className="bg-base-white flex flex-1  flex-col items-center justify-center">
      <div className="flex flex-col items-center md:w-[40%]">
        <LoginForm />
        <Link
          href="/auth/signup"
          className="cursor-pointer hover:text-soft-blue py-4"
        >
          Don't have an account? Sign up here.
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
