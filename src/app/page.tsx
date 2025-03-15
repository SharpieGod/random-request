import React from "react";
import DarkoButton from "~/components/Darko/DarkoButton";
import Navbar from "~/components/Navbar";
import { getSession } from "~/server/auth";
import Link from "next/link";
import Image from "next/image";
import Demo from "~/components/Demo";
import Footer from "~/components/Footer";

const Home = async () => {
  return (
    <div className="w-full">
      <Navbar />
      <div className="h-9/10 mx-32 my-20 grid grid-cols-2">
        <div className="flex justify-end pb-16 pt-32">
          <div className="flex flex-col gap-4">
            <span className="w-fit text-5xl font-semibold">
              Most-Used API for Generating Random Numbers
            </span>
            <span className="text-xl">
              We help thousands of devs daily by solving trivial problems
              non-trivially. Our service is free and open-source.
            </span>
            <div className="flex flex-row">
              <Link href={`/register`}>
                <DarkoButton variant="secondary">Get Started</DarkoButton>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Demo />
        </div>
      </div>
      <div className="flex flex-col p-32 pt-0">
        <div className="mb-4 flex flex-col gap-2">
          <span className="text-3xl">★ How do I use Random.ly?</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-4">
            <span className="bg-background-800 border-background-700 flex w-2/3 items-center justify-between rounded-lg border p-2 transition-colors">
              GET https://ourlink.com/api/{"<api key>"}
            </span>

            <div className="flex flex-col gap-2">
              <span className="text-xl">Example Output:</span>
              <span className="bg-background-800 border-background-700 flex w-2/3 items-center justify-between rounded-lg border p-2 transition-colors">
                2
              </span>
            </div>
          </div>
          <br /> <br />
          <div className="flex flex-col gap-2">
            <span className="my-5 text-3xl">- How does it work?</span>
            <span className="flex text-xl">
              A key is generated, like this:{" "}
            </span>
            <span className="bg-background-800 border-background-700 flex w-2/3 items-center justify-between rounded-lg border p-2 transition-colors">
              cm8as2xta000oga350u1pyp7w
            </span>
            <span className="text-lg">with the following options</span>
            <span className="bg-background-800 border-background-700 flex w-2/3 items-center justify-between rounded-lg border p-2 transition-colors">
              Range, 0-10, Integer
            </span>
            <span className="flex text-xl">
              This key will generate a random integer within the range of 0 to
              10, like this
            </span>
            <span className="bg-background-800 border-background-700 flex w-2/3 items-center justify-between rounded-lg border p-2 transition-colors">
              8
            </span>
            <span className="flex text-xl">
              but if you change the options, such as changing integer to float,
              like
            </span>
            <span className="bg-background-800 border-background-700 flex w-2/3 items-center justify-between rounded-lg border p-2 transition-colors">
              Range, 0-10, Float
            </span>
            <span className="flex text-xl">the key will not change.</span>
            <span className="flex text-xl">So now, with the same key, </span>
            <span className="bg-background-800 border-background-700 flex w-2/3 items-center justify-between rounded-lg border p-2 transition-colors">
              4.132674292568241
            </span>
            <span className="flex text-xl">will be the output instead.</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
