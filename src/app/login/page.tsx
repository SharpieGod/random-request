import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import LoginForm from "~/components/LoginForm";
import Navbar from "~/components/Navbar";
import { getSession } from "~/server/auth";
import { db } from "~/server/db";

const Login = async () => {
  const user = await getSession();

  if (user) return redirect("/account");
  async function handleLogin(state: string | undefined, FormData: FormData) {
    "use server";

    const email = FormData.get("email")?.toString().trim();
    const password = FormData.get("password")?.toString().trim();

    if (!email) return "Email is required";
    if (!password) return "Password is required";

    const userCheck = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!userCheck) return "Invalid email";

    if (!(await bcrypt.compare(password, userCheck.password)))
      return "Invalid password";

    const session = await db.sessionToken.create({
      data: {
        userId: userCheck.id,
      },
    });

    const cookieStore = await cookies();
    cookieStore.set("sessionId", session.id);
    return redirect("/account");
  }

  return (
    <div>
      <Navbar />
      <LoginForm handleLogin={handleLogin} />
    </div>
  );
};

export default Login;
