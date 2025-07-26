import { createContext, useContext, useState } from "react";
import { FormProvider, UseFormReturn, FieldValues } from "react-hook-form";

type WizardContextType<T extends FieldValues = FieldValues> = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  methods: UseFormReturn<T>;
};

const WizardContext = createContext<WizardContextType<any> | undefined>(
  undefined
);

export function WizardProvider<T extends FieldValues = FieldValues>({
  children,
  methods,
}: {
  children: React.ReactNode;
  methods: UseFormReturn<T>;
}) {
  const [step, setStep] = useState(0);

  return (
    <WizardContext.Provider value={{ step, setStep, methods }}>
      <FormProvider {...methods}>{children}</FormProvider>
    </WizardContext.Provider>
  );
}

export function useWizard<T extends FieldValues = FieldValues>() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used within WizardProvider");
  return ctx as WizardContextType<T>;
}
