import Link from "next/link";
import React from "react";
import DarkoButton from "./Darko/DarkoButton";
import { getSession } from "~/server/auth";
import SignoutButton from "./SignoutButton";

const Navbar = async () => {
  const user = await getSession();

  return (
    <nav className="border-text-800 bg-primary-900/40 sticky top-0 z-50 flex h-20 items-center justify-between border-b px-24 text-xl backdrop-blur-xl">
      <Link className="text-2xl font-bold" href={"/"}>
        Random.ly
      </Link>

      <ul className="flex items-center justify-between gap-8">
        <li>
          <Link href={"/about"}>
            <DarkoButton variant="ghost">About</DarkoButton>
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <Link href={`/account`}>
                <DarkoButton>Manage Keys</DarkoButton>
              </Link>
            </li>
            <li>
              <SignoutButton />
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href={"/login"}>
                <DarkoButton variant="secondary">Login</DarkoButton>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
