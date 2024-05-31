import React, { useRef, useState } from "react";
import Image from "next/image";
import Mascot from "./Mascot";
import ResponseSection from "./ResponseSection";

const mascotText = `Suspect that you've been scammed? I'm MACS, an intelligent agent equipped with RAG capabilities. Let me evaluate your story and provide you with useful advice!`;

const FormSection = ({ toggleUseFileUpload }) => {
  const sourceRef = useRef("");
  const mediumRef = useRef("");
  const descriptionRef = useRef("");
  const [showResponse, setShowResponse] = useState(false);
  const [consent, setConsent] = useState(false);

  const [description, setDescription] = useState("");
  const [likelihood, setLikelihood] = useState("");
  const [type, setType] = useState("");
  const [suggestions, setSuggestions] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    const payload = {
      source: sourceRef.current.value,
      medium: mediumRef.current.value,
      description: descriptionRef.current.value,
    };

    try {
      const response = await fetch("http://localhost:8000/analyse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
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
                    htmlFor="Medium"
                  >
                    Where did you encounter the scam?
                  </label>
                  <select
                    className="shadow border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                    ref={mediumRef}
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

                <div className="mb-2">
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
                    Use a screenshot instead?
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

export default FormSection;
