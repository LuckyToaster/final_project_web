'use client'

import { useState, useEffect } from 'react'
import { isLoggedIn, getClients } from '@/helpers.js'
import Link from 'next/link'
import './globals.css'


export default function Home() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [nClients, setNClients] = useState(null)

    useEffect(() => { 
        setLoggedIn(isLoggedIn()) 
        if (loggedIn)
            (async () => { const json = await getClients(); Array.isArray(json) ? setNClients(json.length) : setNClients(0)})()
    }, [])

    return (
        <main className='flex flex-col'>
            <div className='form-wrapper'>
            {!loggedIn ? (<>
                <h3 className='mb-4'>Register your user</h3> 
                <Link className='button-style' href='/register'>Lets Get Started!</Link>
            </>) : nClients === 0 ? (<>
                <h3 className='mb-4'>Add your first client </h3>
                <Link className='button-style' href='/clients'>Lets Get Started!</Link>
            </>) : (<>
                <h3 className='mb-4'>Add more clients </h3>
                <Link className='button-style' href='/clients'>Lets go!</Link>
            </>)}
            </div>
        </main>
    )
}

