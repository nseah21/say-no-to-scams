import React from "react";
import Mascot from "./Mascot";
import Link from "next/link";

const ResponseSection = ({ description, likelihood, type, suggestions }) => {
  return (
    <div className="shadow flex flex-col items-center justify-center pt-5 pb-6 bg-white rounded">
      <Mascot text="Meep moop... the results are in!" />
      <div className="relative rounded pt-2">
        <table className="text-sm shadow-lg text-left text-gray-800 table-fixed max-w-3xl rounded">
          <tbody>
            <tr className="bg-gray-200 border-b border-l-black">
              <th
                scope="row"
                className="px-6 py-4 font-bold text-gray-900 whitespace"
              >
                Description of Scam:
              </th>
              <td className="px-6 py-4 text-wrap">{description}</td>
            </tr>
            <tr className="bg-gray-200 border-b border-l-black">
              <th
                scope="row"
                className="px-6 py-4 font-bold text-gray-900 whitespace"
              >
                Likelihood of Scam:
              </th>
              <td className="px-6 py-4 text-wrap">{likelihood}</td>
            </tr>
            <tr className="bg-gray-200 border-b border-l-black">
              <th
                scope="row"
                className="px-6 py-4 font-bold text-gray-900 whitespace"
              >
                Category:
              </th>
              <td className="px-6 py-4 text-wrap">{type}</td>
            </tr>
            <tr className="bg-gray-200 border-b border-l-black">
              <th
                scope="row"
                className="px-6 py-4 font-bold text-gray-900 whitespace"
              >
                Suggestions to Combat Scam:
              </th>
              <td className="px-6 py-4 text-wrap">{suggestions}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-center">
          <Link
            className="bg-blue-500 hover:bg-blue-700 text-white mt-6 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            href="/stories"
          >
            See other scam stories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResponseSection;
