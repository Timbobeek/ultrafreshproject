import BoardGenerator from "@/components/BoardGenerator";
import {PaginationPrevious} from "@/components/ui/Pagination";

export default function Page(){
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
           link: ''
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
      <div className="flex flex-col w-1/2">
         <div className="justify-items-center m-2">
            <p className="text-foreground m-5 text-large font-bold">Surveys</p>
            <PaginationPrevious title="Back" className="text-large text-foreground" href="/"/>
         </div>
         <div className="flex flex-col">
            {boardsContentMapper}
         </div>
      </div>
   ) 
}