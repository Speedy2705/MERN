import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency'
import { MdDelete } from 'react-icons/md'

const Cart = () => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)

    const fetchData = async()=>{
        setLoading(true)
        const response = await fetch(SummaryApi.addToCartProductView.url,{
            method : SummaryApi.addToCartProductView.method,
            credentials : 'include',
            headers : {
                'content-type' : 'application/json'
            }       
        })
        setLoading(false)

        const responseData = await response.json()
        
        if (responseData.success){
            setData(responseData.data)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    const increaseQty = async(id,qty)=>{
        const response = await fetch(SummaryApi.updateCartProduct.url,{
            method : SummaryApi.updateCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(
                {
                    _id : id,
                    quantity : (qty + 1)
                }
            )
        })

        const responseData = await response.json()

        if(responseData.success){
            fetchData()
        }
    }

    const decreaseQty = async(id,qty)=>{
        if(qty >= 2){
            const response = await fetch(SummaryApi.updateCartProduct.url,{
                method : SummaryApi.updateCartProduct.method,
                credentials : 'include',
                headers : {
                    "content-type" : "application/json"
                },
                body : JSON.stringify(
                    {
                        _id : id,
                        quantity : (qty - 1)
                    }
                )
            })
    
            const responseData = await response.json()
    
            if(responseData.success){
                fetchData()
            }
        }
    }

    const deleteCartProduct = async(id)=>{
        const response = await fetch(SummaryApi.deleteCartProduct.url,{
            method : SummaryApi.deleteCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(
                {
                    _id : id,
                }
            )
        })

        const responseData = await response.json()
        
        if(responseData.success){
            fetchData()
            context.fetchUserAddToCart()
        }
    }

  return (
    <div className='container mx-auto'>
        <div className='text-center text-lg my-3'>
            {
                data.length === 0 && loading && (
                    <p className='bg-white py-5'>No Data</p>
                )
            }
        </div>
        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>

            {/**view product */}
            <div className='w-full max-w-3xl'>
                {
                    loading ? (
                        loadingCart.map(el=>{
                            return(
                                <div key={el+"Add To Cart Loading"} className='w-full bg-slate-200 h-32 my-3 border border-slate-300 animate-pulse rounded-xl'>
                                </div>
                            )
                        })
                    ) : (
                        data.map((product,index)=>{
                            return(
                                <div key={product?._id+"Add To Cart Loading"} className='w-full bg-white h-32 my-3 border border-slate-300 rounded-xl grid grid-cols-[128px,1fr]'>
                                    <div className='w-32 h-32 p-1 bg-slate-200'>
                                        <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply'/>
                                    </div>
                                    <div className='px-4 py-2 relative'>
                                        {/**delete product*/}
                                        <div className='absolute top-1 right-1 text-red-600 rounded-full p-1 text-sm hover:bg-red-600 hover:text-white transition-all cursor-pointer' onClick={()=>deleteCartProduct(product?._id)}>
                                            <MdDelete/>
                                        </div>
                                        <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                                        <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                        <div className='flex items-center gap-2 mt-1'>
                                            <button className='transition-all border border-red-600 text-red-600 w-5 h-5 flex justify-center items-center rounded-full hover:bg-red-600 hover:text-white pb-4' onClick={()=>decreaseQty(product?._id,product?.quantity)}>_</button>
                                            <span>{product?.quantity}</span>
                                            <button className='transition-all border border-red-600 text-red-600 w-5 h-5 flex justify-center items-center rounded-full hover:bg-red-600 hover:text-white pb-1' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>

            {/**summary */}
            <div className='mt-5 lg:mt-0 w-full max-w-sm'>
            {
                loading ? (
                    <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                        Total
                    </div>
                ) : (
                    <div className='h-36 bg-slate-200'>
                        Total
                    </div>
                )
            }
            </div>
            
        </div>
    </div>
  )
}

export default Cart