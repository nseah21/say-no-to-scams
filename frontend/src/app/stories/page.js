"use client";

import Layout from "@/components/Layout";
import NavBar from "@/components/NavBar";

export default function Stories() {
  return (
    <>
      <NavBar />
      <Layout>
        <div class="rounded relative overflow-x-auto">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500">
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
              <tr class="bg-white border-b">
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
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
}
