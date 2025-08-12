import { FormField, FormItem } from "@/components/ui/form";
import WizardStepImage from "./WizardStepImage";
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

function WizardSubmittedPage<
  T extends FieldValues = FieldValues,
  Name extends FieldPath<T> = FieldPath<T>
>({ image, name, methods, label }: Props<T, Name>) {
  return (
    <FormField
      name={name}
      control={methods.control}
      render={() => (
        <FormItem className="">
          <WizardStepImage image={image} />
          <div className="flex items-center h-[116px] sm:text-small">
            {label}
          </div>
        </FormItem>
      )}
    />
  );
}

export default WizardSubmittedPage;
