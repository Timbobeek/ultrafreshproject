import Image from "next/image";
import { StaticImageData } from "next/image";

type StepImageProps = {
  image: StaticImageData;
};

const StepImage = ({ image }: StepImageProps) => (
  <div className="relative overflow-hidden rounded-lg h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
    <Image
      src={image}
      alt="step image"
      fill
      className="object-cover object-top"
    />
  </div>
);

export default StepImage;
