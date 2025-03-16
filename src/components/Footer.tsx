import Link from "next/link";
import React from "react";

const Footer = async () => {
  return (
    <nav className="border-text-800 bg-primary-600 sticky top-0 z-50 flex h-40 w-full items-center justify-between border-b px-24 text-xl backdrop-blur-xl">
      <Link className="text-2xl font-bold" href={"/"}>
        Random.ly
      </Link>

      <ul className="flex items-center justify-between gap-8">
        <li>
          <span>© 2025 DAT. All Seats Reserved</span>
        </li>
      </ul>
    </nav>
  );
};

export default Footer;
