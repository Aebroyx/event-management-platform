import Image from 'next/image';
import Link from 'next/link';

const fetchEvents = async() => {
    try {
        const res = await fetch('http://localhost:8000/events/', {
            method: 'GET', cache: 'no-store'
        })
        return res.json()
    } catch (error) {
        return error
    }
}

export const EventCard = async() => {
    const {data: events} = await fetchEvents()
    return (
        <>
        <h1 className='text-3xl font-bold py-10'>Upcoming Events</h1>
            <div className='flex flex-wrap gap-5'>
            {
                events.map((item: any, index: any) => {
                    return(
                        <>
                            <Link href={`/events/${item.id}`}>
                                <div className="card w-96 bg-base-100 shadow-xl">
                                    <figure className='avatar'>
                                        <Image className=' max-h-[300px] max-w-[380px] rounded' src={`http://localhost:8000/public/image/${item.eventImages[0].url}`} alt={item.name} width={300} height={300}></Image>
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title">
                                        {item.name}
                                        </h2>
                                        <p>{item.description}</p>
                                        <div className="card-actions justify-end">
                                            {
                                                item.eventCategories.map((item: any, index: any) => {
                                                    return(
                                                        <div className="badge badge-outline">{item.category.name}</div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </>
                    )
                })
            }
            </div>
        </>
    )
}