'use client'

import { useState } from 'react'
import { login } from '@/helpers.js'
import { LoginForm } from '@/components/Form.js'
import Link from 'next/link'
import '@/app/globals.css'

export default function Login() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLogin = async (json) => {
        console.log(json)
        await login(json.email, json.password)
        setIsLoggedIn(true)
    }

    return (
        <div className='form-wrapper'>
        {!isLoggedIn ? (
            <>
                <h2>Log In</h2>
                <LoginForm sendToParent={async (json) => await handleLogin(json)}/>
                <p className='mt-2'>
                    Do not have an account yet?&nbsp;
                    <Link href='/register' className='link-text'>Get Started</Link>
                </p>
            </>
        ) : (
            <p>You are Logged In</p>
        )}
        </div>
    )
}
