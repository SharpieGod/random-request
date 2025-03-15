import { redirect } from "next/navigation";
import { type FC } from "react";
import AccountView from "~/components/AccountView";
import Navbar from "~/components/Navbar";
import { getSession } from "~/server/auth";
import { api } from "~/trpc/server";
const AccountPage: FC = async () => {
  const user = await getSession();
  if (!user) return redirect("/");

  const keys = await api.key.getKeys();

  return (
    <div>
      <Navbar />
      <h1 className="p-12 pl-24 text-3xl">Manage Your Keys</h1>
      <AccountView user={user} defaultKeys={keys} />
    </div>
  );
};

export default AccountPage;
