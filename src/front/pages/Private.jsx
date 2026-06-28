import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Private = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) { navigate('/login'); return }
    }, [])

  return (
    <div>Esta pagina es privada</div>
  )
}
