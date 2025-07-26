"use client";
import Board from "@/components/Board";
import { useEffect } from "react";
import { useHeader } from "../../context/HeaderContext";

export default function Page() {
  const [, setHeader] = useHeader();

  useEffect(() => {
    setHeader({
      title: "Surveys",
      subtext: null,
      button: false,
      redirect: "/",
    });
  }, []);
  const homeBoardsContent = [
    {
      title: "general survey",
      text: "text-black",
      image: "bg-[url('../public/surveyBoards/buffon.jpg')]",
      borderColor: "border-orange-300",
      backgroundColor: "bg-orange-300/75",
      hover: "",
      link: "/surveys/general",
    },
    {
      title: "injuries",
      text: "text-black",
      image: "bg-[url('../public/surveyBoards/henry.jpg')]",
      borderColor: "border-rose-300",
      backgroundColor: "bg-rose-300/75",
      hover: "",
      link: "/surveys/injuries",
    },
    {
      title: "world cups",
      text: "text-black",
      image: "bg-[url('../public/surveyBoards/ronaldo.jpg')]",
      borderColor: "border-lime-300",
      backgroundColor: "bg-lime-300/75",
      hover: "",
      link: "",
    },
  ];

  return (
    <div className="flex flex-col">
      {homeBoardsContent.map((board) => Board(board))}
    </div>
  );
}
