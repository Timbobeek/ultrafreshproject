import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./button"

export function SurveyCard(){
  return (
      <Card className="">
        <CardHeader className="flex-row">
          <CardTitle>Surveys</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button>Start</Button>
        </CardFooter>
      </Card>
  )
}