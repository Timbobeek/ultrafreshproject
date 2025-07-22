import Image from "next/image";
import { StaticImageData } from "next/image";

type StepImageProps = {
  image: StaticImageData;
};

const StepImage = ({ image }: StepImageProps) => (
  <div className="relative h-[500px] overflow-hidden">
    <Image
      src={image}
      alt="step image"
      fill
      className="object-cover object-top"
    />
  </div>
);

export default StepImage;
