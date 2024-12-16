'use client'

import { useRouter } from 'next/navigation'
import Button from '@/components/Button.js'
import './globals.css'

export default function Home() {
    const router = useRouter()
    const handleClick = () => {router.push('/register')}
    return (
        <main className='flex flex-col p-8'>
            <div className='form-wrapper'>
                <h3 className='mb-4'>Register your first user</h3> 
                <Button onClick={handleClick}>Lets Get Started!</Button>
            </div>
        </main>
    )
}

