import React from "react";
import DarkoButton from "~/components/Darko/DarkoButton";
import Navbar from "~/components/Navbar";
import { getSession } from "~/server/auth";
import Link from "next/link";

const Home = async () => {
  return (
    <div>
      <Navbar />
      <div className="item-center flex flex-col justify-center">
        <span className="text-3xl">Start Gathering Random APIs TODAY</span>
        <Link href={`/account`}>
          <DarkoButton variant="secondary">Register</DarkoButton>
        </Link>
      </div>
    </div>
  );
};

export default Home;
