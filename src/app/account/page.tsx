import { redirect } from "next/navigation";
import { type FC } from "react";
import AccountView from "~/components/AccountView";
import Navbar from "~/components/Navbar";
import { getSession } from "~/server/auth";
const AccountPage: FC = async () => {
  const user = await getSession();
  if (!user) return redirect("/");

  return (
    <div>
      <Navbar />
      <h1 className="p-12 pl-24 text-3xl">Your Account</h1>
      <AccountView user={user} />
    </div>
  );
};

export default AccountPage;
