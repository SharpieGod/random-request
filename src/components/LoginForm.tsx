"use client";
import React, { useActionState } from "react";
import DarkoButton from "./Darko/DarkoButton";
import Link from "next/link";

const LoginForm = ({
  handleLogin,
}: {
  handleLogin: (
    state: string | undefined,
    FormData: FormData,
  ) => Promise<string>;
}) => {
  const [error, formAction] = useActionState(handleLogin, undefined);

  return (
    <div>
      <form
        action={formAction}
        className="m-10 mx-auto flex w-2/5 flex-col gap-8 rounded-lg border border-text-800 p-8"
      >
        <h1 className="text-start text-3xl text-background-200">Login</h1>
        <div className="flex flex-col gap-4">
          <span className="text-lg text-red-400">{error}</span>
          <div className="flex flex-col gap-1">
            <span>Email</span>
            <input
              className="rounded-lg bg-background-900 bg-opacity-50 p-3 focus:outline focus:outline-accent-500"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <span>Password</span>
            <input
              className="rounded-lg bg-background-900 bg-opacity-50 p-3 focus:outline focus:outline-accent-500"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <Link href={"/register"} className="opacity-70">
            Don&apos;t have an account?{" "}
            <span className="underline">Register</span>
          </Link>
        </div>
        <div className="flex items-center justify-end">
          <DarkoButton variant="secondary" type="submit">
            Sign In
          </DarkoButton>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
