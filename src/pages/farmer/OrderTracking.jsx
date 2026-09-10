import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const STEPS = ['Confirmed', 'Dispatched', 'Out for Delivery', 'Delivered']

export default function OrderTracking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    axios.get('/api/orders').then(({ data }) => {
      setOrder((data.data || []).find(item => item.id === id) || null)
    }).catch(() => setOrder(null))
  }, [id])

  if (!order) return <div className="empty-state"><h3>Order not found</h3><button className="btn btn-secondary" onClick={() => navigate('/farmer/orders')}>Back to orders</button></div>

  const currentStatus = order.deliveryStatus || order.status || 'Confirmed'
  const currentIndex = Math.max(0, STEPS.indexOf(currentStatus))
  const expected = order.expectedDeliveryDate ? new Date(order.expectedDeliveryDate).toLocaleDateString('en-IN') : 'Updated by delivery partner'

  return (
    <div className="animate-fade-in">
      <div className="page-header"><div><h1>Order {order.id}</h1><p>Delivery progress and expected arrival</p></div><button className="btn btn-secondary" onClick={() => navigate('/farmer/orders')}>← Back</button></div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}><strong>{order.customerName || 'Farmer Customer'}</strong><strong style={{ color: 'var(--brand-400)' }}>₹{Number(order.total || order.amount || 0).toLocaleString()}</strong></div>
        <p style={{ color: 'var(--text-muted)', margin: '8px 0 22px' }}>Expected delivery: <strong>{expected}</strong></p>
        <div style={{ display: 'grid', gap: 14 }}>{STEPS.map((step, index) => <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 12, color: index <= currentIndex ? 'var(--brand-400)' : 'var(--text-muted)', fontWeight: index <= currentIndex ? 700 : 500 }}><span style={{ width: 28, height: 28, borderRadius: '50%', display: 'grid', placeItems: 'center', background: index <= currentIndex ? 'var(--brand-700)' : 'var(--dark-700)' }}>{index < currentIndex ? '✓' : index + 1}</span><span>{step}</span></div>)}</div>
        <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--surface-border-subtle)' }}><strong>Delivery partner:</strong> {order.assignedDeliveryBoy || 'Being assigned'}</div>
      </div>
    </div>
  )
}
