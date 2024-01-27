'use server'
import { cookies } from 'next/headers'

export async function setCookies(data: any){
    cookies().set('userData', data)
    console.log(data)
}

export async function getCookies() {
    const cookieStore = cookies()
    return cookieStore.get('userData')
}

export async function delCookies() {
    cookies().delete('userData')
}