import { googleLogin } from "../../actions/auth"
import { Button } from "../ui/button"
import Icons from "../ui/icons"
 
function OAuthGoogle() {
  return (
    <form action={googleLogin} className="w-full">
    <Button
        className="w-full bg-gray-200 border border-gray-400"
        type="submit"
        variant="outline"
        >
          <Icons.google className="size-5"/>
        Signin with Google
        </Button>
    </form>
  )
} 

export { OAuthGoogle }