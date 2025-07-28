import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import WizardStepImage from "./WizardStepImage";
import { WizardStepNavigation } from "./WizardStepNavigation";
import { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

export type RadioOption = {
  name: string;
  label: string;
};

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
  textSize: string;
  options?: RadioOption[];
};

function WizardRadioInput<
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
  textSize,
  options,
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
            <div className={cn("h-12 content-center text-2xl", textSize)}>
              {options?.map((val) => (
                <label
                  key={val.name}
                  className="text-black accent-background mx-1"
                >
                  <input
                    className="w-8 h-8"
                    type="radio"
                    value={val.name}
                    checked={field.value === val.name}
                    onChange={() => field.onChange(val.name)}
                  />
                  <span className="capitalize ml-1">{val.label}</span>
                </label>
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default WizardRadioInput;
