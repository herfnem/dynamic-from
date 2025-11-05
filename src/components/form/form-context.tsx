import { FormProvider, type UseFormReturn } from "react-hook-form";

import { createContext, useContext } from "react";

type FormContextValue = UseFormReturn<any>;
const FormContext = createContext<FormContextValue | null>(null);

export const Form = ({
  methods,
  children,
}: {
  methods: UseFormReturn<any>;
  children: React.ReactNode;
}) => (
  <FormProvider {...methods}>
    <FormContext.Provider value={methods}>{children}</FormContext.Provider>
  </FormProvider>
);

export const useFormField = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormField must be used within a <Form>");
  }
  return context;
};
