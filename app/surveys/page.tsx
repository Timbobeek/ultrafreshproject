'use client';
import BoardGenerator from "@/components/BoardGenerator";
import { useEffect } from "react";
import { useHeader } from "../context/HeaderContext";

export default function Page(){
    const [, setHeader] = useHeader();
  
    useEffect(() => {
      setHeader({title: 'Surveys', subtext: null, button: false, redirect: '/'});
    }, [])
   const homeBoardsContent = 
       [
         {
            title: 'general survey',
            text: 'text-black',
            image: "bg-[url('../public/images/buffon.jpg')]",
            borderColor: 'border-orange-300',
            backgroundColor: 'bg-orange-300/75',
            hover: '',
            link: '/surveys/general'
         },
         {
           title: 'injuries',
           text: 'text-black',
           image: "bg-[url('../public/images/henry.jpg')]",
           borderColor: 'border-rose-300',
           backgroundColor: 'bg-rose-300/75',
           hover: '',
           link: '/surveys/injuries'
         },
         {
           title: 'world cups',
           text: 'text-black',
           image: "bg-[url('../public/images/ronaldo.jpg')]",
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