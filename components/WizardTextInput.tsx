import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const WizardTextInput = () => (
  <FormField
    name={name as unknown as Path<T>}
    control={methods.control}
    render={({ field }) => (
      <FormItem className="w-[900px]">
        <WizardStepImage image={image} />
        <StepNavigation />
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
