import { cn } from "@/lib/utils"

export default function BoardGenerator(content: {title: string, text: string, image: string, borderColor: string}){
  return(
    <button className={cn("bg-cover bg-center hover:border-foreground hover:bg-bottom duration-1000 px-80 h-36 text-4xl m-2 rounded-3xl border-8", content.text, content.image, content.borderColor)}>
          {content.title}
    </button>
  )
}