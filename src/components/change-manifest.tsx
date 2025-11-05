import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { JsonEditor } from "./json-editor";
import { exampleFormManifest } from "./form/manifest";
import { useManifestStore } from "./manifest-store";
import { Link } from "@tanstack/react-router";

interface ChangeManifestProps {
  className?: string;
}

export const ChangeManifest = ({ className }: ChangeManifestProps) => {
  const { manifestJSON, setManifestJSON } = useManifestStore();

  useEffect(() => {
    if (!manifestJSON) {
      setManifestJSON(JSON.stringify(exampleFormManifest, null, 2));
    }
  }, [manifestJSON, setManifestJSON]);

  return (
    <div className={cn("relative", className)}>
      <div className="bg-black top-0 sticky z-10 ">
        <Link
          to="/dynamic-from"
          className="h-8 flex items-center p-6 "
          reloadDocument
        >
          Go to Form
        </Link>
      </div>
      <JsonEditor
        value={manifestJSON}
        onChange={(value) => {
          console.log("JSON Editor Changed Value:", value);
          setManifestJSON(value);
        }}
      />
    </div>
  );
};
