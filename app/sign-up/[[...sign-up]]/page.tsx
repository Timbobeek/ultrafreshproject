"use client";

import { SignUp } from "@clerk/nextjs";
import { useEffect } from "react";
import { useHeader } from "@/context/HeaderContext";

export default function Page() {
  const [, setHeader] = useHeader();

  useEffect(() => {
    setHeader({
      title: "Welcome!",
      subtext:
        "to FutbolSurvey,\na page built to get to know my fellow\n ⚽futbol/soccer/football⚽ enjoyers",
      button: true,
      redirect: "/",
    });
  }, []);
  return (
    <div className="flex justify-center">
      <SignUp
        appearance={{
          elements: {
            card: "bg-foreground p-6",
            formButtonPrimary: "bg-black text-foreground",
            socialButtonsBlockButton: "bg-background text-black",
            cardBox: "w-[300px]",
            main: "gap-1",
            form: "gap-2",
          },
        }}
      />
    </div>
  );
}
