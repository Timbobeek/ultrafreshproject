import { ReactNode } from "react";
import { useWizard } from "../../context/WizardContext";

type WizardStepProps = {
  stepIndex: number;
  children: ReactNode;
};

export function WizardStep({ stepIndex, children }: WizardStepProps) {
  const { step } = useWizard();
  return step === stepIndex ? <>{children}</> : null;
}
