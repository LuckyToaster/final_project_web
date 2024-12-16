'use client' 

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { SigninForm } from '@/components/Form.js'
import { register } from '@/helpers.js'

export default function Register() {
    const [isRegistered, setIsRegistered] = useState(false)
    const router = useRouter()

    const handleRegister = async (json) => {
        await register(json.email, json.password)
        setIsRegistered(true)
        setTimeout(() => { router.push('/validation')}, 5000)
    }

    return <> 
        {!isRegistered ? (
            <SigninForm sendToParent={async (json) => await handleRegister(json)}/>
        ) : (
            <p>Registration Successful, please check your email</p>
        )}
    </>
}
