import React from 'react'
import Sidebar from './components/Sidebar'

const Layout = ({ children }) => {

    return (
        <div className='flex'>
            <div className='h-screen p-3 pl-6 w-36 overflow-y-auto overflow-x-hidden bg-[#1E1E1E]'>
                <Sidebar />
            </div>
            <div className='p-3 overflow-auto h-screen w-full bg-[#1E1E1E]'>
                {children}
            </div>
        </div>
    )
}

export default Layout