
import { useState } from 'react';

export default function Modal({children, open, onClose}) {
    const openBtn = "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
    const closeBtn = "bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
    const containerDiv = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    const modalDiv = "bg-white rounded-lg p-6 w-96 max-w-full mx-4 relative flex flex-col items-center"
    const openBtnDiv = "flex w-full justify-end mb-2"  

    const handleClose = () => {
        setIsOpen(false)
        onClose?.()
    }

    const [isOpen, setIsOpen] = useState(open);
    return (
        <div className="p-4">
        {/*<button onClick={() => setIsOpen(true)} className={openBtn}>Open Modal</button>*/}
            {isOpen && (
            <div className={containerDiv}>
                <div className={modalDiv}>
                    <div className={openBtnDiv}>
                        <button onClick={handleClose} className={closeBtn}>Close</button>
                    </div>
                    {children} 
                </div>
            </div>
            )}
        </div>
    )
}
