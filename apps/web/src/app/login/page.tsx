import Link from "next/link";

export default function Login() {
    return (
      <>
      <div className="py-48 flex items-center justify-center">
        <div className="card w-auto border shadow-2xl h-auto rounded-md px-14 py-20">
            <div className="text-4xl mb-10">
            Sign In
            </div>
            <div>
                <div className="text-lg">
                    Email or Username
                </div>
                <div>
                    <input type="text" placeholder="Input Username or Email" className="rounded-md border border-black pl-2 w-[320px] h-8 mb-3"/>
                </div>
            </div>

            <div>
                <div className="text-lg">
                    Password
                </div>
                <div>
                    <input type="password" placeholder="Input Password" className="rounded-md border border-black pl-2 w-[320px] h-8"/>
                </div>
            </div>

            <div>
                <button className="bg-gray-300 hover:bg-gray-400 rounded-md w-[320px] h-10 w-72 flex items-center justify-center my-3"> Sign In</button>
            </div>
            <div className="flex">
                <div className="mr-1">
                    Already have an account? 
                </div>
                <Link href="/register">
                    <div className="hover:text-gray-500">
                        Create Account
                    </div>
                </Link>
            </div>
        </div>
      </div>
      </>
    );
  }