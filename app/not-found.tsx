"use client";

import Image from "next/image";
import arshavin from "../public/images/404page.png";
import { Barlow_Condensed } from "next/font/google";
import { useEffect } from "react";
import { useHeader } from "../context/HeaderContext";

const barlowCondensed = Barlow_Condensed({
  weight: "500",
  subsets: ["latin"],
  display: "swap",
});

export default function NotFound() {
  const [, setHeader] = useHeader();

  useEffect(() => {
    setHeader({
      title: "Oooops",
      subtext: null,
      button: false,
      redirect: "/",
    });
  }, []);
  return (
    <div
      className={`${barlowCondensed.className} flex items-center justify-center flex-col text-center `}
    >
      <p className="text-white text-3xl sm:text-medium absolute">
        PAGE NOT FOUND
      </p>
      <Image
        src={arshavin}
        width={600}
        alt="404 message"
        className="border-8 border-solid border-foreground rounded-3xl"
      />
    </div>
  );
}
