export { auth as default } from "./auth"

export const config = {
  // Specify which routes you want the middleware to run on
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}