import React from 'react'
import { useAuth } from '~/contexts/AuthContext'

const Navbar = () => {
    const {logout} = useAuth()
    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
                Logout
            </button>
        </div>
  )
}

export default Navbar