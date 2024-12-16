'use client'

import Link from 'next/link'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'
import { postClient, isLoggedIn } from '@/helpers.js' 
import { NewClientForm } from '@/components/Form.js'
import Modal from '@/components/Modal.js'
import '@/app/globals.css'


export default function AddClient() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [wasAdded, setWasAdded] = useState(false) 
    
    useEffect(() => { setLoggedIn(isLoggedIn()) }, [])

    const handlePostClient = async (json) => await postClient(json) ? setWasAdded(true) : setWasAdded(false)

    return (
        <div className='form-wrapper'>
        {!loggedIn ? (<>
            <h3 className='mb-2'>You must be Logged in to add clients</h3>
            <Link href='/login' className='button-style'>Go to Log In</Link>
        </>) : !wasAdded ? (<>
            <h3>Add Client</h3>
            <NewClientForm sendToParent={handlePostClient}/>
        </>) : (
            <Modal open={true} onClose={() => setWasAdded(false)}>
                <h3 className='mb-2'>Client creation was successful</h3>
                <CheckBadgeIcon className='w-12 mb-2 text-blue-400'/>
                <Link href='/clients' className='button-style'>Go to Clients</Link>
            </Modal>
        )}
        </div>
    )
}
