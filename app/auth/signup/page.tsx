import Link from "next/link";
import SignUpForm from "./form";

const SignUpPage = () => {
  return (
    <div>
      <h2 className="text-center">Sign up!</h2>
      <SignUpForm />
      <Link href="/auth/login">You already have an account? Log in here.</Link>
    </div>
  );
};

export default SignUpPage;
