import { useEffect, useState } from 'react'
import axios from 'axios'

export default function OrderStatus() {
  const user = JSON.parse(localStorage.getItem('sathya_user') || 'null')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const identity = user?.id || user?._id || user?.phone || user?.mobile

  useEffect(() => {
    const params = new URLSearchParams()
    if (user?.phone || user?.mobile) params.set('phone', user.phone || user.mobile)
    if (identity) params.set('userId', identity)
    axios.get(`/api/orders${params.toString() ? `?${params}` : ''}`).then(({ data }) => setOrders(data.data || [])).catch(() => setOrders([])).finally(() => setLoading(false))
  }, [identity, user?.phone, user?.mobile])

  return <div className="store-section-page animate-fade-in"><div className="store-section-heading"><span className="badge badge-green">Order tracking</span><h1>{user?.name ? `${user.name}'s Orders` : 'Order Status'}</h1><p>{user ? `Orders linked to ${user.name}.` : 'Sign in to see orders linked to your account.'}</p></div>{loading ? <div className="empty-state"><p>Loading orders...</p></div> : orders.length ? <div className="order-status-list">{orders.map(order => <article className="store-section-card" key={order.id}><strong>{order.id}</strong><span>{order.items?.map(item => `${item.name || 'Product'} x${item.qty || 1}`).join(', ') || 'Crop inputs'}</span><small>{order.deliveryStatus || order.status || 'Confirmed'}</small></article>)}</div> : <div className="empty-state"><p>No orders found for this account yet.</p></div>}</div>
}
