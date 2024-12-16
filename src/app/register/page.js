'use client' 

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'

import { SigninForm } from '@/components/Form.js'
import { register, isLoggedIn, maskEmail } from '@/helpers.js'
import '@/app/globals.css'

export default function Register() {
    const [registered, setRegistered] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const router = useRouter()

    useEffect(() => { setLoggedIn(isLoggedIn()) }, []) 

    const handleRegister = async (json) => {
        setRegistered(await register(json.email, json.password))
        localStorage.setItem('masked-email', maskEmail(json.email))
        setTimeout(() => { router.push('/validation')}, 4000)
    }

    return (
        <div className='form-wrapper'>
        {!registered && !loggedIn ? (<>
            <h2>Register</h2>
            <SigninForm sendToParent={async (json) => await handleRegister(json)}/>
            <p className='mt-2'>
                Already have an account?&nbsp;
                <Link href='/login' className='link-text'>Log In</Link>
            </p>
        </>) : loggedIn ? (<>
            <h3>Your account is already registered</h3>
            <Link className='button-style mt-2' href='/login'>Please log out to register an account</Link>
        </>) : (
            <h3 className='my-2'>Registration Successful, please check {}</h3>
        )}
        </div>
    )
}
