import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const RootLayout = () => {
    return (
        <div >
            <div className='w-full'>
                <Header/> {/*Các compont chung */}
            </div>

            <Outlet /> {/*các component ở giữa */}


        </div>
    )
}

export default RootLayout