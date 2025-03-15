"use server";
import { cookies } from "next/headers";
import { db } from "./db";

export async function logOut() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId");

  if (!sessionId) return;

  await db.sessionToken.delete({
    where: {
      id: sessionId.value,
    },
  });

  cookieStore.set("sessionId", "");
  return;
}

export async function getSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId");

  if (!sessionId) return null;

  const session = await db.sessionToken.findFirst({
    where: {
      id: sessionId.value,
    },
  });

  if (!session) return null;

  const user = await db.user.findFirst({
    where: {
      id: session.userId,
    },
  });

  if (!user) return null;

  const { password, ...rest } = user;

  return rest;
}
