import Link from "next/link";
import LoginForm from "./form";

const LoginPage = () => {
  return (
    <div>
      <h2 className="text-center">Log In!</h2>
      <LoginForm />
      <Link href="/auth/signup">Don't have an account? Sign up here.</Link>
    </div>
  );
};

export default LoginPage;
