import { useState } from 'react'

const RANGE_DATA = {
  day: {
    label: 'Today',
    summary: [
      { label: 'Revenue', value: '₹1,42,680', delta: '+12.9%', color: 'green' },
      { label: 'Orders', value: '124', delta: '+18', color: 'blue' },
      { label: 'Farmers', value: '96', delta: '+9%', color: 'yellow' },
      { label: 'Return rate', value: '1.8%', delta: '-0.4%', color: 'teal' },
    ],
    trend: [48, 60, 52, 75, 64, 88, 96],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    regions: [
      { region: 'Coimbatore', buyers: 1240, share: 28, fill: 'high' },
      { region: 'Trichy', buyers: 980, share: 22, fill: 'mid' },
      { region: 'Madurai', buyers: 860, share: 19, fill: 'mid' },
      { region: 'Erode', buyers: 790, share: 18, fill: 'low' },
      { region: 'Salem', buyers: 630, share: 14, fill: 'low' },
      { region: 'Thanjavur', buyers: 540, share: 12, fill: 'low' },
    ],
    channelMix: [
      { name: 'Retail', value: 46, color: '#5e63ff' },
      { name: 'Farmer direct', value: 28, color: '#64b9a0' },
      { name: 'Distributor', value: 18, color: '#f5c86b' },
      { name: 'Online', value: 8, color: '#ef6d6d' },
    ],
    topProducts: [
      { name: 'BlastShield 75 WP', sold: 54, revenue: '₹1,02,480' },
      { name: 'RootVigor Gold', sold: 38, revenue: '₹89,350' },
      { name: 'BioNeem Gold', sold: 46, revenue: '₹76,290' },
      { name: 'CottonGuard 20 EC', sold: 31, revenue: '₹62,110' },
    ],
  },
  week: {
    label: 'This week',
    summary: [
      { label: 'Revenue', value: '₹9,48,350', delta: '+22.1%', color: 'green' },
      { label: 'Orders', value: '812', delta: '+102', color: 'blue' },
      { label: 'Farmers', value: '548', delta: '+18%', color: 'yellow' },
      { label: 'Return rate', value: '2.3%', delta: '-0.7%', color: 'teal' },
    ],
    trend: [42, 58, 49, 78, 68, 94, 116],
    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
    regions: [
      { region: 'Coimbatore', buyers: 2860, share: 31, fill: 'high' },
      { region: 'Trichy', buyers: 2480, share: 27, fill: 'high' },
      { region: 'Madurai', buyers: 2140, share: 24, fill: 'mid' },
      { region: 'Erode', buyers: 1830, share: 20, fill: 'mid' },
      { region: 'Salem', buyers: 1460, share: 16, fill: 'low' },
      { region: 'Thanjavur', buyers: 1220, share: 14, fill: 'low' },
    ],
    channelMix: [
      { name: 'Retail', value: 41, color: '#5e63ff' },
      { name: 'Farmer direct', value: 32, color: '#64b9a0' },
      { name: 'Distributor', value: 20, color: '#f5c86b' },
      { name: 'Online', value: 7, color: '#ef6d6d' },
    ],
    topProducts: [
      { name: 'BlastShield 75 WP', sold: 214, revenue: '₹4,86,120' },
      { name: 'RootVigor Gold', sold: 176, revenue: '₹4,28,660' },
      { name: 'BioNeem Gold', sold: 196, revenue: '₹3,92,200' },
      { name: 'CottonGuard 20 EC', sold: 144, revenue: '₹3,12,900' },
    ],
  },
  month: {
    label: 'This month',
    summary: [
      { label: 'Revenue', value: '₹42,18,440', delta: '+18.3%', color: 'green' },
      { label: 'Orders', value: '3,462', delta: '+418', color: 'blue' },
      { label: 'Farmers', value: '2,380', delta: '+16%', color: 'yellow' },
      { label: 'Return rate', value: '2.1%', delta: '-0.9%', color: 'teal' },
    ],
    trend: [38, 54, 63, 74, 82, 96, 104],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    regions: [
      { region: 'Coimbatore', buyers: 10240, share: 29, fill: 'high' },
      { region: 'Trichy', buyers: 9350, share: 26, fill: 'high' },
      { region: 'Madurai', buyers: 8840, share: 24, fill: 'mid' },
      { region: 'Erode', buyers: 7410, share: 21, fill: 'mid' },
      { region: 'Salem', buyers: 6130, share: 17, fill: 'low' },
      { region: 'Thanjavur', buyers: 5890, share: 16, fill: 'low' },
    ],
    channelMix: [
      { name: 'Retail', value: 40, color: '#5e63ff' },
      { name: 'Farmer direct', value: 33, color: '#64b9a0' },
      { name: 'Distributor', value: 19, color: '#f5c86b' },
      { name: 'Online', value: 8, color: '#ef6d6d' },
    ],
    topProducts: [
      { name: 'BlastShield 75 WP', sold: 894, revenue: '₹18,20,400' },
      { name: 'RootVigor Gold', sold: 742, revenue: '₹17,64,160' },
      { name: 'BioNeem Gold', sold: 824, revenue: '₹15,28,980' },
      { name: 'CottonGuard 20 EC', sold: 618, revenue: '₹12,92,410' },
    ],
  },
}

export default function AdminAnalytics() {
  const [range, setRange] = useState('month')
  const data = {
    label: RANGE_DATA[range].label,
    summary: [
      { label: 'Revenue', value: '₹0', delta: 'No data yet', color: 'green' },
      { label: 'Orders', value: '0', delta: 'No data yet', color: 'blue' },
      { label: 'Farmers', value: '0', delta: 'No data yet', color: 'yellow' },
      { label: 'Return rate', value: '0%', delta: 'No data yet', color: 'teal' },
    ],
    trend: [],
    labels: [],
    regions: [],
    channelMix: [],
    topProducts: [],
  }

  const donutGradient = data.channelMix.reduce((acc, item, index, arr) => {
    const start = arr.slice(0, index).reduce((sum, current) => sum + current.value, 0)
    const end = start + item.value
    acc.push(`${item.color} ${start}% ${end}%`)
    return acc
  }, []).join(', ')

  return (
    <div className="animate-fade-in analytics-page">
      <div className="page-header analytics-header">
        <div>
          <div className="eyebrow">Operations overview</div>
          <h1>Power BI style analytics</h1>
          <p>{data.label} performance across revenue, demand, and regional sales.</p>
        </div>

        <div className="range-selector">
          {Object.keys(RANGE_DATA).map(item => (
            <button
              key={item}
              className={`range-pill ${range === item ? 'active' : ''}`}
              onClick={() => setRange(item)}
            >
              {RANGE_DATA[item].label}
            </button>
          ))}
        </div>
      </div>

      <div className="stat-grid analytics-metrics">
        {data.summary.map(metric => (
          <div key={metric.label} className={`stat-card ${metric.color}`}>
            <div className="stat-value" style={{ fontSize: '1.45rem' }}>{metric.value}</div>
            <div className="stat-label">{metric.label}</div>
            <div className="stat-change positive" style={{ marginTop: 6 }}>↑ {metric.delta}</div>
          </div>
        ))}
      </div>

      <div className="analytics-grid">
        <div className="card insight-card">
          <div className="card-header">
            <div className="card-title">Revenue trend</div>
            <span className="badge badge-blue">Live</span>
          </div>

          <div className="chart-shell">
            <div className="chart-bars-large">
              {data.trend.map((value, index) => (
                <div key={`${value}-${index}`} className="bar-col">
                  <span style={{ height: `${value}%` }} className={index === data.trend.length - 1 ? 'active' : ''} />
                </div>
              ))}
            </div>
            <div className="chart-footer">
              {data.labels.map(label => <span key={label}>{label}</span>)}
            </div>
          </div>
        </div>

        <div className="card region-card">
          <div className="card-header">
            <div className="card-title">Regional customer map</div>
            <span className="badge badge-green">Top 6 regions</span>
          </div>

          <div className="region-map">
            {data.regions.map((entry, index) => (
              <div key={entry.region} className={`map-cell ${entry.fill}`} style={{ gridColumn: index < 3 ? 'span 2' : 'span 1' }}>
                <strong>{entry.region}</strong>
                <span>{entry.buyers.toLocaleString()} buyers</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="analytics-grid lower-grid">
        <div className="card donut-card">
          <div className="card-header">
            <div className="card-title">Sales channel mix</div>
          </div>

          <div className="donut-wrap">
            <div className="donut-chart" style={{ background: `conic-gradient(${donutGradient})` }}>
              <div className="donut-center">
                <strong>₹{(data.summary[0].value).replace(/[^\d]/g, '')}</strong>
              </div>
            </div>
            <div className="donut-legend">
              {data.channelMix.map(item => (
                <div key={item.name} className="legend-row">
                  <span className="legend-dot" style={{ background: item.color }} />
                  <span>{item.name}</span>
                  <strong>{item.value}%</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Top performing regions</div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Region</th><th>Buyers</th><th>Share</th></tr>
              </thead>
              <tbody>
                {data.regions.map((entry, index) => (
                  <tr key={entry.region}>
                    <td><span className="region-rank">{index + 1}</span> {entry.region}</td>
                    <td>{entry.buyers.toLocaleString()}</td>
                    <td>
                      <div className="mini-progress">
                        <span style={{ width: `${entry.share}%` }} />
                      </div>
                      {entry.share}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Top selling products</div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>#</th><th>Product</th><th>Units sold</th><th>Revenue</th></tr>
            </thead>
            <tbody>
              {data.topProducts.map((product, index) => (
                <tr key={product.name}>
                  <td><span className="badge badge-yellow">{index + 1}</span></td>
                  <td style={{ fontWeight: 700 }}>{product.name}</td>
                  <td>{product.sold}</td>
                  <td style={{ color: 'var(--brand-700)', fontWeight: 800 }}>{product.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
