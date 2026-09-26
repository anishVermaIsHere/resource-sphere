import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert"
import Icons from "../../components/ui/icons"

export default function AlertBox({ title = "Alert", description = "", variant = "default", statusCode = ""}) {
  return (
    <div className="border flex flex-col gap-4 items-center justify-center min-h-screen">
      <Alert variant={variant} className="max-w-md sm:text-xl">
        <Icons.alertCircle className="sm:size-12" />
        <AlertTitle>{`${statusCode} -`} {title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
      <Link href="/" role="button" tabIndex={0} data-slot="button" className="bg-primary text-muted rounded-md px-4 py-2 inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0">
        Back to Home
      </Link>
    </div>
  )
}
