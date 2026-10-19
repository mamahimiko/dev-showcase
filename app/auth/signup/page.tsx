import Link from "next/link";
import SignUpForm from "./form";

const SignUpPage = () => {
  return (
    <div className="bg-base-white flex flex-1  flex-col items-center justify-center">
      <div className="flex flex-col items-center md:w-[40%]">
        <SignUpForm />
        <Link href="/auth/login" className="p-4">
          You already have an account? Log in here.
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
