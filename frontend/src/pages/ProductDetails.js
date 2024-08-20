import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar, FaStarHalf } from 'react-icons/fa'
import displayINRCurrency from '../helpers/displayCurrency'
import VerticalCardProduct from '../components/VerticalCardProduct'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'

const ProductDetails = () => {
  const [data,setData] = useState({
    productName : "",
    brandName : "",
    category : "",
    productImage : [],
    description : "",
    price : "",
    sellingPrice : ""
  })
  const params = useParams()
  const [loading,setLoading] = useState(false)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage,setActiveImage] = useState("")

  const [zoomImageCoordinate,setZoomImageCoordinate] = useState({
    x : 0,
    y : 0
  })

  const [zoomImage,setZoomImage] = useState(false)

  const fetchProductDetails = async()=>{
    setLoading(true)
    const response = await fetch(SummaryApi.productDetails.url,{
      method : SummaryApi.productDetails.method,
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify({
        productId : params?.id,
      })
    })

    setLoading(false)

    const dataResponse =await response.json()

    setData(dataResponse?.data)
    setActiveImage(dataResponse?.data?.productImage[0])
  }

  useEffect(()=>{
    fetchProductDetails()
  },[])

  const handleMouseEnterProduct = (imageURL)=>{
    setActiveImage(imageURL)
  }

  const handleZoomImage = useCallback((e) =>{
    setZoomImage(true)
    const { left, top, width, height } = e.target.getBoundingClientRect()
    
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCoordinate({
      x,
      y
    })
  },[zoomImageCoordinate])

  const handleLeaveImageZoom = () => {
    setZoomImage(false)
  }

  return (
    <div className='container mx-auto p-4'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-2'>
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
          <div className='lg:h-96 lg:w-96 h-[300px] w-[300px] bg-slate-200 relative p-2'>
            <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}/>

            {
              zoomImage && (
                <div className='hidden lg:block absolute min-w-[500px] min-h-[400px] overflow-hidden bg-slate-200 p-1 -right-[510px] top-0'>
                  <div
                    className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                    style={{
                      backgroundImage : `url(${activeImage})`,
                      backgroundRepeat : 'no-repeat',
                      backgroundPosition : `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                    }}>

                  </div>
                </div>
              )
            }

          </div>
          <div className='h-full'>
            {
              loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    productImageListLoading.map(el=>{
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"}>
    
                        </div>
                      )
                    })
                  }
                </div>
              ) : (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data?.productImage.map((imgURL,index)=>{
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgURL}>
                          <img src={imgURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={()=>handleMouseEnterProduct(imgURL)} onClick={()=>handleMouseEnterProduct(imgURL)}/>
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        </div>
        {
          loading ? (
            <div className='flex flex-col gap-2 w-80'>
              <p className='bg-slate-200 animate-pulse h-6 rounded-full w-full lg:mt-0 mt-4'></p>
              <h2 className='text-2xl lg:text-4xl font-semibold h-8 bg-slate-200 animate-pulse w-full rounded-full'></h2>
              <p className='capitalize bg-slate-200 min-w-[100px] animate-pulse h-5 rounded-full'></p>
              <div className='bg-slate-200 h-5 animate-pulse rounded-full flex items-center gap-1 w-full'>
              </div>
              <div className='flex items-center gap-2 text-2xl font-medium my-2 lg:text-3xl'>
                <p className='bg-slate-200 h-8 w-full animate-pulse rounded-full'></p>
              </div>
              <div className='flex items-center gap-3 my-2'>
                <button className='h-10 bg-slate-200 w-full animate-pulse rounded-full'></button>
                <button className='h-10 bg-slate-200 w-full animate-pulse rounded-full'></button>
              </div>
            <div>
              <p className='text-slate-600 font-medium my-1'>Description :</p>
              <p className='bg-slate-200 h-24 animate-pulse rounded-lg'></p>
            </div>
            </div>
          ) : (
            <div className='flex flex-col gap-1'>
            <p className='bg-red-200 text-red-600 px-2 rounded-full w-fit lg:mt-0 mt-4'>{data?.brandName}</p>
            <h2 className='text-2xl lg:text-4xl font-semibold '>{data?.productName}</h2>
            <p className='capitalize text-slate-400'>{data?.category}</p>
            <div className='text-red-600 flex items-center gap-1'>
              <FaStar/>
              <FaStar/>
              <FaStar/>
              <FaStar/>
              <FaStarHalf/>
            </div>
            <div className='flex items-center gap-2 text-2xl font-medium my-2 lg:text-3xl'>
              <p className='text-red-600'>{displayINRCurrency(data?.sellingPrice)}</p>
              <p className='text-slate-400 line-through'>{displayINRCurrency(data?.price)}</p>
            </div>
            <div className='flex items-center gap-3 my-2'>
              <button className='border-2 border-red-700 rounded px-3 py-1 min-w-[120px] text-red-600 transition-all font font-medium hover:bg-red-700 hover:text-white'>Buy</button>
              <button className='border-2 border-red-600 hover:border-red-700 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:bg-red-800'>Add to Cart</button>
            </div>
            <div>
              <p className='text-slate-600 font-medium my-1'>Description :</p>
              <p>{data?.description}</p>
            </div>
            </div>
          )
        }
      </div>

      {
        data?.category && (
          <CategoryWiseProductDisplay category={data?.category} heading={"Recommended Product"}/>
        )
      }

    </div>
  )
}

export default ProductDetails