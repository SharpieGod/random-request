"use client";

import { Key, User } from "@prisma/client";
import { useState } from "react";
import { api } from "~/trpc/react";

const AccountView = ({
  user,
  defaultKeys,
}: {
  user: Omit<User, "password">;
  defaultKeys: Key[];
}) => {
  const [keys, setKeys] = useState<Key[]>(defaultKeys);

  return <div></div>;
};

export default AccountView;
