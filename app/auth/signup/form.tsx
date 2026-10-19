"use client";
import { signUpSchema } from "@/actions/schemas";
import { SignUp } from "@/actions/signup-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/app/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import z from "zod";

export const userLevel = [
  {
    id: 1,
    name: "Beginner",
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
  const signinWithImageSchema = signUpSchema.omit({ image: true }).extend({
    image: z
      .unknown()
      .transform((value) => {
        return value as FileList;
      })
      .optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signinWithImageSchema),
  });

  const { mutate, error, isPending } = useMutation({
    mutationFn: SignUp,
  });

  return (
    <div className="form-wrapper">
      <form
        onSubmit={handleSubmit((values) => {
          const imageForm = new FormData();
          if (values.image) imageForm.append("image", values.image[0]);

          mutate({
            username: values.username,
            email: values.email,
            password: values.password,
            career: values.career,
            image: imageForm,
          });
        })}
        className="form"
      >
        <h2 className="formTitle">SIGN IN</h2>
        <label htmlFor="username" className="label">
          User Name
        </label>
        <input
          placeholder="Username ..."
          {...register("username")}
          className="input"
        />
        {errors.username && <ErrorMessage error={errors.username.message!} />}
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          placeholder="Email address ..."
          {...register("email")}
          className="input"
        />
        {errors.email && <ErrorMessage error={errors.email.message!} />}
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          placeholder="Password ..."
          {...register("password")}
          className="input"
        />
        {errors.password && <ErrorMessage error={errors.password.message!} />}
        <label htmlFor="level" className="label">
          Your Level
        </label>
        <select className="input" {...register("career")}>
          {userLevel.map((level) => (
            <option key={level.id} value={level.name}>
              {level.name}
            </option>
          ))}
        </select>
        <label htmlFor="Image" className="label">
          Add Your Avatar (optional)
        </label>
        <input type="file" className="input" {...register("image")} />
        {errors.image && <ErrorMessage error={errors.image.message!} />}
        <button className="button">Sign up now!</button>
        {error && <ErrorMessage error={error.message} />}
      </form>
    </div>
  );
};

export default SignUpForm;
