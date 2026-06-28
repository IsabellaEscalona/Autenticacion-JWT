import React, { useState } from 'react'
import { useNavigate, Link, Navigate } from "react-router-dom"

export const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log()

    setError('')
    if (username == ''){
      setError('El nombre de usuario es obligatorio')
      return 
    }

    if (email == ''){
      setError('El email es obligatorio')
      return 
    }

    if (password == ''){
      setError('La contraseña es obligatorio')
      return 
    }

    if (password.length < 6){
      setError('La constraseña debe ser de 6 caracteres o más')
      return 
    }

    if (password !== confirmPassword){
      setError('La contraseñas deben ser iguales.')
      return 
    }
    
    console.log(username)
    console.log(email)
    console.log(password)


    const resp = await fetch(import.meta.env.VITE_BACKEND_URL + 'api/signup', {
       
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({username: username, email: email, password: password})

    })

    if (resp.ok){
      navigate('/login')
    } else {
      const data = await resp.json()
      setError(data.error || 'Algo ha salido mal, por favor intentelo de nuevo')
    }

  }
  

  return (
    <>

      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}>
        <div
          className="p-4 rounded-4 shadow"
          style={{ backgroundColor: "#1e1e2e", width: "100%", maxWidth: "420px" }}>

          <div className="text-center mb-4">
            <h4>Sign Up</h4>
            <p className="text-secondary mb-0">Crea tu cuenta</p>
          </div>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <div className="mb-3">
            <label className="form-label text-secondary">Usuario</label>
            <input
              type="text"
              className="form-control border-secondary"
              placeholder="nombre de usuario"
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-secondary">Email</label>
            <input
              type="email"
              className="form-control border-secondary"
              placeholder="ejemplo@email.com"
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-secondary">Contraseña</label>
            <input
              type="password"
              className="form-control border-secondary"
              placeholder="********"
              onChange={e => setPassword(e.target.value)}
            />
            <small className="text-secondary d-block mb-1" style={{ fontSize: "0.89rem" }}>
              Mínimo 6 caracteres
            </small>
          </div>
          <div className="mb-4">
            <label className="form-label text-secondary">Confirmar contraseña</label>
            <input
              type="password"
              className="form-control border-secondary"
              placeholder="********"
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100 fw-bold mt-3" onClick={handleSubmit}>
            Registrarse
          </button>
          <p className="text-center text-secondary mt-3 mb-0" style={{ fontSize: "0.9rem" }}>
            ¿Tienes cuenta?{" "}
            <Link to="/login" >Inicia sesión</Link>
          </p>
        </div>
      </div>

    </>
  )
}
