import React, { useState } from 'react'
import { MdModeEditOutline } from 'react-icons/md'
import AdminEditProduct from './AdminEditProduct'
import displayINRCurrency from '../helpers/displayCurrency'

const AdminProductCard = ({
    data,
    fetchData
}) => {
  const [editProduct,setEditProduct] = useState(false)

  return (
    <div className='bg-white p-4 relative rounded-2xl shadow-xl'>
      <div className='w-40'>
        <div className='w-32 h-32 flex justify-center items-center'>
          <img src={data?.productImage[0]} className='mx-auto object-fill h-full'/>
        </div>
        <h1 className='text-ellipsis line-clamp-1'>{data.productName}</h1>

        <div>

          <p className='font-semibold'>
            {
              displayINRCurrency(data.sellingPrice)
            }
          </p>

          <div className='absolute transition-all bottom-3 right-3 p-2 hover:text-white hover:bg-green-600 rounded-full text-sm text-green-700 bg-white cursor-pointer hover:shadow-xl' onClick={()=>setEditProduct(true)}>
            <MdModeEditOutline/>
          </div>
        </div>

      </div>

      {
        editProduct && (
          <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchData={fetchData}/>
        )
      }

    </div>
  )
}

export default AdminProductCard