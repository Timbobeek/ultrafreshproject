"use client";

import Board from "@/components/Board";
import { useEffect, useState, useRef } from "react";
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

  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    setAtTop(scrollTop === 0);
    setAtBottom(scrollTop + clientHeight >= scrollHeight);
  };

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
      title: "gk gloves",
      text: "text-black",
      image: "bg-[url('../public/surveyBoards/ochoa.jpg')]",
      borderColor: "border-gray-300",
      backgroundColor: "bg-gray-300/75",
      hover: "",
      link: "",
    },
    {
      title: "gym workouts",
      text: "text-black",
      image: "bg-[url('../public/surveyBoards/sanchez.webp')]",
      borderColor: "border-purple-300",
      backgroundColor: "bg-purple-300/75",
      hover: "",
      link: "",
    },
    {
      title: "shinguards",
      text: "text-black",
      image: "bg-[url('../public/surveyBoards/Forlan.webp')]",
      borderColor: "border-indigo-300",
      backgroundColor: "bg-indigo-300/75",
      hover: "",
      link: "",
    },
  ];

  return (
    <div className="relative h-[550px] overflow-hidden flex flex-col">
      {/* Top gradient */}
      {!atTop && (
        <div className="pointer-events-none absolute top-0 left-0 w-full h-8 bg-gradient-to-t from-transparent to-white" />
      )}

      <main
        ref={containerRef}
        className="flex-1 overflow-y-auto scrollbar-none"
        onScroll={handleScroll}
      >
        <div className="p-4 space-y-4">
          {homeBoardsContent.map((board, i) => (
            <Board key={i} {...board} />
          ))}
        </div>
      </main>

      {/* Bottom gradient */}
      {!atBottom && (
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent" />
      )}
    </div>
  );
}
