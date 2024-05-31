import React, { useState } from "react";
import UploadSection from "./UploadSection";
import FormSection from "./FormSection";

const ConsultWindow = () => {
  const [useFileUpload, setUseFileUpload] = useState(false);

  const toggleUseFileUpload = () => {
    setUseFileUpload((useFileUpload) => !useFileUpload);
  };

  return (
    <container className="w-full max-w-xs">
      {useFileUpload ? (
        <>
          <UploadSection />
          <div className="grid place-items-end">
            <button
              className="text-sm text-blue-700"
              onClick={toggleUseFileUpload}
            >
              Use a form instead?
            </button>
          </div>
        </>
      ) : (
        <>
          <FormSection />
          <div className="grid place-items-end">
            <button
              className="text-sm text-blue-700"
              onClick={toggleUseFileUpload}
            >
              Use a screenshot instead?
            </button>
          </div>
        </>
      )}
    </container>
  );
};

export default ConsultWindow;
