import React, { useState } from "react";
import Image from "next/image";
import Mascot from "./Mascot";
import ResponseSection from "./ResponseSection";

const mascotText = `Suspect that you've been scammed? I'm MACS, an intelligent agent equipped with RAG capabilities. Tell me your story and I will provide you with useful advice!`;

const UploadSection = ({ toggleUseFileUpload }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showResponse, setShowResponse] = useState(false);
  const [consent, setConsent] = useState(false);

  const [description, setDescription] = useState("");
  const [likelihood, setLikelihood] = useState("");
  const [type, setType] = useState("");
  const [suggestions, setSuggestions] = useState("");

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
    formData.append("consent", consent);
    formData.append("file", uploadedFile);

    try {
      const response = await fetch("http://localhost:8000/analyse-image", {
        method: "POST",
        body: formData,
      });
      const results = await response.json();

      setDescription(results.message.Description);
      setLikelihood(
        results.message.Likelihood_of_Scam +
          " (" +
          results.message.Score +
          "/100)"
      );
      setSuggestions(
        results.message.Explanation +
          " " +
          results.message["Suggestions to combat against scams"]
      );
      setType(results.message.Type_of_Scam);
      setLoading(false);
      console.log(results);
    } catch (error) {
      console.error(error);
    }
    setShowResponse(true);
  };

  const showFileUploadState = () => {
    if (uploadedFile) {
      return (
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Image
            className="w-8 h-8 mb-5"
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
      {loading ? (
        <div
          className="flex justify-center items-center min-h-screen"
          role="status"
        >
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) : (
        <div>
          {showResponse ? (
            <ResponseSection
              description={description}
              likelihood={likelihood}
              type={type}
              suggestions={suggestions}
            />
          ) : (
            <div>
              <Mascot text={mascotText} />
              <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4"
                onSubmit={handleSubmit}
              >
                <label
                  className="block text-gray-700 text-md font-bold mb-2"
                  htmlFor="Source"
                >
                  Upload an image
                </label>
                <div className="flex items-center justify-center w-full mt-3 mb-4">
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
                <div className="flex justify-center items-center mb-4">
                  <input
                    checked={consent}
                    onChange={() => setConsent(!consent)}
                    className="w-4 h-4 border-gray-300"
                    type="checkbox"
                    id="consent"
                    name="consent"
                  />
                  <label for="consent" className="text-sm text-gray-500 px-2">
                    Would you like to share your story with others to help raise
                    scam awareness?
                  </label>
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
                    Use a form instead?
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UploadSection;
