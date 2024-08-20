import React from 'react'
import { CgClose } from 'react-icons/cg'

const DisplayImage = ({
    imgUrl,
    onClose
}) => {
  return (
    <div className='fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center backdrop-blur-sm'>
        <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-4'>
            <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                <CgClose/>
            </div>
            <div className='flex justify-center p-4 max-h-[80vh] max-w-[80vh]'>
                <img src={imgUrl} className='w-full h-full'/>
            </div>
        </div>
    </div>
  )
}

export default DisplayImage