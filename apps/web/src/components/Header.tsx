"use client"
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

// Redux
import { setUser } from "@/redux/slice/userSlice"
import { useDispatch, useSelector } from "react-redux"

// Cookies
import { getCookies, delCookies } from "@/features/cookies"

export const Header = () => {
  const dataUser = useSelector((state : any) => state.user)
  
  const dispatch = useDispatch()

  useQuery({
    queryFn: async () => {
      const {value} = await getCookies()

      const res = await axios.post('http://localhost:8000/users/keeplogin', {})
    }
  })

  return(
    <>
      <nav>
      <div className="navbar bg-base-200 h-28">
        <div className="navbar-start">
          <Link href="/"className="btn btn-ghost text-xl">BookYourTix</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <input type="text" placeholder="Search" className="input input-bordered w-[600px] " />
        </div>
        <div className="navbar-end">
          <div className="flex gap-4">
            <div className="lg:hidden flex">
              <button className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </div>
            <Link href="/register" className="btn btn-outline">
              Register
            </Link>
            <Link href="/login" className="btn btn-ghost">
              Login
            </Link>
          </div>
        </div>
      </div>
      </nav>
    </>
  );
};
