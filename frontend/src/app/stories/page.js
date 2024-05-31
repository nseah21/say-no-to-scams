"use client";

import Layout from "@/components/Layout";
import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";

export default function Stories() {
  const [stories, setStories] = useState([]);

  const fetchData = async () => {
    const response = await fetch("http://localhost:8000/scam");
    const results = await response.json();
    setStories(results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <Layout>
        <div className="rounded relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-900">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Likelihood of Being a Scam
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Suggestions to Combat Scam
                </th>
              </tr>
            </thead>
            <tbody>
              {stories.map((story, id) => {
                const description = story.description;
                const suggestions = story.explanation + " " + story.suggestions;
                const likelihood =
                  story.likelihood_of_scam + " (" + story.score + "/100)";
                const category =
                  story.type_of_scam == "N/A"
                    ? "Not a scam"
                    : story.type_of_scam;
                return (
                  <tr className="odd:bg-white even:bg-gray-100 border-b" key={id}>
                    <td className="px-6 py-4">{category}</td>
                    <td className="px-6 py-4">{likelihood}</td>
                    <th className="px-6 py-4 font-normal text-gray-900 whitespace">
                      {description}
                    </th>
                    <th className="px-6 py-4 font-normal text-gray-900 whitespace">
                      {suggestions}
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
}
