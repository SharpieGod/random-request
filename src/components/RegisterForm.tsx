"use client";
import React, { useActionState } from "react";
import DarkoButton from "./Darko/DarkoButton";
import Link from "next/link";

const RegisterForm = ({
  handleRegister,
}: {
  handleRegister: (
    state: string | undefined,
    FormData: FormData,
  ) => Promise<string>;
}) => {
  const [error, formAction] = useActionState(handleRegister, undefined);

  return (
    <div>
      <form
        action={formAction}
        className="border-text-800 m-8 mx-auto flex w-2/5 flex-col gap-8 rounded-lg border p-8"
      >
        <h1 className="text-background-200 text-start text-3xl">Register</h1>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <span>First Name</span>
              <input
                className="focus:outline-accent-500 bg-background-900 rounded-lg bg-opacity-50 p-3 focus:outline"
                type="text"
                name="firstName"
                placeholder="First Name"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <span>Last Name</span>
              <input
                className="focus:outline-accent-500 bg-background-900 rounded-lg bg-opacity-50 p-3 focus:outline"
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span>Email</span>
            <input
              className="focus:outline-accent-500 bg-background-900 rounded-lg bg-opacity-50 p-3 focus:outline"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <span>Password</span>
            <input
              className="focus:outline-accent-500 bg-background-900 rounded-lg bg-opacity-50 p-3 focus:outline"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <Link href={"/login"} className="opacity-70">
            Already have an account? <span className="underline">Login</span>
          </Link>
        </div>
        <span className="text-red text-lg">{error}</span>
        <div className="flex items-center justify-end">
          <DarkoButton variant="secondary" type="submit">
            Create Account
          </DarkoButton>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
