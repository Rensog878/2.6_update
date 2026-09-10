import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function FarmerOrders() {
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()
  useEffect(() => { axios.get('/api/orders').then(({ data }) => setOrders(data.data || [])).catch(() => setOrders([])) }, [])

  return (
    <div className="animate-fade-in">
      <div className="page-header"><h1>📦 My Orders</h1><p>Track delivery progress and expected arrival</p></div>
      {!orders.length ? <div className="empty-state"><div className="empty-state-icon">📦</div><h3>No orders yet</h3><p>Your orders will appear here after you place them from the store.</p></div> : <div style={{ display: 'grid', gap: 14 }}>{orders.map(order => <button key={order.id} className="card" style={{ textAlign: 'left', cursor: 'pointer' }} onClick={() => navigate(`/farmer/orders/${order.id}`)}><div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}><strong style={{ color: 'var(--brand-400)' }}>{order.id}</strong><span className="badge badge-blue">{order.deliveryStatus || order.status || 'Confirmed'}</span></div><div style={{ marginTop: 8 }}>{order.items?.map(item => `${item.name} x${item.qty || 1}`).join(', ') || 'Crop inputs'}</div><div style={{ color: 'var(--text-muted)', marginTop: 6 }}>Expected: {order.expectedDeliveryDate ? new Date(order.expectedDeliveryDate).toLocaleDateString('en-IN') : 'To be updated'} · View progress →</div></button>)}</div>}
    </div>
  )
}
