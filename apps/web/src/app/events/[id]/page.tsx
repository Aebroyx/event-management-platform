import Image from 'next/image'
import { FaCalendar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Review } from '@/components/Review';
import { FaUser, FaStar } from "react-icons/fa";
import moment from 'moment';
import { PurchaseTix } from '@/components/PurchaseTix';

const fetchEventById = async({id}: any) => {
    try {
        const res = await fetch(`http://localhost:8000/events/${id}`, {
            method: 'GET', cache: 'no-store'
        })
        return res.json()
    } catch (error) {
        return error
    }
}
export default async function Page({params}: any) {
    const {data: events} = await fetchEventById(params)

    return(
        <>
            <div className='flex justify-center'>
                <Image src={`http://localhost:8000/public/image/${events.eventImages[0].url}`} width={600} height={600} alt={events.name}></Image>
            </div>
            <div className='flex flex-col py-10 px-5 gap-5'>
                <h1 className='text-3xl font-bold'>{events.name}</h1>
                <div className='flex gap-2'>
                    <FaCalendar className='text-2xl'/>
                    <span className='text-xl'>{moment(events.startDate).format('L')} - {moment(events.endDate).format('L')}</span>
                </div>
                <div className='flex gap-2'>
                    <FaLocationDot className='text-2xl'/>
                    <span className='text-xl'>{events.location}</span>
                </div>
            </div>

            <div className="collapse bg-base-200">
                <input type="checkbox" /> 
                <div className="collapse-title text-xl font-medium">
                    Description
                </div>
                <div className="collapse-content"> 
                    <p>{events.description}</p>
                </div>
            </div>
            <div className="collapse bg-base-100">
                <input type="checkbox" /> 
                <div className="collapse-title text-xl font-medium">
                    Buy Ticket
                </div>
                <div className="collapse-content"> 
                    <div className='outline outline-offset-2 outline-2 rounded-lg'>
                        <p className='text-2xl pt-6 px-4'>{events.name}</p>
                        <br/>
                        <br/>
                        <hr/>
                        <div className='flex justify-between py-6 px-4'>
                            <p className='text-2xl font-bold'>Rp.{events.price.toLocaleString('id-ID')}</p>
                            <PurchaseTix id={events.id}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-base-200'>
                <h1 className='text-2xl pl-4 pt-4'>Reviews</h1>
                {
                    events.reviews.map((review: any) => {
                        return(
                            <>
                                <div className='flex flex-col mx-4 my-4 pb-8'>
                                    <div className="card card-side bg-base-100 shadow-xl">
                                        <figure className='px-10 py-10'>
                                            <FaUser className='text-3xl'/>
                                            <h2 className='pl-4 pt-8'>{review.user.username}</h2>
                                        </figure>
                                        <div className="card-body">
                                            <span className="badge badge-lg">
                                                <div className='flex gap-2'>
                                                    <FaStar className="text-yellow-400 text-xl pt-1"/>
                                                    {review.rating}/5
                                                </div>
                                            </span>
                                            <p className='text-md pt-4'>{review.comment}</p>
                                            <div className="card-actions justify-end">
                                                <div>
                                                    <p className='text-sm'>{moment(review.createdAt).format('L')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </div>
            <div className='mt-8 bg-base-100'>
                <Review eventId={events.id}/>
            </div>
        </>
    )
}