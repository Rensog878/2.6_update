import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { useLanguage } from '../context/LanguageContext'
import { Menu, Bell, ShoppingCart } from 'lucide-react'

export default function FarmerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const { t } = useLanguage()

  const FARMER_NAV = [
    {
      title: 'MAIN',
      links: [
        { to: '/farmer',          end: true, icon: '🏠', label: t('dashboard') },
        { to: '/farmer/products',           icon: '🌿', label: t('shopProducts') },
        { to: '/farmer/cart',               icon: '🛒', label: t('myCart') },
        { to: '/farmer/orders',             icon: '📦', label: t('myOrders') },
        { to: '/farmer/profile',             icon: '👤', label: 'My Profile' },
      ]
    },
    {
      title: 'ADVISORY',
      links: [
        { to: '/farmer/advisory', icon: '🌾', label: t('cropAdvisory') },
      ]
    }
  ]

  return (
    <div className="app-layout">
      <Sidebar
        items={FARMER_NAV}
        roleName="Farmer"
        roleEmoji="👨‍🌾"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button className="hamburger-btn" onClick={() => setSidebarOpen(true)} style={{ display: 'flex' }}>
              <Menu size={20} />
            </button>
            <div>
              <div className="topbar-title">{t('brand')} Store</div>
              <div className="topbar-subtitle">{t('tagline')}</div>
            </div>
          </div>
          <div className="topbar-right">
            <LanguageSwitcher />
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/farmer/cart')}>
              <ShoppingCart size={18} />
            </button>
            <button className="btn btn-ghost btn-sm">
              <Bell size={18} />
            </button>
          </div>
        </header>
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

