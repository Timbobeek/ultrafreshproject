import { FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  isFirstStep?: boolean;
  isFinalStep?: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
};

export function WizardStepNavigation({
  label,
  isFirstStep,
  isFinalStep,
  onBack,
  onNext,
  onSubmit,
}: Props) {
  return (
    <div className="flex justify-center">
      <div className="flex items-center">
        <Button
          variant="pagination"
          className={cn(
            "text-black hover:text-background",
            isFirstStep && "invisible pointer-events-none"
          )}
          onClick={onBack}
        >
          <ChevronLeft className="w-12 h-12" />
        </Button>
        <FormLabel className="!text-medium text-black my-2">{label}</FormLabel>
        {isFinalStep ? (
          <Button variant="submit" type="submit" onClick={onSubmit}>
            <Rocket />
          </Button>
        ) : (
          <Button
            variant="pagination"
            className="text-black hover:text-background"
            onClick={onNext}
          >
            <ChevronRight className="w-12 h-12" />
          </Button>
        )}
      </div>
    </div>
  );
}
