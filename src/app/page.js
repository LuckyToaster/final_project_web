import Link from 'next/link'
import './globals.css'

export default function Home() {
    return (
        <main className='flex flex-col'>
            <div className='form-wrapper'>
                <h3 className='mb-4'>Register your user</h3> 
                <Link className='button-style' href='/register'>Lets Get Started!</Link>
            </div>
        </main>
    )
}

