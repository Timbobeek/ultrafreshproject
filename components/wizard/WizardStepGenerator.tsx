import { Form } from "@/components/ui/form";
import { useWizard } from "../../context/WizardContext";
import { FieldPath, FieldValues } from "react-hook-form";
import React from "react";
import { StaticImageData } from "next/image";
import WizardRadioInput, { RadioOption } from "./WizardRadioInput";
import WizardCheckboxInput, { CheckboxField } from "./WizardCheckboxInput";
import WizardTextInput from "./WizardTextInput";

export type StepGeneratorProps<
  T extends FieldValues = FieldValues,
  Name extends FieldPath<T> = FieldPath<T>
> = {
  image: StaticImageData;
  name: Name;
  label: string;
  number: number;
  className?: string;
  type: "string" | "number" | "radio" | "checkbox";
  options?: RadioOption[];
  checkboxFields?: CheckboxField<T>[];
  isFinalStep?: boolean;
  onSubmit?: (data: T, e?: React.BaseSyntheticEvent) => void;
  isFirstStep?: boolean;
};

export function StepGenerator<
  T extends FieldValues = FieldValues,
  Name extends FieldPath<T> = FieldPath<T>
>({
  name,
  image,
  label,
  number,
  className,
  type,
  options,
  checkboxFields,
  isFinalStep,
  onSubmit,
  isFirstStep,
}: StepGeneratorProps<T, Name>) {
  const { methods, setStep } = useWizard<T>();
  const isCheckboxStep = type === "checkbox";
  const fieldsToTrigger = isCheckboxStep
    ? checkboxFields?.map((cb) => cb.name) ?? []
    : [name];

  function handleGoBack() {
    return setStep(number - 2);
  }

  async function handleGoNext() {
    const valid = await methods.trigger(fieldsToTrigger);
    if (valid) setStep(number);
  }

  const handleSubmit = methods.handleSubmit((data, e) => {
    onSubmit?.(data, e);
  });

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
            className={className}
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
            className={className}
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
