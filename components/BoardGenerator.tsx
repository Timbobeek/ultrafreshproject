import { cn } from "@/lib/utils"

export default function BoardGenerator(content: {title: string, text: string, image: string, borderColor: string, backgroundColor: string, hover: string}){
  return(
    <button className={cn(" flex items-center justify-center group bg-cover bg-start hover:border-foreground hover:bg-finish duration-1000 px-10 h-36 text-4xl m-2 rounded-3xl border-8", content.text, content.image, content.borderColor, content.hover)}>
        <div className={cn("rounded-xl group-hover:bg-foreground group-hover:translate-x-80 duration-1000 px-2", content.backgroundColor)}>
          {content.title}
        </div>
    </button>
  )
}