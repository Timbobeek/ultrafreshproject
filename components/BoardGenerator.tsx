import { cn } from "@/lib/utils"

export default function BoardGenerator(content: {title: string, text: string, image: string, borderColor: string}){
  return(
    <button className={cn("bg-cover px-80 h-40 text-4xl m-2 rounded-3xl border-4", content.text, content.image, content.borderColor)}>
          {content.title}
    </button>
  )
}