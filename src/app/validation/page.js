'use client' 

import '@/app/globals.css'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ValidationForm } from '@/components/Form.js'
import { validateEmail, maskEmail } from '@/helpers.js'


export default function Validate() {
    const [isValidated, setIsValidated] = useState(false)
    const [email, setEmail] = useState('')
    const router = useRouter()

    useEffect(() => {
        const mail = localStorage.getItem('user-email')
        if (mail) setEmail(maskEmail(mail))
        else setEmail('your email')
    }, [])

    const handleValidation = async (json) => {
        await validateEmail(json.code)
        setIsValidated(true)
        setTimeout(() => { router.replace('/login')}, 5000)
    }

    return (
        <div className='form-wrapper'>
        {!isValidated ? (<>
            <h2>Enter verification code</h2>
            <p>We have just sent a code to {email}</p>
            <ValidationForm sendToParent={async (json) => await handleValidation(json)}/>
        </>) : (
            <h3>Validation Successful</h3>
        )}
        </div>
    )
}
