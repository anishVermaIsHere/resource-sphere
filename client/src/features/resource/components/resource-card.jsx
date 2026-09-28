import { ChevronRightIcon } from "lucide-react"
import { Button } from "../../../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../..//components/ui/card"



export default function ResourceCard({ doc }) {
  const featureName = "Google Sheet";
  const { title, values } = doc;

  return (
    <Card size="sm" className="max-w-xs">
      <CardHeader>
        <CardTitle>{featureName}</CardTitle>
        <CardDescription>
          {title}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-2 py-2 text-sm">
          {values?.slice(0,3).map((row, ind)=>(<li key={ind} className="flex gap-2">
            <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <span>{row[0]}, {row[1]}, {row[2]}</span>
          </li>))}
        </ul>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button size="sm" className="w-full">
          See
        </Button>
      </CardFooter>
    </Card>
  )
}
