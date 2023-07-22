import React from 'react'
import Form from '../Form'
import { useAppContext } from '@/context/appContext'
import { AiOutlineClose } from 'react-icons/ai'

function Modal() {
    const ctx = useAppContext()
    if (!ctx?.modalIsOpen) return <></>
    return (
        <>
            <div
                className=" bg-black bg-opacity-40 fixed top-0 left-0 right-0 bottom-0 cursor-pointer"
                onClick={() => ctx?.closeModal()}
                id="modal_layout"
            ></div>
            <div
                id="modal"
                className="bg-white rounded-lg absolute top-1/2 right-1/2 translate-x-[50%] translate-y-[-50%] p-4 min-w-[400px]"
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-xl">
                        {ctx?.modalType === 'CREATE' ? 'Create' : 'Update'}{' '}
                        Player
                    </h3>
                    <span
                        className="text-xl cursor-pointer"
                        onClick={() => ctx?.closeModal()}
                    >
                        <AiOutlineClose />
                    </span>
                </div>

                <Form />
            </div>
        </>
    )
}

export default Modal
