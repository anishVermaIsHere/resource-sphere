import { googleLogin } from "../../actions/auth"
import { Button } from "../ui/button"
import Icons from "../ui/icons"
 
function OAuthGoogle() {
  return (
    //  <div className="flex flex-col items-center justify-center space-y-12 sm:shadow-xl sm:rounded-2xl px-6 py-10 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
    //     <div className="flex flex-col items-center mb-5">
        <form action={googleLogin} className="w-full">
        <Button
            className="w-full bg-gray-200 border border-primary"
            type="submit"
            variant="outline"
            >
              <Icons.google className="size-5"/>
            Signin with Google
            </Button>
        </form>
    // </div>
    // </div>
  )
} 

export { OAuthGoogle }