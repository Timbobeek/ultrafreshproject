import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ModeToggle";
import BoardGenerator from "@/components/BoardGenerator";

export default function Home() {
  let homeBoardsContent = 
    [
      {
         title: 'surveys',
         text: 'have fun'
      },
      {
        title: 'discussion',
        text: 'nice one'
      },
      {
        title: 'images',
        text: 'wowza'
      },
    ]
  const boardsContentMapper = homeBoardsContent.map((board)=>BoardGenerator(board))

  return (
    <div className="bg-background dark:bg-foreground justify-items-center min-h-screen sm:p-10 p-5 ">
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
      <div>
        {boardsContentMapper}
      </div>
    </div>
  );
}
