'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { login, logout, isLoggedIn, deleteAccount } from '@/helpers.js'
import { LoginForm } from '@/components/Form.js'
import '@/app/globals.css'


export default function Login() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [triedDelete, setTriedDelete] = useState(false)

    useEffect(() => { setLoggedIn(isLoggedIn()) }, [])
    const handleLogin = async (json) => { setLoggedIn(await login(json.email, json.password)) }
    const handleLogout = () => { logout(); setLoggedIn(false) }
    const handleDeletion = async () => { 
        if (await deleteAccount()) handleLogout() 
        setTriedDelete(true)
        if (!loggedIn && triedDelete) 
            setTimeout(() => { setTriedDelete(false) }, 3000)
    }

    return (
        <div className='form-wrapper'>
        {!loggedIn && !triedDelete ? (<>
            <h2>Log In</h2>
            <LoginForm sendToParent={handleLogin}/>
            <p className='mt-2'>
                Do not have an account yet?&nbsp;
                <Link href='/register' className='link-text'>Register One</Link>
            </p>
        </>) : !loggedIn && triedDelete ? (<>
            <h3>Account deletion was successful</h3>
        </>) : (<>
            <h3 className='my-2'>You are Logged In</h3>
            <button className='button-style' onClick={handleLogout}>Log Out</button>
            <h3 className='my-2'>Unregister Account</h3>
            <button className='button-style bg-red-400 hover:bg-red-600' onClick={handleDeletion}>Delete Account</button>
        </>)}
        </div>
    )
}
