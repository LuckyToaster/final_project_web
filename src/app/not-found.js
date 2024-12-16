import './globals.css'
import Link from 'next/link'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'

export default function NotFound() {
    return (
        <div className='form-wrapper'>
            <h1 className='text-red'>404 NOT FOUND</h1>
            <ExclamationCircleIcon className='text-red' width='70' height='70'/>
            <h3 className='text-red'>The page you are looking for does not exist</h3>
            <Link href='/' className='button-style mt-2'>Go Home</Link>
        </div>
    )
}

