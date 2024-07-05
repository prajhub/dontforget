import { logout } from "@/lib/signout-action";
import { validateRequest } from "@/lib/validate-request"
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link";
export default async function Navbar() {
    const {user} = await validateRequest()

    return (
        <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
            <div className="text-white text-3xl font-bold">
                <Link href='/'>DontForget</Link>
            </div>

           {user && (<form action={logout}>
			<Button variant='secondary'>Sign out</Button>
		</form>)}
           {!user && <Link href='/login' className={buttonVariants({ variant: "secondary" })}>Sign In</Link>}
           {!user && <Link href='/signup' className={buttonVariants({ variant: "secondary" })}>Sign Up</Link>}
        </div>
    </nav>
    )
}