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

type Props = {
  image: StaticImageData;
  name: any;
  methods: any;
  label: string;
  isFirstStep?: boolean;
  isFinalStep?: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  type: any;
};

const WizardTextInput = ({
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
}: Props) => (
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

export default WizardTextInput;
