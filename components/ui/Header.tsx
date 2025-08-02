"use client";

import { useHeader } from "@/context/HeaderContext";
import { PaginationPrevious } from "./Pagination";

export default function Header() {
  const [headerData] = useHeader();
  return (
    <header className=" text-foreground flex flex-col items-center justify-center">
      <h1 className="font-bold  text-5xl sm:text-large m-5">
        {headerData.title}
      </h1>

      {headerData.subtext != null && (
        <div className="bg-standard bg-opacity-70 text-foreground rounded-lg p-4 sm:w-[500px] flex justify-center text-center sm:text-small whitespace-pre-line">
          {headerData.subtext}
        </div>
      )}

      {!headerData.button && (
        <PaginationPrevious
          title="Back"
          className="text-large text-foreground"
          href={headerData.redirect || "/"}
        />
      )}
    </header>
  );
}
