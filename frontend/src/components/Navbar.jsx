import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate();

    return (
        <div className='flex gap-2 justify-end p-4 z-10'>
            <button className='px-4 py-2 rounded-lg bg-white cursor-pointer'
                onClick={() => navigate('/login')}>
                login
            </button>
            <button className='px-4 py-2 rounded-lg bg-white'
                onClick={() => navigate('/register')}>
                SignUp
            </button>
            <button className='px-4 py-2 rounded-lg bg-white'
                onClick={() => navigate('/notices')}>
                Notices
            </button>
        </div>
    )
}

export default Navbar
