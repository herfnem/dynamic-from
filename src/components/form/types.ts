export type FieldOption = {
  value: string | number;
  label: string;
};

export type FieldValidation = {
  type: "string" | "number" | "boolean" | "email" | "date";
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  errorMessage?: string;
};

export type ApiConfig = {
  url: string;
  valueField: string;
  labelField: string;
};

export type FieldConfig = {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio";
  placeholder?: string;
  description?: string;
  className?: string;
  validation: FieldValidation;
  defaultValue?: any;
  options?: FieldOption[];
  optionsApi?: ApiConfig;
};

export type FormManifest = {
  formId: string;
  fields: FieldConfig[];
};

export type DynamicFormProps = {
  manifest: FormManifest;
  onSubmit: (data: Record<string, any>) => void;
  isLoading?: boolean;
};

export type DynamicFieldProps = {
  fieldConfig: FieldConfig;
};
