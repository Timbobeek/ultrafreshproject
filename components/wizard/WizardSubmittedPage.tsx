import WizardStepImage from "./WizardStepImage";
import { StaticImageData } from "next/image";

type Props = {
  image: StaticImageData;
  label: string;
};

function WizardSubmittedPage({ image, label }: Props) {
  return (
    <>
      <WizardStepImage image={image} />
      <div className="flex items-center h-[116px] sm:text-small">{label}</div>
    </>
  );
}

export default WizardSubmittedPage;
