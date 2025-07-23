import { Form } from "@/components/ui/form";
import { useWizard } from "./WizardContext";
import { FieldValues } from "react-hook-form";
import React from "react";
import { Path } from "react-hook-form";
import { StaticImageData } from "next/image";
import WizardRadioInput from "./WizardRadioInput";
import WizardCheckboxInput from "./WizardCheckboxInput";
import WizardTextInput from "./WizardTextInput";

type CheckboxField<T extends FieldValues> = {
  name: keyof T;
  label: string;
};

export type StepGeneratorProps<T extends FieldValues, Name extends keyof T> = {
  image: StaticImageData;
  name: Name;
  label: string;
  number: number;
  textSize: string;
  type: "string" | "number" | "radio" | "checkbox";
  options?: string[];
  checkboxFields?: CheckboxField<T>[];
  isFinalStep?: boolean;
  onSubmit?: (data: T, e?: React.BaseSyntheticEvent) => void;
  isFirstStep?: boolean;
};

export function StepGenerator<T extends FieldValues, Name extends keyof T>({
  name,
  image,
  label,
  number,
  textSize,
  type,
  options,
  checkboxFields,
  isFinalStep,
  onSubmit,
  isFirstStep,
}: StepGeneratorProps<T, Name>) {
  const { methods, setStep } = useWizard<T>();
  const isCheckboxStep = type === "checkbox";
  const fieldsToTrigger: Path<T>[] = isCheckboxStep
    ? checkboxFields?.map((cb) => cb.name as unknown as Path<T>) ?? []
    : [name as unknown as Path<T>];

  function handleGoBack() {
    return setStep(number - 2);
  }

  async function handleGoNext() {
    const valid = await methods.trigger(fieldsToTrigger);
    if (valid) setStep(number);
  }

  const handleSubmit = methods.handleSubmit((data, e) => onSubmit?.(data, e));

  const renderInput = () => {
    switch (type) {
      case "radio":
        return (
          <WizardRadioInput
            image={image}
            name={name}
            methods={methods}
            label={label}
            isFirstStep={isFirstStep}
            isFinalStep={isFinalStep}
            onBack={handleGoBack}
            onNext={handleGoNext}
            onSubmit={handleSubmit}
            textSize={textSize}
            options={options}
          />
        );
      case "checkbox":
        return (
          <WizardCheckboxInput
            image={image}
            name={name}
            methods={methods}
            label={label}
            isFirstStep={isFirstStep}
            isFinalStep={isFinalStep}
            onBack={handleGoBack}
            onNext={handleGoNext}
            onSubmit={handleSubmit}
            textSize={textSize}
            checkboxFields={checkboxFields}
            fieldsToTrigger={fieldsToTrigger}
          />
        );
      default:
        return (
          <WizardTextInput
            image={image}
            name={name}
            methods={methods}
            label={label}
            isFirstStep={isFirstStep}
            isFinalStep={isFinalStep}
            onBack={handleGoBack}
            onNext={handleGoNext}
            onSubmit={handleSubmit}
            type={type}
          />
        );
    }
  };

  return <Form {...methods}>{renderInput()}</Form>;
}
