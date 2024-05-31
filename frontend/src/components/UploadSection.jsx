import React, { useState } from "react";
import Image from "next/image";
import Mascot from "./Mascot";
import ResponseSection from "./ResponseSection";

const mascotText = `Suspect that you've been scammed? I'm MACS, an intelligent agent equipped with RAG capabilities. Let me evaluate your story and provide you with useful advice!`;

const UploadSection = ({ toggleUseFileUpload }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showResponse, setShowResponse] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setUploadedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    console.log(uploadedFile);

    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      const response = await fetch("http://localhost:8000/analyse", {
        method: "POST",
        body: formData,
      });
      const results = await response.json();
      console.log(results);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    setShowResponse(true);
  };

  const showFileUploadState = () => {
    if (uploadedFile) {
      return (
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Image
            className="w-8 h-8 mb-4"
            src="/icons/tick-circle-svgrepo-com.svg"
            alt=""
            width={24}
            height={24}
          />
          <p className="mb-2 text-sm text-gray-500 0">
            <span className="font-semibold">File uploaded successfully:</span>{" "}
            {uploadedFile.name}
          </p>
          <p className="mb-2 text-sm text-gray-500">
            Click or drag and drop again to re-upload
          </p>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 ">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500">
            Supported extensions: .JPEG, .PNG.
          </p>
        </div>
      );
    }
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Source"
            >
              Upload an image
            </label>
            <div className="flex items-center justify-center w-full mt-3 mb-6">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-100"
              >
                {showFileUploadState()}

                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
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
                Use a form instead?
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UploadSection;
