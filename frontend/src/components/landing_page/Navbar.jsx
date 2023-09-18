import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div className="flex justify-between items-center px-8 py-10 z-20 w-full h-[10vh] bg-black">
            <p className="text-white text-5xl title">AUD.io</p>
            <div className="flex gap-2">
                <Link to={"/login"}>
                    <button className="text-white rounded-md bg-transparent px-2 py-1 hover:bg-slate-600 duration-200 ease-out border border-white">
                        Login
                    </button>
                </Link>
                <Link to={"/signup"}>
                    <button className="text-white rounded-md bg-transparent px-2 py-1 hover:bg-slate-600 duration-200 ease-out border border-white">
                        Sign up
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Navbar