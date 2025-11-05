import { useEffect, useMemo, type FC } from "react";
import { Form } from "./form-context";
import { DynamicField } from "./form-field";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { generateDefaultValues, generateZodSchema } from "./helper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FormManifest } from "./types";

interface ZodDynamicFormProps {
  manifest: FormManifest;
  onSubmit: (data: Record<string, any>) => void;
  isLoading?: boolean;
}

export const ZodDynamicForm: FC<ZodDynamicFormProps> = ({
  manifest,
  onSubmit,
  isLoading = false,
}) => {
  const zodSchema = useMemo(() => generateZodSchema(manifest), [manifest]);
  const defaultValues = useMemo(
    () => generateDefaultValues(manifest),
    [manifest]
  );

  const methods = useForm({
    resolver: zodResolver(zodSchema as any),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    methods.reset(generateDefaultValues(manifest));
  }, [manifest, methods]);

  return (
    <Form methods={methods}>
      <form
        id={manifest.formId}
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {manifest.fields.map((field) => (
          <DynamicField key={field.name} fieldConfig={field} />
        ))}
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading && <Loader2 className="-ml-1 mr-3 h-5 w-5" />}
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};
