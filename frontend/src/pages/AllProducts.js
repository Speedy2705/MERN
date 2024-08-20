import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {
  const [openUploadProduct,setOpenUploadProduct] = useState(false)

  const [allProduct,setAllProduct] = useState([])

  const fetchAllProduct = async() => {
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()

    setAllProduct(dataResponse?.data || [] )
  }

  useEffect(()=>{
    fetchAllProduct()
  },[])

  return (
    <div>
        <div className='bg-white py-2 px-4 flex justify-between items-center drop-shadow-lg rounded-lg'>
            <h2 className='font-bold text-lg'>All Product</h2>
            <button className='border-2 py-1 rounded-full px-3 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all'
              onClick={()=>setOpenUploadProduct(true)}
            >Upload</button>
        </div>

        <div className='flex items-center flex-wrap gap-5 py-5 h-[calc(100vh-190px)] overflow-y-scroll scrollbar-none'>
          {
            allProduct.map((product,index)=>{
              return(
                  <AdminProductCard data={product} key={index+'allProduct'} fetchData={fetchAllProduct}/>
              )
            })
          }
        </div>

        {
          openUploadProduct && (
            <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
          )
        }
        
    </div>
  )
}

export default AllProducts