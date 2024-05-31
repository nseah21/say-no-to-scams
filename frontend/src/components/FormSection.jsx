import React, { useRef, useState } from "react";
import Image from "next/image";
import Mascot from "./Mascot";

const mascotText = `Suspect that you've been scammed? I'm MACS, an intelligent agent equipped with RAG capabilities. Let me evaluate your story and provide you with useful advice!`;

const FormSection = ({ toggleUseFileUpload }) => {
  const sourceRef = useRef("");
  const methodRef = useRef("");
  const descriptionRef = useRef("");
  const [showResponse, setShowResponse] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(sourceRef.current.value);
    console.log(methodRef.current.value);
    console.log(descriptionRef.current.value);
  };

  return (
    <div>
      <Mascot text={mascotText} />
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
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

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="Method"
          >
            Where did you encounter the scam?
          </label>
          <select
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ref={methodRef}
          >
            <option value="">Select an option</option>
            <option value="Phishing call/SMS/email">
              Phishing call/SMS/email
            </option>
            <option value="Social media">Social media</option>
            <option value="Spoofed website">Spoofed website</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="Source"
          >
            Description of Scam
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full min-h-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your description here"
            ref={descriptionRef}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
  );
};

export default FormSection;
