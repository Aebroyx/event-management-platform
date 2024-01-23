import Image from 'next/image'
import styles from './page.module.css'
import { Carousel } from '@/components/Carousel'
import { EventCard } from '@/components/EventCard'

export default function Home() {
  return (
    <main className={styles.main}>
      <Carousel/>
      <EventCard/>
    </main>
  )
}
