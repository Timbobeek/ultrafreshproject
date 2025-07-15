'use client';

import BoardGenerator from "@/components/BoardGenerator";
import { useEffect } from "react";
import { useHeader } from "./context/HeaderContext";

export default function Home() {

  const [, setHeader] = useHeader();

  useEffect(() => {
    setHeader({title: 'Welcome!',
       subtext: "to FutbolSurvey,\na page built to get to know my fellow\n ⚽futbol/soccer/football⚽ enjoyers",
      button: true,
      redirect: '/'
    });
  }, [])

  const homeBoardsContent = 
    [
      {
         title: 'surveys',
         text: 'text-black',
         image: "bg-[url('../public/surveyBoards/ronaldinho.webp')]",
         borderColor: 'border-gray-300',
         backgroundColor: 'bg-gray-300/75',
         hover: '',
         link: '/surveys'
      },
      {
        title: 'discussions',
        text: 'text-black',
        image: "bg-[url('../public/surveyBoards/sheva.jpg')]",
        borderColor: 'border-blue-300',
        backgroundColor: 'bg-blue-300/75',
        hover: '',
        link: '/discussions'
      },
      {
        title: 'images',
        text: 'text-black',
        image: "bg-[url('../public/surveyBoards/khvicha.jpg')]",
        borderColor: 'border-pink-300',
        backgroundColor: 'bg-pink-300/75',
        hover: '',
        link: '/images'
      },
    ]
  const boardsContentMapper = homeBoardsContent.map((board)=>BoardGenerator(board))

  return (
      <div className="flex flex-col">
        {boardsContentMapper}
      </div>
  );
}
