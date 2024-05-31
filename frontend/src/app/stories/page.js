"use client";

import Layout from "@/components/Layout";
import NavBar from "@/components/NavBar";

export default function Stories() {
  return (
    <>
      <NavBar />
      <Layout>
        <div class="rounded relative overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Date
                </th>
                <th scope="col" class="px-6 py-3">
                  Category
                </th>
                <th scope="col" class="px-6 py-3">
                  Description
                </th>
                <th scope="col" class="px-6 py-3">
                  Advice
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="odd:bg-white even:bg-gray-10 border-b">
                <td class="px-6 py-4">27 May 2024</td>
                <td class="px-6 py-4">Phishing OTP Scam</td>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace"
                >
                  I received a message from this guy called Marcus, who said
                  that my bank account was frozen and he could help me resolve
                  the issue. He wanted me to wait for him to start the recovery
                  process, and then give him my OTP.
                </th>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace"
                >
                  Do not reveal your OTP to anyone, including anyone who claims
                  to be from your bank.
                </th>
              </tr>
              <tr class="odd:bg-white even:bg-gray-100 border-b">
                <td class="px-6 py-4">23 Apr 2024</td>
                <td class="px-6 py-4">Impersonation Scam</td>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace"
                >
                  Hi Sara! It's Malcolm. Sharing my new number with you. Hey!
                  Got it, thanks for sharing. What's up? I got into an accident
                  on my bicycle going to work today. Can you help me cover some
                  of my aftercare medication costs? I need 150$ right now.
                  😨😧omg, M! where are you? Yes, I can send some money in the
                  next hour.
                </th>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace"
                >
                  The sudden request for money due to an unexpected accident is
                  a common tactic used by scammers to elicit sympathy and
                  financial assistance. Verify the identity of the person
                  through other means before sending any money. Do not rush into
                  sending money based on emotional appeals without confirming
                  the situation.
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
}
