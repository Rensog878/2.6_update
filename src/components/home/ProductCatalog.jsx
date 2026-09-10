import { Star, ShoppingCart } from 'lucide-react'

export default function ProductCatalog({ onAddToCart = () => {} }) {
  const products = [
    {
      id: 1,
      name: 'Sathya Bio BlastShield 75 WP',
      category: 'FUNGICIDE',
      rating: 4.9,
      reviews: 142,
      price: 680,
      originalPrice: 850,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=400&q=80',
      description: 'Systemic Bio-Fungicide for Paddy Blast & Neck Rot',
      variants: ['250g', '500g', '1kg']
    },
    {
      id: 2,
      name: 'Sathya Bio FlyKill Ultra',
      category: 'INSECTICIDE',
      rating: 4.8,
      reviews: 98,
      price: 840,
      originalPrice: 1050,
      discount: 17,
      image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=400&q=80',
      description: 'Multi-Action Insecticide for Whitefly & Aphids',
      variants: ['250g', '500g']
    },
    {
      id: 3,
      name: 'Sathya Bio BlightStop Pro',
      category: 'FUNGICIDE',
      rating: 4.9,
      reviews: 215,
      price: 750,
      originalPrice: 900,
      discount: 21,
      image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=400&q=80',
      description: 'Dual Action Systemic Fungicide for Blight Control',
      variants: ['500g', '1kg', '5kg']
    },
    {
      id: 4,
      name: 'Sathya Bio RootVigor Gold',
      category: 'BIO-STIMULANT',
      rating: 4.9,
      reviews: 310,
      price: 990,
      originalPrice: 1250,
      discount: 15,
      image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&q=80',
      description: '100% Organic Bio-Stimulant & Root Enhancer',
      variants: ['500ml', '1 Litre', '5 Litres']
    },
    {
      id: 5,
      name: 'Sathya Bio WeedClear 24-D',
      category: 'HERBICIDE',
      rating: 4.6,
      reviews: 156,
      price: 340,
      originalPrice: 400,
      discount: 16,
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&q=80',
      description: 'Systemic Broadleaf Herbicide',
      variants: ['400ml', '1 Litre', '5 Litres']
    },
    {
      id: 6,
      name: 'Sathya Bio AminoBoost Liquid',
      category: 'BIO-STIMULANT',
      rating: 4.9,
      reviews: 212,
      price: 460,
      originalPrice: 550,
      discount: 19,
      image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&q=80',
      description: 'Advanced Amino Acid Bio-Stimulant',
      variants: ['250ml', '500ml', '1 Litre']
    },
    {
      id: 7,
      name: 'Sathya Bio NeemGuard 10000 PPM',
      category: 'INSECTICIDE',
      rating: 4.9,
      reviews: 184,
      price: 580,
      originalPrice: 720,
      discount: 17,
      image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=400&q=80',
      description: 'Pure Cold-Pressed Bio-Insecticide & Antifeedant',
      variants: ['250ml', '500ml', '1 Litre']
    },
    {
      id: 8,
      name: 'Sathya Bio CopperShield 50 WG',
      category: 'FUNGICIDE',
      rating: 4.7,
      reviews: 129,
      price: 620,
      originalPrice: 750,
      discount: 18,
      image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=400&q=80',
      description: 'Water Dispersible Bio-Bactericide & Contact Fungicide',
      variants: ['250g', '500g', '1kg']
    }
  ]

  const categoryColors = {
    'FUNGICIDE': 'bg-purple-100 text-purple-800',
    'INSECTICIDE': 'bg-red-100 text-red-800',
    'BIO-STIMULANT': 'bg-green-100 text-green-800',
    'HERBICIDE': 'bg-yellow-100 text-yellow-800'
  }

  return (
    <section id="catalog" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Agro Pesticides Store Catalog
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Filter chemicals by target crop, plant disease, or product category
          </p>

          {/* Simple Filters */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600">
              <option>FILTER BY CROP</option>
              <option>Paddy</option>
              <option>Cotton</option>
              <option>Tomato</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600">
              <option>FILTER BY DISEASE / PEST</option>
              <option>Blast</option>
              <option>Blight</option>
              <option>Whitefly</option>
            </select>
            <button className="px-6 py-2 text-green-600 border-2 border-green-600 rounded-lg hover:bg-green-50 font-semibold transition">
              Reset All Filters
            </button>
          </div>

          <p className="text-gray-600 font-semibold">
            Showing 14 of 14 products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition group">
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />

                {/* Discount Badge */}
                <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {product.discount}% OFF
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <span className={`inline-block px-2 py-1 rounded text-xs font-bold mb-2 ${categoryColors[product.category]}`}>
                  {product.category}
                </span>

                <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-xs text-gray-600 mb-3">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                  <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                </div>

                {/* Variants */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {product.variants.map((variant) => (
                    <button
                      key={variant}
                      className="text-xs px-2 py-1 border border-gray-300 rounded hover:border-green-600 hover:text-green-600 transition"
                    >
                      {variant}
                    </button>
                  ))}
                </div>

                {/* Add to Cart */}
                <button
                  onClick={onAddToCart}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg flex items-center justify-center space-x-2 transition"
                >
                  <ShoppingCart size={18} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
