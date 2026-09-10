import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [wishlistTotal, setWishlistTotal] = useState(0)
  useEffect(() => { axios.get('/api/admin/wishlist-summary').then(({ data }) => setWishlistTotal(data.total || 0)).catch(() => {}) }, [])

  const stats = [
    { label: 'Total Revenue', value: '₹0', change: 'No sales yet', color: 'green', icon: '💰' },
    { label: 'Orders Today', value: '0', change: 'No orders yet', color: 'blue', icon: '📦' },
    { label: 'Active Products', value: '0', change: 'Catalog is empty', color: 'yellow', icon: '🌿' },
    { label: 'Subscribers', value: '0', change: 'No subscribers yet', color: 'orange', icon: '📩' },
    { label: 'Wishlist Saves', value: String(wishlistTotal), change: 'Customer interest', color: 'purple', icon: '❤️' },
    { label: 'Open Tickets', value: '0', change: 'Nothing needs attention', color: 'red', icon: '🎫' },
    { label: 'Pending Deliveries', value: '0', change: 'No deliveries yet', color: 'teal', icon: '🚚' },
  ]

  const quickLinks = [
    { icon: '✏️', label: 'Edit Live Content', sub: 'Hero, banners, advisory text', to: '/admin/cms' },
    { icon: '🌿', label: 'Manage Products', sub: 'Add, edit, toggle stock', to: '/admin/products' },
    { icon: '📦', label: 'Fulfill Orders', sub: 'Update status, assign delivery', to: '/admin/orders' },
    { icon: '📩', label: 'View Subscribers', sub: 'Advisory subscriber list', to: '/admin/subscribers' },
    { icon: '📈', label: 'Analytics', sub: 'Revenue & sales reports', to: '/admin/analytics' },
    { icon: '🎫', label: 'Support Tickets', sub: 'Field crop emergencies', to: '/admin/tickets' },
  ]

  const summaryBars = [42, 62, 58, 80, 74, 96, 88]
  const regionalDemand = [
    { city: 'Coimbatore', value: '₹18.2L', trend: '+16%' },
    { city: 'Trichy', value: '₹15.6L', trend: '+12%' },
    { city: 'Madurai', value: '₹14.1L', trend: '+9%' },
    { city: 'Erode', value: '₹12.8L', trend: '+7%' },
  ]
  const alerts = [
    { title: 'Inventory risk', text: 'CottonGuard stock below 2-days coverage', state: 'warning' },
    { title: 'Delivery SLA', text: '3 zones are above 90% on-time target', state: 'success' },
    { title: 'Renewal push', text: '12 farmers due for seasonal advisory follow-up', state: 'info' },
  ]

  return (
    <div className="animate-fade-in">
      <div className="admin-hero">
        <div>
          <div className="eyebrow">Executive overview</div>
          <h1>Admin dashboard</h1>
          <p>Welcome back, {user?.name}. Your workspace is ready for its first records.</p>
        </div>
        <div className="hero-badge-row">
          <span className="badge badge-gray">No activity yet</span>
          <span className="badge badge-blue">Awaiting records</span>
        </div>
      </div>

      <div className="stat-grid">
        {stats.map(s => (
          <div key={s.label} className={`stat-card ${s.color}`}>
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className={`stat-change ${s.change.startsWith('+') ? 'positive' : 'negative'}`}>
              {s.change.startsWith('+') ? '↑' : '↓'} {s.change} this week
            </div>
          </div>
        ))}
      </div>

      <div className="analytics-grid dashboard-insights">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Demand trend</div>
            <span className="badge badge-purple">7 days</span>
          </div>
          <div className="empty-state" style={{ padding: '28px 12px' }}><div style={{ fontSize: '2rem' }}>📊</div><p>No demand data available yet</p></div>
          <div className="mini-graph-labels">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Regional performance</div>
          </div>
          <div className="region-list">
            <div className="empty-state" style={{ padding: '20px 12px' }}><p>No regional performance data yet</p></div>
          </div>
        </div>
      </div>

      <div className="dashboard-ops-grid">
        <div className="card executive-panel">
          <div className="card-header">
            <div className="card-title">Regional demand</div>
            <span className="badge badge-gray">Empty</span>
          </div>

          <div className="city-grid">
            <div className="empty-state" style={{ gridColumn: '1 / -1', padding: '24px 12px' }}><p>Regional demand will appear after orders are created</p></div>
          </div>
        </div>

        <div className="card executive-panel">
          <div className="card-header">
            <div className="card-title">Operational alerts</div>
          </div>
          <div className="alert-list">
            <div className="empty-state" style={{ padding: '24px 12px' }}><div style={{ fontSize: '2rem' }}>✓</div><p>No operational alerts</p></div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><div className="card-title">Quick Actions</div></div>
        <div className="grid grid-3" style={{ gap: '12px' }}>
          {quickLinks.map(q => (
            <button key={q.to} onClick={() => navigate(q.to)} style={{ background: 'rgba(255,255,255,0.6)', border: '1.5px solid var(--surface-border-subtle)', borderRadius: 'var(--radius-lg)', padding: '18px', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--brand-600)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--surface-border-subtle)'}
            >
              <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: '8px' }}>{q.icon}</span>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '4px' }}>{q.label}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{q.sub}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
