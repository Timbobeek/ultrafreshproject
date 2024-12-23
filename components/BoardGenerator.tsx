import { cn } from "@/lib/utils"

export default function BoardGenerator(content: {title: string, text: string, image: string}){
  return(
    <button className={cn("bg-cover px-80 h-40 text-4xl", content.text, content.image)}>
          {content.title}
    </button>
  )
}