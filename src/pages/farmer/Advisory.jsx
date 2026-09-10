import { useState } from 'react'
import toast from 'react-hot-toast'

const CROPS = ['Paddy / Rice', 'Cotton', 'Tomato', 'Wheat', 'Sugarcane', 'Maize / Corn', 'Potato', 'Vegetables (Mixed)', 'Fruits', 'Groundnut']
const DISEASES = {
  'Paddy / Rice': ['Blast (Pyricularia oryzae)', 'Sheath Blight', 'Brown Plant Hopper', 'False Smut'],
  'Cotton': ['Whitefly', 'Bollworm', 'Aphids', 'Root Rot'],
  'Tomato': ['Early Blight', 'Late Blight', 'Leaf Curl Virus', 'Fruit Borer'],
  'Wheat': ['Rust (Yellow/Brown)', 'Aphids', 'Loose Smut', 'Powdery Mildew'],
  'Sugarcane': ['Red Rot', 'Pyrilla', 'Early Shoot Borer', 'Wilt'],
  'Maize / Corn': ['Fall Army Worm', 'Turcicum Blight', 'Stem Borer'],
  'Potato': ['Late Blight', 'Early Blight', 'Bacterial Wilt', 'Aphids'],
  'Vegetables (Mixed)': ['Downy Mildew', 'Thrips', 'Damping Off', 'Anthracnose'],
  'Fruits': ['Fruit Fly', 'Mealybug', 'Powdery Mildew', 'Scab'],
  'Groundnut': ['Tikka Disease', 'Stem Rot', 'Leaf Miner'],
}

const RECOMMENDATIONS = {
  'Paddy / Rice': { product: 'BlastShield 75 WP', dose: 150, unit: 'g/acre', price: 480, spray: 'Spray at 21 & 45 DAS, repeat at 7-day interval if severe' },
  'Cotton':       { product: 'CottonGuard 20 EC', dose: 200, unit: 'ml/acre', price: 620, spray: 'Apply in early morning or evening. Rotate with other modes of action.' },
  'Tomato':       { product: 'TomatoSaver FC', dose: 250, unit: 'g/acre', price: 340, spray: 'Spray preventively before rains. Cover undersides of leaves.' },
  'Wheat':        { product: 'WheatMax NPK', dose: 2, unit: 'kg/acre', price: 1200, spray: 'Foliar spray at tillering + booting stage.' },
  'Sugarcane':    { product: 'SugarcanePro S', dose: 500, unit: 'ml/acre', price: 780, spray: 'Soil drenching at planting, foliar spray at 60 DAS.' },
  'Maize / Corn': { product: 'CornBooster PGR', dose: 150, unit: 'ml/acre', price: 550, spray: 'Apply at V6 stage (6-leaf). Repeat at tasseling.' },
  'Potato':       { product: 'PotatoShield M45', dose: 400, unit: 'g/acre', price: 310, spray: 'Start spraying 3 weeks after emergence. Repeat every 10 days.' },
}

export default function FarmerAdvisory() {
  const [form, setForm] = useState({ name: '', whatsapp: '', crop: 'Paddy / Rice', season: 'Kharif', acres: '' })
  const [result, setResult] = useState(null)

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.whatsapp || !form.acres) { toast.error('Please fill all fields'); return }
    const rec = RECOMMENDATIONS[form.crop] || RECOMMENDATIONS['Paddy / Rice']
    const acres = parseFloat(form.acres)
    const totalDose  = (rec.dose * acres).toFixed(1)
    const totalCost  = (rec.price * acres).toFixed(0)
    setResult({ ...rec, acres, totalDose, totalCost, crop: form.crop, diseases: DISEASES[form.crop] || [] })
    toast.success('Advisory generated! 🌿')
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1>🌾 Weekly Crop Advisory</h1>
          <p>Get personalized pesticide & crop protection recommendations</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Form */}
        <div className="card">
          <div className="card-header"><div className="card-title">📋 Enter Farm Details</div></div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Farmer Name *</label>
              <input className="form-input" placeholder="Your full name" value={form.name} onChange={set('name')} required />
            </div>
            <div className="form-group">
              <label className="form-label">WhatsApp Number *</label>
              <input className="form-input" placeholder="10-digit number" value={form.whatsapp} onChange={set('whatsapp')} required maxLength={10} />
            </div>
            <div className="form-group">
              <label className="form-label">Crop Type *</label>
              <select className="form-select" value={form.crop} onChange={set('crop')}>
                {CROPS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Season</label>
                <select className="form-select" value={form.season} onChange={set('season')}>
                  <option>Kharif</option>
                  <option>Rabi</option>
                  <option>Zaid</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Farm Size (Acres) *</label>
                <input className="form-input" type="number" placeholder="e.g. 5" value={form.acres} onChange={set('acres')} min="0.5" step="0.5" required />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-full btn-lg">
              🌿 Get Instant Advisory
            </button>
          </form>
        </div>

        {/* Result */}
        {result ? (
          <div className="card animate-slide-up">
            <div className="card-header">
              <div>
                <div className="card-title">🌾 Personalized Advisory</div>
                <div className="card-subtitle">{result.crop} — {result.acres} Acres — {form.season} Season</div>
              </div>
              <span className="badge badge-green">✓ Ready</span>
            </div>

            {/* Disease Alert */}
            <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--radius-lg)', padding: '14px', marginBottom: '16px' }}>
              <div style={{ fontWeight: 700, color: '#f87171', marginBottom: '8px', fontSize: '0.85rem' }}>⚠️ Common Threats for {result.crop}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {result.diseases.slice(0, 4).map(d => (
                  <span key={d} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--radius-full)', padding: '3px 10px', fontSize: '0.75rem', color: '#fca5a5' }}>{d}</span>
                ))}
              </div>
            </div>

            {/* Recommendation */}
            <div style={{ background: 'var(--dark-800)', borderRadius: 'var(--radius-lg)', padding: '16px', marginBottom: '16px' }}>
              <div style={{ fontWeight: 700, marginBottom: '12px', color: 'var(--brand-400)' }}>📦 Recommended Product</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '6px' }}>{result.product}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '12px' }}>
                <div style={{ textAlign: 'center', background: 'var(--dark-700)', borderRadius: 'var(--radius-md)', padding: '10px' }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Total Dose</div>
                  <div style={{ fontWeight: 800, color: 'var(--brand-400)', fontSize: '1rem' }}>{result.totalDose} {result.unit.split('/')[0]}</div>
                </div>
                <div style={{ textAlign: 'center', background: 'var(--dark-700)', borderRadius: 'var(--radius-md)', padding: '10px' }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>For {result.acres} Acres</div>
                  <div style={{ fontWeight: 800, color: 'var(--yellow)' }}>₹{parseInt(result.totalCost).toLocaleString()}</div>
                </div>
                <div style={{ textAlign: 'center', background: 'var(--dark-700)', borderRadius: 'var(--radius-md)', padding: '10px' }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Savings</div>
                  <div style={{ fontWeight: 800, color: 'var(--orange)' }}>20%</div>
                </div>
              </div>
            </div>

            {/* Spray Schedule */}
            <div style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 'var(--radius-md)', padding: '12px', marginBottom: '16px', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--brand-400)' }}>📅 Spray Schedule: </strong>{result.spray}
            </div>

            <button className="btn btn-primary btn-full">
              🛒 Add Recommended Kit to Cart
            </button>
          </div>
        ) : (
          <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
            <div className="empty-state">
              <div className="empty-state-icon">🌾</div>
              <h3>Enter your farm details</h3>
              <p>We'll generate a personalized crop protection advisory</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
