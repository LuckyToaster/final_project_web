'use client'

import { UserIcon, UsersIcon, KeyIcon, ArrowRightEndOnRectangleIcon, HomeIcon, UserPlusIcon } from '@heroicons/react/24/solid'
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import "./globals.css";

const geistSans = Geist({variable: "--font-geist-sans", subsets: ["latin"]})
const geistMono = Geist_Mono({variable: "--font-geist-mono", subsets: ["latin"]});


export default function RootLayout({ children }) {
    const body= `${geistSans.variable} ${geistMono.variable} antialiased bg-white h-screen flex flex-col`
    const navPageContainer= 'flex flex-1'
    const nav= "flex flex-col items-center md:w-64 px-3" 
    const page= "bg-gray-200 rounded-lg flex flex-col items-center justify-center"
    const header= 'text-3xl'
    const footer= 'text-3xl'
    const link= 'link-text rounded-md m-1 p-1 w-full active:green-bg transition-all duration-300 hover:shadow-lg hover:green-bg hover:text-white hover:scale-105 flex justify-center'
    const linkHighlight = 'green-bg text-white shadow-lg scale-105'

    const [home, setHome] = useState(link)
    const [register, setRegister] = useState(link)
    const [login, setLogin] = useState(link)
    const [clients, setClients] = useState(link)
    const [client, setClient] = useState(link)

    const path = usePathname()
    useEffect(() => {
        setHome(clsx(link, {[linkHighlight] : path === '/'}))
        setRegister(clsx(link, {[linkHighlight] : path === '/register'}))
        setLogin(clsx(link, {[linkHighlight] : path === '/login'}))
        setClients(clsx(link, {[linkHighlight] : path === '/clients'}))
        setClient(clsx(link, {[linkHighlight] : path === '/client'}))
    }, [path])

    return (
        <html lang="en">
            <body className={body}>
                <header className={header}>
                    Hello header
                </header>

                <div className={navPageContainer}>
                    <div className={nav}>
                        <Image src='/next_logo.svg' width={476} height={200} alt='logo'/>
                        <Link href='/' className={home}><HomeIcon className='w-6'/>&nbsp;Home</Link>
                        <Link href='/register' className={register}><ArrowRightEndOnRectangleIcon className='w-6'/>&nbsp;Register</Link>
                        <Link href='/login' className={login}><KeyIcon className='w-6'/>&nbsp;Log In</Link>
                        <Link href='/clients' className={clients}><UsersIcon className='w-6'/>&nbsp;Clients</Link>
                        <Link href='/client' className={client}><UserPlusIcon className='w-6'/>&nbsp;Add Client</Link>
                    </div>
                    <div className={page}>{children}</div>
                </div>

                <footer className={footer}>
                    Hello Footer
                </footer>
            </body>
        </html>
    )
} 
