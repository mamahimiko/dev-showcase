"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "@/actions/login-action";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/actions/schemas";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "@/app/components/ErrorMessage";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const { mutate, error, isPending } = useMutation({
    mutationFn: LogIn,
  });
  console.log(error);

  return (
    <div className="form-wrapper">
      <form
        onSubmit={handleSubmit((values) => mutate(values))}
        className="form"
      >
        <h2 className="formTitle">LOG IN</h2>
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          placeholder="Email address ..."
          {...register("email")}
          className="input"
        ></input>
        {errors.email && <ErrorMessage error={errors.email.message!} />}
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          placeholder="Password ..."
          {...register("password")}
          className="input"
        ></input>
        {errors.password && <ErrorMessage error={errors.password.message!} />}
        <button className="button">
          {" "}
          {isPending ? "Logging in" : "Log In!"}
        </button>
        {error && <ErrorMessage error={error.message} />}
      </form>
    </div>
  );
};

export default LoginForm;
