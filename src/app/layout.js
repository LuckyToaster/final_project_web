import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link'
import Image from 'next/image'

const geistSans = Geist({variable: "--font-geist-sans", subsets: ["latin"]})
const geistMono = Geist_Mono({variable: "--font-geist-mono", subsets: ["latin"]});

const bodyStyle = `${geistSans.variable} ${geistMono.variable} antialiased bg-white h-screen flex flex-col`
const navPageContainerStyle = 'flex flex-1'
const navStyle = "flex flex-col items-center md:w-64" 
const pageStyle = "bg-gray-200 rounded-lg flex flex-col items-center justify-center"

const linkStyle = 'link-text border-gray-500 border-2 rounded-md m-1 w-full active:bg-green-300'
const headerStyle = 'text-3xl'
const footerStyle = 'text-3xl'


export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={bodyStyle}>
                    <header className={headerStyle}>
                        Hello header
                    </header>

                    <div className={navPageContainerStyle}>
                        <div className={navStyle}>
                            <Image src='/next_logo.webp' width={476} height={200} alt='logo'/>
                            <Link href='/register' className={linkStyle}>Register</Link>
                            <Link href='/login' className={linkStyle}>Log In</Link>
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
