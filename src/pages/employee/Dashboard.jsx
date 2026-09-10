import { useState } from 'react'
import { ArrowUpRight, Box, ClipboardList, Download, MoreHorizontal, PackageCheck, Plus, Search, Truck, Users, AlertTriangle } from 'lucide-react'

const INVENTORY = []

const TASKS = []

const ORDERS = []

const CUSTOMERS = []

export default function EmployeeDashboard() {
  const [activeTab, setActiveTab] = useState('inventory')
  const [query, setQuery] = useState('')
  const visibleInventory = INVENTORY.filter(item => item.name.toLowerCase().includes(query.toLowerCase()) || item.sku.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="animate-fade-in employee-dashboard">
      <div className="page-header">
        <div><p className="employee-eyebrow">OPERATIONS WORKSPACE</p><h1>Good morning</h1><p>Your workspace is ready for its first inventory, order, and task records.</p></div>
        <div className="employee-page-actions"><button className="btn btn-secondary"><Download size={16} /> Export report</button><button className="btn btn-primary"><Plus size={17} /> New stock movement</button></div>
      </div>

      <div className="stat-grid" style={{ marginBottom: 24 }}>
        <div className="employee-stat"><span className="employee-stat-icon coral"><PackageCheck size={19} /></span><div><strong>₹0</strong><span>Sales today</span><em>No sales yet</em></div></div>
        <div className="employee-stat"><span className="employee-stat-icon blue"><Box size={19} /></span><div><strong>0</strong><span>Units in stock</span><em>No inventory yet</em></div></div>
        <div className="employee-stat"><span className="employee-stat-icon amber"><Truck size={19} /></span><div><strong>0</strong><span>Orders to dispatch</span><em>No orders yet</em></div></div>
        <div className="employee-stat"><span className="employee-stat-icon green"><Users size={19} /></span><div><strong>0</strong><span>Active customers</span><em>No customers yet</em></div></div>
      </div>

      <div className="employee-overview-grid">
        <div className="card employee-chart-card">
          <div className="card-header"><div><div className="card-title">Revenue overview</div><div className="card-subtitle">Sales performance for the last 7 days</div></div><button className="employee-more" title="More revenue options"><MoreHorizontal size={18} /></button></div>
          <div className="revenue-total">₹0 <span>No sales yet</span></div>
          <div className="empty-state" style={{ padding: '24px 12px' }}><p>Revenue history will appear after the first sale</p></div>
          <div className="chart-labels"><span>24 Aug</span><span>31 Aug</span></div>
        </div>
        <div className="card attention-card"><div className="card-header"><div><div className="card-title">Needs attention</div><div className="card-subtitle">Workspace health</div></div><AlertTriangle size={19} color="#e58a38" /></div><div className="empty-state" style={{ padding: '24px 12px' }}><div style={{ fontSize: '2rem' }}>✓</div><p>Nothing needs attention</p></div></div>
      </div>

      <div className="employee-section-heading"><div><h2>Operations workspace</h2><p>Manage your daily inventory, orders, customers, and team activity.</p></div><div className="employee-search"><Search size={16} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search inventory" /></div></div>
      <div className="tabs employee-tabs">
        {[['inventory', 'Inventory'], ['orders', 'Orders'], ['customers', 'Customers'], ['tasks', 'Tasks']].map(([key, label]) => (
          <button key={key} className={`tab-btn ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>{label}</button>
        ))}
      </div>

      {activeTab === 'inventory' && (
        <div className="card">
          <div className="table-heading"><div><div className="card-title">Inventory health</div><div className="card-subtitle">Track stock levels, batches, and expiry dates</div></div><button className="btn btn-secondary btn-sm"><Plus size={15} /> Add product</button></div><div className="table-wrap">
            <table>
              <thead><tr><th>SKU</th><th>Product</th><th>Batch</th><th>Expiry</th><th>Stock</th><th>Min Stock</th><th>Status</th></tr></thead>
              <tbody>
                {visibleInventory.map(i => (
                  <tr key={i.sku}>
                    <td><code style={{ color: 'var(--brand-400)', fontSize: '0.8rem' }}>{i.sku}</code></td>
                    <td style={{ fontWeight: 600 }}>{i.name}</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{i.batch}</td>
                    <td style={{ fontSize: '0.8rem' }}>{i.expiry}</td>
                    <td style={{ fontWeight: 700 }}>{i.stock} {i.unit}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{i.min} {i.unit}</td>
                    <td>
                      <span className={`badge ${i.status === 'ok' ? 'badge-green' : i.status === 'low' ? 'badge-yellow' : 'badge-red'}`}>
                        {i.status === 'ok' ? '✓ OK' : i.status === 'low' ? '⚠ Low' : '✕ Out'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'orders' && <div className="card"><div className="table-heading"><div><div className="card-title">Recent orders</div><div className="card-subtitle">Orders requiring warehouse action</div></div><button className="btn btn-secondary btn-sm">View all orders <ArrowUpRight size={14} /></button></div><div className="table-wrap"><table><thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Amount</th><th>Status</th><th>Placed</th></tr></thead><tbody>{ORDERS.map(order => <tr key={order.id}><td><strong>{order.id}</strong></td><td>{order.customer}</td><td>{order.items}</td><td><strong>{order.amount}</strong></td><td><span className={`employee-status ${order.status === 'Delivered' ? 'done' : order.status === 'Picking' ? 'progress' : 'ready'}`}>{order.status}</span></td><td>{order.date}</td></tr>)}</tbody></table></div></div>}

      {activeTab === 'customers' && <div className="card"><div className="table-heading"><div><div className="card-title">Customer relationships</div><div className="card-subtitle">Your highest-value customer accounts</div></div><button className="btn btn-primary btn-sm"><Plus size={15} /> Add customer</button></div><div className="table-wrap"><table><thead><tr><th>Customer</th><th>Location</th><th>Orders</th><th>Lifetime value</th><th>Segment</th></tr></thead><tbody>{CUSTOMERS.map(customer => <tr key={customer.name}><td><div className="customer-cell"><span>{customer.name.split(' ').map(part => part[0]).join('')}</span><strong>{customer.name}</strong></div></td><td>{customer.location}</td><td>{customer.orders}</td><td><strong>{customer.value}</strong></td><td><span className="employee-status ready">{customer.stage}</span></td></tr>)}</tbody></table></div></div>}

      {activeTab === 'tasks' && (
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead><tr><th>#</th><th>Task</th><th>Assigned To</th><th>Priority</th><th>Due</th><th>Status</th></tr></thead>
              <tbody>
                {TASKS.map(t => (
                  <tr key={t.id}>
                    <td>{t.id}</td>
                    <td style={{ fontWeight: 600, maxWidth: 220 }}>{t.title}</td>
                    <td>{t.assignee}</td>
                    <td><span className={`badge ${t.priority === 'High' ? 'badge-red' : 'badge-yellow'}`}>{t.priority}</span></td>
                    <td style={{ fontSize: '0.8rem' }}>{t.due}</td>
                    <td><span className={`badge ${t.status === 'Done' ? 'badge-green' : t.status === 'In Progress' ? 'badge-blue' : 'badge-gray'}`}>{t.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
