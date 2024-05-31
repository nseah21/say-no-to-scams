import React, { useRef } from "react";

const FormSection = () => {
  const sourceRef = useRef("");
  const methodRef = useRef("");
  const descriptionRef = useRef("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(sourceRef.current.value);
    console.log(methodRef.current.value);
    console.log(descriptionRef.current.value);
  };

  return (
    <container className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </container>
  );
};

export default FormSection;
