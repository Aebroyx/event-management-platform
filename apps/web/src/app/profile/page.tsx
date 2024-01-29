"use client"
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getCookies } from "@/features/cookies";
import {FaUser} from "react-icons/fa";
import Link from "next/link";
import Transaction from '@/components/Transaction';

export default function User() {

        const response = useQuery({
            queryKey: ['user'],
            queryFn: async() => {
                const {value}: any = await getCookies()
                const res = await axios.post(
                    'http://localhost:8000/users/profile', null,
                    {
                      headers: {
                        Authorization: value
                      }
                    }
                  )
                return res
            }
        })

        const userData = {...response.data?.data.data}

    return (
        <>
            <div className="flex flex-col justify-center items-center my-24">
                <div className="flex flex-col justify-center items-center gap-8">
                    <div className="card w-96 bg-base-100 shadow-xl h-">
                        <figure className="px-10 pt-10">
                            <div className="flex flex-col justify-center items-center gap-2">
                                <FaUser className='text-3xl'/>
                                <h1>{userData.username}</h1>
                            </div>
                        </figure>
                        <div className="card-body items-center text-left">
                            <h2 className="card-title">Profile</h2>
                                <div className="flex flex-col ">
                                    <div className="overflow-x-auto">
                                        <table className="table">
                                            <tbody>
                                            <tr>
                                                <th>Email:</th>
                                                <td>{userData.email}</td>
                                            </tr>
                                            <tr>
                                                <th>First Name:</th>
                                                <td>{userData.firstname}</td>
                                            </tr>
                                            <tr>
                                                <th>Last Name:</th>
                                                <td>{userData.lastname}</td>
                                            </tr>
                                            <tr>
                                                <th>Role:</th>
                                                <td>{userData.role}</td>
                                            </tr>
                                            <tr>
                                                <th>Referral Code:</th>
                                                <td>{userData.referral_num}</td>
                                            </tr>
                                            <tr>
                                                <th>Points:</th>
                                                <td>{userData.point?.balance}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            <div className="card-actions">
                            </div>
                        </div>
                    </div>
                    <Transaction/>
                </div>
                <div className="mt-12">
                    {
                        userData.role === 'Organizer' ?
                        <>
                            <Link href="/create-event">
                                <button className="btn btn-primary w-[380px]">Create Event</button>
                            </Link>
                        </> 
                        :
                        <></>
                    }
                </div>
            </div>
        </>
    )
}