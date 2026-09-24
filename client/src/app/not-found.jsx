import Link from "next/link"


const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center px-4 py-8 min-h-screen text-center">
            <h2 className="mb-6 text-primary text-5xl font-semibold">404 - Whoops!</h2>
            <h3 className="mb-1.5 text-3xl font-semibold">Something went wrong</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">The page you're looking for isn't found, we suggest you back to home.</p>
            <Link href="/" role="button" tabIndex={0} data-slot="button" className="bg-primary text-muted rounded-md px-4 py-2 inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0">
                Back to Home
            </Link>
        </div>

    )
}

export default NotFoundPage