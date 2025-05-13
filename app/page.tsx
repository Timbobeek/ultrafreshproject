import { Button } from "@/components/ui/button";
import BoardGenerator from "@/components/BoardGenerator";
import { Footer } from "@/components/ui/footer";

export default function Home() {
  let homeBoardsContent = 
    [
      {
         title: 'surveys',
         text: 'text-black',
         image: "bg-[url('./public/ronaldinho.webp')]",
         borderColor: 'border-gray-300',
         backgroundColor: 'bg-gray-300/75',
         hover: ''
      },
      {
        title: 'discussions',
        text: 'text-black',
        image: "bg-[url('./public/sheva.jpg')]",
        borderColor: 'border-blue-300',
        backgroundColor: 'bg-blue-300/75',
        hover: ''
      },
      {
        title: 'images',
        text: 'text-black',
        image: "bg-[url('./public/khvicha.jpg')]",
        borderColor: 'border-pink-300',
        backgroundColor: 'bg-pink-300/75',
        hover: ''
      },
    ]
  const boardsContentMapper = homeBoardsContent.map((board)=>BoardGenerator(board))

  return (
    <div className="bg-[url('./public/futbolbackground.jpg')] bg-green-700 bg-center bg-no-repeat bg-cover fixed flex flex-col items-center h-screen w-screen min-h-screen m-0">
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
      <div className="flex flex-col w-3/6">
        {boardsContentMapper}
      </div>
      <Footer/>
    </div>
  );
}
