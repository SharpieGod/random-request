import React from "react";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import Image from "next/image";

function about() {
  return (
    <>
      <Navbar />
      <div className="mx-64 my-20 flex min-h-[80vh] flex-col gap-12">
        <div className="flex flex-col gap-2">
          <span className="text-2xl">
            This project was made for Scrapyard Vancouver 2025
          </span>
          <span>- On March 15, 2025</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-2xl">Who made this website?</span>
          <span>- This website was made by Darko, Austin, and Tariq</span>
          <br />
          <br />
          <span>This project was completed in 8 hours.</span>
        </div>
        <Image
          src="/images/computer.svg"
          alt="image"
          height={"256"}
          width={"256"}
        />
      </div>
      <Footer />
    </>
  );
}

export default about;
