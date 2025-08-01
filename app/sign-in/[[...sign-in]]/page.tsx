"use client";

import { SignIn } from "@clerk/nextjs";
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
      <SignIn
        appearance={{
          elements: {
            card: "bg-foreground",
            formButtonPrimary: "bg-background text-foreground hover:bg-black",
          },
        }}
      />
    </div>
  );
}
