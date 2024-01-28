"use client"
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import axios from "axios";

// Redux
import { setUser } from "@/redux/slice/userSlice"
import { useDispatch, useSelector } from "react-redux"

// Cookies
import { getCookies, delCookies } from "@/features/cookies"

export const Header = () => {

  // const dataUser = useSelector((state: any) => state.user)

  const dataUser = ''
  
  const dispatch = useDispatch();

  // console.log(username)

  // useQuery({
  //   queryKey: ['keeplogin', { value: dataUser.user}], // Provide a queryKey for cache invalidation, refetching, etc.
  //   queryFn: async () => {
  //     const { value }: any = await getCookies(); // Ensure getCookies returns an object with a 'value' string

  //     if (!value) {
  //       throw new Error('No token found');
  //     }

  //     const res = await axios.post(
  //       'http://localhost:8000/users/keeplogin',
  //       null,
  //       {
  //         headers: {
  //           Authorization: value
  //         },
  //       }
  //     );

  //     console.log(res)

  //     // Dispatch the user data to your store
  //     // Make sure the response data structure is correct
  //     dispatch(setUser(res.data.data.username));
  //   }
  // });

  const username = useQuery({
    queryKey: ['keeplogin'],
    queryFn: async () => {
      const { value }: any = await getCookies();
  
      const res = await axios.post(
        'http://localhost:8000/users/keeplogin', null,
        {
          headers: {
            Authorization: value
          }
        }
      )
      return res.data
    }
  })

  const onLogout = async() =>{
    await delCookies()
    dispatch(setUser(null))
  }

  console.log(username)

  dispatch(setUser("dummyuser"))

  console.log(dataUser)

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
            <div>
              {
                dataUser ? (
                  <>
                    <h1>{dataUser}</h1>
                    <button onClick={onLogout} className="btn btn-ghost">Logout</button>
                  </>
                ) : (
                  <>
                    <Link href="/register" className="btn btn-outline">
                      Register
                    </Link>
                    <Link href="/login" className="btn btn-ghost">
                      Login
                    </Link>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
      </nav>
    </>
  );
};
