import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function FarmerDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [cart, setCart] = useState([])

  useEffect(() => {
    axios.get('/api/cart')
      .then(r => setCart(Array.isArray(r.data?.data) ? r.data.data : []))
      .catch(() => {})
  }, [])

  const quickLinks = [
    { icon: '🌿', label: 'Browse Products', sub: 'Shop pesticides & fertilizers', to: '/farmer/products', color: 'green' },
    { icon: '🛒', label: 'My Cart', sub: `${cart.length} items ready`, to: '/farmer/cart', color: 'blue' },
    { icon: '📦', label: 'My Orders', sub: 'Track your deliveries', to: '/farmer/orders', color: 'yellow' },
    { icon: '🌾', label: 'Crop Advisory', sub: 'Get personalized recommendations', to: '/farmer/advisory', color: 'teal' },
  ]

  return (
    <div className="animate-fade-in">
      {/* Welcome */}
      <div style={{
        background: 'linear-gradient(135deg, var(--dark-700), var(--dark-600))',
        border: '1px solid var(--surface-border-subtle)',
        borderRadius: 'var(--radius-xl)',
        padding: '28px',
        marginBottom: '28px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: -20, top: -20, fontSize: '8rem', opacity: 0.07 }}>🌾</div>
        <h1 style={{ fontSize: '1.6rem', marginBottom: '6px' }}>
          Namaste, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.95rem' }}>
          Welcome to Sathya Bio — your trusted source for premium crop protection inputs.
        </p>
        <button className="btn btn-primary btn-lg" onClick={() => navigate('/farmer/products')}>
          🌿 Shop Products
        </button>
      </div>

      {/* Stats */}
      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
        <div className="stat-card green">
          <div className="stat-icon green">🛒</div>
          <div className="stat-value">{cart.length}</div>
          <div className="stat-label">Items in Cart</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-icon blue">📦</div>
          <div className="stat-value">0</div>
          <div className="stat-label">Active Orders</div>
        </div>
        <div className="stat-card yellow">
          <div className="stat-icon yellow">🌾</div>
          <div className="stat-value">{user?.landAcres || user?.acreage || 0}</div>
          <div className="stat-label">Acres Registered</div>
        </div>
        <div className="stat-card teal">
          <div className="stat-icon teal">🎫</div>
          <div className="stat-value">0</div>
          <div className="stat-label">Open Tickets</div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Quick Actions</div>
            <div className="card-subtitle">Everything you need, one click away</div>
          </div>
        </div>
        <div className="grid grid-2" style={{ gap: '12px' }}>
          {quickLinks.map(q => (
            <button key={q.to} onClick={() => navigate(q.to)} style={{
              background: 'var(--dark-800)',
              border: '1.5px solid var(--surface-border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '18px',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--brand-600)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--surface-border-subtle)'}
            >
              <span style={{ fontSize: '2rem' }}>{q.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '4px' }}>{q.label}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{q.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
