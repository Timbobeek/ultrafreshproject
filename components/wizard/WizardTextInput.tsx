import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import WizardStepImage from "./WizardStepImage";
import { WizardStepNavigation } from "./WizardStepNavigation";
import { StaticImageData } from "next/image";
import { FieldValues, FieldPath, UseFormReturn } from "react-hook-form";

type Props<
  T extends FieldValues = FieldValues,
  Name extends FieldPath<T> = FieldPath<T>
> = {
  image: StaticImageData;
  name: Name;
  methods: UseFormReturn<T>;
  label: string;
  isFirstStep?: boolean;
  isFinalStep?: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  type: "string" | "number";
};

function WizardTextInput<
  T extends FieldValues = FieldValues,
  Name extends FieldPath<T> = FieldPath<T>
>({
  image,
  name,
  methods,
  label,
  isFinalStep,
  isFirstStep,
  onBack,
  onNext,
  onSubmit,
  type,
}: Props<T, Name>) {
  return (
    <FormField
      name={name}
      control={methods.control}
      render={({ field }) => (
        <FormItem className="">
          <WizardStepImage image={image} />
          <WizardStepNavigation
            label={label}
            isFirstStep={isFirstStep}
            isFinalStep={isFinalStep}
            onBack={onBack}
            onNext={onNext}
            onSubmit={onSubmit}
          />
          <FormControl>
            <Input
              className="placeholder-green-600 no-spinner"
              placeholder="Type here..."
              {...field}
              type={type === "number" ? "number" : "text"}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default WizardTextInput;
