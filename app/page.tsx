
import { Button } from "@/components/ui/Button";
import BoardGenerator from "@/components/BoardGenerator";

export default function Home() {
  const homeBoardsContent = 
    [
      {
         title: 'surveys',
         text: 'text-black',
         image: "bg-[url('../public/images/ronaldinho.webp')]",
         borderColor: 'border-gray-300',
         backgroundColor: 'bg-gray-300/75',
         hover: '',
         link: '/surveys'
      },
      {
        title: 'discussions',
        text: 'text-black',
        image: "bg-[url('../public/images/sheva.jpg')]",
        borderColor: 'border-blue-300',
        backgroundColor: 'bg-blue-300/75',
        hover: '',
        link: '/discussions'
      },
      {
        title: 'images',
        text: 'text-black',
        image: "bg-[url('../public/images/khvicha.jpg')]",
        borderColor: 'border-pink-300',
        backgroundColor: 'bg-pink-300/75',
        hover: '',
        link: '/images'
      },
    ]
  const boardsContentMapper = homeBoardsContent.map((board)=>BoardGenerator(board))

  return (
    <div className="flex flex-col w-1/2">
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
