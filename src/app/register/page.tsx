"use server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import Navbar from "~/components/Navbar";
import RegisterForm from "~/components/RegisterForm";
import { getSession } from "~/server/auth";
import { db } from "~/server/db";

const Register = async () => {
  const user = await getSession();

  if (user) return redirect("/account");

  async function handleRegister(state: string | undefined, FormData: FormData) {
    "use server";

    const email = FormData.get("email")?.toString().trim();
    const password = FormData.get("password")?.toString().trim();
    const firstName = FormData.get("firstName")?.toString().trim();
    const lastName = FormData.get("lastName")?.toString().trim();

    if (!email) return "Email is required";
    if (!password) return "Password is required";
    if (!firstName) return "First Name is required";
    if (!lastName) return "Last Name is required";

    const userCheck = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userCheck) return "User with this email already exists";

    const hashedPassword = await bcrypt.hash(password, 5);

    const user = await db.user.create({
      data: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: hashedPassword,
      },
    });

    const session = await db.sessionToken.create({
      data: {
        userId: user.id,
      },
    });

    const cookieStore = await cookies();
    cookieStore.set("sessionId", session.id);

    return redirect("/account");
  }

  return (
    <div>
      <Navbar />
      <RegisterForm handleRegister={handleRegister} />
    </div>
  );
};

export default Register;
