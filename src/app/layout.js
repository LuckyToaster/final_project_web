'use client'

import { UserIcon, UsersIcon, KeyIcon } from '@heroicons/react/24/solid'
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
    const bodyStyle = `${geistSans.variable} ${geistMono.variable} antialiased bg-white h-screen flex flex-col`
    const navPageContainerStyle = 'flex flex-1'
    const navStyle = "flex flex-col items-center md:w-64 px-3" 
    const pageStyle = "bg-gray-200 rounded-lg flex flex-col items-center justify-center"
    const headerStyle = 'text-3xl'
    const footerStyle = 'text-3xl'
    const linkStyle = 'link-text rounded-md m-1 p-1 w-full active:green-bg hover:green-bg hover:text-white flex justify-center'
    const linkHighlight = 'green-bg text-white'

    const [registerStyle, setRegisterStyle] = useState(linkStyle)
    const [loginStyle, setLoginStyle] = useState(linkStyle)
    const [clientsStyle, setClientsStyle] = useState(linkStyle)

    const path = usePathname()
    useEffect(() => {
        setRegisterStyle(clsx(linkStyle, {[linkHighlight] : path === '/register'}))
        setLoginStyle(clsx(linkStyle, {[linkHighlight] : path === '/login'}))
        setClientsStyle(clsx(linkStyle, {[linkHighlight] : path === '/clients'}))
    }, [path])

    return (
        <html lang="en">
            <body className={bodyStyle}>
                <header className={headerStyle}>
                    Hello header
                </header>

                <div className={navPageContainerStyle}>
                    <div className={navStyle}>
                        <Image src='/next_logo.webp' width={476} height={200} alt='logo'/>
                            
                        <Link href='/register' className={registerStyle}>
                            
                            Register
                        </Link>
                        <Link href='/login' className={loginStyle}>
                            <KeyIcon className='w-6'/>&nbsp;
                            Log In
                        </Link>
                        <Link href='/clients' className={clientsStyle}>
                            <UsersIcon className='w-6'/>&nbsp;
                            Clients
                        </Link>
                    </div>
                    <div className={pageStyle}>{children}</div>
                </div>

                <footer className={footerStyle}>
                    Hello Footer
                </footer>
            </body>
        </html>
    )
} 
