export const BRANDS = [
  "Apple",
  "Sony",
  "boAt",
  "Boult",
  "Noise",
  "realme",
  "Motorola",
  "Poco",
  "JBL",
  "Sennheiser"
];

export const CATEGORIES = [
  { id: "all", name: "All Acoustics" },
  { id: "over-ear", name: "Over-Ear Headphones" },
  { id: "earbuds", name: "True Wireless Earbuds" },
  { id: "neckbands", name: "Wireless Neckbands" },
  { id: "gaming", name: "Low Latency Gaming" },
  { id: "anc", name: "Active Noise Cancellation" }
];

export const PRODUCTS = [
  {
    id: 1,
    name: "Apple AirPods Max Space Gray",
    brand: "Apple",
    category: "over-ear",
    rating: 4.9,
    reviewsCount: 3120,
    price: 59900,
    originalPrice: 69900,
    badge: "Audiophile Choice",
    inStock: true,
    tagline: "High-fidelity spatial audio, dynamic head tracking, anodized aluminum canopy.",
    specs: { battery: "20 Hours", driver: "40mm Apple Dynamic", connectivity: "Apple H1 Chip", latency: "Ultra-Low" },
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaaA4gPtkl-XVOPj4nr6sDh4-6_vDXZuFeLGkBd2_aCg&s=10",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80"
    ],
    colors: ["#1e293b", "#e2e8f0", "#ef4444"]
  },
  {
    id: 2,
    name: "Sony WH-1000XM5 Studio ANC",
    brand: "Sony",
    category: "anc",
    rating: 4.9,
    reviewsCount: 2840,
    price: 29990,
    originalPrice: 34990,
    badge: "Industry Best ANC",
    inStock: true,
    tagline: "Dual processors V1 & QN1 with 8 microphones for unmatched acoustic isolation.",
    specs: { battery: "30 Hours", driver: "30mm Carbon Fiber", connectivity: "Bluetooth 5.2 / LDAC", latency: "Low" },
    images: [
      "https://static0.pocketnowimages.com/wordpress/wp-content/uploads/styles/xxlarge/public/2022-05/Featured%20Image%20Sony%20WH%201000%20XM5.jpg?w=1600&h=1600&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80"
    ],
    colors: ["#0f172a", "#d4d4d8"]
  },
  {
    id: 3,
    name: "boAt Rockerz 550 Over-Ear",
    brand: "boAt",
    category: "over-ear",
    rating: 4.6,
    reviewsCount: 4520,
    price: 1999,
    originalPrice: 4999,
    badge: "Signature Super Bass",
    inStock: true,
    tagline: "50mm dynamic drivers engineered for heavy punchy sub-bass and ergonomic physical seal.",
    specs: { battery: "20 Hours", driver: "50mm Dynamic Driver", connectivity: "Bluetooth 5.0", latency: "60ms" },
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80"
    ],
    colors: ["#18181b", "#0284c7"]
  },
  {
    id: 4,
    name: "Boult Audio ProBass Ranger",
    brand: "Boult",
    category: "over-ear",
    rating: 4.5,
    reviewsCount: 1890,
    price: 1799,
    originalPrice: 3999,
    badge: "Top Value",
    inStock: true,
    tagline: "Ultra-flexible ergonomic headband with micro-woofers and active deep bass calibration.",
    specs: { battery: "25 Hours", driver: "40mm BoomX Drivers", connectivity: "Bluetooth 5.1", latency: "50ms" },
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx5jUYfsAY6ROzuddcxNKqp2e1SR_qwt7J81H5cPI8ag&s=10",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80"
    ],
    colors: ["#18181b", "#e4e4e7"]
  },
  {
    id: 5,
    name: "Noise Combat Pro RGB Gaming",
    brand: "Noise",
    category: "gaming",
    rating: 4.7,
    reviewsCount: 2210,
    price: 2499,
    originalPrice: 4999,
    badge: "Ultra Low Latency",
    inStock: true,
    tagline: "Dedicated 35ms ultra-low latency game mode with breathing RGB illumination and boom mic.",
    specs: { battery: "40 Hours", driver: "50mm Gaming Driver", connectivity: "2.4GHz + BT 5.3", latency: "35ms" },
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRKxWl2sHUMQEK5O6e9deD9bKOECUAVKUVJpN-XB2h0A&s=10",
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&auto=format&fit=crop&q=80"
    ],
    colors: ["#10b981", "#18181b"]
  },
  {
    id: 6,
    name: "realme TechLife Studio H1",
    brand: "realme",
    category: "anc",
    rating: 4.8,
    reviewsCount: 1430,
    price: 4999,
    originalPrice: 7999,
    badge: "Hi-Res LDAC",
    inStock: true,
    tagline: "43dB Hybrid Active Noise Cancellation backed with 40mm PET diaphragm drivers.",
    specs: { battery: "70 Hours", driver: "40mm Mega Dynamic", connectivity: "LDAC / BT 5.4", latency: "45ms" },
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFb6w4Yv5TUj0F1iDrRa0ST7bUiIuKmEsDn3_voq7jjQ&s=10",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80"
    ],
    colors: ["#d97706", "#1c1917"]
  },
  {
    id: 7,
    name: "Motorola Pulse Escape Studio",
    brand: "Motorola",
    category: "over-ear",
    rating: 4.6,
    reviewsCount: 890,
    price: 3499,
    originalPrice: 6499,
    badge: "Studio Balance",
    inStock: true,
    tagline: "Studio acoustic tuning with noise isolation ear cups and multipoint connectivity.",
    specs: { battery: "30 Hours", driver: "40mm Neodymium", connectivity: "Bluetooth 5.0", latency: "55ms" },
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtoTOgacTcibjPKIWQ-d7jSm1mMjux2uLVdFEXEPT5Kw&s=10",
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&auto=format&fit=crop&q=80"
    ],
    colors: ["#334155", "#f1f5f9"]
  },
  {
    id: 8,
    name: "Poco Bass Pro Studio Wireless",
    brand: "Poco",
    category: "gaming",
    rating: 4.4,
    reviewsCount: 3190,
    price: 2199,
    originalPrice: 4299,
    badge: "Budget King",
    inStock: true,
    tagline: "Engineered for heavy punch, metallic swivel joints, and splash-proof endurance.",
    specs: { battery: "35 Hours", driver: "40mm Deep Bass", connectivity: "Bluetooth 5.3", latency: "50ms" },
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyvWxcsEHdlqF094rbXI3K0GCkj8ryqOKxxf6VwJiZ1w&s=10",
      "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=800&auto=format&fit=crop&q=80"
    ],
    colors: ["#eab308", "#18181b"]
  },
  {
    id: 9,
    name: "JBL Live 660NC Signature Blue",
    brand: "JBL",
    category: "over-ear",
    rating: 4.8,
    reviewsCount: 1670,
    price: 10999,
    originalPrice: 14999,
    badge: "Spatial Signature",
    inStock: true,
    tagline: "JBL Signature Sound with 40mm drivers and Adaptive Noise Cancelling with Smart Ambient.",
    specs: { battery: "50 Hours", driver: "40mm Signature Dynamic", connectivity: "Bluetooth 5.0", latency: "Low" },
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9SfGhz6CaD8XZ195LRU2dehvNjD4UvxV3S4g__4U5kg&s=10",
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=80"
    ],
    colors: ["#0284c7", "#18181b", "#ffffff"]
  },
  {
    id: 10,
    name: "Sennheiser HD 450SE Wireless",
    brand: "Sennheiser",
    category: "over-ear",
    rating: 4.9,
    reviewsCount: 780,
    price: 12990,
    originalPrice: 16990,
    badge: "German Tuning",
    inStock: true,
    tagline: "Superior wireless sound with active noise cancellation and high-quality AAC/aptX codecs.",
    specs: { battery: "30 Hours", driver: "32mm Transducer", connectivity: "aptX Low Latency", latency: "Ultra-Low" },
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWFEiOwAYySBE04zCJFVn9KNyFkFJKCMIWM2fkqFajMw&s=10",
      "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&auto=format&fit=crop&q=80"
    ],
    colors: ["#18181b", "#fafafa"]
  }
];