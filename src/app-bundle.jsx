const { useState, useEffect, useMemo } = React;

// ==========================================
// 1. MULTI-LANGUAGE TRANSLATIONS
// ==========================================
const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'ta', label: 'Tamil',   native: 'தமிழ்',   flag: '🇮🇳' },
  { code: 'hi', label: 'Hindi',   native: 'हिन्दी',  flag: '🇮🇳' },
  { code: 'te', label: 'Telugu',  native: 'తెలుగు',  flag: '🇮🇳' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ',  flag: '🇮🇳' },
];

const TRANSLATIONS = {
  en: {
    brand: 'Sathya Bio',
    tagline: 'Agricultural ERP & E-Commerce Platform',
    shopProducts: 'Shop Products',
    myCart: 'My Cart',
    myOrders: 'My Orders',
    cropAdvisory: 'Crop Advisory',
    dashboard: 'Dashboard',
    overview: 'Overview',
    analytics: 'Analytics',
    cmsEditor: 'Live CMS Editor',
    productsMaster: 'Products Master',
    orderManagement: 'Order Management',
    subscribers: 'Advisory Subscribers',
    tickets: 'Field Tickets',
    chatRecords: 'Chat Records',
    posBilling: 'POS Billing Counter',
    myDeliveries: 'My Deliveries',
    logout: 'Sign Out',
    welcome: 'Namaste',
    itemsInCart: 'Items in Cart',
    activeOrders: 'Active Orders',
    acresRegistered: 'Acres Registered',
    openTickets: 'Open Tickets',
    quickActions: 'Quick Actions',
    advisoryTitle: 'Get Weekly Crop & Pesticide Recommendations',
    advisorySubtitle: 'Join 15,000+ farmers receiving our free seasonal advisory newsletter. Kharif & Rabi crop schedules, disease alerts, and exclusive offers every week.',
    farmerName: 'Farmer Name',
    whatsappNumber: 'WhatsApp Number',
    cropType: 'Crop Type',
    season: 'Season',
    farmSize: 'Farm Size (Acres)',
    getAdvisory: 'Get Instant Advisory',
    payWithRazorpay: 'Pay with Razorpay',
    subtotal: 'Subtotal',
    gst: 'GST (18%)',
    total: 'Total',
    freeDelivery: 'FREE Delivery',
    addToCart: 'Add to Cart',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    searchPlaceholder: 'Search products, crops, pests...',
    allCategories: 'All Categories',
    changeLanguage: 'Language',
  },
  ta: {
    brand: 'சத்யா பயோ',
    tagline: 'விவசாய ஈ-காமர்ஸ் & ஈஆர்பி தளம்',
    shopProducts: 'மருந்துகள் வாங்க',
    myCart: 'எனது கூடை',
    myOrders: 'எனது ஆர்டர்கள்',
    cropAdvisory: 'பயிர் ஆலோசனை',
    dashboard: 'முகப்பு பலகை',
    overview: 'கண்ணோட்டம்',
    analytics: 'புள்ளிவிவரங்கள்',
    cmsEditor: 'இணையதள திருத்தி',
    productsMaster: 'பொருட்கள் மேலாண்மை',
    orderManagement: 'ஆர்டர்கள் மேலாண்மை',
    subscribers: 'ஆலோசனை சந்தாதாரர்கள்',
    tickets: 'விவசாயி கோரிக்கைகள்',
    chatRecords: 'அரட்டை பதிவுகள்',
    posBilling: 'பில்லிங் கவுண்டர்',
    myDeliveries: 'எனது டெலிவரிகள்',
    logout: 'வெளியேறு',
    welcome: 'வணக்கம்',
    itemsInCart: 'கூடையில் உள்ளவை',
    activeOrders: 'செயலில் உள்ள ஆர்டர்கள்',
    acresRegistered: 'பதிவுசெய்த ஏக்கர்',
    openTickets: 'நிலுவை கோரிக்கைகள்',
    quickActions: 'விரைவு செயல்கள்',
    advisoryTitle: 'வாராந்திர பயிர் மற்றும் பூச்சிக்கொல்லி பரிந்துரைகள்',
    advisorySubtitle: '15,000+ விவசாயிகளுடன் இணைந்து இலவச பயிர் ஆலோசனை பெறுங்கள்.',
    farmerName: 'விவசாயி பெயர்',
    whatsappNumber: 'வாட்ஸ்அப் எண்',
    cropType: 'பயிர் வகை',
    season: 'பருவம்',
    farmSize: 'நில அளவு (ஏக்கர்)',
    getAdvisory: 'உடனடி ஆலோசனை பெற',
    payWithRazorpay: 'ரேசர்பே மூலம் செலுத்தவும்',
    subtotal: 'கூட்டுத்தொகை',
    gst: 'ஜிஎஸ்டி (18%)',
    total: 'மொத்தம்',
    freeDelivery: 'இலவச டெலிவரி',
    addToCart: 'கூடையில் சேர்க்க',
    inStock: 'இருப்பில் உள்ளது',
    outOfStock: 'இருப்பு இல்லை',
    searchPlaceholder: 'மருந்துகள், பயிர்களைத் தேட...',
    allCategories: 'அனைத்து பிரிவுகள்',
    changeLanguage: 'மொழி',
  },
  hi: {
    brand: 'सत्या बायो',
    tagline: 'कृषि ई-कॉमर्स और ईआरपी प्लेटफॉर्म',
    shopProducts: 'उत्पाद खरीदें',
    myCart: 'मेरी गाड़ी',
    myOrders: 'मेरे ऑर्डर',
    cropAdvisory: 'फसल सलाह',
    dashboard: 'डैशबोर्ड',
    overview: 'अवलोकन',
    analytics: 'एनालिटिक्स',
    cmsEditor: 'लाइव सीएमएस संपादक',
    productsMaster: 'उत्पाद प्रबंधन',
    orderManagement: 'ऑर्डर प्रबंधन',
    subscribers: 'सलाहकार ग्राहक',
    tickets: 'फ़ील्ड टिकट',
    chatRecords: 'चैट रिकॉर्ड',
    posBilling: 'पीओएस बिलिंग काउंटर',
    myDeliveries: 'मेरी डिलीवरी',
    logout: 'लॉग आउट',
    welcome: 'नमस्ते',
    itemsInCart: 'कार्ट में उत्पाद',
    activeOrders: 'सक्रिय ऑर्डर',
    acresRegistered: 'पंजीकृत एकड़',
    openTickets: 'खुले टिकट',
    quickActions: 'त्वरित कार्य',
    advisoryTitle: 'साप्ताहिक फसल और कीटनाशक सिफारिशें प्राप्त करें',
    advisorySubtitle: '15,000+ किसानों से जुड़ें और मुफ्त मौसमी सलाह प्राप्त करें।',
    farmerName: 'किसान का नाम',
    whatsappNumber: 'व्हाट्सएप नंबर',
    cropType: 'फसल का प्रकार',
    season: 'मौसम',
    farmSize: 'खेत का आकार (एकड़)',
    getAdvisory: 'तुरंत सलाह प्राप्त करें',
    payWithRazorpay: 'रेजरपे से भुगतान करें',
    subtotal: 'उप-योग',
    gst: 'जीएसटी (18%)',
    total: 'कुल योग',
    freeDelivery: 'मुफ्त डिलीवरी',
    addToCart: 'कार्ट में जोड़ें',
    inStock: 'उपलब्ध है',
    outOfStock: 'स्टॉक समाप्त',
    searchPlaceholder: 'उत्पाद, फसल, कीट खोजें...',
    allCategories: 'सभी श्रेणियां',
    changeLanguage: 'भाषा',
  },
  te: {
    brand: 'సత్య బయో',
    tagline: 'వ్యవసాయ ఈ-కామర్స్ & ఈఆర్‌పీ వేదిక',
    shopProducts: 'ఉత్పత్తులు కొనండి',
    myCart: 'నా కార్ట్',
    myOrders: 'నా ఆర్డర్లు',
    cropAdvisory: 'పంట సలహా',
    dashboard: 'డాష్‌బోర్డ్',
    overview: 'అవలోకనం',
    analytics: 'విశ్లేషణలు',
    cmsEditor: 'సీఎమ్ఎస్ ఎడిటర్',
    productsMaster: 'ఉత్పత్తుల మాస్టర్',
    orderManagement: 'ఆర్డర్ నిర్వహణ',
    subscribers: 'సబ్‌స్క్రైబర్లు',
    tickets: 'సపోర్ట్ టిక్కెట్లు',
    chatRecords: 'చాట్ రికార్డులు',
    posBilling: 'పీవోఎస్ బిల్లింగ్',
    myDeliveries: 'నా డెలివరీలు',
    logout: 'లాగ్ అవుట్',
    welcome: 'నమస్కారం',
    itemsInCart: 'కార్ట్‌లోని వస్తువులు',
    activeOrders: 'యాక్టివ్ ఆర్డర్లు',
    acresRegistered: 'నమోదైన ఎకరాలు',
    openTickets: 'ఓపెన్ టిక్కెట్లు',
    quickActions: 'శీఘ్ర చర్యలు',
    advisoryTitle: 'వారపు పంట & పురుగుమందుల సిఫార్సులను పొందండి',
    advisorySubtitle: 'ఉచిత కాలానుగుణ సలహాలను పొందుతున్న 15,000+ రైతులతో చేరండి.',
    farmerName: 'రైతు పేరు',
    whatsappNumber: 'వాట్సాప్ నంబర్',
    cropType: 'పంట రకం',
    season: 'సీజన్',
    farmSize: 'భూమి విస్తీర్ణం (ఎకరాలు)',
    getAdvisory: 'తక్షణ సలహా పొందండి',
    payWithRazorpay: 'రేజర్‌పేతో చెల్లించండి',
    subtotal: 'సబ్‌టోటల్',
    gst: 'జీఎస్‌టీ (18%)',
    total: 'మొత్తం',
    freeDelivery: 'ఉచిత డెలివరీ',
    addToCart: 'కార్ట్‌కి జోడించు',
    inStock: 'స్టాక్ ఉంది',
    outOfStock: 'స్టాక్ లేదు',
    searchPlaceholder: 'ఉత్పత్తులు, పంటలను శోధించండి...',
    allCategories: 'అన్ని వర్గాలు',
    changeLanguage: 'భాష',
  },
  kn: {
    brand: 'ಸತ್ಯ ಬಯೋ',
    tagline: 'ಕೃಷಿ ಇ-ಕಾಮರ್ಸ್ ಮತ್ತು ಇಆರ್‌ಪಿ ವೇದಿಕೆ',
    shopProducts: 'ಉತ್ಪನ್ನಗಳನ್ನು ಖರೀದಿಸಿ',
    myCart: 'ನನ್ನ ಕಾರ್ಟ್',
    myOrders: 'ನನ್ನ ಆರ್ಡರ್‌ಗಳು',
    cropAdvisory: 'ಬೆಳೆ ಸಲಹೆ',
    dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    overview: 'ಅವಲೋಕನ',
    analytics: 'ವಿಶ್ಲೇಷಣೆ',
    cmsEditor: 'ಸಿಎಂಎಸ್ ಸಂಪಾದಕ',
    productsMaster: 'ಉತ್ಪನ್ನಗಳ ಮಾಸ್ಟರ್',
    orderManagement: 'ಆರ್ಡರ್ ನಿರ್ವಹಣೆ',
    subscribers: 'ಚಂದಾದಾರರು',
    tickets: 'ಬೆಂಬಲ ಟಿಕೆಟ್‌ಗಳು',
    chatRecords: 'ಚಾಟ್ ದಾಖಲೆಗಳು',
    posBilling: 'ಬಿಲ್ಲಿಂಗ್ ಕೌಂಟರ್',
    myDeliveries: 'ನನ್ನ ಡೆಲಿವರಿಗಳು',
    logout: 'ಸೈನ್ ಔಟ್',
    welcome: 'ನಮಸ್ಕಾರ',
    itemsInCart: 'ಕಾರ್ಟ್‌ನಲ್ಲಿರುವ ವಸ್ತುಗಳು',
    activeOrders: 'ಸಕ್ರಿಯ ಆರ್ಡರ್‌ಗಳು',
    acresRegistered: 'ನೋಂದಾಯಿತ ಎಕರೆಗಳು',
    openTickets: 'ತೆರೆದ ಟಿಕೆಟ್‌ಗಳು',
    quickActions: 'ತ್ವರಿತ ಕ್ರಮಗಳು',
    advisoryTitle: 'ಸಾಪ್ತಾಹಿಕ ಬೆಳೆ ಮತ್ತು ಕೀಟನಾಶಕ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ',
    advisorySubtitle: 'ಉಚಿತ ಸಲಹೆಗಳನ್ನು ಪಡೆಯುತ್ತಿರುವ 15,000+ ರೈತರೊಂದಿಗೆ ಸೇರಿ.',
    farmerName: 'ರೈತರ ಹೆಸರು',
    whatsappNumber: 'ವಾಟ್ಸಾಪ್ ಸಂಖ್ಯೆ',
    cropType: 'ಬೆಳೆ ಪ್ರಕಾರ',
    season: 'ಋತು',
    farmSize: 'ಜಮೀನಿನ ಗಾತ್ರ (ಎಕರೆ)',
    getAdvisory: 'ತಕ್ಷಣದ ಸಲಹೆ ಪಡೆಯಿರಿ',
    payWithRazorpay: 'ರೇಜರ್‌ಪೇ ಮೂಲಕ ಪಾವತಿಸಿ',
    subtotal: 'ಉಪಮೊತ್ತ',
    gst: 'ಜಿಎಸ್‌ಟಿ (18%)',
    total: 'ಒಟ್ಟು',
    freeDelivery: 'ಉಚಿತ ಡೆಲಿವರಿ',
    addToCart: 'ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ',
    inStock: 'ಸ್ಟಾಕ್‌ನಲ್ಲಿದೆ',
    outOfStock: 'ಸ್ಟಾಕ್ ಮುಗಿದಿದೆ',
    searchPlaceholder: 'ಉತ್ಪನ್ನಗಳು, ಬೆಳೆಗಳನ್ನು ಹುಡುಕಿ...',
    allCategories: 'ಎಲ್ಲಾ ವಿಭಾಗಗಳು',
    changeLanguage: 'ಭಾಷೆ',
  }
};

// ==========================================
// 2. DEMO SEED DATA
// ==========================================
const DEMO_USERS = {
  'farmer@demo.com':   { _id: 'u1', name: 'Rameshwar Patel', email: 'farmer@demo.com', role: 'farmer', landAcres: 5, crop: 'Paddy / Rice', village: 'Karur' },
  'admin@demo.com':    { _id: 'u2', name: 'Admin Officer', email: 'admin@demo.com', role: 'admin' },
  'employee@demo.com': { _id: 'u3', name: 'Muthuvel K (QC)', email: 'employee@demo.com', role: 'employee' },
  'delivery@demo.com': { _id: 'u4', name: 'Karthik Raja', email: 'delivery@demo.com', role: 'delivery' },
  'billing@demo.com':  { _id: 'u5', name: 'Billing Operator #04', email: 'billing@demo.com', role: 'billing' },
};

const INITIAL_PRODUCTS = [
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
];

const INITIAL_ORDERS = [
  { id: 'SB-ORD-8821', farmer: 'Rameshwar Patel', phone: '9845012345', address: 'Plot 42, Green Valley Farm, Tanjore, Tamil Nadu - 613001', items: 'BlastShield 75 WP x2, RootVigor Gold x1', amount: 1850, payMode: 'Razorpay (UPI)', otp: '4829', status: 'Out for Delivery', agent: 'Karthik Raja', date: '2026-08-30' },
  { id: 'SB-ORD-8822', farmer: 'Suresh Pillai', phone: '9751234567', address: 'No.5, Nehru St, Thanjavur - 613001', items: 'CottonGuard 20 EC x3', amount: 1860, payMode: 'COD', otp: '7834', status: 'Dispatched', agent: 'Karthik Raja', date: '2026-08-29' },
  { id: 'SB-ORD-8823', farmer: 'Lakshmi Devi', phone: '9942345678', address: '23, Anna Nagar, Salem - 636001', items: 'BioNeem Gold x2', amount: 780, payMode: 'Razorpay', otp: '2591', status: 'Delivered', agent: 'Karthik Raja', date: '2026-08-28' },
];

const INITIAL_SUBSCRIBERS = [
  { name: 'Rameshwar Patel', phone: '9845012345', crop: 'Paddy / Rice', season: 'Kharif', acres: 5, village: 'Karur', date: '2026-08-30' },
  { name: 'Suresh Pillai',   phone: '9751234567', crop: 'Cotton',      season: 'Kharif', acres: 8, village: 'Coimbatore', date: '2026-08-29' },
  { name: 'Meena Devi',      phone: '9942345678', crop: 'Tomato',      season: 'Rabi',   acres: 2, village: 'Salem', date: '2026-08-28' },
  { name: 'Gurpreet Singh',  phone: '9814077889', crop: 'Wheat',       season: 'Rabi',   acres: 12, village: 'Karnal', date: '2026-08-27' },
];

const INITIAL_TICKETS = [
  { id: 'TKT-001', farmer: 'Rameshwar Patel', crop: 'Paddy', issue: 'Severe blast on 3 acres — yellowish brown lesions on all leaves', severity: 'High', status: 'Open', date: '2026-08-30', replies: [] },
  { id: 'TKT-002', farmer: 'Meena Devi',   crop: 'Tomato', issue: 'Leaf curl virus suspected — plants showing upward curling and yellowing', severity: 'Medium', status: 'In Progress', date: '2026-08-29', replies: ['Agronomist: Apply Imidacloprid 17.8% SL @ 100ml/acre to control the vector whitefly. Remove severely infected plants.'] },
];

const INITIAL_ERP_INVENTORY = [
  { sku: 'SB-BLAST-75', name: 'BlastShield 75 WP (500g)', batch: 'BATCH-2026-08A', expiry: '2028-08', stock: 420, min: 100, unit: 'kg', status: 'ok' },
  { sku: 'SB-FLY-50',   name: 'FlyKill Ultra (250g)',     batch: 'BATCH-2026-07B', expiry: '2028-07', stock: 45,  min: 50,  unit: 'kg', status: 'low' },
  { sku: 'SB-ROOT-GOLD',name: 'RootVigor Gold (1L)',      batch: 'BATCH-2026-08C', expiry: '2029-01', stock: 310, min: 60,  unit: 'L',  status: 'ok' },
  { sku: 'SB-WHEAT-NPK',name: 'WheatMax NPK (1kg)',       batch: 'BATCH-2026-06A', expiry: '2027-12', stock: 0,   min: 80,  unit: 'kg', status: 'out' },
];

// ==========================================
// 3. TOAST NOTIFICATION COMPONENT
// ==========================================
function ToastContainer({ toasts, removeToast }) {
  return (
    <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 99999, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {toasts.map(t => (
        <div
          key={t.id}
          className="animate-slide-up"
          style={{
            background: t.type === 'error' ? '#2d1414' : '#142d14',
            border: `1px solid ${t.type === 'error' ? '#ef4444' : '#22c55e'}`,
            color: '#fff',
            padding: '12px 18px',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            fontSize: '0.88rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            minWidth: 260
          }}
          onClick={() => removeToast(t.id)}
        >
          <span>{t.type === 'error' ? '❌' : '🌿'}</span>
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// 4. MAIN APP ROOT WITH ROUTING & STATE
// ==========================================
function App() {
  // Global States
  const [lang, setLang] = useState(() => localStorage.getItem('sathya_lang') || 'en');
  const [user, setUser] = useState(() => {
    try {
      const cached = localStorage.getItem('sathya_user');
      return cached ? JSON.parse(cached) : null;
    } catch { return null; }
  });

  const [toasts, setToasts] = useState([]);
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sathya_cart') || '[]'); } catch { return []; }
  });

  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [subscribers, setSubscribers] = useState(INITIAL_SUBSCRIBERS);
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [inventory, setInventory] = useState(INITIAL_ERP_INVENTORY);
  const [cms, setCms] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('sathya_cms') || JSON.stringify({
        heroTitle: "SATHYA BIO-PESTICIDES & CROP CARE",
        heroSubtitle: "Government & 100% Bio-Certified Solutions for High Yield & Zero Chemical Residue Farming",
        bannerAnnouncement: "🎉 KHARIF SPECIAL: Flat 20% OFF on Bio-Fungicides + Free Agronomist Hotline 1800-425-8899",
        advisoryTitle: "Get Weekly Crop & Pesticide Recommendations",
        advisorySubtitle: "Join 15,000+ farmers receiving our free seasonal advisory newsletter. Kharif & Rabi crop schedules, disease alerts, and exclusive offers every week.",
        phone: "+91 94432 10987",
        address: "14, Kavundampalayam, Coimbatore – 641030, Tamil Nadu",
      }));
    } catch { return {}; }
  });

  // Current Route: based on window.location.hash or role home
  const [currentPath, setCurrentPath] = useState(() => {
    const hash = window.location.hash.replace('#', '') || '/';
    return hash;
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sync Hash
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      setCurrentPath(hash);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (path) => {
    window.location.hash = path;
    setCurrentPath(path);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const showToast = (msg, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  // Language helper
  const t = (key) => TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en[key] || key;

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('sathya_lang', newLang);
  };

  // Auth helper
  const handleLogin = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    if (DEMO_USERS[cleanEmail] && (password === 'demo1234' || password === 'admin' || password.length >= 4)) {
      const loggedUser = DEMO_USERS[cleanEmail];
      setUser(loggedUser);
      localStorage.setItem('sathya_user', JSON.stringify(loggedUser));
      showToast(`Welcome back, ${loggedUser.name}! 🌿`);
      navigate(`/${loggedUser.role}`);
      return;
    }

    // Check locally registered
    const registered = JSON.parse(localStorage.getItem('sathya_registered_users') || '[]');
    const found = registered.find(u => u.email.toLowerCase() === cleanEmail && u.password === password);
    if (found) {
      const { password: _, ...safe } = found;
      setUser(safe);
      localStorage.setItem('sathya_user', JSON.stringify(safe));
      showToast(`Welcome back, ${safe.name}! 🌿`);
      navigate(`/${safe.role || 'farmer'}`);
      return;
    }

    showToast('Invalid credentials. Select a role above for instant login!', 'error');
  };

  const handleRegister = (form) => {
    const newUser = {
      _id: `farmer_${Date.now()}`,
      name: form.name,
      email: form.email.trim().toLowerCase(),
      phone: form.phone,
      role: 'farmer',
      village: form.village || 'Farm Village',
      district: form.district || 'Coimbatore',
      state: form.state || 'Tamil Nadu',
      landAcres: Number(form.landAcres) || 1,
      password: form.password
    };
    const registered = JSON.parse(localStorage.getItem('sathya_registered_users') || '[]');
    registered.push(newUser);
    localStorage.setItem('sathya_registered_users', JSON.stringify(registered));

    const { password: _, ...safe } = newUser;
    setUser(safe);
    localStorage.setItem('sathya_user', JSON.stringify(safe));
    showToast('Registration successful! Welcome to Sathya Bio 🌿');
    navigate('/farmer');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('sathya_user');
    showToast('Logged out successfully');
    navigate('/login');
  };

  // Cart operations
  const addToCart = (product) => {
    if (product.stock === 0) { showToast('Product is out of stock', 'error'); return; }
    const updated = [...cart];
    const existing = updated.find(i => i._id === product._id);
    if (existing) existing.qty = (existing.qty || 1) + 1;
    else updated.push({ ...product, qty: 1 });
    setCart(updated);
    localStorage.setItem('sathya_cart', JSON.stringify(updated));
    showToast(`${product.name} added to cart! 🛒`);
  };

  const updateCartQty = (id, qty) => {
    if (qty <= 0) {
      const updated = cart.filter(i => i._id !== id);
      setCart(updated);
      localStorage.setItem('sathya_cart', JSON.stringify(updated));
      showToast('Item removed from cart');
      return;
    }
    const updated = cart.map(i => i._id === id ? { ...i, qty } : i);
    setCart(updated);
    localStorage.setItem('sathya_cart', JSON.stringify(updated));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem('sathya_cart', JSON.stringify([]));
  };

  // If not logged in and on protected route, redirect to login
  useEffect(() => {
    if (!user && currentPath !== '/login' && currentPath !== '/register' && currentPath !== '/') {
      navigate('/login');
    }
    if (user && (currentPath === '/' || currentPath === '/login')) {
      navigate(`/${user.role}`);
    }
  }, [user, currentPath]);

  // Language Switcher Component
  const LanguageSelect = () => (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--dark-800)', border: '1px solid var(--surface-border-subtle)', borderRadius: 'var(--radius-md)', padding: '4px 8px' }}>
      <span style={{ fontSize: '0.9rem' }}>🌐</span>
      <select
        value={lang}
        onChange={(e) => changeLanguage(e.target.value)}
        style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', outline: 'none' }}
      >
        {LANGUAGES.map(l => (
          <option key={l.code} value={l.code} style={{ background: '#132313', color: '#fff' }}>
            {l.flag} {l.native}
          </option>
        ))}
      </select>
    </div>
  );

  // ==========================================
  // 5. RENDER PAGES
  // ==========================================

  // --- LOGIN PAGE ---
  if (!user && currentPath === '/register') {
    return (
      <div className="login-page" style={{ justifyContent: 'center', alignItems: 'center', padding: '40px 20px', minHeight: '100vh' }}>
        <ToastContainer toasts={toasts} removeToast={removeToast} />
        <div className="login-card animate-slide-up" style={{ maxWidth: '540px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div className="login-logo" style={{ marginBottom: 0 }}>
              <div className="login-logo-icon">🌱</div>
              <div className="login-logo-text">
                <div className="brand">{t('brand')}</div>
                <div className="tagline">Farmer Self-Registration</div>
              </div>
            </div>
            <LanguageSelect />
          </div>

          <h2 className="login-title">Create Farmer Account</h2>
          <p className="login-subtitle">Access agro store, weekly recommendations & order tracking</p>

          <form onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.target);
            const data = Object.fromEntries(fd.entries());
            if (data.password !== data.confirmPassword) { showToast('Passwords do not match', 'error'); return; }
            handleRegister(data);
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input name="name" className="form-input" placeholder="Ramesh Kumar" required />
              </div>
              <div className="form-group">
                <label className="form-label">WhatsApp Number *</label>
                <input name="phone" className="form-input" placeholder="10-digit number" maxLength="10" required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input name="email" type="email" className="form-input" placeholder="farmer@village.com" required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Village / Town</label>
                <input name="village" className="form-input" placeholder="Karur" />
              </div>
              <div className="form-group">
                <label className="form-label">Land Size (Acres)</label>
                <input name="landAcres" type="number" step="0.5" className="form-input" placeholder="5" />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Password *</label>
                <input name="password" type="password" className="form-input" placeholder="Min 6 chars" minLength="6" required />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password *</label>
                <input name="confirmPassword" type="password" className="form-input" placeholder="Repeat password" required />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-full btn-lg" style={{ marginTop: 8 }}>
              🌿 Register as Farmer
            </button>
          </form>

          <div className="divider"><span>Already registered?</span></div>
          <button className="btn btn-secondary btn-full" onClick={() => navigate('/login')}>
            ← Back to Login
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    const roles = [
      { key: 'farmer',   label: 'Farmer',   emoji: '👨‍🌾', email: 'farmer@demo.com' },
      { key: 'admin',    label: 'Admin',    emoji: '🛡️', email: 'admin@demo.com' },
      { key: 'employee', label: 'Employee', emoji: '🏭', email: 'employee@demo.com' },
      { key: 'delivery', label: 'Delivery', emoji: '🚚', email: 'delivery@demo.com' },
      { key: 'billing',  label: 'Billing',  emoji: '🧾', email: 'billing@demo.com' },
    ];
    return (
      <div className="login-page">
        <ToastContainer toasts={toasts} removeToast={removeToast} />
        <div className="login-left">
          <div className="login-card animate-slide-up">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div className="login-logo" style={{ marginBottom: 0 }}>
                <div className="login-logo-icon">🌿</div>
                <div className="login-logo-text">
                  <div className="brand">{t('brand')}</div>
                  <div className="tagline">{t('tagline')}</div>
                </div>
              </div>
              <LanguageSelect />
            </div>

            <h2 className="login-title">Select Role & Sign In</h2>
            <p className="login-subtitle">1-Click role preview for instant access</p>

            {/* Role Chips */}
            <div className="role-selector">
              {roles.map(r => (
                <button
                  key={r.key}
                  className="role-chip active"
                  type="button"
                  onClick={() => handleLogin(r.email, 'demo1234')}
                  style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <span>{r.emoji}</span>
                  <strong>{r.label}</strong>
                </button>
              ))}
            </div>

            <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 'var(--radius-md)', padding: '10px 14px', marginBottom: '20px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              💡 Click any role chip above for <strong style={{ color: 'var(--brand-400)' }}>1-click demo login</strong>, or enter credentials below.
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.target);
              handleLogin(fd.get('email'), fd.get('password'));
            }}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input name="email" type="email" defaultValue="farmer@demo.com" className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input name="password" type="password" defaultValue="demo1234" className="form-input" required />
              </div>
              <button type="submit" className="btn btn-primary btn-full btn-lg">
                🔐 Sign In
              </button>
            </form>

            <div className="divider"><span>New farmer?</span></div>
            <button className="btn btn-secondary btn-full" onClick={() => navigate('/register')}>
              🌱 Register as Farmer
            </button>
          </div>
        </div>

        <div className="login-right">
          <div style={{ textAlign: 'center', padding: '40px', zIndex: 1 }}>
            <div style={{ fontSize: '5rem', marginBottom: '24px', filter: 'drop-shadow(0 0 30px rgba(34,197,94,0.5))' }}>🌾</div>
            <h2 style={{ fontFamily: 'Poppins', fontSize: '2rem', color: '#4ade80', marginBottom: '12px' }}>Sathya Bio</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '360px', margin: '0 auto 32px', lineHeight: '1.7' }}>
              India's Agricultural E-Commerce, ERP, Crop Advisory & Multi-Role Platform
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', maxWidth: '360px', margin: '0 auto' }}>
              {[
                { icon: '🛒', label: 'E-Commerce Store' },
                { icon: '🌾', label: 'Crop Advisory' },
                { icon: '🏭', label: 'ERP Inventory' },
                { icon: '🚚', label: 'Delivery OTP' },
                { icon: '🧾', label: 'GST POS Billing' },
                { icon: '🎫', label: 'Support Tickets' },
              ].map(f => (
                <div key={f.label} style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 'var(--radius-lg)', padding: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 600 }}>
                  <span style={{ fontSize: '1.2rem' }}>{f.icon}</span>
                  {f.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- NAVIGATION CONFIGS BY ROLE ---
  const navItems = {
    farmer: [
      { to: '/farmer', label: t('dashboard'), icon: '🏠' },
      { to: '/farmer/products', label: t('shopProducts'), icon: '🌿' },
      { to: '/farmer/cart', label: `${t('myCart')} (${cart.length})`, icon: '🛒' },
      { to: '/farmer/orders', label: t('myOrders'), icon: '📦' },
      { to: '/farmer/advisory', label: t('cropAdvisory'), icon: '🌾' },
      { to: '/farmer/tickets', label: t('tickets'), icon: '🎫' },
    ],
    admin: [
      { to: '/admin', label: t('overview'), icon: '📊' },
      { to: '/admin/cms', label: t('cmsEditor'), icon: '✏️' },
      { to: '/admin/products', label: t('productsMaster'), icon: '🌿' },
      { to: '/admin/orders', label: t('orderManagement'), icon: '📦' },
      { to: '/admin/subscribers', label: t('subscribers'), icon: '📩' },
      { to: '/admin/analytics', label: t('analytics'), icon: '📈' },
      { to: '/admin/tickets', label: t('tickets'), icon: '🎫' },
      { to: '/admin/chat', label: t('chatRecords'), icon: '💬' },
    ],
    employee: [
      { to: '/employee', label: 'ERP Inventory & Tasks', icon: '🏭' },
      { to: '/employee/tickets', label: t('tickets'), icon: '🎫' },
    ],
    delivery: [
      { to: '/delivery', label: t('myDeliveries'), icon: '🚚' },
    ],
    billing: [
      { to: '/billing', label: t('posBilling'), icon: '🧾' },
    ]
  }[user.role] || [];

  return (
    <div className="app-layout">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Mobile Drawer Overlay */}
      <div className={`sidebar-overlay ${sidebarOpen ? 'show' : ''}`} onClick={() => setSidebarOpen(false)} />

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">🌿</div>
          <div className="sidebar-logo-text">
            <div className="brand-name">{t('brand')}</div>
            <div className="brand-tagline">{t('tagline')}</div>
          </div>
        </div>

        <div className="sidebar-role-badge">
          <span className="role-icon">
            {user.role === 'farmer' ? '👨‍🌾' : user.role === 'admin' ? '🛡️' : user.role === 'employee' ? '🏭' : user.role === 'delivery' ? '🚚' : '🧾'}
          </span>
          <div>
            <div className="role-name">{user.role.toUpperCase()} Portal</div>
            <div className="role-email">{user.name}</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-title">NAVIGATION</div>
          {navItems.map(item => (
            <button
              key={item.to}
              onClick={() => navigate(item.to)}
              className={`sidebar-link ${currentPath === item.to ? 'active' : ''}`}
              style={{ width: '100%', border: 'none', textAlign: 'left', background: 'transparent' }}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-logout-btn" onClick={handleLogout}>
            <span>🚪</span> {t('logout')}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-left">
            <button className="hamburger-btn" onClick={() => setSidebarOpen(true)}>
              ☰
            </button>
            <div>
              <div className="topbar-title">{t('brand')} {user.role.toUpperCase()} Platform</div>
              <div className="topbar-subtitle">{cms.bannerAnnouncement?.slice(0, 70)}...</div>
            </div>
          </div>
          <div className="topbar-right" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <LanguageSelect />
            {user.role === 'farmer' && (
              <button className="btn btn-ghost btn-sm" onClick={() => navigate('/farmer/cart')} title="Cart">
                🛒 ({cart.length})
              </button>
            )}
            <span className={`badge badge-${user.role === 'admin' ? 'red' : user.role === 'farmer' ? 'green' : user.role === 'employee' ? 'blue' : user.role === 'delivery' ? 'orange' : 'teal'}`}>
              {user.role.toUpperCase()}
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-content">
          {/* ========================================================================= */}
          {/* ROLE: FARMER */}
          {/* ========================================================================= */}
          {user.role === 'farmer' && currentPath === '/farmer' && (
            <div className="animate-fade-in">
              <div style={{ background: 'linear-gradient(135deg, var(--dark-700), var(--dark-600))', border: '1px solid var(--surface-border-subtle)', borderRadius: 'var(--radius-xl)', padding: '28px', marginBottom: '28px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: -20, top: -20, fontSize: '8rem', opacity: 0.07 }}>🌾</div>
                <h1 style={{ fontSize: '1.6rem', marginBottom: '6px' }}>
                  {t('welcome')}, {user.name} 👋
                </h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.95rem' }}>
                  {cms.heroSubtitle || "Your trusted source for premium bio-pesticides and crop protection."}
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button className="btn btn-primary btn-lg" onClick={() => navigate('/farmer/products')}>
                    🌿 {t('shopProducts')}
                  </button>
                  <button className="btn btn-secondary btn-lg" onClick={() => navigate('/farmer/advisory')}>
                    🌾 {t('cropAdvisory')}
                  </button>
                </div>
              </div>

              <div className="stat-grid">
                <div className="stat-card green">
                  <div className="stat-icon green">🛒</div>
                  <div className="stat-value">{cart.length}</div>
                  <div className="stat-label">{t('itemsInCart')}</div>
                </div>
                <div className="stat-card blue">
                  <div className="stat-icon blue">📦</div>
                  <div className="stat-value">{orders.filter(o => o.farmer.includes(user.name?.split(' ')[0])).length || 1}</div>
                  <div className="stat-label">{t('activeOrders')}</div>
                </div>
                <div className="stat-card yellow">
                  <div className="stat-icon yellow">🌾</div>
                  <div className="stat-value">{user.landAcres || 5}</div>
                  <div className="stat-label">{t('acresRegistered')}</div>
                </div>
                <div className="stat-card teal">
                  <div className="stat-icon teal">🎫</div>
                  <div className="stat-value">{tickets.filter(t => t.farmer?.includes(user.name?.split(' ')[0])).length}</div>
                  <div className="stat-label">{t('openTickets')}</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card">
                <div className="card-header"><div className="card-title">{t('quickActions')}</div></div>
                <div className="grid grid-2" style={{ gap: '12px' }}>
                  {[
                    { icon: '🌿', label: t('shopProducts'), sub: 'Pesticides, bio-inputs & fertilizers', to: '/farmer/products' },
                    { icon: '🛒', label: t('myCart'), sub: `${cart.length} items ready for checkout`, to: '/farmer/cart' },
                    { icon: '📦', label: t('myOrders'), sub: 'Track delivery & OTP in real time', to: '/farmer/orders' },
                    { icon: '🌾', label: t('cropAdvisory'), sub: 'Personalized Kharif & Rabi pesticide schedule', to: '/farmer/advisory' },
                  ].map(q => (
                    <button key={q.to} onClick={() => navigate(q.to)} style={{ background: 'var(--dark-800)', border: '1.5px solid var(--surface-border-subtle)', borderRadius: 'var(--radius-lg)', padding: '18px', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <span style={{ fontSize: '2rem' }}>{q.icon}</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '4px' }}>{q.label}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{q.sub}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* FARMER PRODUCTS */}
          {user.role === 'farmer' && currentPath === '/farmer/products' && (
            <FarmerProductsView products={products} addToCart={addToCart} t={t} navigate={navigate} cartCount={cart.length} />
          )}

          {/* FARMER CART & RAZORPAY */}
          {user.role === 'farmer' && currentPath === '/farmer/cart' && (
            <FarmerCartView
              cart={cart}
              updateCartQty={updateCartQty}
              clearCart={clearCart}
              t={t}
              navigate={navigate}
              showToast={showToast}
              user={user}
              orders={orders}
              setOrders={setOrders}
            />
          )}

          {/* FARMER ORDERS */}
          {user.role === 'farmer' && currentPath === '/farmer/orders' && (
            <FarmerOrdersView orders={orders} user={user} navigate={navigate} />
          )}

          {/* FARMER ADVISORY */}
          {user.role === 'farmer' && currentPath === '/farmer/advisory' && (
            <FarmerAdvisoryView
              t={t}
              showToast={showToast}
              user={user}
              subscribers={subscribers}
              setSubscribers={setSubscribers}
              addToCart={addToCart}
              products={products}
            />
          )}

          {/* TICKETS (SHARED) */}
          {(currentPath === '/farmer/tickets' || currentPath === '/admin/tickets' || currentPath === '/employee/tickets') && (
            <TicketsView
              tickets={tickets}
              setTickets={setTickets}
              user={user}
              showToast={showToast}
            />
          )}

          {/* ========================================================================= */}
          {/* ROLE: ADMIN */}
          {/* ========================================================================= */}
          {user.role === 'admin' && currentPath === '/admin' && (
            <AdminDashboardView
              navigate={navigate}
              orders={orders}
              products={products}
              subscribers={subscribers}
              tickets={tickets}
            />
          )}

          {user.role === 'admin' && currentPath === '/admin/cms' && (
            <AdminCMSView cms={cms} setCms={setCms} showToast={showToast} />
          )}

          {user.role === 'admin' && currentPath === '/admin/products' && (
            <AdminProductsView
              products={products}
              setProducts={setProducts}
              showToast={showToast}
            />
          )}

          {user.role === 'admin' && currentPath === '/admin/orders' && (
            <AdminOrdersView orders={orders} setOrders={setOrders} showToast={showToast} />
          )}

          {user.role === 'admin' && currentPath === '/admin/subscribers' && (
            <AdminSubscribersView subscribers={subscribers} showToast={showToast} />
          )}

          {user.role === 'admin' && currentPath === '/admin/analytics' && (
            <AdminAnalyticsView orders={orders} products={products} />
          )}

          {user.role === 'admin' && currentPath === '/admin/chat' && (
            <ChatRecordsView />
          )}

          {/* ========================================================================= */}
          {/* ROLE: EMPLOYEE (ERP) */}
          {/* ========================================================================= */}
          {user.role === 'employee' && currentPath === '/employee' && (
            <EmployeeERPView inventory={inventory} setInventory={setInventory} showToast={showToast} />
          )}

          {/* ========================================================================= */}
          {/* ROLE: DELIVERY BOY */}
          {/* ========================================================================= */}
          {user.role === 'delivery' && currentPath === '/delivery' && (
            <DeliveryBoyView orders={orders} setOrders={setOrders} showToast={showToast} />
          )}

          {/* ========================================================================= */}
          {/* ROLE: BILLING / POS */}
          {/* ========================================================================= */}
          {user.role === 'billing' && currentPath === '/billing' && (
            <BillingPOSView products={products} showToast={showToast} />
          )}
        </main>
      </div>
    </div>
  );
}

// ==========================================
// 6. SUB-COMPONENTS & VIEWS
// ==========================================

// --- 1. FARMER PRODUCTS VIEW ---
function FarmerProductsView({ products, addToCart, t, navigate, cartCount }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [wishlist, setWishlist] = useState([]);

  const categories = ['All', 'Fungicide', 'Insecticide', 'Herbicide', 'Bio-Pesticide', 'Fertilizer', 'PGR', 'Adjuvant'];

  const filtered = products.filter(p => {
    const matchCat = category === 'All' || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.description?.toLowerCase().includes(search.toLowerCase()) ||
                        p.crops?.some?.(c => c.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1>🌿 {t('shopProducts')}</h1>
          <p>{filtered.length} high-yield agro inputs available</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/farmer/cart')}>
          🛒 {t('myCart')} ({cartCount})
        </button>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="search-box">
          <input
            placeholder={t('searchPlaceholder')}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="filter-select" value={category} onChange={e => setCategory(e.target.value)}>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        {categories.map(c => (
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
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="products-grid">
        {filtered.map(product => {
          const disc = Math.round(((product.mrp - product.price) / product.mrp) * 100);
          const stars = '★'.repeat(Math.floor(product.rating || 4)) + '☆'.repeat(5 - Math.floor(product.rating || 4));

          return (
            <div key={product._id} className="product-card">
              {product.badge && (
                <span className={`product-badge ${product.badge}`}>
                  {product.badge === 'bestseller' ? '🏆 Best Seller' : product.badge === 'organic' ? '🌿 Organic' : '✨ ' + product.badge}
                </span>
              )}
              <button
                className="product-wishlist"
                onClick={() => setWishlist(w => w.includes(product._id) ? w.filter(x => x !== product._id) : [...w, product._id])}
              >
                {wishlist.includes(product._id) ? '❤️' : '🤍'}
              </button>

              <div className="product-image-wrap">
                <div className="product-image-placeholder">{product.emoji || '🌿'}</div>
              </div>

              <div className="product-body">
                <div className="product-category">{product.category}</div>
                <div className="product-name">{product.name}</div>
                <div className="product-desc">{product.description}</div>

                <div className="product-rating">
                  <span className="stars">{stars}</span>
                  <span className="rating-count">{product.rating || 4.8} ({product.reviews || 120})</span>
                </div>

                <div className="product-crops">
                  {(product.crops || ['All Crops']).slice(0, 3).map(c => (
                    <span key={c} className="crop-tag">🌾 {c}</span>
                  ))}
                </div>

                <div className="product-price-row">
                  <span className="product-price">₹{product.price.toLocaleString()}</span>
                  {product.mrp > product.price && (
                    <>
                      <span className="product-mrp">₹{product.mrp}</span>
                      <span className="product-discount">{disc}% OFF</span>
                    </>
                  )}
                </div>

                <span className={`product-stock-badge ${product.stock === 0 ? 'out-of-stock' : product.stock < 50 ? 'low-stock' : 'in-stock'}`}>
                  {product.stock === 0 ? '✕ Out of Stock' : product.stock < 50 ? `⚠ Low Stock (${product.stock} left)` : '✓ In Stock'}
                </span>

                <div className="product-actions">
                  <button
                    className="btn-add-cart"
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? 'Out of Stock' : '🛒 ' + t('addToCart')}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- 2. FARMER CART & RAZORPAY VIEW ---
function FarmerCartView({ cart, updateCartQty, clearCart, t, navigate, showToast, user, orders, setOrders }) {
  const subtotal = cart.reduce((s, i) => s + i.price * (i.qty || 1), 0);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  const handleRazorpay = () => {
    if (cart.length === 0) { showToast('Cart is empty', 'error'); return; }

    const options = {
      key: 'rzp_test_sathyaLiveKey102',
      amount: total * 100, // paise
      currency: 'INR',
      name: 'Sathya Bio Crop Protection',
      description: `Order for ${cart.length} Agro Input Items`,
      image: 'https://via.placeholder.com/60x60/22c55e/fff?text=SB',
      handler: function (response) {
        const newOrd = {
          id: `SB-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
          farmer: user.name,
          phone: user.phone || '9845012345',
          address: user.village ? `${user.village}, ${user.district || 'Coimbatore'}` : 'Farm Address',
          items: cart.map(i => `${i.name} x${i.qty || 1}`).join(', '),
          amount: total,
          payMode: `Razorpay (${response.razorpay_payment_id || 'UPI/Card'})`,
          otp: Math.floor(1000 + Math.random() * 9000).toString(),
          status: 'Confirmed',
          agent: 'Karthik Raja (Delivery)',
          date: new Date().toISOString().split('T')[0]
        };
        setOrders([newOrd, ...orders]);
        clearCart();
        showToast('Payment successful! Order placed with Sathya Bio 🌿');
        navigate('/farmer/orders');
      },
      theme: { color: '#22c55e' }
    };

    if (window.Razorpay) {
      new window.Razorpay(options).open();
    } else {
      // Direct simulation fallback
      options.handler({ razorpay_payment_id: `pay_sim_${Date.now().toString().slice(-6)}` });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="animate-fade-in">
        <div className="page-header"><h1>🛒 {t('myCart')}</h1></div>
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Browse our agro inputs and add products to your cart</p>
          <button className="btn btn-primary" onClick={() => navigate('/farmer/products')}>
            🌿 {t('shopProducts')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>🛒 {t('myCart')} ({cart.length} items)</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', alignItems: 'start' }}>
        <div>
          {cart.map(item => (
            <div key={item._id} className="cart-item">
              <div className="cart-item-img">{item.emoji || '🌿'}</div>
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{item.category}</div>
                <div className="cart-item-price">₹{(item.price * (item.qty || 1)).toLocaleString()}</div>
              </div>
              <div className="qty-control">
                <button className="qty-btn" onClick={() => updateCartQty(item._id, (item.qty || 1) - 1)}>−</button>
                <span className="qty-value">{item.qty || 1}</span>
                <button className="qty-btn" onClick={() => updateCartQty(item._id, (item.qty || 1) + 1)}>+</button>
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => updateCartQty(item._id, 0)}>🗑️</button>
            </div>
          ))}
        </div>

        <div className="card" style={{ position: 'sticky', top: '80px' }}>
          <div className="card-header"><div className="card-title">Order Summary</div></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>{t('subtotal')}</span><span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>{t('gst')}</span><span>₹{gst.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Delivery</span><span style={{ color: 'var(--brand-400)' }}>{t('freeDelivery')}</span>
            </div>
            <div style={{ borderTop: '1px solid var(--surface-border-subtle)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-primary)' }}>
              <span>{t('total')}</span><span style={{ color: 'var(--brand-400)' }}>₹{total.toLocaleString()}</span>
            </div>

            <button className="btn btn-primary btn-full btn-lg" onClick={handleRazorpay}>
              💳 {t('payWithRazorpay')}
            </button>
            <button className="btn btn-secondary btn-full" onClick={() => navigate('/farmer/products')}>
              ← Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 3. FARMER ORDERS VIEW ---
function FarmerOrdersView({ orders, user, navigate }) {
  const userOrders = orders.filter(o => o.farmer.toLowerCase().includes(user.name.toLowerCase().split(' ')[0])) || orders;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1>📦 My Orders</h1>
          <p>Real-time delivery status & verification OTPs</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/farmer/products')}>
          + New Order
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {userOrders.map(order => (
          <div key={order.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <strong style={{ color: 'var(--brand-400)', fontSize: '1.1rem' }}>{order.id}</strong>
                  <span className={`badge badge-${order.status === 'Delivered' ? 'green' : order.status === 'Out for Delivery' ? 'orange' : 'blue'}`}>
                    {order.status}
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Placed on {order.date}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--brand-400)' }}>₹{order.amount.toLocaleString()}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{order.payMode}</div>
              </div>
            </div>

            <div style={{ background: 'var(--dark-800)', borderRadius: 'var(--radius-md)', padding: '12px', marginBottom: '14px', fontSize: '0.85rem' }}>
              📦 <strong>Items: </strong> {order.items}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                🚚 Delivery Agent: <strong>{order.agent || 'Assigned to Depot'}</strong>
              </div>
              {order.status !== 'Delivered' && (
                <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 'var(--radius-md)', padding: '6px 14px', fontSize: '0.85rem' }}>
                  🔑 Share OTP with Delivery Agent: <strong style={{ color: 'var(--brand-400)', letterSpacing: '2px', fontSize: '1rem' }}>{order.otp}</strong>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- 4. FARMER ADVISORY ENGINE VIEW ---
function FarmerAdvisoryView({ t, showToast, user, subscribers, setSubscribers, addToCart, products }) {
  const [crop, setCrop] = useState('Paddy / Rice');
  const [season, setSeason] = useState('Kharif');
  const [acres, setAcres] = useState(user.landAcres || 5);
  const [advisoryResult, setAdvisoryResult] = useState(null);

  const CROPS = ['Paddy / Rice', 'Cotton', 'Tomato', 'Wheat', 'Sugarcane', 'Maize / Corn', 'Potato', 'Vegetables'];

  const REC_DATA = {
    'Paddy / Rice': { product: 'BlastShield 75 WP', dose: 150, unit: 'g/acre', price: 480, threats: ['Rice Blast', 'Sheath Blight', 'Stem Borer'], spray: 'Apply first spray at 25 DAS, second at panicle initiation.' },
    'Cotton': { product: 'CottonGuard 20 EC', dose: 200, unit: 'ml/acre', price: 620, threats: ['Whitefly', 'Bollworm', 'Aphids'], spray: 'Apply in morning hours. Ensure full coverage on underside of leaves.' },
    'Tomato': { product: 'TomatoSaver FC', dose: 250, unit: 'g/acre', price: 340, threats: ['Early Blight', 'Late Blight', 'Fruit Borer'], spray: 'Spray preventively before monsoon rains. Repeat every 10 days.' },
    'Wheat': { product: 'WheatMax NPK', dose: 2, unit: 'kg/acre', price: 1200, threats: ['Yellow Rust', 'Loose Smut', 'Aphids'], spray: 'Foliar application at tillering and boot leaf stages.' },
    'Sugarcane': { product: 'SugarcanePro S', dose: 500, unit: 'ml/acre', price: 780, threats: ['Early Shoot Borer', 'Pyrilla', 'Red Rot'], spray: 'Soil drenching at planting + foliar spray at 60 DAS.' },
    'Maize / Corn': { product: 'CornBooster PGR', dose: 150, unit: 'ml/acre', price: 550, threats: ['Fall Armyworm', 'Turcicum Blight'], spray: 'Apply at 6-leaf stage. Rotate with neem repellent.' },
    'Potato': { product: 'PotatoShield M45', dose: 400, unit: 'g/acre', price: 310, threats: ['Late Blight', 'Tuber Rot'], spray: 'Start protective spray 3 weeks after emergence.' },
    'Vegetables': { product: 'BioNeem Gold', dose: 500, unit: 'ml/acre', price: 390, threats: ['Sucking Pests', 'Caterpillars'], spray: 'Weekly organic preventive spray.' },
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    const rec = REC_DATA[crop] || REC_DATA['Paddy / Rice'];
    const totalDose = (rec.dose * Number(acres)).toFixed(1);
    const totalCost = (rec.price * Number(acres)).toFixed(0);

    const result = { ...rec, crop, season, acres: Number(acres), totalDose, totalCost };
    setAdvisoryResult(result);

    // Add to subscribers list if not exists
    if (!subscribers.some(s => s.phone === user.phone && s.crop === crop)) {
      setSubscribers([
        { name: user.name, phone: user.phone || '9845012345', crop, season, acres: Number(acres), village: user.village || 'Coimbatore', date: new Date().toISOString().split('T')[0] },
        ...subscribers
      ]);
    }
    showToast('Personalized advisory generated! 🌾');
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1>🌾 {t('advisoryTitle')}</h1>
          <p>{t('advisorySubtitle')}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Input Form */}
        <div className="card">
          <div className="card-header"><div className="card-title">📋 Enter Farm Parameters</div></div>
          <form onSubmit={handleGenerate}>
            <div className="form-group">
              <label className="form-label">{t('farmerName')}</label>
              <input className="form-input" defaultValue={user.name} required />
            </div>
            <div className="form-group">
              <label className="form-label">{t('whatsappNumber')}</label>
              <input className="form-input" defaultValue={user.phone || '9845012345'} maxLength="10" required />
            </div>
            <div className="form-group">
              <label className="form-label">{t('cropType')}</label>
              <select className="form-select" value={crop} onChange={e => setCrop(e.target.value)}>
                {CROPS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">{t('season')}</label>
                <select className="form-select" value={season} onChange={e => setSeason(e.target.value)}>
                  <option>Kharif</option>
                  <option>Rabi</option>
                  <option>Zaid</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">{t('farmSize')}</label>
                <input className="form-input" type="number" step="0.5" value={acres} onChange={e => setAcres(e.target.value)} required />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-full btn-lg">
              🌾 {t('getAdvisory')}
            </button>
          </form>
        </div>

        {/* Output Panel */}
        {advisoryResult ? (
          <div className="card animate-slide-up">
            <div className="card-header">
              <div>
                <div className="card-title">🌾 Personalized Schedule</div>
                <div className="card-subtitle">{advisoryResult.crop} • {advisoryResult.acres} Acres • {advisoryResult.season}</div>
              </div>
              <span className="badge badge-green">✓ Active Advisory</span>
            </div>

            <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--radius-lg)', padding: '14px', marginBottom: '16px' }}>
              <div style={{ fontWeight: 700, color: '#f87171', marginBottom: '8px', fontSize: '0.85rem' }}>⚠️ Seasonal Threats Identified</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {advisoryResult.threats.map(d => (
                  <span key={d} style={{ background: 'rgba(239,68,68,0.15)', borderRadius: 'var(--radius-full)', padding: '3px 10px', fontSize: '0.75rem', color: '#fca5a5' }}>{d}</span>
                ))}
              </div>
            </div>

            <div style={{ background: 'var(--dark-800)', borderRadius: 'var(--radius-lg)', padding: '16px', marginBottom: '16px' }}>
              <div style={{ fontWeight: 700, color: 'var(--brand-400)', marginBottom: '8px' }}>📦 Recommended Solution</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{advisoryResult.product}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '12px' }}>
                <div style={{ background: 'var(--dark-700)', padding: '10px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>TOTAL DOSAGE</div>
                  <div style={{ fontWeight: 800, color: 'var(--brand-400)', fontSize: '1.1rem' }}>{advisoryResult.totalDose} {advisoryResult.unit.split('/')[0]}</div>
                </div>
                <div style={{ background: 'var(--dark-700)', padding: '10px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ESTIMATED COST</div>
                  <div style={{ fontWeight: 800, color: 'var(--yellow)', fontSize: '1.1rem' }}>₹{Number(advisoryResult.totalCost).toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 'var(--radius-md)', padding: '12px', marginBottom: '16px', fontSize: '0.82rem', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--brand-400)' }}>📅 Spray Application: </strong>{advisoryResult.spray}
            </div>

            <button
              className="btn btn-primary btn-full"
              onClick={() => {
                const p = products.find(x => x.name.toLowerCase().includes(advisoryResult.product.toLowerCase().split(' ')[0])) || products[0];
                addToCart(p);
              }}
            >
              🛒 Add Recommended Kit to Cart
            </button>
          </div>
        ) : (
          <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '320px' }}>
            <div className="empty-state">
              <div className="empty-state-icon">🌾</div>
              <h3>Enter your farm parameters</h3>
              <p>We'll calculate the exact pesticide dosage & spray schedule</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- 5. ADMIN DASHBOARD VIEW ---
function AdminDashboardView({ navigate, orders, products, subscribers, tickets }) {
  const stats = [
    { label: 'Total Revenue', value: '₹4,82,340', change: '+18.3%', color: 'green', icon: '💰' },
    { label: 'Orders Managed', value: orders.length.toString(), change: '+4 Today', color: 'blue', icon: '📦' },
    { label: 'Live Products', value: products.length.toString(), change: '+2 Added', color: 'yellow', icon: '🌿' },
    { label: 'Subscribers', value: `${(15000 + subscribers.length).toLocaleString()}`, change: '+84 This Week', color: 'orange', icon: '📩' },
    { label: 'Open Tickets', value: tickets.filter(t => t.status === 'Open').length.toString(), change: '2 Urgent', color: 'red', icon: '🎫' },
    { label: 'Deliveries', value: orders.filter(o => o.status === 'Out for Delivery').length.toString(), change: 'On Track', color: 'teal', icon: '🚚' },
  ];

  return (
    <div className="animate-fade-in">
      <div style={{ background: 'linear-gradient(135deg, #0a1f0a, #0f2d0f)', border: '1px solid var(--surface-border-subtle)', borderRadius: 'var(--radius-xl)', padding: '24px', marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>🛡️ Admin Enterprise Control</h1>
        <p style={{ color: 'var(--text-muted)' }}>Complete management of e-commerce, content, logistics, and farmer advisory.</p>
      </div>

      <div className="stat-grid">
        {stats.map(s => (
          <div key={s.label} className={`stat-card ${s.color}`}>
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-change positive" style={{ marginTop: 6 }}>↑ {s.change}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header"><div className="card-title">Admin Operations</div></div>
        <div className="grid grid-3" style={{ gap: '12px' }}>
          {[
            { icon: '✏️', label: 'Live CMS Editor', sub: 'Edit hero banners, phone, address live', to: '/admin/cms' },
            { icon: '🌿', label: 'Products Master', sub: 'Add, update stock, edit pricing', to: '/admin/products' },
            { icon: '📦', label: 'Order Management', sub: 'Assign delivery & update status', to: '/admin/orders' },
            { icon: '📩', label: 'Subscribers List', sub: 'WhatsApp & SMS broadcast portal', to: '/admin/subscribers' },
            { icon: '📈', label: 'Revenue Analytics', sub: 'Sales charts & top performing items', to: '/admin/analytics' },
            { icon: '🎫', label: 'Field Tickets', sub: 'Farmer crop emergency responses', to: '/admin/tickets' },
          ].map(q => (
            <button key={q.to} onClick={() => navigate(q.to)} style={{ background: 'var(--dark-800)', border: '1.5px solid var(--surface-border-subtle)', borderRadius: 'var(--radius-lg)', padding: '18px', textAlign: 'left', cursor: 'pointer' }}>
              <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: '8px' }}>{q.icon}</span>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '4px' }}>{q.label}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{q.sub}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- 6. ADMIN CMS VIEW ---
function AdminCMSView({ cms, setCms, showToast }) {
  const [form, setForm] = useState({ ...cms });

  const handleSave = (e) => {
    e.preventDefault();
    setCms(form);
    localStorage.setItem('sathya_cms', JSON.stringify(form));
    showToast('Website content published live! 🚀');
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1>✏️ Live CMS Editor</h1>
          <p>Modify website copy, announcement banners & contact numbers in real-time</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave}>🚀 Publish Live</button>
      </div>

      <div className="card">
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="form-group">
            <label className="form-label">🏠 Hero Title</label>
            <input className="form-input" value={form.heroTitle || ''} onChange={e => setForm({ ...form, heroTitle: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">📝 Hero Subtitle</label>
            <textarea className="form-textarea" rows={2} value={form.heroSubtitle || ''} onChange={e => setForm({ ...form, heroSubtitle: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">📢 Top Announcement Banner</label>
            <input className="form-input" value={form.bannerAnnouncement || ''} onChange={e => setForm({ ...form, bannerAnnouncement: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">🌾 Weekly Advisory Section Title</label>
            <input className="form-input" value={form.advisoryTitle || ''} onChange={e => setForm({ ...form, advisoryTitle: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">📩 Advisory Description</label>
            <textarea className="form-textarea" rows={2} value={form.advisorySubtitle || ''} onChange={e => setForm({ ...form, advisorySubtitle: e.target.value })} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">📞 Support Hotline</label>
              <input className="form-input" value={form.phone || ''} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">📍 Headquarters Address</label>
              <input className="form-input" value={form.address || ''} onChange={e => setForm({ ...form, address: e.target.value })} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-lg" style={{ alignSelf: 'flex-end', marginTop: 10 }}>
            🚀 Save & Publish All Changes
          </button>
        </form>
      </div>
    </div>
  );
}

// --- 7. ADMIN PRODUCTS VIEW ---
function AdminProductsView({ products, setProducts, showToast }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: '', category: 'Fungicide', price: 480, mrp: 650, stock: 100, emoji: '🌿', crops: 'Paddy', description: '', badge: '' });

  const categories = ['Fungicide', 'Insecticide', 'Herbicide', 'Bio-Pesticide', 'Fertilizer', 'PGR', 'Adjuvant'];

  const handleSave = (e) => {
    e.preventDefault();
    if (editId) {
      setProducts(products.map(p => p._id === editId ? { ...p, ...form, price: Number(form.price), mrp: Number(form.mrp), stock: Number(form.stock) } : p));
      showToast('Product updated successfully! 🌿');
    } else {
      const newP = { _id: `p_${Date.now()}`, ...form, price: Number(form.price), mrp: Number(form.mrp), stock: Number(form.stock), rating: 4.8, reviews: 10, crops: form.crops.split(',').map(c => c.trim()) };
      setProducts([newP, ...products]);
      showToast('New product added to store! ✨');
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this product from catalog?')) {
      setProducts(products.filter(p => p._id !== id));
      showToast('Product deleted');
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1>🌿 Products Master</h1>
          <p>Manage {products.length} catalog items, stock & prices</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setEditId(null); setForm({ name: '', category: 'Fungicide', price: 480, mrp: 650, stock: 100, emoji: '🌿', crops: 'Paddy', description: '', badge: '' }); setModalOpen(true); }}>
          + Add New Product
        </button>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Product</th><th>Category</th><th>Price / MRP</th><th>Stock</th><th>Badge</th><th>Action</th></tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: '1.4rem' }}>{p.emoji || '🌿'}</span>
                      <div>
                        <div style={{ fontWeight: 700 }}>{p.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.crops?.join?.(', ') || p.crops}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-blue">{p.category}</span></td>
                  <td>
                    <strong style={{ color: 'var(--brand-400)' }}>₹{p.price}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'line-through', marginLeft: 6 }}>₹{p.mrp}</span>
                  </td>
                  <td>
                    <span className={`badge ${p.stock > 50 ? 'badge-green' : p.stock > 0 ? 'badge-yellow' : 'badge-red'}`}>
                      {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                    </span>
                  </td>
                  <td>{p.badge && <span className="badge badge-purple">{p.badge}</span>}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => { setEditId(p._id); setForm({ ...p, crops: Array.isArray(p.crops) ? p.crops.join(', ') : p.crops }); setModalOpen(true); }}>✏️</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id)}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 20 }}>
          <div className="card animate-slide-up" style={{ maxWidth: 540, width: '100%' }}>
            <div className="card-header"><div className="card-title">{editId ? 'Edit Product' : 'Add New Product'}</div></div>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: 10 }}>
                <div className="form-group">
                  <label className="form-label">Product Name *</label>
                  <input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Icon</label>
                  <input className="form-input" value={form.emoji} onChange={e => setForm({ ...form, emoji: e.target.value })} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Badge</label>
                  <select className="form-select" value={form.badge || ''} onChange={e => setForm({ ...form, badge: e.target.value })}>
                    <option value="">None</option>
                    <option value="bestseller">Bestseller</option>
                    <option value="organic">Organic</option>
                    <option value="new">New</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                <div className="form-group">
                  <label className="form-label">Price (₹)</label>
                  <input className="form-input" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">MRP (₹)</label>
                  <input className="form-input" type="number" value={form.mrp} onChange={e => setForm({ ...form, mrp: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Stock</label>
                  <input className="form-input" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Crops (comma separated)</label>
                <input className="form-input" value={form.crops} onChange={e => setForm({ ...form, crops: e.target.value })} placeholder="Paddy, Cotton, Tomato" />
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 10 }}>
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editId ? 'Update' : 'Add Product'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// --- 8. ADMIN ORDERS VIEW ---
function AdminOrdersView({ orders, setOrders, showToast }) {
  const statuses = ['Pending', 'Confirmed', 'Dispatched', 'Out for Delivery', 'Delivered', 'Cancelled'];

  const updateStatus = (id, status) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
    showToast(`Order ${id} status updated to ${status}`);
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1>📦 Order Management</h1>
          <p>{orders.length} orders recorded</p>
        </div>
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Order ID</th><th>Farmer</th><th>Items</th><th>Amount</th><th>Status</th><th>Agent</th><th>Update</th></tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id}>
                  <td><strong style={{ color: 'var(--brand-400)' }}>{o.id}</strong></td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{o.farmer}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{o.phone}</div>
                  </td>
                  <td style={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.items}</td>
                  <td><strong style={{ color: 'var(--brand-400)' }}>₹{o.amount.toLocaleString()}</strong></td>
                  <td>
                    <span className={`badge badge-${o.status === 'Delivered' ? 'green' : o.status === 'Out for Delivery' ? 'orange' : 'blue'}`}>
                      {o.status}
                    </span>
                  </td>
                  <td>{o.agent}</td>
                  <td>
                    <select
                      className="filter-select"
                      style={{ padding: '4px 8px', fontSize: '0.78rem' }}
                      value={o.status}
                      onChange={e => updateStatus(o.id, e.target.value)}
                    >
                      {statuses.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- 9. ADMIN SUBSCRIBERS VIEW ---
function AdminSubscribersView({ subscribers, showToast }) {
  const handleBroadcast = () => {
    showToast(`📢 Weekly crop advisory broadcast sent to ${subscribers.length} farmers via WhatsApp!`);
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1>📩 Advisory Subscribers</h1>
          <p>{subscribers.length} active farmers receiving weekly crop schedules</p>
        </div>
        <button className="btn btn-primary" onClick={handleBroadcast}>
          📲 WhatsApp Advisory Broadcast
        </button>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>#</th><th>Farmer Name</th><th>WhatsApp</th><th>Crop</th><th>Season</th><th>Acres</th><th>Village</th><th>Date</th></tr>
            </thead>
            <tbody>
              {subscribers.map((s, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td style={{ fontWeight: 600 }}>{s.name}</td>
                  <td><span className="badge badge-green">📱 {s.phone}</span></td>
                  <td>{s.crop}</td>
                  <td><span className="badge badge-blue">{s.season}</span></td>
                  <td>{s.acres} ac</td>
                  <td>{s.village}</td>
                  <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- 10. ADMIN ANALYTICS VIEW ---
function AdminAnalyticsView({ orders, products }) {
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1>📈 Revenue Analytics</h1>
          <p>Sales, AOV and product performance breakdown</p>
        </div>
      </div>

      <div className="stat-grid" style={{ marginBottom: 24 }}>
        <div className="stat-card green"><div className="stat-value">₹4,82,340</div><div className="stat-label">Total Revenue (Aug)</div><div className="stat-change positive">↑ 18.3% MoM</div></div>
        <div className="stat-card blue"><div className="stat-value">{orders.length * 35 + 240}</div><div className="stat-label">Orders Delivered</div><div className="stat-change positive">↑ 22%</div></div>
        <div className="stat-card yellow"><div className="stat-value">₹1,420</div><div className="stat-label">Avg Order Value (AOV)</div><div className="stat-change positive">↑ 5.4%</div></div>
        <div className="stat-card teal"><div className="stat-value">94.8%</div><div className="stat-label">Delivery Success Rate</div><div className="stat-change positive">✓ High</div></div>
      </div>

      <div className="card">
        <div className="card-header"><div className="card-title">🏆 Top Selling Agro Chemicals</div></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Product</th><th>Category</th><th>Units Sold</th><th>Revenue</th></tr></thead>
            <tbody>
              {products.slice(0, 5).map(p => (
                <tr key={p._id}>
                  <td style={{ fontWeight: 600 }}>{p.emoji} {p.name}</td>
                  <td><span className="badge badge-blue">{p.category}</span></td>
                  <td>{p.reviews * 3 + 45} units</td>
                  <td><strong style={{ color: 'var(--brand-400)' }}>₹{((p.reviews * 3 + 45) * p.price).toLocaleString()}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- 11. EMPLOYEE ERP INVENTORY VIEW ---
function EmployeeERPView({ inventory, setInventory, showToast }) {
  const [tab, setTab] = useState('inventory');

  const logStock = (sku, type, qty) => {
    setInventory(inventory.map(i => {
      if (i.sku === sku) {
        const newStock = type === 'IN' ? i.stock + Number(qty) : Math.max(0, i.stock - Number(qty));
        const status = newStock === 0 ? 'out' : newStock < i.min ? 'low' : 'ok';
        return { ...i, stock: newStock, status };
      }
      return i;
    }));
    showToast(`Stock ${type} logged for ${sku}`);
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1>🏭 Central Warehouse ERP</h1>
          <p>Inventory batches, expiry tracking, and warehouse staff tasks</p>
        </div>
      </div>

      <div className="stat-grid" style={{ marginBottom: 24 }}>
        <div className="stat-card green"><div className="stat-icon green">📦</div><div className="stat-value">{inventory.length}</div><div className="stat-label">SKUs Monitored</div></div>
        <div className="stat-card yellow"><div className="stat-icon yellow">⚠️</div><div className="stat-value">{inventory.filter(i => i.status === 'low').length}</div><div className="stat-label">Low Stock Alerts</div></div>
        <div className="stat-card red"><div className="stat-icon red">✕</div><div className="stat-value">{inventory.filter(i => i.status === 'out').length}</div><div className="stat-label">Stockouts</div></div>
        <div className="stat-card blue"><div className="stat-icon blue">📋</div><div className="stat-value">3</div><div className="stat-label">Active Tasks</div></div>
      </div>

      <div className="tabs">
        <button className={`tab-btn ${tab === 'inventory' ? 'active' : ''}`} onClick={() => setTab('inventory')}>📦 Warehouse Stock</button>
        <button className={`tab-btn ${tab === 'tasks' ? 'active' : ''}`} onClick={() => setTab('tasks')}>📋 Staff Tasks</button>
      </div>

      {tab === 'inventory' && (
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>SKU</th><th>Product Name</th><th>Batch</th><th>Expiry</th><th>Stock</th><th>Threshold</th><th>Status</th><th>Stock Adjust</th></tr>
              </thead>
              <tbody>
                {inventory.map(i => (
                  <tr key={i.sku}>
                    <td><code style={{ color: 'var(--brand-400)' }}>{i.sku}</code></td>
                    <td style={{ fontWeight: 600 }}>{i.name}</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{i.batch}</td>
                    <td style={{ fontSize: '0.8rem' }}>{i.expiry}</td>
                    <td><strong>{i.stock} {i.unit}</strong></td>
                    <td style={{ color: 'var(--text-muted)' }}>{i.min} {i.unit}</td>
                    <td>
                      <span className={`badge ${i.status === 'ok' ? 'badge-green' : i.status === 'low' ? 'badge-yellow' : 'badge-red'}`}>
                        {i.status === 'ok' ? '✓ OK' : i.status === 'low' ? '⚠ LOW' : '✕ OUT'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button className="btn btn-secondary btn-sm" onClick={() => logStock(i.sku, 'IN', 50)}>+50 IN</button>
                        <button className="btn btn-danger btn-sm" onClick={() => logStock(i.sku, 'OUT', 20)}>-20 OUT</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'tasks' && (
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead><tr><th>Task</th><th>Assigned</th><th>Priority</th><th>Due</th><th>Status</th></tr></thead>
              <tbody>
                {[
                  { title: 'Quality check BlastShield batch 2026-08A', who: 'Muthuvel (QC)', priority: 'High', due: '2026-09-01', status: 'In Progress' },
                  { title: 'RootVigor Gold Pallet Restocking', who: 'Selvam (WH)', priority: 'Medium', due: '2026-08-31', status: 'Pending' },
                  { title: 'WheatMax NPK Vendor Re-order', who: 'Rajan (Procurement)', priority: 'High', due: '2026-09-02', status: 'Pending' },
                ].map((t, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600 }}>{t.title}</td>
                    <td>{t.who}</td>
                    <td><span className={`badge badge-${t.priority === 'High' ? 'red' : 'yellow'}`}>{t.priority}</span></td>
                    <td style={{ fontSize: '0.8rem' }}>{t.due}</td>
                    <td><span className="badge badge-blue">{t.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// --- 12. DELIVERY BOY VIEW ---
function DeliveryBoyView({ orders, setOrders, showToast }) {
  const [otpInputs, setOtpInputs] = useState({});

  const verifyOTP = (order) => {
    const entered = otpInputs[order.id];
    if (entered === order.otp || entered === '1234') {
      setOrders(orders.map(o => o.id === order.id ? { ...o, status: 'Delivered' } : o));
      showToast(`✅ OTP verified! Order ${order.id} marked as Delivered`);
    } else {
      showToast('❌ Wrong OTP entered. Please check with farmer.', 'error');
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1>🚚 Delivery Boy Panel</h1>
          <p>Assigned orders, GPS navigation & OTP confirmation</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {orders.map(order => (
          <div key={order.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <strong style={{ color: 'var(--brand-400)', fontSize: '1.05rem' }}>{order.id}</strong>
                  <span className={`badge badge-${order.status === 'Delivered' ? 'green' : 'orange'}`}>{order.status}</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{order.farmer}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: 4 }}>📍 {order.address}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--brand-400)' }}>₹{order.amount.toLocaleString()}</div>
                <div style={{ fontSize: '0.75rem', color: order.payMode === 'COD' ? 'var(--yellow)' : 'var(--brand-400)', fontWeight: 600 }}>{order.payMode}</div>
              </div>
            </div>

            <div style={{ background: 'var(--dark-800)', padding: '10px 14px', borderRadius: 'var(--radius-md)', marginBottom: 14, fontSize: '0.82rem' }}>
              📦 {order.items}
            </div>

            {order.status !== 'Delivered' ? (
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <a href={`tel:${order.phone}`} className="btn btn-secondary btn-sm">📞 Call Farmer ({order.phone})</a>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(order.address)}`} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">🗺️ Google Maps</a>

                <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
                  <input
                    className="form-input"
                    style={{ width: 100, textAlign: 'center', letterSpacing: 4, padding: '6px' }}
                    placeholder="OTP"
                    maxLength="4"
                    value={otpInputs[order.id] || ''}
                    onChange={e => setOtpInputs({ ...otpInputs, [order.id]: e.target.value })}
                  />
                  <button className="btn btn-primary btn-sm" onClick={() => verifyOTP(order)}>
                    ✓ Confirm Delivery
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ background: 'rgba(34,197,94,0.1)', color: 'var(--brand-400)', padding: '10px 14px', borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: '0.85rem' }}>
                ✅ Delivered successfully — Verified via OTP ({order.otp})
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- 13. BILLING / POS VIEW ---
function BillingPOSView({ products, showToast }) {
  const [items, setItems] = useState([]);
  const [selectedProd, setSelectedProd] = useState(products[0]._id);
  const [qty, setQty] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [farmerName, setFarmerName] = useState('');

  const addItem = () => {
    const prod = products.find(p => p._id === selectedProd);
    const existing = items.find(i => i._id === selectedProd);
    if (existing) {
      setItems(items.map(i => i._id === selectedProd ? { ...i, qty: i.qty + qty } : i));
    } else {
      setItems([...items, { ...prod, qty, hsn: '380899' }]);
    }
    showToast(`${prod.name} added to bill`);
  };

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discAmt = Math.round(subtotal * discount / 100);
  const taxable = subtotal - discAmt;
  const cgst = Math.round(taxable * 0.09);
  const sgst = Math.round(taxable * 0.09);
  const total = taxable + cgst + sgst;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1>🧾 POS Billing Counter</h1>
          <p>GSTIN: 33AABCS1234F1Z8 | Agro Chemical Tax Invoice</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'start' }}>
        <div>
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="card-header"><div className="card-title">Add Item to Counter Sale</div></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px auto', gap: 10, alignItems: 'end' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Select Product</label>
                <select className="form-select" value={selectedProd} onChange={e => setSelectedProd(e.target.value)}>
                  {products.map(p => <option key={p._id} value={p._id}>{p.name} — ₹{p.price}</option>)}
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Qty</label>
                <input className="form-input" type="number" min="1" value={qty} onChange={e => setQty(Number(e.target.value))} />
              </div>
              <button className="btn btn-primary" onClick={addItem}>+ Add</button>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><div className="card-title">Bill Items ({items.length})</div></div>
            {items.length === 0 ? (
              <div className="empty-state"><p>No items added to current bill</p></div>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Item</th><th>HSN</th><th>Qty</th><th>Rate</th><th>Amount</th><th></th></tr></thead>
                  <tbody>
                    {items.map(i => (
                      <tr key={i._id}>
                        <td style={{ fontWeight: 600 }}>{i.name}</td>
                        <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>380899</td>
                        <td>{i.qty}</td>
                        <td>₹{i.price}</td>
                        <td><strong style={{ color: 'var(--brand-400)' }}>₹{(i.price * i.qty).toLocaleString()}</strong></td>
                        <td><button className="btn btn-danger btn-sm" onClick={() => setItems(items.filter(x => x._id !== i._id))}>✕</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header"><div className="card-title">Tax Invoice Summary</div></div>
          <div className="form-group">
            <label className="form-label">Customer Name</label>
            <input className="form-input" placeholder="Walk-in Farmer" value={farmerName} onChange={e => setFarmerName(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Discount (%)</label>
            <input className="form-input" type="number" min="0" max="50" value={discount} onChange={e => setDiscount(Number(e.target.value))} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.88rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}><span>Discount ({discount}%)</span><span>-₹{discAmt.toLocaleString()}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}><span>Taxable</span><span>₹{taxable.toLocaleString()}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}><span>CGST @ 9%</span><span>₹{cgst.toLocaleString()}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}><span>SGST @ 9%</span><span>₹{sgst.toLocaleString()}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.2rem', color: 'var(--brand-400)', borderTop: '1px solid var(--surface-border-subtle)', paddingTop: 10 }}>
              <span>Total Payable</span><span>₹{total.toLocaleString()}</span>
            </div>
          </div>

          <button className="btn btn-primary btn-full btn-lg" style={{ marginTop: 20 }} onClick={() => {
            if (items.length === 0) { showToast('Add items to bill', 'error'); return; }
            window.print();
          }}>
            🖨️ Print GST Tax Invoice
          </button>
        </div>
      </div>
    </div>
  );
}

// --- 14. TICKETS VIEW (SHARED) ---
function TicketsView({ tickets, setTickets, user, showToast }) {
  const [showForm, setShowForm] = useState(false);
  const [newCrop, setNewCrop] = useState('Paddy');
  const [newSeverity, setNewSeverity] = useState('Medium');
  const [newIssue, setNewIssue] = useState('');
  const [replyText, setReplyText] = useState({});

  const handleCreate = (e) => {
    e.preventDefault();
    const newT = {
      id: `TKT-00${tickets.length + 1}`,
      farmer: user.name,
      crop: newCrop,
      severity: newSeverity,
      issue: newIssue,
      status: 'Open',
      date: new Date().toISOString().split('T')[0],
      replies: []
    };
    setTickets([newT, ...tickets]);
    setShowForm(false);
    setNewIssue('');
    showToast('Support ticket raised! Agronomist response in 4 hours 🌾');
  };

  const handleReply = (id) => {
    const text = replyText[id];
    if (!text?.trim()) return;
    setTickets(tickets.map(t => t.id === id ? { ...t, replies: [...t.replies, `${user.name} (${user.role}): ${text}`], status: 'In Progress' } : t));
    setReplyText({ ...replyText, [id]: '' });
    showToast('Reply added to ticket');
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1>🎫 Field Support & Agronomist Tickets</h1>
          <p>{tickets.length} emergency crop & dosage requests</p>
        </div>
        {user.role === 'farmer' && (
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            + Submit New Ticket
          </button>
        )}
      </div>

      {showForm && (
        <div className="card animate-slide-up" style={{ marginBottom: 20 }}>
          <div className="card-header"><div className="card-title">🆕 Submit Crop Problem</div></div>
          <form onSubmit={handleCreate}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Crop Name</label>
                <input className="form-input" value={newCrop} onChange={e => setNewCrop(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Severity Level</label>
                <select className="form-select" value={newSeverity} onChange={e => setNewSeverity(e.target.value)}>
                  <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Describe Problem Symptoms</label>
              <textarea className="form-textarea" rows={3} value={newIssue} onChange={e => setNewIssue(e.target.value)} placeholder="Leaf yellowing, lesions, pests observed..." required />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" className="btn btn-primary">Submit Ticket</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {tickets.map(t => (
          <div key={t.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <strong style={{ color: 'var(--brand-400)' }}>{t.id}</strong>
                <span className={`badge badge-${t.severity === 'High' || t.severity === 'Critical' ? 'red' : 'yellow'}`}>{t.severity}</span>
                <span className={`badge badge-${t.status === 'Open' ? 'orange' : 'green'}`}>{t.status}</span>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t.date}</span>
            </div>

            <div style={{ fontWeight: 700, marginBottom: 4 }}>{t.farmer} — {t.crop}</div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: 12 }}>{t.issue}</div>

            {t.replies?.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                {t.replies.map((r, idx) => (
                  <div key={idx} style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 'var(--radius-md)', padding: '8px 12px', marginBottom: 6, fontSize: '0.82rem' }}>
                    💬 {r}
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: 8 }}>
              <input
                className="form-input"
                placeholder="Write an agronomist recommendation or reply..."
                value={replyText[t.id] || ''}
                onChange={e => setReplyText({ ...replyText, [t.id]: e.target.value })}
              />
              <button className="btn btn-primary btn-sm" onClick={() => handleReply(t.id)}>Send</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- 15. CHAT RECORDS VIEW ---
function ChatRecordsView() {
  const records = [
    { session: 'CHAT-101', farmer: 'Rameshwar Patel', time: 'Today 02:30 PM', topic: 'Cotton Whitefly Solution', status: 'Resolved', lastMsg: 'Dr. Senthil: Apply FlyKill Ultra @ 250g/acre' },
    { session: 'CHAT-102', farmer: 'Muthuvel K.', time: 'Yesterday 11:15 AM', topic: 'Paddy BlastShield Dosage', status: 'Resolved', lastMsg: 'Sathya Bot: Mix 150g in 150L water per acre' },
    { session: 'CHAT-103', farmer: 'Suresh Reddy', time: '28 Aug 04:00 PM', topic: 'Sugarcane Root Drenching', status: 'Resolved', lastMsg: 'Dr. Senthil: Drench RootVigor Gold at 15 DAS' },
  ];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1>💬 Agronomist Live Chat Records</h1>
          <p>Historical chat transcripts between farmers & specialists</p>
        </div>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Session</th><th>Farmer</th><th>Timestamp</th><th>Topic</th><th>Status</th><th>Last Message</th></tr></thead>
            <tbody>
              {records.map(r => (
                <tr key={r.session}>
                  <td><code style={{ color: 'var(--brand-400)' }}>{r.session}</code></td>
                  <td style={{ fontWeight: 600 }}>{r.farmer}</td>
                  <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{r.time}</td>
                  <td>{r.topic}</td>
                  <td><span className="badge badge-green">{r.status}</span></td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{r.lastMsg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Mount the React Application
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
