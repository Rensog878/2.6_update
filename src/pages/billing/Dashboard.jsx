import { useState } from 'react'
import toast from 'react-hot-toast'

const CATALOG = [
  { id: 'p1', name: 'BlastShield 75 WP', price: 480, hsn: '380899', gst: 18 },
  { id: 'p2', name: 'RootVigor Gold',    price: 890, hsn: '310100', gst: 18 },
  { id: 'p3', name: 'BioNeem Gold',      price: 390, hsn: '380899', gst: 18 },
  { id: 'p4', name: 'CottonGuard 20 EC', price: 620, hsn: '380899', gst: 18 },
  { id: 'p5', name: 'TomatoSaver FC',    price: 340, hsn: '380899', gst: 18 },
]

export default function BillingDashboard() {
  const [items, setItems] = useState([])
  const [selected, setSelected] = useState(CATALOG[0].id)
  const [qty, setQty] = useState(1)
  const [discount, setDiscount] = useState(0)
  const [customerName, setCustomerName] = useState('')
  const [invoiceVisible, setInvoiceVisible] = useState(false)

  const addItem = () => {
    const product = CATALOG.find(p => p.id === selected)
    const existing = items.find(i => i.id === selected)
    if (existing) setItems(items.map(i => i.id === selected ? { ...i, qty: i.qty + qty } : i))
    else setItems([...items, { ...product, qty }])
    toast.success(`${product.name} added`)
  }

  const removeItem = (id) => setItems(items.filter(i => i.id !== id))

  const subtotal  = items.reduce((s, i) => s + i.price * i.qty, 0)
  const discAmt   = Math.round(subtotal * discount / 100)
  const taxable   = subtotal - discAmt
  const cgst      = Math.round(taxable * 0.09)
  const sgst      = Math.round(taxable * 0.09)
  const total     = taxable + cgst + sgst
  const invNo     = `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random()*9000)+1000).padStart(4,'0')}`

  const printInvoice = () => {
    if (items.length === 0) { toast.error('Add items first'); return }
    setInvoiceVisible(true)
    setTimeout(() => window.print(), 300)
  }

  const KPI = [
    { label: 'Today sales', value: '₹0', change: 'No sales yet' },
    { label: 'Transactions', value: '0', change: 'No transactions yet' },
    { label: 'GST collected', value: '₹0', change: 'No GST yet' },
  ]
  const invoiceQueue = [
    { label: 'Open invoices', value: '0' },
    { label: 'Pending GST', value: '₹0' },
    { label: 'Avg bill size', value: '₹0' },
  ]

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div><h1>🧾 POS billing counter</h1><p>GSTIN: 33AABCS1234F1Z8 | Tamil Nadu (State Code: 33)</p></div>
      </div>

      <div className="stat-grid" style={{ marginBottom: 24 }}>
        {KPI.map(item => (
          <div key={item.label} className="stat-card green">
            <div className="stat-value" style={{ fontSize: '1.4rem' }}>{item.value}</div>
            <div className="stat-label">{item.label}</div>
            <div className="stat-change positive">↑ {item.change}</div>
          </div>
        ))}
      </div>

      <div className="analytics-grid">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Billing snapshot</div>
            <span className="badge badge-gray">Empty</span>
          </div>
          <div className="city-grid">
            {invoiceQueue.map(item => (
              <div key={item.label} className="city-card">
                <div className="city-name">{item.label}</div>
                <div className="city-value">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="card-title">Counter health</div>
          </div>
          <div className="region-list">
            <div className="empty-state" style={{ padding: '20px 12px' }}><p>Counter metrics will appear after billing activity</p></div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px', alignItems: 'start', marginTop: '24px' }}>
        <div>
          <div className="card" style={{ marginBottom: '20px' }}>
            <div className="card-header"><div className="card-title">Add item to bill</div></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '12px', alignItems: 'end' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Product</label>
                <select className="form-select" value={selected} onChange={e => setSelected(e.target.value)}>
                  {CATALOG.map(p => <option key={p.id} value={p.id}>{p.name} — ₹{p.price}</option>)}
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Qty</label>
                <input className="form-input" type="number" min="1" value={qty} onChange={e => setQty(Number(e.target.value))} style={{ width: 80 }} />
              </div>
              <button className="btn btn-primary" onClick={addItem}>+ Add</button>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><div className="card-title">Bill items ({items.length})</div></div>
            {items.length === 0 ? (
              <div className="empty-state" style={{ padding: '30px' }}><div style={{ fontSize: '2rem' }}>🧾</div><p>Add products to start billing</p></div>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Product</th><th>HSN</th><th>Qty</th><th>Rate</th><th>Amount</th><th></th></tr></thead>
                  <tbody>
                    {items.map(i => (
                      <tr key={i.id}>
                        <td style={{ fontWeight: 600 }}>{i.name}</td>
                        <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{i.hsn}</td>
                        <td>{i.qty}</td>
                        <td>₹{i.price}</td>
                        <td style={{ color: 'var(--brand-400)', fontWeight: 700 }}>₹{(i.price * i.qty).toLocaleString()}</td>
                        <td><button className="btn btn-danger btn-sm" onClick={() => removeItem(i.id)}>✕</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div style={{ position: 'sticky', top: '80px' }}>
          <div className="card" style={{ marginBottom: '16px' }}>
            <div className="card-header"><div className="card-title">💰 Bill summary</div></div>
            <div className="form-group">
              <label className="form-label">Customer Name</label>
              <input className="form-input" placeholder="Walk-in Customer" value={customerName} onChange={e => setCustomerName(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Discount (%)</label>
              <input className="form-input" type="number" min="0" max="100" value={discount} onChange={e => setDiscount(Number(e.target.value))} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              {[
                ['Subtotal', `₹${subtotal.toLocaleString()}`],
                [`Discount (${discount}%)`, `-₹${discAmt.toLocaleString()}`],
                ['Taxable Amount', `₹${taxable.toLocaleString()}`],
                ['CGST @ 9%', `₹${cgst.toLocaleString()}`],
                ['SGST @ 9%', `₹${sgst.toLocaleString()}`],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>{k}</span><span>{v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-primary)', borderTop: '1px solid var(--surface-border-subtle)', paddingTop: '10px' }}>
                <span>Total</span><span style={{ color: 'var(--brand-400)' }}>₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <button className="btn btn-primary btn-full btn-lg" onClick={printInvoice}>🖨️ Print GST invoice</button>
        </div>
      </div>

      {invoiceVisible && (
        <div id="gst-invoice" style={{ display: 'none' }} className="print-invoice">
        </div>
      )}
    </div>
  )
}
