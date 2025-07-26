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
  options?: string[];
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
        <FormItem className="w-[900px]">
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
                <label key={val} className="text-black accent-background mx-1">
                  <input
                    className="w-8 h-8"
                    type="radio"
                    value={val}
                    checked={field.value === val}
                    onChange={() => field.onChange(val)}
                  />
                  <span className="capitalize ml-1">{val}</span>
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
