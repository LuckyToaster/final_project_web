'use client'

import { useRouter } from 'next/navigation'
import Button from '@/components/Button.js'

export default function Home() {
    const router = useRouter()
    const handleClick = () => {router.push('/register')}
    const mainStyle = 'flex flex-col p-8'

    return (
        <main className={mainStyle}>
            <h3>Register your first client my G</h3> 
            <Button onClick={handleClick}>Lets Get Started!</Button>
        </main>
    )
}

