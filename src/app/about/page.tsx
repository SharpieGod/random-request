import React from "react";
import Navbar from "~/components/Navbar";

function about() {
  return (
    <>
      <Navbar />
      <div className="mx-64 my-32 flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <span className="text-2xl">
            This website was made Scrapyard Vancouver 2025
          </span>
          <span>- On March 15, 2025</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-2xl">Who made this website?</span>
          <span>- This website was made by Darko, Austin, and Tariq.</span>
        </div>
      </div>
    </>
  );
}

export default about;
