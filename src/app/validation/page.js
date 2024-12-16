'use client' 

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { ValidationForm } from '@/components/Form.js'
import { validateEmail } from '@/helpers.js'


export default function Register() {
    const [isValidated, setIsValidated] = useState(false)
    const router = useRouter()

    const handleValidation = async (json) => {
        console.log(json)
        await validateEmail(json.code)
        setIsValidated(true)
        setTimeout(() => { router.push('/login')}, 5000)
    }

    return <> 
        {!isValidated ? (
            <ValidationForm sendToParent={async (json) => await handleValidation(json)}/>
        ) : (
            <p>Validation Successful</p>
        )}
    </>
}
