import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
 } from "@/components/ui/carousel"
 import { PaginationPrevious } from "@/components/ui/Pagination"


export default function GeneralSurvey(){
   return(
      <div className="flex flex-col w-1/2">
         <div className="justify-items-center m-2">
            <p className="text-foreground text-large font-bold m-5">General Survey</p>
            <PaginationPrevious title="Back" className="text-large text-foreground" href="/surveys"/>
         </div>
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