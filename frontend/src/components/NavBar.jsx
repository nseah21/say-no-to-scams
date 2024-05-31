import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="bg-black flex justify-between items-center h-24 w-full mx-auto px-6 text-white ">
      <div>
        <Link href="/">ScamCentral</Link>
      </div>
      <div>
        <span className="mx-4 hover:text-gray-300">
          <Link href="/stories">Read scam stories</Link>
        </span>
        <span className="mx-3 hover:text-gray-300">
          <Link href="/report">Report a scam</Link>
        </span>
      </div>
    </div>
  );
};

export default NavBar;
