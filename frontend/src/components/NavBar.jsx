import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="bg-black flex justify-between items-center h-24 w-full mx-auto px-6 text-white ">
      <div>
        <Link href="/" className="font-bold text-2xl">ScamCentral</Link>
      </div>
      <div>
        <span className="mx-4 hover:text-gray-300">
          <Link href="/stories">Read scam stories</Link>
        </span>
      </div>
    </div>
  );
};

export default NavBar;
