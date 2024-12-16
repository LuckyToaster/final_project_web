'use client' 

import '@/app/globals.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ValidationForm } from '@/components/Form.js'
import { validateEmail } from '@/helpers.js'


export default function Validate() {
    const [isValidated, setIsValidated] = useState(false)
    const [email, setEmail] = useState(localStorage.getItem('masked-email'))
    const router = useRouter()

    const handleValidation = async (json) => {
        setIsValidated(await validateEmail(json.code))
        localStorage.removeItem('masked-email')
        setTimeout(() => { router.replace('/login')}, 3000)
    }

    return (
        <div className='form-wrapper'>
        {!isValidated ? (<>
            <h2>Enter verification code</h2>
            <p>We have just sent a code to {email ? email : "your email" }</p>
            <ValidationForm sendToParent={async (json) => await handleValidation(json)}/>
        </>) : (
            <h3>Validation Successful</h3>
        )}
        </div>
    )
}
