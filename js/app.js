/* ==========================================================================
   SATHYA BIO - FULL ENTERPRISE E-COMMERCE, ERP, CMS & MULTI-ROLE ENGINE
   MERN-Compatible Architecture with Razorpay, Live Advisory & Multilingual Engine
   ========================================================================== */

// --- DATA STORE ---
const CROPS = [
  { id: 'all', name: 'All Crops', icon: 'fa-wheat-field' },
  { id: 'Paddy/Rice', name: 'Paddy / Rice', icon: 'fa-seedling' },
  { id: 'Wheat', name: 'Wheat', icon: 'fa-wheat-awn' },
  { id: 'Cotton', name: 'Cotton', icon: 'fa-cloud' },
  { id: 'Tomato', name: 'Tomato', icon: 'fa-apple-whole' },
  { id: 'Corn', name: 'Corn / Maize', icon: 'fa-plant-wilt' },
  { id: 'Sugarcane', name: 'Sugarcane', icon: 'fa-cubes-stacked' },
  { id: 'Citrus', name: 'Citrus / Fruits', icon: 'fa-lemon' },
  { id: 'Grapes', name: 'Grapes', icon: 'fa-wine-glass-empty' },
  { id: 'Potato', name: 'Potato', icon: 'fa-circle-dot' }
];

const DISEASES = [
  { id: 'all', name: 'All Diseases & Pests' },
  { id: 'Blast', name: 'Rice Blast & Sheath Blight' },
  { id: 'Blight', name: 'Early / Late Blight' },
  { id: 'Rust', name: 'Leaf Rust & Stripe Rust' },
  { id: 'Aphids', name: 'Aphids & Jassids' },
  { id: 'Whitefly', name: 'Whitefly & Thrips' },
  { id: 'Downy Mildew', name: 'Downy & Powdery Mildew' },
  { id: 'Caterpillars', name: 'Fruit Borer & Caterpillars' },
  { id: 'Stem Borer', name: 'Stem & Pink Borer' },
  { id: 'Weeds', name: 'Broadleaf & Grass Weeds' }
];

const CATEGORIES = ['All', 'Fungicide', 'Insecticide', 'Bio-Stimulant', 'Herbicide', 'Nematicide'];

const IMG = {
  fungicide: './assets/p1.png',
  insecticide: './assets/p2.png',
  biostim: './assets/p3.png',
  herbicide: './assets/p4.png',
};

// Initial Catalog Data
let PESTICIDES = [
  {
    id: 'sb-01', name: 'Sathya Bio BlastShield 75 WP',
    tagline: 'Systemic Bio-Fungicide for Paddy Blast & Neck Rot',
    category: 'Fungicide',
    crops: ['Paddy/Rice', 'Wheat', 'Corn'],
    diseases: ['Blast', 'Rust', 'Downy Mildew'],
    activeIngredient: 'Tricyclazole 75% WP + Bio-Enzyme Fortifier',
    dosage: '120g - 150g per Acre', packSizes: ['250g', '500g', '1kg'], selectedPack: '500g',
    safetyRating: 'Class III (Eco Friendly)',
    description: 'Advanced systemic bio-fortified fungicide providing protective and curative control against Blast disease in Paddy, Leaf Rust in Wheat, and Neck Blast.',
    detailedDescription: 'Sathya Bio BlastShield 75 WP is a highly specialized systemic fungicide tailored to combat the most stubborn fungal pathogens affecting grain crops.',
    benefits: ['Rapid systemic action offering up to 15 days of protection.', 'Prevents secondary infections and reduces neck rot incidence.', 'Enhances grain quality and ensures higher milling yield.', 'Rainfast within 2 hours of application.'],
    modeOfAction: 'Inhibits melanin biosynthesis in appressoria, preventing the fungus from penetrating the plant cuticle.',
    applicationInstructions: 'Foliar spray at early symptoms or initiation of tillering phase. Dissolve 120g in 150L water per acre.',
    rating: 4.9, reviewsCount: 142, inStock: true, badge: 'Best Seller',
    image: IMG.fungicide, price: 680, originalPrice: 850, discount: '20% OFF',
    sku: 'SB-BLAST-75', batchNo: 'BATCH-2026-08A', hsn: '380899'
  },
  {
    id: 'sb-02', name: 'Sathya Bio FlyKill Ultra',
    tagline: 'Multi-Action Insecticide for Whitefly & Aphids',
    category: 'Insecticide',
    crops: ['Cotton', 'Tomato', 'Citrus', 'Potato'],
    diseases: ['Whitefly', 'Aphids', 'Caterpillars'],
    activeIngredient: 'Diafenthiuron 50% WP + Botanical Neem Extract',
    dosage: '250g per Acre', packSizes: ['250g', '500g'], selectedPack: '250g',
    safetyRating: 'Class II (Bee Safe)',
    description: 'Penetrates leaf cuticle rapidly to paralyze sucking pests like Whiteflies, Aphids, and Thrips. Prevents leaf curl virus spread.',
    detailedDescription: 'FlyKill Ultra combines the fast knock-down power of modern chemistry with the sustained repellency of botanical neem extracts.',
    benefits: ['Translaminar action kills pests hiding on underside of leaves.', 'Vapour action ensures broad coverage in dense crop canopies.', 'Safe for beneficial insects like ladybird beetles.'],
    modeOfAction: 'Inhibits mitochondrial respiration in insects, causing immediate paralysis.',
    applicationInstructions: 'Ensure thorough coverage of under-side of leaves. Spray early morning or post-sunset.',
    rating: 4.8, reviewsCount: 98, inStock: true, badge: 'Top Rated',
    image: IMG.insecticide, price: 840, originalPrice: 1050, discount: '20% OFF',
    sku: 'SB-FLY-50', batchNo: 'BATCH-2026-07B', hsn: '380891'
  },
  {
    id: 'sb-03', name: 'Sathya Bio BlightStop Pro',
    tagline: 'Dual Action Systemic Fungicide for Blight Control',
    category: 'Fungicide',
    crops: ['Tomato', 'Potato', 'Grapes', 'Citrus'],
    diseases: ['Blight', 'Downy Mildew'],
    activeIngredient: 'Mancozeb 64% + Metalaxyl 8% WP',
    dosage: '500g per Acre', packSizes: ['500g', '1kg', '5kg'], selectedPack: '1kg',
    safetyRating: 'Class III Low Toxicity',
    description: 'Gold standard dual-action fungicide specifically formulated for Late Blight in Potato/Tomato and Downy Mildew in Grapevines.',
    detailedDescription: 'BlightStop Pro provides unparalleled protection through a two-pronged approach: Mancozeb forms a protective film while Metalaxyl is rapidly absorbed.',
    benefits: ['Curative and protective action prevents disease outbreaks.', 'Excellent rainfastness and prolonged residual activity.'],
    modeOfAction: 'Mancozeb acts as multi-site contact inhibitor, Metalaxyl inhibits fungal protein synthesis.',
    applicationInstructions: 'Spray before rains or high moisture periods. Safe for crop canopy when used as directed.',
    rating: 4.9, reviewsCount: 215, inStock: true, badge: 'Expert Choice',
    image: IMG.fungicide, price: 750, originalPrice: 900, discount: '17% OFF',
    sku: 'SB-BLIGHT-PRO', batchNo: 'BATCH-2026-06C', hsn: '380899'
  },
  {
    id: 'sb-04', name: 'Sathya Bio RootVigor Gold',
    tagline: '100% Organic Bio-Stimulant & Root Enhancer',
    category: 'Bio-Stimulant',
    crops: ['Paddy/Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Corn', 'Tomato', 'Grapes'],
    diseases: [],
    activeIngredient: 'Humic Acid 18% + Seaweed Extract (Ascophyllum nodosum)',
    dosage: '500ml per Acre', packSizes: ['500ml', '1 Litre', '5 Litres'], selectedPack: '1 Litre',
    safetyRating: '100% Organic Certified',
    description: 'Accelerates root branching, enhances micro-nutrient absorption, and restores degraded soils. Boosts drought resilience.',
    detailedDescription: 'RootVigor Gold stimulates white feeder root growth and increases soil cation exchange capacity (CEC).',
    benefits: ['Enhances fertilizer utilization efficiency by 25-30%.', 'Increases white root biomass for better anchoring.', 'Improves drought tolerance.'],
    modeOfAction: 'Stimulates root cell division and chelates bound soil nutrients into plant-absorbable forms.',
    applicationInstructions: 'Apply through drip irrigation or drench around crop root zone during early growth stages.',
    rating: 4.9, reviewsCount: 310, inStock: true, badge: '100% Organic',
    image: IMG.biostim, price: 990, originalPrice: 1250, discount: '21% OFF',
    sku: 'SB-ROOT-GOLD', batchNo: 'BATCH-2026-08C', hsn: '310100'
  },
  {
    id: 'sb-26', name: 'Sathya Bio WeedClear 24-D',
    tagline: 'Systemic Broadleaf Herbicide',
    category: 'Herbicide',
    crops: ['Wheat', 'Corn', 'Sugarcane'],
    diseases: ['Weeds'],
    activeIngredient: '2,4-D Amine Salt 58% SL',
    dosage: '400ml per Acre', packSizes: ['400ml', '1 Litre', '5 Litres'], selectedPack: '1 Litre',
    safetyRating: 'Class II (Moderate)',
    description: 'Effective and economical post-emergence herbicide for the control of broadleaf weeds in cereals and sugarcane.',
    detailedDescription: 'WeedClear 24-D mimics plant growth hormone auxin, causing uncontrolled growth in susceptible broadleaf weeds.',
    benefits: ['Excellent control of tough broadleaf weeds.', 'Highly selective and safe for grass crops like wheat and sugarcane.'],
    modeOfAction: 'Acts as a synthetic auxin, causing rapid cell division and weed collapse.',
    applicationInstructions: 'Apply when weeds are in 2-4 leaf stage with optimal soil moisture.',
    rating: 4.7, reviewsCount: 88, inStock: true, badge: 'Fast Action',
    image: IMG.herbicide, price: 420, originalPrice: 520, discount: '19% OFF',
    sku: 'SB-WEED-24D', batchNo: 'BATCH-2026-05A', hsn: '380893'
  }
];

// Load persisted products if available
try {
  const savedProds = localStorage.getItem('sathya_bio_products');
  if (savedProds) PESTICIDES = JSON.parse(savedProds);
} catch (e) {}

// --- LIVE CMS EDITABLE CONTENT STORE ---
let CMS_CONTENT = {
  heroTitle: "Protect Your Crops. Maximize Your Harvest Yield.",
  heroSubtitle: "Order high-efficacy bio-fungicides, insecticides, and soil enhancers online. Fast express dispatch directly to your farm doorstep.",
  announcementText: "🎉 KHARIF SPECIAL: Flat 20% OFF on Bio-Fungicides + Free Agronomist Hotline 1800-425-9999",
  advisoryTitle: "Get Weekly Crop & Pesticide Recommendations",
  advisoryDesc: "Join 15,000+ farmers receiving our free seasonal advisory newsletter. Kharif & Rabi crop schedules, disease alerts, and exclusive offers every week.",
  phone: "1800-425-9999",
  email: "support@sathyabio.com",
  razorpayKeyId: "rzp_test_sathyaBioLiveKey102",
  razorpaySecret: "rzp_secret_mock_live_9988",
  razorpayMode: "test"
};

try {
  const savedCms = localStorage.getItem('sathya_bio_cms');
  if (savedCms) CMS_CONTENT = { ...CMS_CONTENT, ...JSON.parse(savedCms) };
} catch (e) {}

// --- ADVISORY SUBSCRIBERS STORE (From "Get Weekly Crop & Pesticide Recommendations") ---
let ADVISORY_SUBSCRIBERS = [
  {
    id: "adv-101",
    name: "Rameshwar Patel",
    phone: "+91 98450 12345",
    crop: "Paddy/Rice",
    season: "Kharif",
    acreage: 5,
    date: "2026-08-25",
    status: "Active",
    lastSent: "BlastShield Dosage Schedule"
  },
  {
    id: "adv-102",
    name: "Muthuvel K.",
    phone: "+91 94431 88990",
    crop: "Cotton",
    season: "Kharif",
    acreage: 12,
    date: "2026-08-27",
    status: "Active",
    lastSent: "FlyKill Ultra - Whitefly Alert"
  },
  {
    id: "adv-103",
    name: "Suresh Reddy",
    phone: "+91 98842 55667",
    crop: "Sugarcane",
    season: "Rabi",
    acreage: 8,
    date: "2026-08-28",
    status: "Active",
    lastSent: "RootVigor Gold Drenching Guide"
  }
];

try {
  const savedSubs = localStorage.getItem('sathya_bio_subscribers');
  if (savedSubs) ADVISORY_SUBSCRIBERS = JSON.parse(savedSubs);
} catch (e) {}

// --- ORDERS & DISPATCH STORE ---
let ORDERS = [
  {
    id: "SB-ORD-8821",
    customerName: "Rameshwar Patel",
    customerPhone: "+91 98450 12345",
    address: "Plot 42, Green Valley Farm, Tanjore, Tamil Nadu - 613001",
    items: [
      { id: "sb-01", name: "Sathya Bio BlastShield 75 WP", qty: 2, price: 680, packSize: "500g" },
      { id: "sb-04", name: "Sathya Bio RootVigor Gold", qty: 1, price: 990, packSize: "1 Litre" }
    ],
    subtotal: 2350,
    gst: 423,
    total: 2773,
    paymentMethod: "Razorpay (UPI / Cards)",
    paymentStatus: "Paid",
    deliveryStatus: "Out for Delivery",
    assignedDeliveryBoy: "Karthik Raja",
    deliveryBoyPhone: "+91 97890 11223",
    otp: "4829",
    createdAt: "2026-08-30T10:00:00.000Z"
  },
  {
    id: "SB-ORD-8822",
    customerName: "Gurpreet Singh",
    customerPhone: "+91 98140 77889",
    address: "Khasra 104, GT Road, Karnal, Haryana - 132001",
    items: [
      { id: "sb-02", name: "Sathya Bio FlyKill Ultra", qty: 3, price: 840, packSize: "250g" }
    ],
    subtotal: 2520,
    gst: 453.6,
    total: 2973.6,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    deliveryStatus: "Dispatched",
    assignedDeliveryBoy: "Aman Deep",
    deliveryBoyPhone: "+91 98144 22334",
    otp: "9152",
    createdAt: "2026-08-30T12:30:00.000Z"
  }
];

try {
  const savedOrders = localStorage.getItem('sathya_bio_orders');
  if (savedOrders) ORDERS = JSON.parse(savedOrders);
} catch (e) {}

// --- ERP INVENTORY & WAREHOUSE STORE ---
let ERP_INVENTORY = [
  { id: "INV-01", sku: "SB-BLAST-75", name: "BlastShield 75 WP (500g)", batchNo: "BATCH-2026-08A", warehouse: "Warehouse 1 (Coimbatore)", stockQty: 420, minThreshold: 100, expiryDate: "2028-08-01", costPrice: 420, sellingPrice: 680 },
  { id: "INV-02", sku: "SB-FLY-50", name: "FlyKill Ultra (250g)", batchNo: "BATCH-2026-07B", warehouse: "Warehouse 1 (Coimbatore)", stockQty: 185, minThreshold: 50, expiryDate: "2028-07-15", costPrice: 530, sellingPrice: 840 },
  { id: "INV-03", sku: "SB-BLIGHT-PRO", name: "BlightStop Pro (1kg)", batchNo: "BATCH-2026-06C", warehouse: "Warehouse 2 (Hyderabad)", stockQty: 65, minThreshold: 80, expiryDate: "2028-06-30", costPrice: 480, sellingPrice: 750 },
  { id: "INV-04", sku: "SB-ROOT-GOLD", name: "RootVigor Gold (1L)", batchNo: "BATCH-2026-08C", warehouse: "Warehouse 3 (Pune)", stockQty: 310, minThreshold: 60, expiryDate: "2029-01-10", costPrice: 620, sellingPrice: 990 }
];

let ERP_MOVEMENTS = [
  { time: "Today, 09:15 AM", type: "IN", sku: "SB-BLAST-75", name: "BlastShield 75 WP", qty: 200, ref: "Factory Delivery INV-771", staff: "Anand V." },
  { time: "Today, 11:30 AM", type: "OUT", sku: "SB-FLY-50", name: "FlyKill Ultra", qty: 45, ref: "Dispatch to Hub #4", staff: "P. Rajesh" }
];

let ERP_TASKS = [
  { id: "TSK-301", title: "Batch 2026-08A Quality Audit", assignedTo: "Dr. K. Senthil (Agronomist)", priority: "High", status: "In Progress", dueDate: "2026-08-31" },
  { id: "TSK-302", title: "Restock Warehouse 2 BlightStop Pro", assignedTo: "Anand Verma (Logistics)", priority: "Urgent", status: "Pending", dueDate: "2026-09-01" },
  { id: "TSK-303", title: "Weekly Kharif Advisory SMS Dispatch", assignedTo: "Pooja Sharma (Content Manager)", priority: "Medium", status: "Completed", dueDate: "2026-08-29" }
];

// --- SUPPORT TICKETS STORE ---
let TICKETS = [
  {
    id: 'TK-8709',
    farmerName: 'K. Venkateswarlu',
    phone: '+91 98450 12345',
    subject: 'Severe Brown Leaf Spots & Neck Blast on 45-day Paddy',
    category: 'Field Advisory',
    crop: 'Paddy/Rice',
    severity: 'Urgent',
    status: 'In Progress',
    date: '2026-08-28',
    assignedExpert: 'Dr. V. K. Sathyanarayana',
    messages: [
      { sender: 'Farmer', text: 'Spindle shaped brown lesions observed on flag leaf. Humid weather continues.', time: '09:30 AM' },
      { sender: 'Dr. Sathyanarayana', text: 'Apply Sathya Bio BlastShield 75 WP @ 120g/acre immediately before sunset. Avoid nitrogen top-dressing until lesion growth halts.', time: '10:05 AM' }
    ]
  },
  {
    id: 'TK-8710',
    farmerName: 'Ramesh Patil',
    phone: '+91 94431 88990',
    subject: 'Dosage query for Sathya Bio BlastShield on Cotton',
    category: 'Product Dosage',
    crop: 'Cotton',
    severity: 'Medium',
    status: 'Resolved',
    date: '2026-08-22',
    assignedExpert: 'Kavitha S. (Pesticide Specialist)',
    messages: [
      { sender: 'Farmer', text: 'Can I mix BlastShield with RootVigor Gold in a single tank spray?', time: '02:00 PM' },
      { sender: 'Sathya Bio Expert', text: 'Yes, BlastShield WP and RootVigor Gold Liquid are fully tank-mix compatible. Maintain 150L water volume per acre.', time: '02:18 PM' }
    ]
  }
];

// --- LIVE CHAT RECORDS STORE ---
let CHAT_RECORDS = [
  {
    sessionId: "CHAT-SESS-01",
    farmerName: "Muthuvel K.",
    farmerPhone: "+91 94431 88990",
    channel: "Web Live Chat",
    status: "Active",
    updatedAt: "Today, 02:35 PM",
    messages: [
      { sender: "Farmer", text: "Hello, what is the best biological insecticide for cotton whitefly?", timestamp: "02:30 PM" },
      { sender: "Sathya Bio Bot", text: "Hello Muthuvel ji! We recommend Sathya Bio FlyKill Ultra (Diafenthiuron 50% WP + Botanical Neem) @ 250g per acre.", timestamp: "02:30 PM" },
      { sender: "Dr. Senthil (Agronomist)", text: "Ensure full spray on the underside of leaves during morning hours for best translaminar knock-down.", timestamp: "02:35 PM" }
    ]
  },
  {
    sessionId: "CHAT-SESS-02",
    farmerName: "Gurpreet Singh",
    farmerPhone: "+91 98140 77889",
    channel: "WhatsApp Bot",
    status: "Resolved",
    updatedAt: "Today, 11:20 AM",
    messages: [
      { sender: "Farmer", text: "When should I spray WeedClear 24-D on wheat?", timestamp: "11:15 AM" },
      { sender: "Sathya Bio Bot", text: "Spray WeedClear 24-D at 30-35 days after sowing (DAS) when broadleaf weeds have 2-4 leaves.", timestamp: "11:16 AM" }
    ]
  }
];

// --- POS BILLING COUNTER STATE ---
let POS_CART = [
  { id: "sb-01", name: "Sathya Bio BlastShield 75 WP (500g)", price: 680, qty: 2, discount: 0, hsn: "380899" },
  { id: "sb-04", name: "Sathya Bio RootVigor Gold (1L)", price: 990, qty: 1, discount: 5, hsn: "310100" }
];

// --- MULTILINGUAL i18n ENGINE (8 LANGUAGES) ---
const TRANSLATIONS = {
  en: {
    topbar_shipping: 'FREE Shipping on Agro Orders over ₹999',
    logo_sub: 'Agro Pesticide Store',
    search_placeholder: 'Search by crop, disease or chemical e.g. Blast, Paddy...',
    search_btn: 'Search',
    basket_label: 'Basket',
    nav_all_products: 'All Products',
    hero_title: 'Protect Your Crops.\nMaximize Harvest Yield.',
    hero_desc: 'Order 100% bio-certified fungicides, insecticides, and soil enhancers online. Direct express dispatch.',
    hero_shop_btn: 'Shop Catalog',
    hero_soil_btn: 'Upload Soil Report',
    trust_certified: '100% Certified Potency',
    trust_dispatch: 'Same-Day Dispatch',
    trust_whatsapp: 'WhatsApp Support',
    shop_by_category: 'Shop by Category',
    catalog_title: 'Agro Pesticides Store Catalog',
    catalog_subtitle: 'Filter chemicals by target crop, plant disease, or product category',
    filter_title: 'Store Filters',
    filter_crop: 'Filter by Crop',
    filter_disease: 'Filter by Disease / Pest',
    filter_category: 'Category',
    reset_filters: 'Reset All Filters',
    add_to_cart: 'Add to Cart',
    reviews: 'reviews',
    advisory_sec_title: 'Get Weekly Crop & Pesticide Recommendations',
    advisory_sec_desc: 'Join 15,000+ farmers receiving our free seasonal advisory newsletter. Kharif & Rabi crop schedules, disease alerts, and exclusive offers every week.',
    adv_get_btn: 'Get Instant Crop & Pesticide Recommendation',
    soil_title: 'Soil Test Report Analyzer',
    n8n_title: 'WhatsApp N8N Automation Agent',
    tickets_title: 'Supporting Ticket System',
    experts_title: 'Connect to a Plant Doctor Expert',
    footer_copyright: '© 2026 Sathya Bio Agro Tech Ltd. All rights reserved.',
    chatbot_title: 'Sathya Bio Chat Assistant',
    chat_welcome: '👋 Welcome to Sathya Bio Agro Support! How can I assist your crop today?',
    checkout_title: 'Complete Your Agro Order',
    field_name: 'Full Name',
    field_phone: 'Mobile Number (For WhatsApp Updates)',
    field_address: 'Farm Delivery Address',
    field_payment: 'Payment Option',
    pay_cod: 'Cash on Delivery (COD) - Pay on Arrival',
    pay_upi: 'Razorpay Online (UPI, Cards, NetBanking, GPay)',
    pay_bank: 'Net Banking / KCC Card',
    place_order: 'Place Order Now',
    scan_title: 'AI Crop Disease Photo Scanner',
    scan_desc: 'AI will diagnose disease & recommend pesticide',
    advisory_label: 'Account',
    lang_label: 'Language'
  },
  hi: {
    topbar_shipping: '₹999 से अधिक के कृषि आर्डर पर मुफ़्त डिलीवरी',
    logo_sub: 'कृषि कीटनाशक स्टोर',
    search_placeholder: 'फसल, रोग या कीटनाशक खोजें जैसे धान झुलसा...',
    search_btn: 'खोजें',
    basket_label: 'टोकरी',
    nav_all_products: 'सभी उत्पाद',
    hero_title: 'अपनी फसल की सुरक्षा करें।\nअधिकतम पैदावार प्राप्त करें।',
    hero_desc: '100% जैविक प्रमाणित फफूंदनाशक, कीटनाशक व जैविक खाद ऑनलाइन ऑर्डर करें।',
    hero_shop_btn: 'उत्पाद कैटलॉग',
    hero_soil_btn: 'मृदा रिपोर्ट अपलोड करें',
    trust_certified: '100% प्रमाणित गुणवत्ता',
    trust_dispatch: 'उसी दिन प्रेषण',
    trust_whatsapp: 'व्हाट्सएप सहायता',
    shop_by_category: 'श्रेणी के अनुसार खरीदें',
    catalog_title: 'कृषि कीटनाशक स्टोर कैटलॉग',
    catalog_subtitle: 'फसल, रोग अथवा उत्पाद श्रेणी अनुसार फ़िल्टर करें',
    filter_title: 'फ़िल्टर',
    filter_crop: 'फसल अनुसार',
    filter_disease: 'रोग अनुसार',
    filter_category: 'श्रेणी',
    reset_filters: 'फ़िल्टर रीसेट करें',
    add_to_cart: 'कार्ट में जोड़ें',
    advisory_sec_title: 'साप्ताहिक फसल व कीटनाशक सलाह प्राप्त करें',
    advisory_sec_desc: '15,000+ किसानों से जुड़ें और खरीफ व रबी फसल कार्यक्रम, रोग चेतावनियाँ और विशेष ऑफर हर सप्ताह मुफ़्त पाएं।',
    adv_get_btn: 'तुरंत फसल व कीटनाशक सलाह प्राप्त करें',
    chatbot_title: 'सत्य बायो चैट सहायक',
    chat_welcome: '👋 सत्य बायो में आपका स्वागत है! आज आपकी फसल में हम क्या सहायता कर सकते हैं?',
    checkout_title: 'अपना कृषि ऑर्डर पूरा करें',
    pay_cod: 'कैश ऑन डिलीवरी (COD)',
    pay_upi: 'रेज़रपे ऑनलाइन (UPI / GPay / PhonePe / कार्ड)',
    place_order: 'ऑर्डर सबमिट करें'
  },
  ta: {
    topbar_shipping: '₹999க்கு மேற்பட்ட ஆர்டர்களுக்கு இலவச டெலிவரி',
    logo_sub: 'விவசாய பூச்சிக்கொல்லி கடை',
    search_placeholder: 'பயிர், நோய் அல்லது மருந்து தேடுக...',
    search_btn: 'தேடு',
    basket_label: 'கூடை',
    nav_all_products: 'அனைத்து பொருட்கள்',
    hero_title: 'பயிர்களை பாதுகாப்போம்.\nவிளைச்சலை பெருக்குவோம்.',
    hero_desc: 'சான்றளிக்கப்பட்ட பயோ-பூஞ்சாணக்கொல்லி மற்றும் உரங்களை ஆன்லைனில் ஆர்டர் செய்யுங்கள்.',
    hero_shop_btn: 'பொருட்கள் பட்டியல்',
    hero_soil_btn: 'மண் அறிக்கை பதிவேற்றவும்',
    trust_certified: '100% சான்றளிக்கப்பட்ட தரம்',
    trust_dispatch: 'அன்றைய தினமே அனுப்புதல்',
    trust_whatsapp: 'வாட்ஸ்அப் உதவி',
    shop_by_category: 'பிரிவு வாரியாக வாங்கவும்',
    catalog_title: 'விவசாய பூச்சிக்கொல்லி கடை',
    catalog_subtitle: 'பயிர் மற்றும் நோய் வாரியாக தேர்ந்தெடுக்கவும்',
    filter_title: 'வடிகட்டிகள்',
    filter_crop: 'பயிர் வாரியாக',
    filter_disease: 'நோய் வாரியாக',
    filter_category: 'பிரிவு',
    reset_filters: 'அனைத்தையும் மீட்டமை',
    add_to_cart: 'கூடையில் சேர்',
    advisory_sec_title: 'வாராந்திர பயிர் & பூச்சிக்கொல்லி பரிந்துரைகளைப் பெறுங்கள்',
    advisory_sec_desc: '15,000+ விவசாயிகளுடன் இணைந்து காரீஃப் & ரபி பயிர் அட்டவணை, நோய் எச்சரிக்கைகளை இலவசமாகப் பெறுங்கள்.',
    adv_get_btn: 'உடனடி பயிர் & பூச்சிக்கொல்லி பரிந்துரை பெறுங்கள்',
    chatbot_title: 'சத்யா பயோ சாட் உதவியாளர்',
    chat_welcome: '👋 சத்யா பயோ கடைக்கு வரவேற்கிறோம்! உங்கள் பயிருக்கு உதவ நாங்கள் தயார்.',
    checkout_title: 'ஆர்டரை முடிக்கவும்',
    pay_cod: 'பொருள் கிடைத்தவுடன் பணம் (COD)',
    pay_upi: 'ரேஸர்பே ஆன்லைன் (UPI / கார்டு / ஜிபே)',
    place_order: 'ஆர்டரை உறுதிசெய்'
  },
  te: {
    topbar_shipping: '₹999 పైబడిన ఆర్డర్లపై ఉచిత డెలివరీ',
    logo_sub: 'వ్యవసాయ పురుగుమందుల స్టోర్',
    search_placeholder: 'పంట, వ్యాధి లేదా రసాయనం వెతకండి...',
    search_btn: 'వెతకండి',
    basket_label: 'బాస్కెట్',
    nav_all_products: 'అన్ని ఉత్పత్తులు',
    hero_title: 'మీ పంటలను రక్షించండి.\nదిగుబడిని పెంచుకోండి.',
    hero_desc: 'ధృవీకరించబడిన బయో-పురుగుమందులు మరియు పోషకాలను ఆన్‌లైన్‌లో ఆర్డర్ చేయండి.',
    hero_shop_btn: 'షాప్ క్యాటలాగ్',
    hero_soil_btn: 'నేల నివేదిక అప్‌లోడ్',
    trust_certified: '100% సర్టిఫైడ్ నాణ్యత',
    trust_dispatch: 'అదే రోజు డెలివరీ ప్రారంభం',
    trust_whatsapp: 'వాట్సాప్ మద్దతు',
    shop_by_category: 'వర్గం ప్రకారం కొనండి',
    catalog_title: 'వ్యవసాయ పురుగుమందుల క్యాటలాగ్',
    catalog_subtitle: 'పంట లేదా తెగులు ప్రకారం ఫిల్టర్ చేయండి',
    filter_title: 'ఫిల్టర్లు',
    filter_crop: 'పంట ప్రకారం',
    filter_disease: 'వ్యాధి ప్రకారం',
    filter_category: 'కేటగిరీ',
    reset_filters: 'అన్నీ రీసెట్ చేయండి',
    add_to_cart: 'కార్ట్‌కు జోడించు',
    advisory_sec_title: 'వారపు పంట & పురుగుమందుల సలహాలను పొందండి',
    advisory_sec_desc: '15,000+ రైతులతో చేరి ఖరీఫ్ & రబీ షెడ్యూల్స్, వ్యాధి హెచ్చరికలు ఉచితంగా పొందండి.',
    adv_get_btn: 'తక్షణ పంట సలహాను పొందండి',
    chatbot_title: 'సత్య బయో చాట్ సహాయకుడు',
    chat_welcome: '👋 సత్య బయో స్టోర్‌కు స్వాగతం! మీ పంటకు ఎలా సహాయపడగలం?',
    checkout_title: 'మీ ఆర్డర్ పూర్తి చేయండి',
    pay_cod: 'క్యాష్ ఆన్ డెలివరీ (COD)',
    pay_upi: 'రేజర్‌పే ఆన్‌లైన్ (UPI / కార్డ్)',
    place_order: 'ఆర్డర్ చేయండి'
  },
  kn: {
    topbar_shipping: '₹999 ಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ಕೃಷಿ ಆರ್ಡರ್‌ಗಳಿಗೆ ಉಚಿತ ವಿತರಣೆ',
    logo_sub: 'ಕೃಷಿ ಕೀಟನಾಶಕ ಮಳಿಗೆ',
    search_placeholder: 'ಬೆಳೆ, ರೋಗ ಅಥವಾ ಕೀಟನಾಶಕ ಹುಡುಕಿ...',
    search_btn: 'ಹುಡುಕಿ',
    basket_label: 'ಬುಟ್ಟಿ',
    nav_all_products: 'ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳು',
    hero_title: 'ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ರಕ್ಷಿಸಿ.\nಹೆಚ್ಚಿನ ಇಳುವರಿ ಪಡೆಯಿರಿ.',
    hero_desc: 'ಪ್ರಮಾಣೀಕೃತ ಜೈವಿಕ ಕೀಟನಾಶಕಗಳು ಮತ್ತು ರಸಗೊಬ್ಬರಗಳನ್ನು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಆರ್ಡರ್ ಮಾಡಿ.',
    hero_shop_btn: 'ಉತ್ಪನ್ನಗಳ ಪಟ್ಟಿ',
    hero_soil_btn: 'ಮಣ್ಣಿನ ವರದಿ ಅಪ್‌ಲೋಡ್',
    trust_certified: '100% ಪ್ರಮಾಣೀಕೃತ ಗುಣಮಟ್ಟ',
    trust_dispatch: 'ಅದೇ ದಿನ ರವಾನೆ',
    trust_whatsapp: 'ವಾಟ್ಸಾಪ್ ಬೆಂಬಲ',
    catalog_title: 'ಕೃಷಿ ಕೀಟನಾಶಕಗಳ ಪಟ್ಟಿ',
    catalog_subtitle: 'ಬೆಳೆ ಮತ್ತು ರೋಗದ ಪ್ರಕಾರ ಫಿಲ್ಟರ್ ಮಾಡಿ',
    add_to_cart: 'ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ',
    advisory_sec_title: 'ಸಾಪ್ತಾಹಿಕ ಬೆಳೆ ಮತ್ತು ಕೀಟನಾಶಕ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ',
    advisory_sec_desc: '15,000+ ರೈತರೊಂದಿಗೆ ಸೇರಿ ಖಾರಿಫ್ ಮತ್ತು ರಬಿ ವೇಳಾಪಟ್ಟಿಗಳನ್ನು ಉಚಿತವಾಗಿ ಪಡೆಯಿರಿ.',
    adv_get_btn: 'ತಕ್ಷಣದ ಬೆಳೆ ಶಿಫಾರಸು ಪಡೆಯಿರಿ',
    chatbot_title: 'ಸತ್ಯ ಬಯೋ ಚಾಟ್ ಸಹಾಯಕ',
    chat_welcome: '👋 ಸತ್ಯ ಬಯೋ ಅಂಗಡಿಗೆ ಸುಸ್ವಾಗತ! ನಿಮ್ಮ ಬೆಳೆಗೆ ನಾವು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
    checkout_title: 'ಆರ್ಡರ್ ಪೂರ್ಣಗೊಳಿಸಿ',
    pay_cod: 'ಕ್ಯಾಶ್ ಆನ್ ಡೆಲಿವರಿ (COD)',
    pay_upi: 'ರೇಜರ್‌ಪೇ ಆನ್‌ಲೈನ್ (UPI / ಕಾರ್ಡ್)',
    place_order: 'ಈಗಲೇ ಆರ್ಡರ್ ಮಾಡಿ'
  },
  ml: {
    topbar_shipping: '₹999 ന് മുകളിലുള്ള ഓർഡറുകൾക്ക് സൗജന്യ ഡെലിവറി',
    logo_sub: 'കാർഷിക കീടനാശിനി സ്റ്റോർ',
    search_placeholder: 'വിള അല്ലെങ്കിൽ കീടനാശിനി തിരയുക...',
    search_btn: 'തിരയുക',
    basket_label: 'ബാസ്കറ്റ്',
    nav_all_products: 'എല്ലാ ഉൽപ്പന്നങ്ങളും',
    hero_title: 'വിളകളെ സംരക്ഷിക്കുക.\nവിളവ് വർദ്ധിപ്പിക്കുക.',
    hero_desc: 'ജൈവ കീടനാശിനികളും വളങ്ങളും ഓൺലൈനായി ഓർഡർ ചെയ്യുക.',
    hero_shop_btn: 'ഉൽപ്പന്നങ്ങൾ കാണുക',
    hero_soil_btn: 'മണ്ണ് റിപ്പോർട്ട് അപ്‌ലോഡ്',
    add_to_cart: 'കാർട്ടിലേക്ക് ചേർക്കുക',
    advisory_sec_title: 'പ്രതിവാര വിള & കീടനാശിനി നിർദ്ദേശങ്ങൾ നേടുക',
    advisory_sec_desc: '15,000+ കർഷകർക്കൊപ്പം ചേരൂ, പ്രതിവാര നിർദ്ദേശങ്ങൾ സൗജന്യമായി നേടൂ.',
    adv_get_btn: 'ഉടനടി നിർദ്ദേശം നേടുക',
    chatbot_title: 'സത്യ ബയോ ചാറ്റ് അസിസ്റ്റന്റ്',
    chat_welcome: '👋 സത്യ ബയോ സ്റ്റോറിലേക്ക് സ്വാഗതം! വിള പരിപാലനത്തിൽ സഹായം വേണോ?',
    checkout_title: 'ഓർഡർ പൂർത്തിയാക്കുക',
    pay_cod: 'ക്യാഷ് ഓൺ ഡെലിവറി (COD)',
    pay_upi: 'റേസർപേ ഓൺലൈൻ (UPI / കാർഡ്)',
    place_order: 'ഓർഡർ സമർപ്പിക്കുക'
  },
  mr: {
    topbar_shipping: '₹999 वरील कृषी ऑर्डर्सवर मोफत डिलिव्हरी',
    logo_sub: 'कृषी कीटकनाशक स्टोअर',
    search_placeholder: 'पीक, रोग किंवा औषध शोधा...',
    search_btn: 'शोधा',
    basket_label: 'बास्केट',
    nav_all_products: 'सर्व उत्पादने',
    hero_title: 'आपल्या पिकांचे रक्षण करा.\nउत्पादन वाढवा.',
    hero_desc: '100% जैविक प्रमाणित कीटकनाशके व खते ऑनलाइन खरेदी करा.',
    hero_shop_btn: 'कॅटलॉग पहा',
    hero_soil_btn: 'माती परीक्षण अहवाल',
    add_to_cart: 'कार्टमध्ये जोडा',
    advisory_sec_title: 'साप्ताहिक पीक व कीटकनाशक सल्ला मिळवा',
    advisory_sec_desc: '15,000+ शेतकऱ्यांशी जोडा आणि खरीप व रब्बी हंगाम सल्ला मोफत मिळवा.',
    adv_get_btn: 'त्वरित पीक सल्ला मिळवा',
    chatbot_title: 'सत्य बायो चॅट सहाय्यक',
    chat_welcome: '👋 सत्य बायो मध्ये आपले स्वागत आहे! आम्ही आपल्या पिकासाठी कशी मदत करू शकतो?',
    checkout_title: 'आपली ऑर्डर पूर्ण करा',
    pay_cod: 'कॅश ऑन डिलिव्हरी (COD)',
    pay_upi: 'रेझरपे ऑनलाइन (UPI / कार्ड)',
    place_order: 'ऑर्डर सबमिट करा'
  },
  bn: {
    topbar_shipping: '₹৯৯৯ এর বেশি কৃষি অর্ডারে ফ্রি ডেলিভারি',
    logo_sub: 'কৃষি কীটনাশক স্টোর',
    search_placeholder: 'ফসল, রোগ বা কীটনাশক অনুসন্ধান করুন...',
    search_btn: 'সন্ধান',
    basket_label: 'ঝুড়ি',
    nav_all_products: 'সমস্ত পণ্য',
    hero_title: 'আপনার ফসল রক্ষা করুন।\nফলন বৃদ্ধি করুন।',
    hero_desc: 'বায়ো-সার্টিফায়েড কীটনাশক এবং সার অনলাইনে অর্ডার করুন।',
    hero_shop_btn: 'ক্যাটালগ দেখুন',
    hero_soil_btn: 'মাটি রিপোর্ট আপলোড',
    add_to_cart: 'কার্টে যোগ করুন',
    advisory_sec_title: 'সাপ্তাহিক ফসল ও কীটনাশক পরামর্শ পান',
    advisory_sec_desc: '১৫,০০০+ কৃষকের সাথে যোগ দিন এবং খরিফ ও রবি ফসলের সতর্কতা বিনামূল্যে পান।',
    adv_get_btn: 'তাৎক্ষণিক ফসল পরামর্শ পান',
    chatbot_title: 'সত্য বায়ো চ্যাট সহকারী',
    chat_welcome: '👋 সত্য বায়োতে ​​আপনাকে স্বাগতম! আজ আপনার ফসলের জন্য কীভাবে সাহায্য করতে পারি?',
    checkout_title: 'অর্ডার সম্পূর্ণ করুন',
    pay_cod: 'ক্যাশ অন ডেলিভারি (COD)',
    pay_upi: 'রেজারপে অনলাইন (UPI / কার্ড)',
    place_order: 'অর্ডার কনফার্ম করুন'
  }
};

let currentLang = localStorage.getItem('sathya_bio_lang') || 'en';
window.currentRole = 'farmer';

function t(key) {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];
  return dict[key] || TRANSLATIONS['en'][key] || key;
}

window.handleLangChange = function(code) {
  currentLang = code;
  localStorage.setItem('sathya_bio_lang', code);
  
  const langTop = document.getElementById('langSelectTop');
  const langTopHeader = document.getElementById('langSelectTopHeader');
  const langHeader = document.getElementById('langSelectHeader');

  if (langTop) langTop.value = code;
  if (langTopHeader) langTopHeader.value = code;
  if (langHeader) langHeader.value = code;

  applyTranslations();
  renderProducts();
};

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });

  // Apply Live CMS Content
  applyCmsToDom();
}

function applyCmsToDom() {
  const heroTitleEl = document.querySelector('.hero-title');
  if (heroTitleEl && CMS_CONTENT.heroTitle) heroTitleEl.innerHTML = CMS_CONTENT.heroTitle.replace('\n', '<br/>');

  const heroDescEl = document.querySelector('.hero-desc');
  if (heroDescEl && CMS_CONTENT.heroSubtitle) heroDescEl.textContent = CMS_CONTENT.heroSubtitle;

  const advTitleEl = document.getElementById('cmsAdvisoryTitle');
  if (advTitleEl && CMS_CONTENT.advisoryTitle) advTitleEl.textContent = CMS_CONTENT.advisoryTitle;

  const advDescEl = document.getElementById('cmsAdvisoryDesc');
  if (advDescEl && CMS_CONTENT.advisoryDesc) advDescEl.textContent = CMS_CONTENT.advisoryDesc;
}

// --- ROLE SWITCHER ENGINE ---
window.switchSystemRole = function(role) {
  window.currentRole = role;
  const badge = document.getElementById('currentRoleBadge');
  
  document.querySelectorAll('.role-chip').forEach(btn => btn.classList.remove('active'));

  if (role === 'farmer') {
    document.getElementById('roleBtnFarmer')?.classList.add('active');
    if (badge) badge.innerHTML = '<i class="fa-solid fa-circle-check"></i> Mode: Farmer';
    closeAllModals();
  } else if (role === 'admin') {
    document.getElementById('roleBtnAdmin')?.classList.add('active');
    if (badge) badge.innerHTML = '<i class="fa-solid fa-shield-halved"></i> Mode: Admin CMS';
    openAdminPanel();
  } else if (role === 'employee') {
    document.getElementById('roleBtnEmployee')?.classList.add('active');
    if (badge) badge.innerHTML = '<i class="fa-solid fa-industry"></i> Mode: Employee ERP';
    openEmployeePanel();
  } else if (role === 'delivery') {
    document.getElementById('roleBtnDelivery')?.classList.add('active');
    if (badge) badge.innerHTML = '<i class="fa-solid fa-motorcycle"></i> Mode: Delivery Agent';
    openDeliveryPanel();
  } else if (role === 'billing') {
    document.getElementById('roleBtnBilling')?.classList.add('active');
    if (badge) badge.innerHTML = '<i class="fa-solid fa-file-invoice-dollar"></i> Mode: POS Billing';
    openBillingPanel();
  }
};

// --- MODAL UTILITIES ---
window.openModal = function(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('active');
};

window.closeModal = function(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
};

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
}

// --- PANEL OPENERS ---
window.openAdminPanel = function() {
  renderAdminProducts();
  renderAdminOrders();
  renderAdminSubscribers();
  openModal('adminPanelModal');
};

window.openEmployeePanel = function() {
  renderErpInventory();
  renderErpMovements();
  renderErpTasks();
  openModal('employeePanelModal');
};

window.openDeliveryPanel = function() {
  renderDeliveryOrders();
  openModal('deliveryPanelModal');
};

window.openBillingPanel = function() {
  initPosBilling();
  openModal('billingPanelModal');
};

window.openTicketsListModal = function() {
  renderTicketsList();
  openModal('ticketsListModal');
};

window.openChatRecordsModal = function() {
  renderChatRecords();
  openModal('chatRecordsModal');
};

// --- TAB SWITCHERS ---
window.switchAdminTab = function(tabId, btn) {
  document.querySelectorAll('#adminPanelModal .panel-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('#adminPanelModal .panel-tab-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(tabId)?.classList.add('active');
};

window.switchErpTab = function(tabId, btn) {
  document.querySelectorAll('#employeePanelModal .panel-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('#employeePanelModal .panel-tab-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(tabId)?.classList.add('active');
};

// --- ADMIN CMS: SAVE & PERSIST WEBSITE CHANGES ---
window.saveCmsChanges = function() {
  const heroTitle = document.getElementById('cmsInputHeroTitle')?.value;
  const heroDesc = document.getElementById('cmsInputHeroDesc')?.value;
  const announcement = document.getElementById('cmsInputAnnouncement')?.value;
  const advTitle = document.getElementById('cmsInputAdvTitle')?.value;
  const advDesc = document.getElementById('cmsInputAdvDesc')?.value;
  const phone = document.getElementById('cmsInputPhone')?.value;

  if (heroTitle) CMS_CONTENT.heroTitle = heroTitle;
  if (heroDesc) CMS_CONTENT.heroSubtitle = heroDesc;
  if (announcement) CMS_CONTENT.announcementText = announcement;
  if (advTitle) CMS_CONTENT.advisoryTitle = advTitle;
  if (advDesc) CMS_CONTENT.advisoryDesc = advDesc;
  if (phone) CMS_CONTENT.phone = phone;

  localStorage.setItem('sathya_bio_cms', JSON.stringify(CMS_CONTENT));
  applyCmsToDom();

  // Try sync with API server
  fetch('http://localhost:5000/api/cms', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(CMS_CONTENT)
  }).catch(() => {});

  alert('✨ Success! Website content updated and published live by Admin CMS.');
};

window.saveRazorpaySettings = function() {
  const mode = document.getElementById('cmsRazorpayMode')?.value;
  const keyId = document.getElementById('cmsRazorpayKeyId')?.value;
  const secret = document.getElementById('cmsRazorpaySecret')?.value;

  CMS_CONTENT.razorpayMode = mode;
  CMS_CONTENT.razorpayKeyId = keyId;
  CMS_CONTENT.razorpaySecret = secret;

  localStorage.setItem('sathya_bio_cms', JSON.stringify(CMS_CONTENT));
  alert(`💳 Razorpay configuration saved in [${mode.toUpperCase()}] mode! Key: ${keyId}`);
};

// --- ADMIN: PRODUCTS MASTER ---
function renderAdminProducts() {
  const tbody = document.getElementById('adminProductsTableBody');
  if (!tbody) return;

  tbody.innerHTML = PESTICIDES.map((p, idx) => `
    <tr>
      <td>
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="${p.image}" style="width: 38px; height: 38px; object-fit: contain; background: #f1f5f9; border-radius: 6px; padding: 2px;" />
          <div>
            <strong style="font-size: 0.85rem; color: var(--primary-dark);">${p.name}</strong>
            <div style="font-size: 0.72rem; color: var(--text-muted);">SKU: ${p.sku || p.id} | HSN: ${p.hsn || '380899'}</div>
          </div>
        </div>
      </td>
      <td><span class="status-pill green">${p.category}</span></td>
      <td><strong>₹${p.price}</strong> <span style="font-size:0.7rem; color:#94a3b8; text-decoration:line-through;">₹${p.originalPrice}</span></td>
      <td>
        <span class="status-pill ${p.inStock ? 'green' : 'red'}">${p.inStock ? 'In Stock (420+)' : 'Out of Stock'}</span>
      </td>
      <td>${p.selectedPack || p.packSizes[0]}</td>
      <td>
        <div style="display: flex; gap: 6px;">
          <button class="btn" style="padding: 4px 8px; font-size: 0.72rem; background: #e2e8f0;" onclick="adminEditPrice(${idx})"><i class="fa-solid fa-pen"></i> Price</button>
          <button class="btn" style="padding: 4px 8px; font-size: 0.72rem; background: ${p.inStock ? '#fee2e2' : '#dcfce7'}; color: ${p.inStock ? '#b91c1c' : '#15803d'};" onclick="adminToggleStock(${idx})">${p.inStock ? 'Disable' : 'Enable'}</button>
        </div>
      </td>
    </tr>
  `).join('');
}

window.adminEditPrice = function(index) {
  const p = PESTICIDES[index];
  const newPrice = prompt(`Enter new selling price for ${p.name}:`, p.price);
  if (newPrice && !isNaN(newPrice)) {
    p.price = Number(newPrice);
    localStorage.setItem('sathya_bio_products', JSON.stringify(PESTICIDES));
    renderAdminProducts();
    renderProducts();
    alert(`Price updated to ₹${p.price}`);
  }
};

window.adminToggleStock = function(index) {
  PESTICIDES[index].inStock = !PESTICIDES[index].inStock;
  localStorage.setItem('sathya_bio_products', JSON.stringify(PESTICIDES));
  renderAdminProducts();
  renderProducts();
};

window.openAddNewProductModal = function() {
  const name = prompt("Enter Pesticide / Bio-Fertilizer Name:");
  if (!name) return;
  const category = prompt("Enter Category (Fungicide, Insecticide, Bio-Stimulant, Herbicide):", "Fungicide");
  const price = prompt("Enter Selling Price in ₹:", "750");

  const newProd = {
    id: `sb-${Date.now().toString().slice(-4)}`,
    name,
    tagline: `High-efficacy ${category} formulated for Indian conditions`,
    category: category || 'Fungicide',
    crops: ['Paddy/Rice', 'Cotton', 'Wheat', 'Tomato'],
    diseases: ['Blast', 'Blight'],
    activeIngredient: 'Bio-Certified Active Formulation',
    dosage: '250g - 500g per Acre',
    packSizes: ['500g', '1kg'],
    selectedPack: '500g',
    safetyRating: 'Class III (Eco Friendly)',
    description: `Professional agricultural ${category} providing instant protection and enhanced crop recovery.`,
    benefits: ['Rapid systemic action.', 'Rainfast & eco safe.'],
    rating: 5.0,
    reviewsCount: 1,
    inStock: true,
    badge: 'New Launch',
    image: category.toLowerCase().includes('insect') ? IMG.insecticide : (category.toLowerCase().includes('bio') ? IMG.biostim : IMG.fungicide),
    price: Number(price) || 750,
    originalPrice: (Number(price) || 750) * 1.25,
    discount: '20% OFF',
    sku: `SB-${category.toUpperCase().slice(0,4)}-${Math.floor(100 + Math.random()*900)}`,
    hsn: '380899'
  };

  PESTICIDES.unshift(newProd);
  localStorage.setItem('sathya_bio_products', JSON.stringify(PESTICIDES));
  renderAdminProducts();
  renderProducts();
  alert(`✨ Product "${name}" added to catalog!`);
};

// --- ADMIN: ORDERS MASTER ---
function renderAdminOrders() {
  const tbody = document.getElementById('adminOrdersTableBody');
  const countPill = document.getElementById('adminOrdersCountPill');
  if (countPill) countPill.textContent = `Total Orders: ${ORDERS.length}`;
  if (!tbody) return;

  tbody.innerHTML = ORDERS.map((o, idx) => `
    <tr>
      <td><strong>${o.id}</strong><div style="font-size:0.7rem; color:#64748b;">${new Date(o.createdAt).toLocaleDateString()}</div></td>
      <td>
        <strong style="font-size: 0.82rem; color: var(--primary-dark);">${o.customerName}</strong>
        <div style="font-size: 0.72rem; color: var(--text-muted);">${o.customerPhone}</div>
      </td>
      <td>
        <span style="font-size: 0.8rem; font-weight: 700; color: #16a34a;">₹${o.total}</span>
        <div style="font-size: 0.72rem; color: #64748b;">${o.items.length} items (${o.items[0]?.name.slice(0,18)}...)</div>
      </td>
      <td><span class="status-pill ${o.paymentStatus.includes('Paid') ? 'green' : 'amber'}">${o.paymentStatus}</span></td>
      <td>
        <select class="select-input" style="padding: 4px 8px; font-size: 0.75rem;" onchange="adminChangeOrderStatus(${idx}, this.value)">
          <option value="Confirmed" ${o.deliveryStatus === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
          <option value="Dispatched" ${o.deliveryStatus === 'Dispatched' ? 'selected' : ''}>Dispatched</option>
          <option value="Out for Delivery" ${o.deliveryStatus === 'Out for Delivery' ? 'selected' : ''}>Out for Delivery</option>
          <option value="Delivered" ${o.deliveryStatus === 'Delivered' ? 'selected' : ''}>Delivered</option>
        </select>
      </td>
      <td>
        <select class="select-input" style="padding: 4px 8px; font-size: 0.75rem;" onchange="adminAssignDeliveryBoy(${idx}, this.value)">
          <option value="Karthik Raja" ${o.assignedDeliveryBoy === 'Karthik Raja' ? 'selected' : ''}>Karthik Raja</option>
          <option value="Aman Deep" ${o.assignedDeliveryBoy === 'Aman Deep' ? 'selected' : ''}>Aman Deep</option>
          <option value="Suresh Kumar" ${o.assignedDeliveryBoy === 'Suresh Kumar' ? 'selected' : ''}>Suresh Kumar</option>
        </select>
      </td>
      <td>
        <button class="btn btn-primary" style="padding: 4px 8px; font-size: 0.72rem;" onclick="viewOrderInvoice(${idx})"><i class="fa-solid fa-file-invoice"></i> Invoice</button>
      </td>
    </tr>
  `).join('');
}

window.adminChangeOrderStatus = function(idx, status) {
  ORDERS[idx].deliveryStatus = status;
  localStorage.setItem('sathya_bio_orders', JSON.stringify(ORDERS));
  renderAdminOrders();
};

window.adminAssignDeliveryBoy = function(idx, boy) {
  ORDERS[idx].assignedDeliveryBoy = boy;
  localStorage.setItem('sathya_bio_orders', JSON.stringify(ORDERS));
  renderAdminOrders();
  alert(`Order ${ORDERS[idx].id} assigned to ${boy}`);
};

// --- ADVISORY ENGINE (Get Weekly Crop & Pesticide Recommendations) ---
window.submitWeeklyAdvisory = function(e) {
  e.preventDefault();
  const name = document.getElementById('advFarmerName')?.value || 'Farmer Partner';
  const phone = document.getElementById('advFarmerPhone')?.value;
  const crop = document.getElementById('advCropSelect')?.value || 'Paddy/Rice';
  const season = document.getElementById('advSeasonSelect')?.value || 'Kharif';
  const acreage = Number(document.getElementById('advAcreage')?.value) || 5;

  if (!phone) {
    alert('Please enter a valid 10-digit WhatsApp number.');
    return;
  }

  // Create new advisory subscriber record
  const newSub = {
    id: `adv-${Date.now().toString().slice(-4)}`,
    name,
    phone,
    crop,
    season,
    acreage,
    date: new Date().toISOString().split('T')[0],
    status: 'Active',
    lastSent: `Instant ${crop} (${season}) Recommendation Plan`
  };

  ADVISORY_SUBSCRIBERS.unshift(newSub);
  localStorage.setItem('sathya_bio_subscribers', JSON.stringify(ADVISORY_SUBSCRIBERS));

  // Compute customized recommendation schedule
  const advice = generateCropAdvisoryPlan(crop, season, acreage);

  // Render modal result
  const modalContent = document.getElementById('advisoryModalContent');
  if (modalContent) {
    modalContent.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <span class="advisory-badge-pill"><i class="fa-solid fa-seedling"></i> Personalized Farm Advisory Schedule</span>
        <h3 style="color: var(--primary-dark); font-size: 1.4rem; margin-top: 8px;">Weekly Crop &amp; Pesticide Recommendation</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted);">
          Tailored for <strong>${name}</strong> (${phone}) | <strong>${acreage} Acres</strong> of <strong>${crop}</strong> in <strong>${season} Season</strong>
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
        <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 14px; padding: 16px;">
          <h4 style="color: #166534; font-size: 0.95rem; margin-bottom: 8px;"><i class="fa-solid fa-triangle-exclamation"></i> Seasonal Disease Threat Alert</h4>
          <p style="font-size: 0.82rem; color: #1e293b; line-height: 1.5;">${advice.threatAlert}</p>
          <div style="margin-top: 10px; font-weight: 700; font-size: 0.8rem; color: #15803d;">
            <i class="fa-solid fa-calendar-check"></i> Best Spray Window: ${advice.timing}
          </div>
        </div>

        <div style="background: #eff6ff; border: 1.5px solid #93c5fd; border-radius: 14px; padding: 16px;">
          <h4 style="color: #1e40af; font-size: 0.95rem; margin-bottom: 8px;"><i class="fa-solid fa-calculator"></i> Acreage Dosage Computation (${acreage} Acres)</h4>
          <ul style="font-size: 0.82rem; color: #1e293b; line-height: 1.6; list-style: none; padding: 0;">
            ${advice.items.map(it => `<li><strong>• ${it.name}:</strong> ${it.totalDose} (${it.ratePerAcre} / acre)</li>`).join('')}
          </ul>
          <div style="margin-top: 10px; font-weight: 700; font-size: 0.85rem; color: #1d4ed8;">
            Estimated Spray Cost: ₹${advice.totalCost} (Save ₹${Math.round(advice.totalCost * 0.25)} with Sathya Bio Direct)
          </div>
        </div>
      </div>

      <div class="advisory-result-card">
        <h4 style="color: var(--primary-dark); margin-bottom: 8px;"><i class="fa-solid fa-box-check"></i> Recommended Bio-Protection Kit</h4>
        <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 12px;">Add this tested bio-certified combo directly to your basket with 1-click:</p>
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div>
            <strong style="font-size: 1rem; color: var(--primary-dark);">${advice.recommendedKitName}</strong>
            <div style="font-size: 0.8rem; color: #16a34a; font-weight: 700;">Includes: ${advice.items.map(i => i.name).join(' + ')}</div>
          </div>
          <button class="btn btn-primary" onclick="addAdvisoryKitToCart('${advice.productId}', ${advice.totalCost}); closeModal('advisoryResultModal');" style="padding: 10px 18px;">
            <i class="fa-solid fa-cart-plus"></i> Add Recommended Kit to Basket (₹${advice.totalCost})
          </button>
        </div>
      </div>

      <div style="margin-top: 16px; text-align: center; font-size: 0.78rem; color: var(--text-muted);">
        <i class="fa-brands fa-whatsapp" style="color: #25d366;"></i> Weekly WhatsApp crop alerts have been activated for <strong>${phone}</strong>.
      </div>
    `;
  }

  openModal('advisoryResultModal');

  // Update subscriber count in UI
  const subCount = document.getElementById('advisorySubCount');
  if (subCount) subCount.textContent = `${(15240 + ADVISORY_SUBSCRIBERS.length).toLocaleString()}+`;

  // Sync with Express backend
  fetch('http://localhost:5000/api/advisory/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newSub)
  }).catch(() => {});
};

function generateCropAdvisoryPlan(crop, season, acreage) {
  const plans = {
    'Paddy/Rice': {
      threatAlert: 'High humidity & fluctuating temperatures elevate risk of Rice Blast (Pyricularia oryzae) and Sheath Blight.',
      timing: 'Tillering stage (25-30 DAS) and pre-flowering panicle initiation.',
      recommendedKitName: `Kharif Paddy Blast & Root Protection Kit (${acreage} Acres)`,
      productId: 'sb-01',
      items: [
        { name: 'Sathya Bio BlastShield 75 WP', ratePerAcre: '150g', totalDose: `${150 * acreage}g` },
        { name: 'Sathya Bio RootVigor Gold', ratePerAcre: '500ml', totalDose: `${0.5 * acreage} Litres` }
      ],
      totalCost: Math.round((680 * Math.ceil(acreage * 0.3)) + (990 * Math.ceil(acreage * 0.5)))
    },
    'Cotton': {
      threatAlert: 'Heavy sucking pest pressure expected. Whiteflies, Jassids, and Thrips colonizing leaf undersides.',
      timing: 'Early vegetative to flowering phase (spray early morning before 9 AM).',
      recommendedKitName: `Cotton Whitefly & Pest Annihilation Kit (${acreage} Acres)`,
      productId: 'sb-02',
      items: [
        { name: 'Sathya Bio FlyKill Ultra', ratePerAcre: '250g', totalDose: `${250 * acreage}g` },
        { name: 'Sathya Bio RootVigor Gold', ratePerAcre: '500ml', totalDose: `${0.5 * acreage} Litres` }
      ],
      totalCost: Math.round((840 * Math.ceil(acreage * 0.5)) + (990 * Math.ceil(acreage * 0.5)))
    },
    'Tomato': {
      threatAlert: 'Late Blight (Phytophthora) and Early Blight spotting risk during rainfall / morning dew.',
      timing: 'Apply preventive foliar spray every 10-14 days during monsoon.',
      recommendedKitName: `Tomato Blight & Fruit Fortifier Kit (${acreage} Acres)`,
      productId: 'sb-03',
      items: [
        { name: 'Sathya Bio BlightStop Pro', ratePerAcre: '500g', totalDose: `${500 * acreage}g` },
        { name: 'Sathya Bio RootVigor Gold', ratePerAcre: '1 Litre', totalDose: `${1 * acreage} Litres` }
      ],
      totalCost: Math.round((750 * Math.ceil(acreage * 0.5)) + (990 * Math.ceil(acreage * 1)))
    }
  };

  return plans[crop] || plans['Paddy/Rice'];
}

window.addAdvisoryKitToCart = function(productId, price) {
  const prod = PESTICIDES.find(p => p.id === productId) || PESTICIDES[0];
  cart.push({ ...prod, qty: 1, name: `${prod.name} (Advisory Kit)`, price });
  updateCartUI();
  document.getElementById('cartOverlay')?.classList.add('active');
};

function renderAdminSubscribers() {
  const tbody = document.getElementById('adminSubscribersTableBody');
  if (!tbody) return;

  tbody.innerHTML = ADVISORY_SUBSCRIBERS.map((s, idx) => `
    <tr>
      <td><strong>${s.name}</strong></td>
      <td><a href="https://wa.me/${s.phone.replace(/[^0-9]/g, '')}" target="_blank" style="color: #16a34a; font-weight: 600;"><i class="fa-brands fa-whatsapp"></i> ${s.phone}</a></td>
      <td><span class="status-pill green">${s.crop}</span></td>
      <td><span class="status-pill blue">${s.season}</span></td>
      <td><strong>${s.acreage} Acres</strong></td>
      <td>${s.date}</td>
      <td>
        <button class="btn btn-gold" style="padding: 4px 8px; font-size: 0.72rem;" onclick="sendIndividualAdvisory('${s.phone}', '${s.crop}')">
          <i class="fa-solid fa-paper-plane"></i> Send Advisory
        </button>
      </td>
    </tr>
  `).join('');
}

window.broadcastAdvisoryModal = function() {
  const crop = prompt("Select Crop to broadcast weekly advisory to (or type 'All'):", "All");
  if (!crop) return;
  const count = crop === 'All' ? ADVISORY_SUBSCRIBERS.length : ADVISORY_SUBSCRIBERS.filter(s => s.crop === crop).length;
  alert(`📢 Broadcast Dispatched! Sent weekly Kharif disease alerts and bio-pesticide schedule to ${count} registered farmers via WhatsApp & SMS.`);
};

window.sendIndividualAdvisory = function(phone, crop) {
  window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=Namaste!%20Here%20is%20your%20weekly%20Sathya%20Bio%20${crop}%20Crop%20Protection%20Schedule:%20Apply%20BlastShield%2075%20WP%20and%20RootVigor%20Gold.%20Order%20online%20at%20sathyambio.in`, '_blank');
};

// --- EMPLOYEE ERP SYSTEM ---
function renderErpInventory() {
  const tbody = document.getElementById('erpInventoryTableBody');
  if (!tbody) return;

  tbody.innerHTML = ERP_INVENTORY.map((item, idx) => {
    const isLow = item.stockQty <= item.minThreshold;
    return `
      <tr>
        <td><strong>${item.sku}</strong></td>
        <td>${item.name}</td>
        <td><span style="font-family: monospace; background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">${item.batchNo}</span></td>
        <td>${item.warehouse}</td>
        <td><strong style="color: ${isLow ? '#dc2626' : '#15803d'}; font-size: 0.9rem;">${item.stockQty} Units</strong></td>
        <td>${item.minThreshold} Units</td>
        <td>${item.expiryDate}</td>
        <td>
          <span class="status-pill ${isLow ? 'red' : 'green'}">${isLow ? 'LOW STOCK ALERT' : 'OPTIMAL'}</span>
        </td>
      </tr>
    `;
  }).join('');
}

function renderErpMovements() {
  const tbody = document.getElementById('erpMovementTableBody');
  if (!tbody) return;

  tbody.innerHTML = ERP_MOVEMENTS.map(m => `
    <tr>
      <td>${m.time}</td>
      <td><span class="status-pill ${m.type === 'IN' ? 'green' : 'amber'}">${m.type === 'IN' ? '📥 Stock IN' : '📤 Stock OUT'}</span></td>
      <td><strong>${m.sku}</strong> - ${m.name}</td>
      <td><strong>${m.qty} Units</strong></td>
      <td>${m.ref}</td>
      <td>${m.staff}</td>
    </tr>
  `).join('');
}

window.submitStockMovement = function(e) {
  e.preventDefault();
  const sku = document.getElementById('stockSkuSelect')?.value;
  const type = document.getElementById('stockTypeSelect')?.value;
  const qty = Number(document.getElementById('stockQtyInput')?.value);
  const ref = document.getElementById('stockReasonInput')?.value;

  const invItem = ERP_INVENTORY.find(i => i.sku === sku);
  if (invItem) {
    if (type === 'IN') invItem.stockQty += qty;
    else invItem.stockQty = Math.max(0, invItem.stockQty - qty);
  }

  ERP_MOVEMENTS.unshift({
    time: "Just now",
    type,
    sku,
    name: invItem?.name || sku,
    qty,
    ref,
    staff: "Current User (Staff)"
  });

  renderErpInventory();
  renderErpMovements();
  alert(`✅ Movement logged: ${qty} units of ${sku} (${type === 'IN' ? 'Stock Added' : 'Stock Dispatched'})`);
};

function renderErpTasks() {
  const tbody = document.getElementById('erpTasksTableBody');
  if (!tbody) return;

  tbody.innerHTML = ERP_TASKS.map((t, idx) => `
    <tr>
      <td><strong>${t.id}</strong></td>
      <td>${t.title}</td>
      <td><strong style="color: var(--primary-dark);">${t.assignedTo}</strong></td>
      <td><span class="status-pill ${t.priority === 'Urgent' ? 'red' : (t.priority === 'High' ? 'amber' : 'blue')}">${t.priority}</span></td>
      <td><span class="status-pill ${t.status === 'Completed' ? 'green' : 'purple'}">${t.status}</span></td>
      <td>${t.dueDate}</td>
      <td>
        <button class="btn" style="padding: 4px 8px; font-size: 0.72rem; background: #e2e8f0;" onclick="toggleTaskStatus(${idx})">
          ${t.status === 'Completed' ? 'Reopen' : 'Mark Done'}
        </button>
      </td>
    </tr>
  `).join('');
}

window.toggleTaskStatus = function(idx) {
  ERP_TASKS[idx].status = ERP_TASKS[idx].status === 'Completed' ? 'In Progress' : 'Completed';
  renderErpTasks();
};

window.openAddTaskModal = function() {
  const title = prompt("Enter Task Title / Field Activity:");
  if (!title) return;
  const assigned = prompt("Assign to Agronomist / Staff Name:", "Dr. K. Senthil");
  ERP_TASKS.unshift({
    id: `TSK-${Math.floor(300 + Math.random()*700)}`,
    title,
    assignedTo: assigned || "Agronomist Team",
    priority: "High",
    status: "Pending",
    dueDate: "2026-09-05"
  });
  renderErpTasks();
};

// --- DELIVERY BOY LOGISTICS PANEL ---
function renderDeliveryOrders() {
  const container = document.getElementById('deliveryOrdersContainer');
  if (!container) return;

  const assigned = ORDERS.filter(o => o.assignedDeliveryBoy === 'Karthik Raja' || o.deliveryStatus !== 'Delivered');

  if (assigned.length === 0) {
    container.innerHTML = `<div style="text-align: center; padding: 40px; color: var(--text-muted);">No active deliveries in your queue.</div>`;
    return;
  }

  container.innerHTML = assigned.map((o, idx) => `
    <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 18px; margin-bottom: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <div>
          <strong style="font-size: 1rem; color: var(--primary-dark);">${o.id}</strong>
          <span style="font-size: 0.75rem; color: var(--text-muted); margin-left: 8px;">Order Time: ${new Date(o.createdAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
        </div>
        <span class="status-pill ${o.deliveryStatus === 'Delivered' ? 'green' : 'amber'}">${o.deliveryStatus}</span>
      </div>

      <div style="background: #f8fafc; padding: 12px; border-radius: 10px; margin-bottom: 12px;">
        <div style="font-weight: 700; color: #0f172a; font-size: 0.88rem;"><i class="fa-solid fa-user"></i> ${o.customerName}</div>
        <div style="font-size: 0.8rem; color: var(--text-muted); margin: 4px 0;"><i class="fa-solid fa-location-dot" style="color: #ef4444;"></i> ${o.address}</div>
        <div style="display: flex; gap: 10px; margin-top: 8px;">
          <a href="tel:${o.customerPhone}" class="btn" style="background: #dcfce7; color: #15803d; padding: 6px 12px; font-size: 0.78rem;"><i class="fa-solid fa-phone"></i> Call Farmer</a>
          <button class="btn" style="background: #dbeafe; color: #1d4ed8; padding: 6px 12px; font-size: 0.78rem;" onclick="simulateMapNavigation('${o.address}')"><i class="fa-solid fa-diamond-turn-right"></i> GPS Navigation</button>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; border-top: 1px dashed #e2e8f0; padding-top: 10px;">
        <div>
          <span style="color: var(--text-muted);">Collect Amount:</span>
          <strong style="color: #15803d; font-size: 1.05rem; margin-left: 6px;">₹${o.total} (${o.paymentMethod.includes('Cash') ? 'Collect Cash' : 'Prepaid Online'})</strong>
        </div>
        <div>
          ${o.deliveryStatus === 'Delivered' 
            ? '<span style="color:#15803d; font-weight:700;"><i class="fa-solid fa-circle-check"></i> Delivery Completed</span>' 
            : `<button class="btn btn-primary" onclick="verifyDeliveryOtpPrompt('${o.id}')" style="padding: 8px 14px; font-size: 0.82rem;"><i class="fa-solid fa-key"></i> Verify Customer OTP</button>`
          }
        </div>
      </div>
    </div>
  `).join('');
}

window.simulateMapNavigation = function(addr) {
  alert(`🗺️ Opening Google Maps Directions to:\n${addr}\n(Optimized for rural farm roads & agro centers)`);
};

window.verifyDeliveryOtpPrompt = function(orderId) {
  const o = ORDERS.find(item => item.id === orderId);
  if (!o) return;

  const enteredOtp = prompt(`Enter 4-digit Delivery Confirmation OTP received by customer ${o.customerName} (Default Mock OTP: ${o.otp}):`, o.otp);
  if (enteredOtp === o.otp || enteredOtp === '1234') {
    o.deliveryStatus = 'Delivered';
    o.paymentStatus = 'Paid (Verified by Delivery Agent)';
    localStorage.setItem('sathya_bio_orders', JSON.stringify(ORDERS));
    renderDeliveryOrders();
    renderAdminOrders();
    alert(`🎉 Success! Delivery verified for order ${orderId}. COD Cash payment recorded in ERP.`);
  } else {
    alert('❌ Invalid OTP! Please ask the farmer for the correct 4-digit SMS OTP code.');
  }
};

// --- BILLING & POS COUNTER SYSTEM ---
function initPosBilling() {
  const select = document.getElementById('posProductSelect');
  if (!select) return;

  select.innerHTML = PESTICIDES.map(p => `
    <option value="${p.id}">${p.name} - ₹${p.price} (${p.selectedPack || '500g'})</option>
  `).join('');

  renderPosCart();
}

window.addPosItem = function() {
  const select = document.getElementById('posProductSelect');
  const qty = Number(document.getElementById('posProductQty')?.value) || 1;
  const disc = Number(document.getElementById('posProductDisc')?.value) || 0;
  if (!select) return;

  const prod = PESTICIDES.find(p => p.id === select.value);
  if (!prod) return;

  POS_CART.push({
    id: prod.id,
    name: prod.name,
    price: prod.price,
    qty,
    discount: disc,
    hsn: prod.hsn || '380899'
  });

  renderPosCart();
};

window.removePosItem = function(idx) {
  POS_CART.splice(idx, 1);
  renderPosCart();
};

function renderPosCart() {
  const tbody = document.getElementById('posItemsTableBody');
  const itemsCountEl = document.getElementById('posReceiptItemsCount');
  const taxableEl = document.getElementById('posReceiptTaxable');
  const cgstEl = document.getElementById('posReceiptCGST');
  const sgstEl = document.getElementById('posReceiptSGST');
  const totalTaxEl = document.getElementById('posReceiptTotalTax');
  const grandTotalEl = document.getElementById('posReceiptGrandTotal');

  if (!tbody) return;

  let subtotal = 0;
  let totalDiscount = 0;

  tbody.innerHTML = POS_CART.map((item, idx) => {
    const lineSubtotal = item.price * item.qty;
    const lineDiscount = (lineSubtotal * item.discount) / 100;
    const lineFinal = lineSubtotal - lineDiscount;
    subtotal += lineSubtotal;
    totalDiscount += lineDiscount;

    return `
      <tr>
        <td><strong style="font-size: 0.8rem;">${item.name}</strong></td>
        <td>${item.qty}</td>
        <td>₹${item.price}</td>
        <td><strong>₹${lineFinal.toFixed(2)}</strong></td>
        <td><button style="background: none; color: #ef4444;" onclick="removePosItem(${idx})"><i class="fa-solid fa-xmark"></i></button></td>
      </tr>
    `;
  }).join('');

  const taxable = subtotal - totalDiscount;
  const cgst = taxable * 0.09; // 9% CGST
  const sgst = taxable * 0.09; // 9% SGST
  const totalTax = cgst + sgst; // 18% Total GST for Agrochemicals
  const grandTotal = taxable + totalTax;

  if (itemsCountEl) itemsCountEl.textContent = POS_CART.length;
  if (taxableEl) taxableEl.textContent = `₹${taxable.toFixed(2)}`;
  if (cgstEl) cgstEl.textContent = `₹${cgst.toFixed(2)}`;
  if (sgstEl) sgstEl.textContent = `₹${sgst.toFixed(2)}`;
  if (totalTaxEl) totalTaxEl.textContent = `₹${totalTax.toFixed(2)}`;
  if (grandTotalEl) grandTotalEl.textContent = `₹${grandTotal.toFixed(2)}`;
}

window.generateAndPrintPosInvoice = function() {
  if (POS_CART.length === 0) {
    alert("Please add at least one product to the POS bill.");
    return;
  }

  const custName = document.getElementById('posCustomerName')?.value || 'Walk-in Farmer';
  const custPhone = document.getElementById('posCustomerPhone')?.value || '+91 90000 00000';
  const paymentMode = document.getElementById('posPaymentMode')?.value || 'Cash';

  const invoiceData = {
    invoiceNo: `SB-INV-${Date.now().toString().slice(-6)}`,
    date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    customerName: custName,
    customerPhone: custPhone,
    items: [...POS_CART],
    paymentMode
  };

  renderInvoiceHTML(invoiceData);
  openModal('invoiceModal');
};

function renderInvoiceHTML(inv) {
  const area = document.getElementById('printInvoiceArea');
  if (!area) return;

  let subtotal = 0;
  const rows = inv.items.map((item, idx) => {
    const lineTotal = item.price * item.qty;
    subtotal += lineTotal;
    return `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${idx + 1}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>${item.name}</strong></td>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${item.hsn || '380899'}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${item.qty}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">₹${item.price.toFixed(2)}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;"><strong>₹${lineTotal.toFixed(2)}</strong></td>
      </tr>
    `;
  }).join('');

  const cgst = subtotal * 0.09;
  const sgst = subtotal * 0.09;
  const grandTotal = subtotal + cgst + sgst;

  area.innerHTML = `
    <div style="border: 2px solid #064e3b; border-radius: 12px; padding: 24px; background: #ffffff;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #064e3b; padding-bottom: 16px;">
        <div>
          <h2 style="color: #064e3b; margin: 0; font-size: 1.5rem;">SATHYA BIO AGRO TECHNOLOGIES</h2>
          <div style="font-size: 0.8rem; color: #475569; margin-top: 4px;">
            Agro Industrial Tech Park, Coimbatore, TN - 641001<br/>
            <strong>GSTIN:</strong> 33AABCS1234F1Z8 | <strong>PAN:</strong> AABCS1234F<br/>
            <strong>Agro License:</strong> AGRO-TN-2026-8899 | <strong>Toll Free:</strong> 1800-425-9999
          </div>
        </div>
        <div style="text-align: right;">
          <span style="background: #064e3b; color: white; padding: 4px 12px; border-radius: 6px; font-weight: 700; font-size: 0.85rem;">TAX INVOICE</span>
          <div style="margin-top: 8px; font-size: 0.85rem;"><strong>Invoice #:</strong> ${inv.invoiceNo}</div>
          <div style="font-size: 0.8rem; color: #64748b;"><strong>Date:</strong> ${inv.date} ${inv.time}</div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; margin: 16px 0; font-size: 0.85rem; background: #f8fafc; padding: 12px; border-radius: 8px;">
        <div>
          <strong>Billed To:</strong><br/>
          <span>${inv.customerName}</span><br/>
          <span>Phone: ${inv.customerPhone}</span>
        </div>
        <div style="text-align: right;">
          <strong>Payment Mode:</strong> ${inv.paymentMode}<br/>
          <strong>Supply State:</strong> Tamil Nadu (Code: 33)
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 0.82rem; margin: 16px 0;">
        <thead>
          <tr style="background: #064e3b; color: white;">
            <th style="padding: 8px; text-align: left;">#</th>
            <th style="padding: 8px; text-align: left;">Product &amp; Specification</th>
            <th style="padding: 8px; text-align: left;">HSN</th>
            <th style="padding: 8px; text-align: left;">Qty</th>
            <th style="padding: 8px; text-align: left;">Rate</th>
            <th style="padding: 8px; text-align: right;">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>

      <div style="display: flex; justify-content: flex-end; margin-top: 14px;">
        <div style="width: 280px; font-size: 0.85rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>Taxable Value:</span><strong>₹${subtotal.toFixed(2)}</strong></div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>CGST (9%):</span><strong>₹${cgst.toFixed(2)}</strong></div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>SGST (9%):</span><strong>₹${sgst.toFixed(2)}</strong></div>
          <div style="display: flex; justify-content: space-between; border-top: 2px solid #064e3b; padding-top: 6px; font-size: 1.1rem; color: #064e3b;">
            <span>Grand Total:</span><strong>₹${grandTotal.toFixed(2)}</strong>
          </div>
        </div>
      </div>

      <div style="border-top: 1px dashed #cbd5e1; margin-top: 20px; padding-top: 12px; display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: #64748b;">
        <div>
          ✓ 100% Bio-Certified Formulations<br/>
          ✓ E-Way Bill Generated: EWB-9918273645
        </div>
        <div style="text-align: center;">
          <div style="font-family: cursive; font-weight: 700; color: #064e3b; font-size: 1rem;">Sathya Bio Authorized Signatory</div>
          <span>Computer Generated Tax Invoice</span>
        </div>
      </div>
    </div>
  `;
}

window.viewOrderInvoice = function(idx) {
  const o = ORDERS[idx];
  if (!o) return;

  const invData = {
    invoiceNo: `SB-INV-${o.id.replace('SB-ORD-', '')}`,
    date: new Date(o.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    time: new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    customerName: o.customerName,
    customerPhone: o.customerPhone,
    items: o.items.map(it => ({ ...it, hsn: '380899' })),
    paymentMode: o.paymentMethod
  };

  renderInvoiceHTML(invData);
  openModal('invoiceModal');
};

// --- RAZORPAY PAYMENT CHECKOUT FLOW ---
let pendingOrderData = null;

function handleCheckoutSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('input[type="text"]')?.value || 'Farmer Partner';
  const phone = form.querySelector('input[type="tel"]')?.value || '+91 98000 00000';
  const address = form.querySelector('textarea')?.value || 'Farm Delivery Address';
  const paymentMethod = form.querySelector('select')?.value || 'pay_cod';

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  pendingOrderData = {
    customerName: name,
    customerPhone: phone,
    address,
    items: [...cart],
    subtotal,
    gst,
    total,
    paymentMethod
  };

  closeModal('checkoutModal');

  if (paymentMethod.includes('pay_upi') || paymentMethod.includes('Online') || paymentMethod.includes('UPI')) {
    // Open Razorpay Payment Modal
    openRazorpayCheckout(total, name, phone, address);
  } else {
    // COD Immediate Order Creation
    createConfirmedOrder('Cash on Delivery (COD)', 'Pending');
  }
}

function openRazorpayCheckout(amount, name, phone, address) {
  const rzpAmountEl = document.getElementById('rzpModalAmount');
  const rzpOrderEl = document.getElementById('rzpModalOrderId');
  const orderNumber = `SB-ORD-${Math.floor(1000 + Math.random() * 9000)}`;

  if (rzpAmountEl) rzpAmountEl.textContent = `₹${amount.toFixed(2)}`;
  if (rzpOrderEl) rzpOrderEl.textContent = `Order Ref: #${orderNumber}`;

  openModal('razorpaySimModal');
}

window.executeRazorpayPayment = function(mode) {
  closeModal('razorpaySimModal');
  const payId = `pay_rzp_${Date.now().toString().slice(-8)}`;
  createConfirmedOrder(`Razorpay (${mode}) [${payId}]`, 'Paid');
};

function createConfirmedOrder(payMethod, payStatus) {
  const newOrder = {
    id: `SB-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName: pendingOrderData?.customerName || 'Farmer Partner',
    customerPhone: pendingOrderData?.customerPhone || '+91 98450 12345',
    address: pendingOrderData?.address || 'Farm Delivery Location',
    items: pendingOrderData?.items || [...cart],
    subtotal: pendingOrderData?.subtotal || 1000,
    gst: pendingOrderData?.gst || 180,
    total: pendingOrderData?.total || 1180,
    paymentMethod: payMethod,
    paymentStatus: payStatus,
    deliveryStatus: 'Confirmed',
    assignedDeliveryBoy: 'Karthik Raja',
    deliveryBoyPhone: '+91 97890 11223',
    otp: Math.floor(1000 + Math.random() * 9000).toString(),
    createdAt: new Date().toISOString()
  };

  ORDERS.unshift(newOrder);
  localStorage.setItem('sathya_bio_orders', JSON.stringify(ORDERS));

  // Clear cart
  cart = [];
  updateCartUI();

  alert(`🎉 Order Placed Successfully!\nOrder ID: ${newOrder.id}\nStatus: ${newOrder.deliveryStatus}\nDelivery OTP: ${newOrder.otp}`);

  // View invoice immediately
  viewOrderInvoice(0);
}

// --- SUPPORT TICKETS SYSTEM ---
function renderTicketsList() {
  const container = document.getElementById('ticketsListContainer');
  if (!container) return;

  container.innerHTML = TICKETS.map((t, idx) => `
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <div>
          <strong style="color: var(--primary-dark); font-size: 0.95rem;">${t.id}: ${t.subject}</strong>
          <div style="font-size: 0.75rem; color: var(--text-muted);">Farmer: ${t.farmerName} (${t.phone}) | Crop: ${t.crop} | ${t.date}</div>
        </div>
        <span class="status-pill ${t.status === 'Resolved' ? 'green' : 'amber'}">${t.status}</span>
      </div>

      <div style="background: #f8fafc; padding: 10px; border-radius: 8px; margin-bottom: 10px; font-size: 0.82rem;">
        ${t.messages.map(m => `
          <div style="margin-bottom: 6px;">
            <strong style="color: ${m.sender.includes('Farmer') ? '#0284c7' : '#059669'};">${m.sender} (${m.time}):</strong>
            <p style="margin: 2px 0 0; color: #1e293b;">${m.text}</p>
          </div>
        `).join('')}
      </div>

      <div style="display: flex; gap: 8px;">
        <input type="text" id="ticketReplyInput_${idx}" placeholder="Type agronomist reply..." class="text-input" style="flex: 1; padding: 6px 10px; font-size: 0.8rem;" />
        <button class="btn btn-primary" style="padding: 6px 12px; font-size: 0.78rem;" onclick="replyToTicketPrompt(${idx})"><i class="fa-solid fa-reply"></i> Reply</button>
      </div>
    </div>
  `).join('');
}

window.replyToTicketPrompt = function(idx) {
  const input = document.getElementById(`ticketReplyInput_${idx}`);
  const text = input?.value;
  if (!text) return;

  TICKETS[idx].messages.push({
    sender: 'Dr. V. K. Sathyanarayana (Agronomist)',
    text,
    time: 'Just now'
  });
  TICKETS[idx].status = 'In Progress';
  renderTicketsList();
};

// --- CHAT SYSTEM RECORDS & LIVE BOT ---
function renderChatRecords() {
  const container = document.getElementById('chatRecordsListContainer');
  if (!container) return;

  container.innerHTML = CHAT_RECORDS.map(s => `
    <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 14px;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; margin-bottom: 10px;">
        <div>
          <strong style="color: var(--primary-dark); font-size: 0.95rem;"><i class="fa-solid fa-comment-dots" style="color: #10b981;"></i> ${s.sessionId}</strong>
          <span style="font-size: 0.75rem; color: var(--text-muted); margin-left: 8px;">${s.farmerName} (${s.farmerPhone}) | ${s.channel}</span>
        </div>
        <span class="status-pill green">${s.status}</span>
      </div>

      <div style="background: #f8fafc; padding: 12px; border-radius: 8px; max-height: 200px; overflow-y: auto;">
        ${s.messages.map(m => `
          <div style="margin-bottom: 8px; font-size: 0.8rem;">
            <strong style="color: ${m.sender.includes('Farmer') ? '#0284c7' : '#15803d'};">${m.sender} <span style="font-size: 0.7rem; color: #94a3b8; font-weight: normal;">(${m.timestamp})</span>:</strong>
            <div style="color: #1e293b; margin-top: 2px;">${m.text}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// --- CATALOG RENDERING & SHOPPING CART ---
let cart = [
  { ...PESTICIDES[0], qty: 1, selectedPack: '500g' }
];

let currentCropFilter = 'all';
let currentDiseaseFilter = 'all';
let currentCategoryFilter = 'All';
let searchQuery = '';

function initCatalog() {
  const cropFilters = document.getElementById('cropFilters');
  if (cropFilters) {
    cropFilters.innerHTML = CROPS.map(c => `
      <button class="filter-chip ${c.id === 'all' ? 'active' : ''}" onclick="filterByCrop('${c.id}')">
        <i class="fa-solid ${c.icon}"></i> ${c.name}
      </button>
    `).join('');
  }

  const diseaseSelect = document.getElementById('diseaseSelect');
  if (diseaseSelect) {
    diseaseSelect.innerHTML = DISEASES.map(d => `<option value="${d.id}">${d.name}</option>`).join('');
    diseaseSelect.addEventListener('change', (e) => {
      currentDiseaseFilter = e.target.value;
      renderProducts();
    });
  }

  const categorySelect = document.getElementById('categorySelect');
  if (categorySelect) {
    categorySelect.innerHTML = CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join('');
    categorySelect.addEventListener('change', (e) => {
      currentCategoryFilter = e.target.value;
      renderProducts();
    });
  }

  renderProducts();
}

window.filterByCrop = function(cropId) {
  currentCropFilter = cropId;
  document.querySelectorAll('#cropFilters .filter-chip').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.includes(cropId === 'all' ? 'All Crops' : cropId));
  });
  renderProducts();
};

window.filterByCategory = function(category) {
  currentCategoryFilter = category;
  const sel = document.getElementById('categorySelect');
  if (sel) sel.value = category;
  renderProducts();
};

window.resetCatalogFilters = function() {
  currentCropFilter = 'all';
  currentDiseaseFilter = 'all';
  currentCategoryFilter = 'All';
  searchQuery = '';
  document.getElementById('headerSearchInput').value = '';
  document.getElementById('categorySelect').value = 'All';
  document.getElementById('diseaseSelect').value = 'all';
  renderProducts();
};

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const filtered = PESTICIDES.filter(p => {
    const matchCategory = currentCategoryFilter === 'All' || p.category === currentCategoryFilter;
    const matchCrop = currentCropFilter === 'all' || p.crops.includes(currentCropFilter);
    const matchDisease = currentDiseaseFilter === 'all' || p.diseases.includes(currentDiseaseFilter);
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery) || p.description.toLowerCase().includes(searchQuery) || p.activeIngredient.toLowerCase().includes(searchQuery);
    return matchCategory && matchCrop && matchDisease && matchSearch;
  });

  const countEl = document.getElementById('productCount');
  if (countEl) countEl.textContent = filtered.length;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; color: var(--text-muted);">
        <i class="fa-solid fa-flask-vial" style="font-size: 3rem; margin-bottom: 12px; opacity: 0.4;"></i>
        <h3>No Agro Formulations Found</h3>
        <p>Try resetting filters or searching with another crop/disease name.</p>
        <button class="btn btn-primary" onclick="resetCatalogFilters()" style="margin-top: 14px;">Reset All Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="card-badge">${p.badge}</div>
      <div class="product-card-img" onclick="openProductModal('${p.id}')">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
      </div>
      <div class="product-card-body">
        <span class="product-category">${p.category}</span>
        <h3 class="product-title" onclick="openProductModal('${p.id}')">${p.name}</h3>
        <p class="product-tagline">${p.tagline}</p>
        <div class="product-rating">
          <span style="color: var(--accent-amber);">★★★★★</span>
          <span style="font-size: 0.75rem; color: var(--text-muted);">(${p.reviewsCount})</span>
        </div>
        <div class="product-price-row">
          <div>
            <span class="price-current">₹${p.price}</span>
            <span class="price-original">₹${p.originalPrice}</span>
          </div>
          <span class="discount-badge">${p.discount}</span>
        </div>
        <button class="btn btn-primary btn-add-cart" onclick="addToCart('${p.id}')">
          <i class="fa-solid fa-cart-plus"></i> <span data-i18n="add_to_cart">${t('add_to_cart')}</span>
        </button>
      </div>
    </div>
  `).join('');
}

window.addToCart = function(productId) {
  const p = PESTICIDES.find(item => item.id === productId);
  if (!p) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...p, qty: 1, selectedPack: p.selectedPack || p.packSizes[0] });
  }

  updateCartUI();
  document.getElementById('cartOverlay')?.classList.add('active');
};

window.openCartDrawer = function() {
  document.getElementById('cartOverlay')?.classList.add('active');
};

function updateCartUI() {
  const cartBadge = document.getElementById('cartBadge');
  const mobileCartBadge = document.getElementById('mobileCartBadge');
  const cartContainer = document.getElementById('cartItemsContainer');
  const subtotalEl = document.getElementById('cartSubtotal');
  const drawerTotalEl = document.getElementById('cartDrawerTotal');
  const grandTotalEl = document.getElementById('cartGrandTotal');

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  if (cartBadge) cartBadge.textContent = totalItems;
  if (mobileCartBadge) mobileCartBadge.textContent = totalItems;

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
  if (drawerTotalEl) drawerTotalEl.textContent = `₹${subtotal}`;
  if (grandTotalEl) grandTotalEl.textContent = `₹${subtotal}`;

  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
        <i class="fa-solid fa-basket-shopping" style="font-size: 2.5rem; margin-bottom: 10px; opacity: 0.5;"></i>
        <p>Your shopping basket is empty</p>
      </div>
    `;
    return;
  }

  cartContainer.innerHTML = cart.map((item, idx) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" />
      <div style="flex-grow: 1;">
        <h4 style="font-size: 0.9rem; line-height: 1.2;">${item.name}</h4>
        <span style="font-size: 0.78rem; color: var(--text-muted);">${item.selectedPack} | ₹${item.price}</span>
        <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px;">
          <button class="qty-btn" onclick="updateQty(${idx}, -1)">-</button>
          <span style="font-weight: 700; font-size: 0.85rem;">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty(${idx}, 1)">+</button>
        </div>
      </div>
      <button style="background: transparent; color: #ef4444;" onclick="removeFromCart(${idx})"><i class="fa-solid fa-trash-can"></i></button>
    </div>
  `).join('');
}

window.updateQty = function(index, change) {
  if (cart[index]) {
    cart[index].qty += change;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    updateCartUI();
  }
};

window.removeFromCart = function(index) {
  cart.splice(index, 1);
  updateCartUI();
};

window.openProductModal = function(productId) {
  const p = PESTICIDES.find(item => item.id === productId);
  if (!p) return;

  const modal = document.getElementById('productModal');
  const container = document.getElementById('productModalContent');
  if (!modal || !container) return;

  container.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 24px;">
      <div style="background: #f8fafc; padding: 20px; border-radius: 16px; text-align: center;">
        <img src="${p.image}" style="max-height: 260px; object-fit: contain; margin: 0 auto;" />
      </div>
      <div>
        <span class="status-pill green">${p.category}</span>
        <h3 style="color: var(--primary-dark); font-size: 1.3rem; margin: 6px 0;">${p.name}</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px;">${p.tagline}</p>
        <div style="font-size: 1.4rem; font-weight: 800; color: #15803d; margin-bottom: 12px;">
          ₹${p.price} <span style="font-size: 0.85rem; color: #94a3b8; text-decoration: line-through;">₹${p.originalPrice}</span>
        </div>
        <div style="font-size: 0.82rem; margin-bottom: 12px; line-height: 1.5;">
          <strong>Active Ingredient:</strong> ${p.activeIngredient}<br/>
          <strong>Dosage:</strong> ${p.dosage}<br/>
          <strong>Target Crops:</strong> ${p.crops.join(', ')}
        </div>
        <button class="btn btn-primary" onclick="addToCart('${p.id}'); closeModal('productModal');" style="width: 100%; justify-content: center; padding: 12px;">
          <i class="fa-solid fa-cart-plus"></i> Add to Cart Now
        </button>
      </div>
    </div>
  `;

  openModal('productModal');
};

// --- CHATBOT FLOATING CONTROLLER ---
window.toggleChatbot = function(force) {
  const win = document.getElementById('chatbotWindow');
  if (!win) return;
  if (typeof force === 'boolean') {
    win.classList.toggle('active', force);
  } else {
    win.classList.toggle('active');
  }
};

window.sendQuickChat = function(text) {
  const input = document.getElementById('chatbotInput');
  if (input) input.value = text;
  handleChatSend();
};

function handleChatSend() {
  const input = document.getElementById('chatbotInput');
  const msgContainer = document.getElementById('chatbotMessages');
  if (!input || !msgContainer || !input.value.trim()) return;

  const userText = input.value.trim();
  input.value = '';

  const userMsg = document.createElement('div');
  userMsg.className = 'chat-msg user-msg';
  userMsg.textContent = userText;
  msgContainer.appendChild(userMsg);

  // Save to chat records
  if (CHAT_RECORDS[0]) {
    CHAT_RECORDS[0].messages.push({
      sender: 'Farmer (Live)',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
    });
  }

  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'chat-msg bot-msg';
    
    if (userText.toLowerCase().includes('blast') || userText.toLowerCase().includes('paddy')) {
      botMsg.innerHTML = `🌾 For Paddy Blast & Neck Rot, apply <strong>Sathya Bio BlastShield 75 WP</strong> @ 120g/acre. <button class="btn btn-primary" style="padding: 4px 8px; font-size: 0.72rem; margin-top: 6px;" onclick="addToCart('sb-01')">Add to Cart ₹680</button>`;
    } else if (userText.toLowerCase().includes('whitefly') || userText.toLowerCase().includes('cotton')) {
      botMsg.innerHTML = `🐛 For Cotton Whitefly & sucking pests, use <strong>Sathya Bio FlyKill Ultra</strong> @ 250g/acre. <button class="btn btn-primary" style="padding: 4px 8px; font-size: 0.72rem; margin-top: 6px;" onclick="addToCart('sb-02')">Add to Cart ₹840</button>`;
    } else {
      botMsg.textContent = `Thank you for consulting Sathya Bio. Our agronomist specialist has received your query regarding "${userText}" and is ready to advise you.`;
    }
    msgContainer.appendChild(botMsg);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }, 600);
}

// --- INITIALIZE APPLICATION ---
function initApp() {
  applyTranslations();
  initCatalog();
  updateCartUI();

  // Cart Drawer
  const cartTrigger = document.getElementById('cartTrigger');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartClose = document.getElementById('cartCloseBtn');
  const checkoutBtn = document.getElementById('checkoutBtn');

  if (cartTrigger) cartTrigger.addEventListener('click', () => cartOverlay?.classList.add('active'));
  if (cartClose) cartClose.addEventListener('click', () => cartOverlay?.classList.remove('active'));
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Your shopping basket is empty!');
        return;
      }
      cartOverlay?.classList.remove('active');
      openModal('checkoutModal');
    });
  }

  // Checkout Form
  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) checkoutForm.addEventListener('submit', handleCheckoutSubmit);

  // Search
  const headerSearchInput = document.getElementById('headerSearchInput');
  if (headerSearchInput) {
    headerSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderProducts();
    });
  }

  // Chat Send
  const chatSend = document.getElementById('chatbotSendBtn');
  const chatInput = document.getElementById('chatbotInput');
  if (chatSend) chatSend.addEventListener('click', handleChatSend);
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleChatSend();
    });
  }

  // Preloader & welcome poster
  const preloader = document.getElementById('appPreloader');
  setTimeout(() => {
    if (preloader) preloader.classList.add('hidden');
  }, 1000);
}

if (document.readyState === 'interactive' || document.readyState === 'complete') {
  initApp();
} else {
  document.addEventListener('DOMContentLoaded', initApp);
}
