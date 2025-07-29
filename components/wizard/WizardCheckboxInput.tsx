import { FormField, FormItem } from "@/components/ui/form";
import WizardStepImage from "./WizardStepImage";
import { WizardStepNavigation } from "./WizardStepNavigation";
import { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { FieldValues, UseFormReturn, Path, FieldPath } from "react-hook-form";

export type CheckboxField<
  T extends FieldValues = FieldValues,
  Name extends FieldPath<T> = FieldPath<T>
> = {
  name: Name;
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
  checkboxFields?: CheckboxField<T>[];
  fieldsToTrigger: Path<T>[];
};

function WizardCheckboxInput<
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
  checkboxFields,
  fieldsToTrigger,
}: Props<T, Name>) {
  return (
    <FormField
      name={name}
      control={methods.control}
      render={({ fieldState }) => (
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
          <div className="flex justify-center flex-wrap h-12">
            {checkboxFields?.map((cb) => {
              return (
                <FormField
                  key={cb.name}
                  name={cb.name}
                  control={methods.control}
                  render={({ field }) => (
                    <FormItem className={cn(" flex", textSize)}>
                      <input
                        className="w-4 h-4 sm:w-5 sm:h-5 mx-1 accent-background"
                        type="checkbox"
                        name={field.name}
                        ref={field.ref}
                        checked={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          methods.trigger(fieldsToTrigger);
                        }}
                        onBlur={field.onBlur}
                      />
                      <label htmlFor={field.name}>{cb.label}</label>
                    </FormItem>
                  )}
                />
              );
            })}
          </div>
          <p className="min-h-[1.5rem] text-red-500">
            {fieldState.error?.message}
          </p>
        </FormItem>
      )}
    />
  );
}

export default WizardCheckboxInput;
