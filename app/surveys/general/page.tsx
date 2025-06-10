'use client'

import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
 } from "@/components/ui/carousel"
 import { useEffect } from "react";
 import { useHeader } from "@/app/context/HeaderContext";


export default function GeneralSurvey(){

    const [, setHeader] = useHeader();
     
       useEffect(() => {
         setHeader({title: 'General Survey', subtext: null, button: false, redirect: '/surveys'});
       }, [])

   return(
      <div className="">
         <Carousel className="h-96 bg-background">
         <CarouselContent className="text-foreground">
            <CarouselItem className="">Question #1</CarouselItem>
            <CarouselItem className="">Question #2</CarouselItem>
            <CarouselItem className="">Question #3</CarouselItem>
         </CarouselContent>
         <CarouselPrevious className="text-background bg-foreground" />
         <CarouselNext className="text-background bg-foreground" />
         </Carousel>
      </div>
   )
}