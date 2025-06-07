import BoardGenerator from "@/components/BoardGenerator";
import {PaginationPrevious} from "@/components/ui/Pagination";

export default function Page() {
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
     <div className="flex flex-col h-screen w-1/2">
       {/* Header fixed at top */}
       <header className=" text-foreground flex flex-col items-center justify-center m-2">
         <h1 className="font-bold text-large m-5">Images</h1>
         <PaginationPrevious title="Back" className="text-large text-foreground" href="/"/>
       </header>
 
       {/* Content fills remaining space and centers content */}
       <main className="flex-1 flex flex-col justify-center">
            {boardsContentMapper}
       </main>
     </div>
   )
 }
 