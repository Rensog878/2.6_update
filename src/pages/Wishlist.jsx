import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Wishlist() {
  const [items, setItems] = useState([])
  const user = JSON.parse(localStorage.getItem('sathya_user') || 'null')
  const visitorId = localStorage.getItem('sathya_wishlist_visitor') || ''

  useEffect(() => {
    const params = new URLSearchParams({ userId: user?.id || user?._id || visitorId, phone: user?.phone || user?.mobile || '' })
    axios.get(`/api/wishlist?${params}`).then(({ data }) => setItems(data.data || [])).catch(() => setItems([]))
  }, [user?.id, user?._id, user?.phone, user?.mobile, visitorId])

  return (
    <div className="store-section-page animate-fade-in">
      <div className="store-section-heading"><span className="badge badge-green">Saved for later</span><h1>{user?.name ? `${user.name}'s Wishlist` : 'Wishlist'}</h1><p>Keep your favourite crop-care products close at hand.</p></div>
      {items.length ? <div className="wishlist-grid">{items.map(item => <Link className="store-section-card" to={`/product/${item.productId}`} key={item.productId}><strong>{item.productName || 'Saved product'}</strong><span>Product saved to your account</span><small>View product</small></Link>)}</div> : <div className="empty-state"><p>Your wishlist is empty.</p><Link className="btn btn-primary" to="/products">Browse products</Link></div>}
    </div>
  )
}
