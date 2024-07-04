import AuthButton from "./authButton";

export default function Navbar() {

    return (
        <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
            <div className="text-white text-3xl font-bold">
                DontForget
            </div>
            <AuthButton/>
        </div>
    </nav>
    )
}