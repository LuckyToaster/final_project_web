'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import '@/app/globals.css'
import { getClients, isLoggedIn } from '@/helpers.js'

export default function Clients() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [clients, setClients] = useState(null)

    useEffect(() => { 
        setLoggedIn(isLoggedIn())
        if (loggedIn) (async () => { const json = await getClients(); setClients(json) })() 
    }, [loggedIn]) 

    const list = 'flex flex-col md:w-64 px-3'
    const div = 'bg-white rounded-lg p-2 m-2 transition-all duration-300 hover:shadow-lg hover:scale-105'

    return (<>
        {loggedIn ? (
            <div className={list}>
                {Array.isArray(clients) && clients.map((c) => (
                    <div className={div} key={c._id}>
                        <h3>{c.name}</h3>
                        <p>{c.cif}</p>
                    </div>
                ))}
            </div>
        ) : (
            <div className='form-wrapper'>
                <h3 className='mb-2'>You must be Logged in to view clients</h3>
                <Link href='/login' className='button-style'>Go to Log In</Link>
            </div>
        )}
    </>)
}
