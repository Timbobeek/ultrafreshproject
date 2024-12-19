import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ModeToggle";

export default function Home() {
  return (
    <div className="bg-background dark:bg-foreground grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="justify-items-center">
        <ModeToggle/>
        <div className="text-foreground dark:text-background m-5">
            <p className="text-7xl m-5">Welcome!</p>
            <div className="bg-foreground text-background dark:bg-background dark:text-foreground rounded-md flex justify-center text-center">
            to FutbolSurvey, <br></br> a page built to get to know my fellow{" "}
              <br></br>&#9917;futbol/soccer/football&#9917; enjoyers
            </div>
        </div>
        <Button variant={"destructive"}>Sign In</Button>
      </div>
    </div>
  );
}
