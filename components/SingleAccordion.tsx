import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {
  title: string;
  content: any;
};

export default function SingleAccordion(props: Props) {
  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem
          value="item-1"
          className="m-2 overflow-hidden rounded-xl"
        >
          <AccordionTrigger className="bg-foreground flex text-background text-2xl border-background data-[state=open]:rounded-b-none rounded-t-xl hover:no-underline">
            {props.title}
          </AccordionTrigger>
          <AccordionContent className="bg-black overflow-y-scroll scrollbar scrollbar-thumb-background scrollbar-track-foreground max-h-60 border-foreground border-4 rounded-b-xl">
            {props.content}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
