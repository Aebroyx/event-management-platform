"use client"
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getCookies } from "@/features/cookies";
import { FaTicket } from "react-icons/fa6";
import Link from "next/link";
import moment from "moment";

export default function Transaction() {

        const response = useQuery({
            queryKey: ['ticket'],
            queryFn: async() => {
                const {value}: any = await getCookies()
                const res = await axios.post(
                    'http://localhost:8000/tickets/transaction', null,
                    {
                      headers: {
                        Authorization: value
                      }
                    }
                  )
                return res
            }
        })

        if(response.isLoading) return(<p>Loading...</p>)
        if(response.isError) return(<p>Error...</p>)

        const transaction = [...response.data?.data.data]

        console.log(transaction)

    return (
        <>
                <div className="card w-full bg-base-100 shadow-xl min-h-100">
                    <figure className="px-10 pt-10">
                        <div className="flex flex-col justify-center items-center gap-2">
                            <FaTicket />
                        </div>
                    </figure>
                    <div className="card-body items-center text-left">
                        <h2 className="card-title">Transactions</h2>
                            <div className="flex flex-col ">
                                <div className="overflow-x-auto">
                                    <table className="table">
                                        {/* head */}
                                        <thead>
                                        <tr>
                                            <th></th>
                                            <th>Event Name</th>
                                            <th>Transaction Date</th>
                                            <th>Total</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {/* row 1 */}
                                        {
                                            transaction.map((item: any, index: any) => {
                                                return(
                                                    <>
                                                        <tr>
                                                            <th>{index + 1}</th>
                                                            <td>{item.tickets[0].event.name}</td>
                                                            <td>{moment(item.createdAt).format('L')}</td>
                                                            <td>Rp.{item.amount.toLocaleString('id-ID')}</td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        <h2 className="card-title">Tickets</h2>
                        <div className="flex flex-col">
                            <div className="overflow-x-auto">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                    <tr>
                                        <th>Ticket ID</th>
                                        <th>Event Name</th>
                                        <th>Transaction Date</th>
                                        <th>Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {/* row 1 */}
                                    {
                                        transaction[0]?.tickets?.map((item: any, index: any) => {
                                            return(
                                                <>
                                                    <tr>
                                                        <th>{item.id}</th>
                                                        <td>{item.event.name}</td>
                                                        <td>{moment(item.createdAt).format('L')}</td>
                                                        <td>Rp.{item.price.toLocaleString('id-ID')}</td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="card-actions">
                        </div>
                    </div>
                </div>
        </>
    )
}