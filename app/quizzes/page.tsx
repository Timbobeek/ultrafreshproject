"use client";
import Board from "@/components/Board";
import { useEffect } from "react";
import { useHeader } from "../../context/HeaderContext";

export default function Page() {
  const [, setHeader] = useHeader();

  useEffect(() => {
    setHeader({
      title: "Quizzes",
      subtext: null,
      button: false,
      redirect: "/",
    });
  }, []);

  const homeBoardsContent = [
    {
      title: "tba",
      text: "text-black",
      image: "bg-[url('../public/surveyBoards/dvd.webp')]",
      borderColor: "border-orange-300",
      backgroundColor: "bg-orange-300/75",
      hover: "",
      link: "",
    },
    {
      title: "tba",
      text: "text-black",
      image: "bg-[url('../public/surveyBoards/clint.jpg')]",
      borderColor: "border-rose-300",
      backgroundColor: "bg-rose-300/75",
      hover: "",
      link: "",
    },
    {
      title: "tba",
      text: "text-black",
      image: "bg-[url('../public/surveyBoards/diegom.webp')]",
      borderColor: "border-lime-300",
      backgroundColor: "bg-lime-300/75",
      hover: "",
      link: "",
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
