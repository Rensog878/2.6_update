import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import { ShoppingCart, Eye, Heart, Search } from 'lucide-react'

// Cart lives on the server against the signed-in user's account.
const saveCart = (items) => axios.put('/api/cart', { items }).catch(() => {})

const CATEGORIES = ['All', 'Fungicide', 'Insecticide', 'Herbicide', 'Bio-Pesticide', 'Fertilizer', 'PGR', 'Adjuvant']

const SAMPLE_PRODUCTS = [
  { _id:'p1', name:'BlastShield 75 WP', category:'Fungicide', price:480, mrp:650, stock:320, badge:'bestseller', rating:4.8, reviews:234, crops:['Paddy','Rice'], description:'Controls rice blast & sheath blight. Tricyclazole 75% WP. 1kg treats 1 acre.', emoji:'🍄', discount:26 },
  { _id:'p2', name:'RootVigor Gold', category:'Bio-Pesticide', price:890, mrp:1100, stock:180, badge:'organic', rating:4.7, reviews:189, crops:['All Crops'], description:'Bio-stimulant with Trichoderma viride. Enhances root health & plant immunity.', emoji:'🌱', discount:19 },
  { _id:'p3', name:'CottonGuard 20 EC', category:'Insecticide', price:620, mrp:780, stock:95, badge:'new', rating:4.6, reviews:76, crops:['Cotton','Vegetables'], description:'Broad spectrum insecticide for sucking pests. Imidacloprid 20% EC.', emoji:'🦟', discount:21 },
  { _id:'p4', name:'WheatMax NPK', category:'Fertilizer', price:1200, mrp:1450, stock:0, badge:'', rating:4.5, reviews:312, crops:['Wheat','Rabi Crops'], description:'Balanced NPK 19:19:19 water soluble fertilizer for drip irrigation.', emoji:'🌾', discount:17 },
  { _id:'p5', name:'TomatoSaver FC', category:'Fungicide', price:340, mrp:420, stock:210, badge:'', rating:4.4, reviews:98, crops:['Tomato','Potato','Vegetables'], description:'Mancozeb 75% WP for early and late blight in tomatoes.', emoji:'🍅', discount:19 },
  { _id:'p6', name:'AquaKing Spreader', category:'Adjuvant', price:260, mrp:320, stock:450, badge:'', rating:4.3, reviews:67, crops:['All Crops'], description:'Non-ionic spreader sticker. Improves pesticide coverage by 40%.', emoji:'💧', discount:19 },
  { _id:'p7', name:'SugarcanePro S', category:'Insecticide', price:780, mrp:950, stock:60, badge:'', rating:4.7, reviews:145, crops:['Sugarcane'], description:'Pyrilla and early shoot borer management. Chlorpyrifos 50% EC.', emoji:'🎋', discount:18 },
  { _id:'p8', name:'BioNeem Gold', category:'Bio-Pesticide', price:390, mrp:490, stock:380, badge:'organic', rating:4.8, reviews:276, crops:['Vegetables','Fruits','Flowers'], description:'Cold-pressed neem oil 10000 PPM. Controls over 200 insect species.', emoji:'🌿', discount:20 },
  { _id:'p9', name:'CornBooster PGR', category:'PGR', price:550, mrp:720, stock:120, badge:'', rating:4.5, reviews:54, crops:['Maize','Corn'], description:'Plant growth regulator with cytokinin + auxin blend. Increases yield by 25%.', emoji:'🌽', discount:24 },
  { _id:'p10', name:'WeedClear Plus', category:'Herbicide', price:420, mrp:520, stock:210, badge:'new', rating:4.4, reviews:88, crops:['Paddy','Wheat'], description:'Post-emergence herbicide for narrow leaf weeds. Bispyribac-sodium 10% SC.', emoji:'🌱', discount:19 },
  { _id:'p11', name:'FruitGlow Boron', category:'Fertilizer', price:680, mrp:850, stock:145, badge:'', rating:4.6, reviews:123, crops:['Mango','Citrus','Fruits'], description:'Boron 20% solubor. Prevents hollow heart and improves fruit set.', emoji:'🍋', discount:20 },
  { _id:'p12', name:'PotatoShield M45', category:'Fungicide', price:310, mrp:390, stock:260, badge:'bestseller', rating:4.7, reviews:201, crops:['Potato','Tomato'], description:'Mancozeb 75% WP broad spectrum protective fungicide.', emoji:'🥔', discount:21 },
]

export default function FarmerProducts() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts]   = useState(SAMPLE_PRODUCTS)
  const [search, setSearch]       = useState('')
  const [category, setCategory]   = useState('All')
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist]   = useState([])
  const [adding, setAdding]       = useState(null)

  useEffect(() => {
    // Try to fetch real products from API, fallback to sample data
    axios.get('/api/products').then(r => { if (r.data?.products?.length) setProducts(r.data.products) }).catch(() => {})
    axios.get('/api/cart').then(r => setCart(Array.isArray(r.data?.data) ? r.data.data : [])).catch(() => {})
    const user = JSON.parse(localStorage.getItem('sathya_user') || 'null')
    let visitorId = localStorage.getItem('sathya_wishlist_visitor')
    if (!visitorId) { visitorId = `visitor-${Date.now()}`; localStorage.setItem('sathya_wishlist_visitor', visitorId) }
    axios.get('/api/wishlist', { params: { userId: user?.id || user?._id || visitorId, phone: user?.phone || user?.mobile || '' } }).then(({ data }) => setWishlist((data.data || []).map(item => item.productId))).catch(() => {})
  }, [])

  const filtered = products.filter(p => {
    const matchCat = category === 'All' || p.category === category
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.description?.toLowerCase().includes(search.toLowerCase()) ||
                        p.crops?.some(c => c.toLowerCase().includes(search.toLowerCase()))
    return matchCat && matchSearch
  })

  const addToCart = (product) => {
    if (product.stock === 0) { toast.error('Out of stock'); return }
    const productId = product._id || product.id
    setAdding(productId)
    const updated = cart.map(i => ({ ...i }))
    const existing = updated.find(i => (i._id || i.id) === productId)
    if (existing) existing.qty = (existing.qty || 1) + 1
    else updated.push({ ...product, _id: productId, qty: 1 })
    setCart(updated)
    saveCart(updated)
    toast.success(`${product.name} added to cart! 🛒`)
    setTimeout(() => setAdding(null), 600)
  }

  const toggleWishlist = (id) => {
    const nextSaved = !wishlist.includes(id)
    setWishlist(w => nextSaved ? [...w, id] : w.filter(x => x !== id))
    const user = JSON.parse(localStorage.getItem('sathya_user') || 'null')
    const visitorId = localStorage.getItem('sathya_wishlist_visitor')
    axios.post('/api/wishlist', { productId: id, productName: products.find(product => (product._id || product.id) === id)?.name, userId: user?.id || user?._id || visitorId, phone: user?.phone || user?.mobile || '', saved: nextSaved }).catch(() => {})
  }

  const discount = (p, m) => Math.round(((m - p) / m) * 100)

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div className="page-header-left">
          <h1>🌿 Product Catalog</h1>
          <p>{filtered.length} premium agro inputs available</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={() => navigate('/farmer/cart')}>
            <ShoppingCart size={16} />
            Cart ({cart.length})
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            placeholder="Search products, crops, pests..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="filter-select" value={category} onChange={e => setCategory(e.target.value)}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            style={{
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              border: `1.5px solid ${category === c ? 'var(--brand-500)' : 'var(--surface-border-subtle)'}`,
              background: category === c ? 'var(--brand-900)' : 'var(--dark-800)',
              color: category === c ? 'var(--brand-400)' : 'var(--text-muted)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Products Grid — FIXED UI */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>No products found</h3>
          <p>Try changing your search or filter</p>
          <button className="btn btn-primary" onClick={() => { setSearch(''); setCategory('All') }}>Clear Filters</button>
        </div>
      ) : (
        <div className="products-grid">
          {filtered.map(product => {
            const productId = product._id || product.id
            const disc = product.discount || discount(product.price, product.mrp)
            const stockStatus = product.stock === 0 ? 'out-of-stock' : product.stock < 50 ? 'low-stock' : 'in-stock'
            const stockLabel  = product.stock === 0 ? '✕ Out of Stock' : product.stock < 50 ? `⚠ Low Stock (${product.stock} left)` : '✓ In Stock'
            const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating))

            return (
              <div key={productId} className="product-card" onClick={() => navigate(`/product/${productId}`)} style={{ cursor: 'pointer' }}>
                {/* Badges */}
                {product.badge && (
                  <span className={`product-badge ${product.badge}`}>
                    {product.badge === 'bestseller' ? '🏆 Best Seller' : product.badge === 'organic' ? '🌿 Organic' : product.badge === 'new' ? '✨ New' : product.badge === 'sale' ? '🔥 Sale' : product.badge}
                  </span>
                )}
                <button className="product-wishlist" onClick={event => { event.stopPropagation(); toggleWishlist(productId) }}>
                  <Heart size={14} fill={wishlist.includes(productId) ? '#ef4444' : 'none'} color={wishlist.includes(productId) ? '#ef4444' : 'currentColor'} />
                </button>

                {/* Image */}
                <div className="product-image-wrap">
                  {product.imageUrl
                    ? <img src={product.imageUrl} alt={product.name} />
                    : <div className="product-image-placeholder">{product.emoji || '🌿'}</div>
                  }
                </div>

                {/* Body */}
                <div className="product-body">
                  <div className="product-category">{product.category}</div>
                  <div className="product-name">{product.name}</div>
                  <div className="product-desc">{product.description}</div>

                  {/* Rating */}
                  <div className="product-rating">
                    <span className="stars">{stars}</span>
                    <span className="rating-count">{product.rating} ({product.reviews} reviews)</span>
                  </div>

                  {/* Crops */}
                  <div className="product-crops">
                    {(product.crops || []).slice(0, 3).map(c => <span key={c} className="crop-tag">🌾 {c}</span>)}
                  </div>

                  {/* Price */}
                  <div className="product-price-row">
                    <span className="product-price">₹{product.price.toLocaleString()}</span>
                    {product.mrp > product.price && <>
                      <span className="product-mrp">₹{product.mrp}</span>
                      <span className="product-discount">{disc}% OFF</span>
                    </>}
                  </div>

                  {/* Stock */}
                  <span className={`product-stock-badge ${stockStatus}`}>{stockLabel}</span>

                  {/* Actions */}
                  <div className="product-actions">
                    <button
                      className="btn-add-cart"
                      onClick={event => { event.stopPropagation(); addToCart(product) }}
                      disabled={product.stock === 0 || adding === productId}
                    >
                      {adding === productId ? <><div className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> Adding...</>
                        : product.stock === 0 ? 'Out of Stock' : <><ShoppingCart size={14} /> Add to Cart</>}
                    </button>
                    <button className="btn-view-detail" title="View Details" onClick={event => { event.stopPropagation(); navigate(`/product/${productId}`) }}>
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
