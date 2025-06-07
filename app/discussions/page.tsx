import BoardGenerator from "@/components/BoardGenerator";
import { PaginationPrevious } from "@/components/ui/Pagination";

export default function Page(){
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
      <div className="flex flex-col w-1/2">
          <div className="justify-items-center m-2">
            <p className="text-foreground m-5 text-large font-bold">Discussions</p>
            <PaginationPrevious title="Back" className="text-large text-foreground" href="/"/>
          </div>
          {boardsContentMapper}
      </div>
   ) 
}