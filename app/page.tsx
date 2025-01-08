import { Button } from "@/components/ui/button";
import BoardGenerator from "@/components/BoardGenerator";

export default function Home() {
  let homeBoardsContent = 
    [
      {
         title: 'surveys',
         text: 'text-red-200',
         image: "bg-[url('./luis.jpg')]",
         borderColor: 'border-black'
      },
      {
        title: 'discussion',
        text: 'text-foreground',
        image: "bg-[url('./sheva.jpg')]",
        borderColor: 'border-yellow-300'
      },
      {
        title: 'images',
        text: 'text-green-300',
        image: "bg-[url('./khvicha.jpg')]",
        borderColor: 'border-pink-400'
      },
    ]
  const boardsContentMapper = homeBoardsContent.map((board)=>BoardGenerator(board))

  return (
    <div className="bg-[url('./futbolbackground.jpg')] bg-green-700 bg-center bg-no-repeat bg-cover fixed justify-items-center h-screen w-screen ">
      <div className="justify-items-center m-2">
        <div className="text-foreground m-5 justify-items-center">
            <p className="text-large font-bold">Welcome!</p>
            <div className="bg-standard bg-opacity-70 text-foreground rounded-lg p-4 w-[500px] flex justify-center text-center text-small">
              to FutbolSurvey, <br></br> a page built to get to know my fellow{" "}
              <br></br>&#9917;futbol/soccer/football&#9917; enjoyers
            </div>
        </div>
        <Button variant={"destructive"}>Sign In</Button>
      </div>
      <div className="flex flex-col">
        {boardsContentMapper}
      </div>
    </div>
  );
}
