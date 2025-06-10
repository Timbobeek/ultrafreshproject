'use client'
import BoardGenerator from "@/components/BoardGenerator";
import { useEffect } from "react";
import { useHeader } from "../context/HeaderContext";


export default function Page() {

  const [, setHeader] = useHeader();
  
    useEffect(() => {
      setHeader({title: 'Images', subtext: null, button: false, redirect: '/'});
    }, [])


   const homeBoardsContent = 
          [
            {
               title: 'funny images',
               text: 'text-black',
               image: "bg-[url('../public/images/beckham.webp')]",
               borderColor: 'border-orange-300',
               backgroundColor: 'bg-orange-300/75',
               hover: '',
               link: '/surveys/funny'
            },
            {
              title: 'sad images',
              text: 'text-black',
              image: "bg-[url('../public/images/dempsey.jpg')]",
              borderColor: 'border-rose-300',
              backgroundColor: 'bg-rose-300/75',
              hover: '',
              link: ''
            },
            {
              title: 'kickers 2025',
              text: 'text-black',
              image: "bg-[url('../public/images/maradona.webp')]",
              borderColor: 'border-lime-300',
              backgroundColor: 'bg-lime-300/75',
              hover: '',
              link: ''
            },
            {
               title: 'my face',
               text: 'text-black',
               image: "bg-[url('../public/images/maradona.webp')]",
               borderColor: 'border-fuchsia-600',
               backgroundColor: 'bg-fuchsia-300/75',
               hover: '',
               link: ''
             },
          ]
        const boardsContentMapper = homeBoardsContent.map((board)=>BoardGenerator(board))
   
   return (
        <div className="flex flex-col">
            {boardsContentMapper}
         </div>
   )
 }
 