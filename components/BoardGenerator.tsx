export default function BoardGenerator(content: {title: string, text: string}){
  return(
    <button className="bg-[url('./luis.jpg')] bg-cover px-80 h-40 text-background text-4xl">
          {content.title}
          {content.text}
    </button>
  )
}