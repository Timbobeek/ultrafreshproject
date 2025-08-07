"use client";

import Board from "@/components/Board";
import { useEffect } from "react";
import { useHeader } from "../context/HeaderContext";
import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Home() {
  const [, setHeader] = useHeader();

  useEffect(() => {
    setHeader({
      title: (
        <div className="text-center">
          Welcome<br></br>
          <div className="leading-[0.2]">
            <SignedIn>
              <UserButton
                showName
                appearance={{
                  elements: {
                    userButtonOuterIdentifier: "text-xl md:text-3xl",
                    userButtonBox: "text-foreground",
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      ),
      subtext:
        "to FutbolSurvey,\na page built to get to know my fellow\n ⚽futbol/soccer/football⚽ enjoyers",
      button: true,
      redirect: "/",
    });
  }, []);

  const homeBoardsContent = [
    {
      title: "surveys",
      text: "text-black",
      image: "bg-[url('../public/surveyBoards/ronaldinho.webp')]",
      borderColor: "border-gray-300",
      backgroundColor: "bg-gray-300/75",
      hover: "",
      link: "/surveys",
    },
    {
      title: "discussions",
      text: "text-black",
      image: "bg-[url('../public/surveyBoards/shevchenko.png')]",
      borderColor: "border-blue-300",
      backgroundColor: "bg-blue-300/75",
      hover: "",
      link: "/discussions",
    },
    {
      title: "quizzes",
      text: "text-black",
      image: "bg-[url('../public/surveyBoards/khvicha.jpg')]",
      borderColor: "border-pink-300",
      backgroundColor: "bg-pink-300/75",
      hover: "",
      link: "/quizzes",
    },
  ];

  return (
    <div className="flex flex-col">
      {homeBoardsContent.map((board, i) => (
        <Board key={i} {...board} />
      ))}
    </div>
  );
}
