'use client' 

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { SigninForm } from '@/components/Form.js'
import { register } from '@/helpers.js'
import '@/app/globals.css'

export default function Register() {
    const [isRegistered, setIsRegistered] = useState(false)
    const router = useRouter()

    const handleRegister = async (json) => {
        await register(json.email, json.password)
        setIsRegistered(true)
        localStorage.setItem('user-email', json.email)
        setTimeout(() => { router.push('/validation')}, 4000)
    }

    return (
        <div className='form-wrapper'>
        {!isRegistered ? (<>
            <h2>Register</h2>
            <SigninForm sendToParent={async (json) => await handleRegister(json)}/>
        </>) : (
            <p>Registration Successful, please check your email</p>
        )}
        </div>
    )
}
