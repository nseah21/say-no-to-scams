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
          <UploadSection toggleUseFileUpload={toggleUseFileUpload}/>
        </>
      ) : (
        <>
          <FormSection toggleUseFileUpload={toggleUseFileUpload}/>
        </>
      )}
    </container>
  );
};

export default ConsultWindow;
