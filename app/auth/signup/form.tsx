"use client";
import { signUpSchema } from "@/actions/schemas";
import { SignUp } from "@/actions/signup-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/app/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";

export const userLevel = [
  {
    id: 1,
    name: "beginner",
  },
  {
    id: 2,
    name: "Junior",
  },
  {
    id: 3,
    name: "Mid-level",
  },
  {
    id: 4,
    name: "Senior",
  },
];

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const { mutate, error, isPending } = useMutation({
    mutationFn: SignUp,
  });

  return (
    <div>
      <form
        onSubmit={handleSubmit((values) => mutate(values))}
        className="flex flex-col max-w-md m-auto border-amber-500 border rounded-sm p-4"
      >
        <label htmlFor="username"></label>
        <input
          placeholder="Username ..."
          {...register("username")}
          className="input"
        />
        {errors.username && <ErrorMessage error={errors.username.message!} />}
        <label htmlFor="email"></label>
        <input
          placeholder="Email address ..."
          {...register("email")}
          className="input"
        />
        {errors.email && <ErrorMessage error={errors.email.message!} />}
        <label htmlFor="password"></label>
        <input
          placeholder="Password ..."
          {...register("password")}
          className="input"
        />
        {errors.password && <ErrorMessage error={errors.password.message!} />}
        <label htmlFor="level"></label>
        <select className="input" {...register("career")}>
          {userLevel.map((level) => (
            <option key={level.id} value={level.name}>
              {level.name}
            </option>
          ))}
        </select>
        <button className="button">Sign up now!</button>
        {error && <ErrorMessage error={error.message} />}
      </form>
    </div>
  );
};

export default SignUpForm;
