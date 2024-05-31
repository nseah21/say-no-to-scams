import React from "react";
import Mascot from "./Mascot";
import Link from "next/link";

const ResponseSection = () => {
  return (
    <div className="shadow flex flex-col items-center justify-center pt-5 pb-6 bg-white rounded">
      <Mascot text="Let me analyze that for you..." />
      {/* <p className="pb-2"> Here are the results: </p> */}
      <div class="relative rounded pt-2">
        <table class="shadow text-sm shadow-lg text-left text-gray-900 table-fixed max-w-3xl rounded">
          <tbody>
            <tr class="bg-gray-200 border-b border-l-black">
              <th
                scope="row"
                class="px-6 py-4 text-gray-900 whitespace font-semibold"
              >
                Description of Scam:
              </th>
              <td class="px-6 py-4 text-wrap">
                The sudden request for money due to an unexpected accident is a
                common tactic used by scammers to elicit sympathy and financial
                assistance. The sudden request for money due to an unexpected
                accident is a common tactic used by scammers to elicit sympathy
                and financial assistance. The sudden request for money due to an
                unexpected accident is a common tactic used by scammers to
                elicit sympathy and financial assistance.
              </td>
            </tr>
            <tr class="bg-gray-200 border-b border-l-black">
              <th
                scope="row"
                class="px-6 py-4 text-gray-900 whitespace font-semibold"
              >
                Likelihood of Scam:
              </th>
              <td class="px-6 py-4 text-wrap">90/100</td>
            </tr>
            <tr class="bg-gray-200 border-b border-l-black">
              <th
                scope="row"
                class="px-6 py-4 text-gray-900 whitespace font-semibold"
              >
                Category:
              </th>
              <td class="px-6 py-4 text-wrap">Phishing OTP Email Scam</td>
            </tr>
            <tr class="bg-gray-200 border-b border-l-black">
              <th
                scope="row"
                class="px-6 py-4 font-semibold text-gray-900 whitespace"
              >
                Suggestions to Combat Scam:
              </th>
              <td class="px-6 py-4 text-wrap">
                Verify the identity of the person through other means before
                sending any money. Do not rush into sending money based on
                emotional appeals without confirming the situation
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-center">
          <Link
            className="bg-gray-900 hover:bg-gray-700 text-white mt-6 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
