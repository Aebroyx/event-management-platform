import Image from 'next/image'
import { FaCalendar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";


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
            <Image src={`http://localhost:8000/public/image/${events.eventImages[0].url}`} width={1000} height={600} alt={events.name}></Image>
        </div>
        <div className='flex flex-col py-10 px-5 gap-5'>
            <h1 className='text-3xl font-bold'>{events.name}</h1>
            <div className='flex gap-2'>
                <FaCalendar className='text-2xl'/>
                <span className='text-xl'>{events.startDate} - {events.endDate}</span>
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
                        
                        <button className='btn btn-primary'>Buy Ticket(s)</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}