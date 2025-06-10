'use client';

import { useHeader } from "@/app/context/HeaderContext";
import { Button } from "./Button";
import { PaginationPrevious } from "./Pagination";

export default function Header () {
   const [headerData] = useHeader();
   return (
      <header className=" text-foreground flex flex-col items-center justify-center">
         <h1 className="font-bold text-large m-5">{headerData.title}</h1>

         {
            headerData.subtext !== null ? 
            <div className="bg-standard bg-opacity-70 text-foreground rounded-lg p-4 w-[500px] flex justify-center text-center text-small whitespace-pre-line">
               {headerData.subtext}
            </div>
            :
            <div></div>
         }


         { headerData.button ?
         <Button className="m-3" variant={"destructive"}>Sign In</Button> 
         :
         <PaginationPrevious title="Back" className="text-large text-foreground" href={headerData.redirect || '/'}/>
         }
      </header>
   );
 };