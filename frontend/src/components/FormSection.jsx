import React, { useRef, useState } from "react";
import Image from "next/image";
import Mascot from "./Mascot";
import ResponseSection from "./ResponseSection";

const mascotText = `Suspect that you've been scammed? I'm MACS, an intelligent agent equipped with RAG capabilities. Tell me your story and I will provide you with useful advice!`;

const FormSection = ({ toggleUseFileUpload }) => {
  const sourceRef = useRef("");
  const methodRef = useRef("");
  const descriptionRef = useRef("");
  const [showResponse, setShowResponse] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowResponse(true);
  };

  return (
    <>
      {showResponse ? (
        <ResponseSection />
      ) : (
        <div>
          <Mascot text={mascotText} />
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-5">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="Source"
              >
                Scam Source
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter the phone number, email address, or website URL of the alleged scam"
                ref={sourceRef}
              />
            </div>

            <div className="mb-5">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="Method"
              >
                Where did you encounter the scam?
              </label>
              <select
                className="shadow border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                ref={methodRef}
              >
                <option value="">Select an option</option>
                <option value="email">Email</option>
                <option value="phone">Phone Call</option>
                <option value="sms">SMS</option>
                <option value="social_media">Social Media</option>
                <option value="website">Website</option>
                <option value="ecommerce">Ecommerce Platform</option>
                <option value="other">Others</option>
              </select>
            </div>

            <div className="mb-5">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="Source"
              >
                Description of Scam
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full min-h-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={
                  "Enter a short description here...\n\n\nExample:\n\nI received a call from a company called ‘Starhub Company’ telling me that I won $50,000 dollars.\n\nThe guy asked me to make a bank transfer for a tax payment first before I can receive the prize."
                }
                ref={descriptionRef}
              />
            </div>
            <div className="flex justify-center">
              <button
                className="bg-gray-900 w-48 hover:bg-gray-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
            <div className="grid place-items-end">
              <button
                className="text-sm text-blue-700"
                onClick={toggleUseFileUpload}
              >
                Use a screenshot instead?
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default FormSection;
