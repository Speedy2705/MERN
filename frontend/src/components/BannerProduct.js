import React, { useEffect, useState } from 'react'

import image1 from '../assest/banner/img1.webp'
import image2 from '../assest/banner/img2.webp'
import image3 from '../assest/banner/img3.jpg'
import image4 from '../assest/banner/img4.jpg'
import image5 from '../assest/banner/img5.webp'

import image1Mobile from '../assest/banner/img1_mobile.jpg'
import image2Mobile from '../assest/banner/img2_mobile.webp'
import image3Mobile from '../assest/banner/img3_mobile.jpg'
import image4Mobile from '../assest/banner/img4_mobile.jpg'
import image5Mobile from '../assest/banner/img5_mobile.png'

import { FaAngleRight } from 'react-icons/fa6'
import { FaAngleLeft } from 'react-icons/fa6'

const BannerProduct = () => {

    const [currentImage,setCurrentImage] = useState(0)

    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]
    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ]

    const nextImage = ()=>{
        if(desktopImages.length > (currentImage + 1)){
            setCurrentImage(preve => preve + 1)
        }
    }

    const previousImage = ()=>{
        setCurrentImage(preve => preve - 1)
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(desktopImages.length > (currentImage + 1)){
                nextImage()
            }else {
                setCurrentImage(0)
            }
        },5000)

        return ()=> clearInterval(interval)
    },[currentImage])

  return (
    <div className='container mx-auto px-4 rounded-lg group'>
        <div className='h-56 md:h-72 w-full bg-slate-200 relative'>
            <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                <div className='w-full flex justify-between text-2xl md:text-5xl'>
                    <button onClick={previousImage} className='text-slate-400 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity'><FaAngleLeft/></button>
                    <button onClick={nextImage} className='text-slate-400 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity'><FaAngleRight/></button>
                </div>
            </div>
            <div className='hidden md:flex h-full w-full overflow-hidden'>
            {
                desktopImages.map((imageURL,index)=>{
                    return(
                        <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{transform : `translateX(-${currentImage*100}%)`}}>
                            <img src={imageURL} className='w-full h-full'/>
                        </div>
                    )
                })
            }
            </div>
            <div className='flex h-full w-full overflow-hidden md:hidden'>
            {
                mobileImages.map((imageURL,index)=>{
                    return(
                        <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{transform : `translateX(-${currentImage*100}%)`}}>
                            <img src={imageURL} className='w-full h-full object-cover'/>
                        </div>
                    )
                })
            }
            </div>
        </div>
    </div>
  )
}

export default BannerProduct