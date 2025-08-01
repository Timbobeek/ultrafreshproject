import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  title: string;
  text: string;
  image: string;
  borderColor: string;
  backgroundColor: string;
  hover: string;
  link: string;
};

export default function Board(props: Props) {
  return (
    <Link
      href={cn(props.link)}
      className={cn(
        "flex items-center group justify-center bg-cover bg-start hover-hover:hover:border-foreground hover-hover:hover:bg-finish duration-1000 px-10 h-24 sm:h-36 text-xl sm:text-4xl m-2 rounded-3xl border-8",
        props.text,
        props.image,
        props.borderColor,
        props.hover
      )}
    >
      <div
        className={cn(
          "rounded-xl hover-hover:group-hover:bg-foreground hover-hover:group-hover:translate-x-28 sm:hover-hover:group-hover:translate-x-40 lg:hover-hover:group-hover:translate-x-60 duration-1000 px-2",
          props.backgroundColor
        )}
      >
        {props.title}
      </div>
    </Link>
  );
}
