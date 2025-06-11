'use client'

import BoardGenerator from "@/components/BoardGenerator";
import { useEffect } from "react";
import { useHeader } from "@/app/context/HeaderContext";


export default function Page(){

  const [, setHeader] = useHeader();
     
       useEffect(() => {
         setHeader({title: 'Discussions', subtext: null, button: false, redirect: '/'});
       }, [])


   const homeBoardsContent = 
       [
         {
            title: 'kickers',
            text: 'text-black',
            image: "bg-[url('../public/images/figo.jpeg')]",
            borderColor: 'border-orange-300',
            backgroundColor: 'bg-orange-300/75',
            hover: '',
            link: ''
         },
         {
           title: 'referees',
           text: 'text-black',
           image: "bg-[url('../public/images/torres.jpg')]",
           borderColor: 'border-rose-300',
           backgroundColor: 'bg-rose-300/75',
           hover: '',
           link: ''
         },
         {
           title: 'arsenal',
           text: 'text-black',
           image: "bg-[url('../public/images/drogba.webp')]",
           borderColor: 'border-lime-300',
           backgroundColor: 'bg-lime-300/75',
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