"use client";

import Board from "@/components/Board";
import { useEffect } from "react";
import { useHeader } from "@/context/HeaderContext";

export default function Page() {
  const [, setHeader] = useHeader();

  useEffect(() => {
    setHeader({
      title: "Discussions",
      subtext: null,
      button: false,
      redirect: "/",
    });
  }, []);

  const homeBoardsContent = [
    {
      title: "kickers",
      text: "text-black",
      image: "bg-[url('../public/surveyBoards/figo.jpeg')]",
      borderColor: "border-orange-300",
      backgroundColor: "bg-orange-300/75",
      hover: "",
      link: "",
    },
    {
      title: "referees",
      text: "text-black",
      image: "bg-[url('../public/surveyBoards/torres.jpg')]",
      borderColor: "border-rose-300",
      backgroundColor: "bg-rose-300/75",
      hover: "",
      link: "",
    },
    {
      title: "injuries",
      text: "text-black",
      image: "bg-[url('../public/surveyBoards/drogba.webp')]",
      borderColor: "border-lime-300",
      backgroundColor: "bg-lime-300/75",
      hover: "",
      link: "",
    },
    {
      title: "kickers",
      text: "text-black",
      image: "bg-[url('../public/surveyBoards/figo.jpeg')]",
      borderColor: "border-orange-300",
      backgroundColor: "bg-orange-300/75",
      hover: "",
      link: "",
    },
    {
      title: "referees",
      text: "text-black",
      image: "bg-[url('../public/surveyBoards/torres.jpg')]",
      borderColor: "border-rose-300",
      backgroundColor: "bg-rose-300/75",
      hover: "",
      link: "",
    },
    {
      title: "injuries",
      text: "text-black",
      image: "bg-[url('../public/surveyBoards/drogba.webp')]",
      borderColor: "border-lime-300",
      backgroundColor: "bg-lime-300/75",
      hover: "",
      link: "",
    },
  ];

  return (
    <div className="relative h-[550px] overflow-hidden flex flex-col ">
      <div className="pointer-events-none absolute top-0 left-0 w-full h-8 bg-gradient-to-t from-transparent to-white" />
      <main className="flex-1 overflow-y-auto scrollbar-none">
        <div className="p-4 space-y-4">
          {homeBoardsContent.map((board, i) => (
            <Board key={i} {...board} />
          ))}
        </div>
      </main>
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}
