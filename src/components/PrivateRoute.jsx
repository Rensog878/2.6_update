import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Farmers have no separate portal - the storefront homepage is their home.
const ROLE_HOME = {
  farmer: '/', admin: '/admin', employee: '/employee',
  delivery: '/delivery', billing: '/billing'
}

/**
 * PrivateRoute — protects pages by role.
 * allowedRoles: array of roles that can access. Empty = any authenticated user.
 */
export default function PrivateRoute({ children, allowedRoles = [] }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return (
    <div className="loading-screen">
      <div className="spinner spinner-lg" />
      <p>Loading Sathya Bio...</p>
    </div>
  )

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to={ROLE_HOME[user.role] || '/login'} replace />
  }

  return children
}
