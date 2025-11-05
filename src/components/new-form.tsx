import { useState } from "react";
import { ZodDynamicForm } from "./form";
import { Link } from "@tanstack/react-router";
import { useManifestStore } from "./manifest-store";

export const NEWForm = () => {
  const { manifestJSON } = useManifestStore();

  const [formIsLoading, setFormIsLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const handleFormSubmit = (data: Record<string, any>) => {
    console.log("Form Data Submitted:", data);
    setFormIsLoading(true);
    setTimeout(() => {
      setFormIsLoading(false);
      setSubmittedData(data);
    }, 1500);
  };

  return (
    <div className="font-sans  min-h-screen p-8">
      <Link to="/dynamic-from/manifest">Change Manifest</Link>
      <div className="max-w-2xl mx-auto  p-8 rounded-lg shadow-md border ">
        <h1 className="text-2xl font-bold  mb-6">Dynamic User Profile</h1>
        <ZodDynamicForm
          manifest={
            manifestJSON
              ? JSON.parse(manifestJSON)
              : { formId: "default", fields: [] }
          }
          onSubmit={handleFormSubmit}
          isLoading={formIsLoading}
        />
        {submittedData && (
          <div className="mt-8 p-4  rounded-md">
            <h2 className="text-lg font-semibold">Submitted Data:</h2>
            <pre className="mt-2 text-sm  overflow-x-auto">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
