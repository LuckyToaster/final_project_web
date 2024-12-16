'use client'

import { useState } from 'react'
import { login } from '@/helpers.js'
import { LoginForm } from '@/components/Form.js'
import Link from 'next/link'

export default function Login() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLogin = async (json) => {
        console.log(json)
        await login(json.email, json.password)
        setIsLoggedIn(true)
    }

    return <>
        {!isLoggedIn ? (<>
            <LoginForm sendToParent={async (json) => await handleLogin(json)}/>
            <h4>
                Do not have an account yet?&nbsp; 
                <Link href='/register' className='text-green-500 font-bold'>Get Started</Link>
            </h4>
        </>) : (
            <p>You are Logged In</p>
        )}
    </>
}
