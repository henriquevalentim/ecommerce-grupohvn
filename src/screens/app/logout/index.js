import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
  const navigate = useNavigate()
  useEffect(() => {
    localStorage.removeItem('email')
    localStorage.removeItem('name')
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('id')
    localStorage.removeItem('token')
    navigate('/')
  }, [])

  return <p>deslogando</p>
}
