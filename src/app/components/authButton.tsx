import { Button } from "@/components/ui/button"
import { logout } from "@/lib/signout-action"
import { validateRequest } from "@/lib/validate-request"


export default async function AuthButton() {
    const user = await validateRequest()

    if (!user) {
        return  <Button variant='secondary'>Signup</Button>
    } 

    return <form action={logout}>
   <Button variant='secondary'>Sign out</Button>
</form>

   

}