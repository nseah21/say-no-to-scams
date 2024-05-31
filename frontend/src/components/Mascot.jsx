import React from "react";
import Image from "next/image";

const Mascot = ({ text }) => {
  return (
    <div className="flex leading-1.5 p-3 justify-center">
      <Image
        src="/icons/robot.png"
        height={96}
        width={96}
        alt="An icon of a robot mascot"
      />
      <div>
        <p className="shadow p-5 text-sm font-bold text-gray-900 border-gray-200 bg-gray-400 rounded-tr-3xl rounded-br-3xl rounded-tl-3xl">
          {text}
        </p>
      </div>
    </div>
  );
};

export default Mascot;
