import React, { useEffect } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import ROLE from '../common/role'

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()

    useEffect(()=>{
       if(user?.role !== ROLE.ADMIN){
        navigate("/")
       }
    },[user])

  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
        <aside className='bg-white min-h-full w-full max-w-60 shadow-md customShadow'>
            <div className='h-36 flex justify-center items-center flex-col'>
                <div className='text-5xl cursor-pointer relative flex justify-center pb-3 mt-3'>
                {
                    user?.profilePic ? (
                    <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
                    ) : (
                    <FaRegCircleUser />
                    )
                }
                </div>
                <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                <p className='text-sm '>{user?.role}</p>
            </div>

            <div className='pt-4'>
                <nav className='grid'>
                    <Link to={"all-users"} className='px-4 py-1 hover:bg-slate-100 transition-all'>All-Users</Link>
                    <Link to={"all-products"} className='px-4 py-1 hover:bg-slate-100 transition-all'>All product</Link>
                </nav>
            </div>
        </aside>

        <main className='w-full h-full p-2'>
            <Outlet/>
        </main>
    </div>
  )
}

export default AdminPanel