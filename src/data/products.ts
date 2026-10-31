import { Product, ProductCategory } from '../types';

export const PRODUCTS_DATA: Product[] = [
  // Electronics
  {
    id: 'prod-elec-1',
    name: 'Fidelis BT-XI Noise-Canceling Headphones',
    category: 'Electronics',
    brand: 'Fidelis Sound',
    price: 249.00,
    originalPrice: 299.00,
    rating: 4.9,
    reviewCount: 312,
    image: '/src/assets/images/product_premium_electronics_1793448943489.jpg',
    shortDescription: 'Studio-grade acoustic architecture with active hybrid noise cancellation and 45-hour battery life.',
    fullDescription: 'Crafted for discerning audiophiles and frequent travelers, the Fidelis BT-XI combines custom 40mm neodymium drivers with adaptive active noise cancellation. Featuring plush memory foam earcups wrapped in supple vegan leather, integrated multipoint Bluetooth 5.3, and ultra-fast USB-C fast charging.',
    features: [
      'Hybrid active noise cancellation with transparency mode',
      'Custom 40mm titanium-coated drivers with balanced tuning',
      'Up to 45 hours playtime on single charge (15 min charge gives 5 hrs)',
      'Multipoint pairing for seamless switching between phone and laptop',
      'Ultra-comfortable lightweight aluminum and memory foam build'
    ],
    inStock: true,
    stockCount: 18,
    isFeatured: true,
    tags: ['audio', 'bluetooth', 'headphones', 'wireless', 'music', 'tech']
  },
  {
    id: 'prod-elec-2',
    name: 'Aura Track 4 Smart Health Watch',
    category: 'Electronics',
    brand: 'Aura Labs',
    price: 189.50,
    originalPrice: 219.00,
    rating: 4.8,
    reviewCount: 194,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'All-day biometric tracking, sapphire glass display, and 14-day battery life in a titanium case.',
    fullDescription: 'Monitor your health metrics effortlessly with the Aura Track 4. Built with an aerospace-grade titanium bezel and scratch-resistant sapphire crystal, it measures heart rate variability, SpO2, sleep staging, and activity metrics with clinical precision.',
    features: [
      'Continuous heart rate, SpO2, and skin temperature monitoring',
      'Always-on 1.4-inch AMOLED display with 1000 nits brightness',
      'Water resistant to 50 meters (5 ATM) with swim tracking',
      '14-day standard battery life or 36 hours continuous GPS',
      'Compatible with both iOS and Android'
    ],
    inStock: true,
    stockCount: 24,
    isFeatured: false,
    tags: ['smartwatch', 'wearable', 'fitness', 'gps', 'health', 'tech']
  },
  {
    id: 'prod-elec-3',
    name: 'Keychron Artisan Mechanical Keyboard',
    category: 'Electronics',
    brand: 'Keychron',
    price: 145.00,
    rating: 4.9,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Custom gasket-mounted wireless mechanical keyboard with hot-swappable tactile switches.',
    fullDescription: 'Designed for tactile typing pleasure, featuring an all-aluminum CNC machined case, double-gasket acoustic dampening, custom PBT keycaps, and hot-swappable socket design for effortless personalization.',
    features: [
      'Full CNC anodized aluminum chassis with sound absorbing silicone foam',
      'Hot-swappable PCB supporting 3-pin and 5-pin MX mechanical switches',
      'Bluetooth 5.1 wireless and Type-C wired connectivity',
      'QMK/VIA firmware custom key mapping and RGB ambient backlighting'
    ],
    inStock: true,
    stockCount: 9,
    isFeatured: false,
    tags: ['keyboard', 'mechanical', 'computer', 'desk', 'office', 'tech']
  },

  // Kitchen Items
  {
    id: 'prod-kitch-1',
    name: 'Fellowship Precision Gooseneck Electric Kettle',
    category: 'Kitchen',
    brand: 'Fellowship',
    price: 165.00,
    originalPrice: 185.00,
    rating: 4.9,
    reviewCount: 428,
    image: '/src/assets/images/product_kitchen_appliance_1793448942901.jpg',
    shortDescription: 'Variable temperature control with PID controller and ergonomic balanced walnut wood handle.',
    fullDescription: 'The pinnacle of specialty coffee and tea preparation. Features to-the-degree temperature control, an integrated stopwatch, a balanced pour spout for steady flow rate, and a 60-minute temperature hold mode for pristine extraction every morning.',
    features: [
      'Precision temperature regulation between 135°F and 212°F',
      'LCD digital display showing set and current temperature',
      'Weighted real walnut wood handle for effortless pour balance',
      'Fluted gooseneck spout engineered for consistent drip control',
      'Fast 1200W heating element boils 0.9L in under 3 minutes'
    ],
    inStock: true,
    stockCount: 15,
    isFeatured: true,
    tags: ['kettle', 'coffee', 'tea', 'pour-over', 'kitchen', 'appliance', 'culinary']
  },
  {
    id: 'prod-kitch-2',
    name: 'Damascus Steel 8-inch Chef Santoku Knife',
    category: 'Kitchen',
    brand: 'Miyabi Artisans',
    price: 139.00,
    rating: 4.8,
    reviewCount: 182,
    image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=800&q=80',
    shortDescription: '67-layer Japanese Damascus steel blade with ergonomic stabilized pakkawood octagonal handle.',
    fullDescription: 'Handcrafted by master bladesmiths, this 8-inch Santoku knife delivers surgical cutting precision. The VG-10 high-carbon core holds an ultra-sharp 12-degree edge, resisting corrosion while slicing vegetables, meat, and fish effortlessly.',
    features: [
      'VG-10 Japanese super-steel core clad in 66 Damascus layers',
      '60-62 Rockwell hardness for exceptional edge retention',
      'Traditional Japanese octagonal handle for balanced non-slip grip',
      'Includes handcrafted wooden protective blade sheath (Saya)'
    ],
    inStock: true,
    stockCount: 11,
    isFeatured: false,
    tags: ['knife', 'chef', 'damascus', 'kitchen', 'cooking', 'cutlery']
  },
  {
    id: 'prod-kitch-3',
    name: 'Cast Iron Enamelled Dutch Oven 5.5 Qt',
    category: 'Kitchen',
    brand: 'Nordic Foundry',
    price: 175.00,
    originalPrice: 210.00,
    rating: 4.9,
    reviewCount: 260,
    image: 'https://images.unsplash.com/photo-1584990347449-39b1a5298816?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Heavy-gauge cast iron with dual-layer porcelain enamel for slow roasting, braising, and sourdough.',
    fullDescription: 'A timeless kitchen heirloom that locks in moisture and distributes heat flawlessly across gas, electric, induction, or inside ovens up to 500°F. The tight-fitting lid features internal self-basting spikes for succulent stews.',
    features: [
      '5.5 quart capacity ideal for family meals and sourdough boules',
      'Smooth non-reactive enamel interior that resists staining',
      'Oven safe up to 500°F (260°C) with stainless steel lid knob',
      'Heavy-duty handles for steady transfer from stovetop to table'
    ],
    inStock: true,
    stockCount: 7,
    isFeatured: false,
    tags: ['dutch-oven', 'cast-iron', 'cookware', 'baking', 'pot', 'kitchen']
  },

  // Home & Living
  {
    id: 'prod-home-1',
    name: 'Nordic Ceramic Sculptural Vase & Lumina Lamp',
    category: 'Home & Living',
    brand: 'Atelier Koto',
    price: 119.00,
    originalPrice: 145.00,
    rating: 4.9,
    reviewCount: 188,
    image: '/src/assets/images/product_home_living_decor_1793448942777.jpg',
    shortDescription: 'Hand-sculpted tactile stoneware vase paired with minimal dimmable warm ambient table lamp.',
    fullDescription: 'Add calming warmth and architectural tranquility to any living space or bedside table. The organic ceramic vessel is wheel-thrown and textured by hand, paired alongside a sleek matte charcoal rechargeable LED table lamp with three warm color temperatures.',
    features: [
      'Handcrafted unglazed matte stoneware with wabi-sabi tactile texture',
      'Rechargeable cordless LED lamp with 3000K warm ambient glow',
      'Capacitive touch dimming sensor with 20-hour battery life',
      'Minimalist Scandinavian form designed to elevate bookshelves and credenzas'
    ],
    inStock: true,
    stockCount: 14,
    isFeatured: true,
    tags: ['decor', 'vase', 'lamp', 'lighting', 'ceramic', 'living', 'home']
  },
  {
    id: 'prod-home-2',
    name: 'Belgian Washed Pure Linen Throw Blanket',
    category: 'Home & Living',
    brand: 'Hygge Textile',
    price: 95.00,
    rating: 4.7,
    reviewCount: 142,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
    shortDescription: '100% natural stonewashed European flax linen with hand-fringed hems in oatmeal neutral.',
    fullDescription: 'Woven from authentic French flax and stonewashed for cloud-like softness right out of the box. Breathable in summer and cozy in winter, this versatile 50 x 70 inch throw drape adds subtle luxury to sofas and bedding.',
    features: [
      '100% certified European flax linen with OEKO-TEX Standard 100 certification',
      'Pre-washed and tumbled for relaxed softness that gets softer with every wash',
      'Generous 50" x 70" dimensions with hand-pulled fringed border',
      'Machine washable and naturally hypoallergenic'
    ],
    inStock: true,
    stockCount: 22,
    isFeatured: false,
    tags: ['blanket', 'linen', 'bedding', 'throw', 'cozy', 'textile', 'home']
  },
  {
    id: 'prod-home-3',
    name: 'Minimalist Solid White Oak Wall Clock',
    category: 'Home & Living',
    brand: 'Kronos Woodcraft',
    price: 78.00,
    rating: 4.8,
    reviewCount: 96,
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80',
    shortDescription: '12-inch solid FSC oak dial with silent sweeping German quartz mechanism.',
    fullDescription: 'Crafted from sustainable solid white oak with delicate carved hour markers and matte black aluminum hands. Completely silent continuous sweeping quartz movement prevents irritating clicking noises in quiet bedrooms or home offices.',
    features: [
      '12-inch diameter solid white oak treated with organic Danish oil',
      'Whisper-quiet sweep quartz movement with zero ticking sounds',
      'Recessed keyhole hanger for flush, clean wall mounting',
      'Operates on 1 standard AA battery (included)'
    ],
    inStock: true,
    stockCount: 16,
    isFeatured: false,
    tags: ['clock', 'wood', 'wall-decor', 'minimalist', 'oak', 'home']
  },

  // Toys
  {
    id: 'prod-toy-1',
    name: 'Architectural Wooden Balancing & Building Set',
    category: 'Toys',
    brand: 'Bauhaus Play',
    price: 64.00,
    rating: 4.9,
    reviewCount: 215,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80',
    shortDescription: '48-piece natural beechwood geometric blocks with non-toxic botanical dyes for open-ended play.',
    fullDescription: 'Inspire spatial creativity, balance perception, and engineering intuition in young builders. Smoothly sanded from sustainably harvested German beechwood with water-based eco-friendly pastel stains and tactile curved arches.',
    features: [
      '48 precision-milled architectural arches, cylinders, and slabs',
      'Finished with saliva-resistant, child-safe natural non-toxic plant dyes',
      'Includes solid canvas drawstring storage tote bag',
      'Recommended for ages 3 and up'
    ],
    inStock: true,
    stockCount: 28,
    isFeatured: false,
    tags: ['toys', 'kids', 'wooden-toys', 'montessori', 'building', 'blocks', 'stem']
  },
  {
    id: 'prod-toy-2',
    name: 'Solar Rover STEM Robotics Mechanical Kit',
    category: 'Toys',
    brand: 'RoboTech Labs',
    price: 49.50,
    originalPrice: 59.00,
    rating: 4.8,
    reviewCount: 178,
    image: 'https://images.unsplash.com/photo-1561149877-84d268ba65b8?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Gear-driven solar-powered exploration vehicle with planetary gearbox and modular treads.',
    fullDescription: 'A captivating hands-on introduction to clean solar energy and mechanical engineering. Kids construct a functioning motorized rover using snap-together gears and a high-efficiency mini photovoltaic panel that runs directly under sunlight or flashlight.',
    features: [
      'Complete 190-piece snap-fit engineering assembly with no glue or screws',
      'Direct photovoltaic solar cell motor + backup battery dual-drive mode',
      'Adjustable 4-wheel drive all-terrain suspension system',
      'Comprehensive illustrated full-color STEM educational guide book'
    ],
    inStock: true,
    stockCount: 19,
    isFeatured: false,
    tags: ['toys', 'stem', 'robotics', 'science', 'solar', 'educational', 'engineering']
  },

  // Accessories
  {
    id: 'prod-acc-1',
    name: 'Atelier Full-Grain Leather Bi-Fold Wallet',
    category: 'Accessories',
    brand: 'Tuscan Goods',
    price: 68.00,
    rating: 4.9,
    reviewCount: 240,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Hand-stitched vegetable-tanned Italian leather with RFID protection and slim card sleeves.',
    fullDescription: 'Cut from premium Italian vegetable-tanned cowhide that develops a rich, personalized patina over years of daily carry. Comfortably holds up to 10 cards and flat banknotes with integrated RFID blocking aluminum liner.',
    features: [
      'Certified vegetable-tanned full-grain leather from Tuscany, Italy',
      'Integrated RFID electromagnetic radiation shielding layer',
      'Ultra-slim 8mm profile that avoids pocket bulk',
      'Discreet quick-access thumb slot for your primary payment card'
    ],
    inStock: true,
    stockCount: 30,
    isFeatured: true,
    tags: ['wallet', 'leather', 'accessories', 'edc', 'style', 'fashion']
  },
  {
    id: 'prod-acc-2',
    name: 'Ventoux Polarized Acetate Sunglasses',
    category: 'Accessories',
    brand: 'Ventoux Optics',
    price: 115.00,
    originalPrice: 135.00,
    rating: 4.7,
    reviewCount: 167,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Hand-polished Italian Mazzucchelli acetate frames with polarized category 3 UV400 lenses.',
    fullDescription: 'Timeless mid-century styling meets modern lens technology. Featuring 5-barrel custom barrel hinges, anti-reflective internal coatings, and glare-eliminating polarization that protects your eyes in high sunlight.',
    features: [
      'Handmade Mazzucchelli cellulose acetate in honey tortoise finish',
      '100% UVA/UVB protection with Category 3 polarized sun tint',
      'Sturdy 5-barrel German rivet hinges for long-lasting durability',
      'Includes magnetic hard leather travel case and microfiber cloth'
    ],
    inStock: true,
    stockCount: 21,
    isFeatured: false,
    tags: ['sunglasses', 'eyewear', 'accessories', 'summer', 'fashion']
  },
  {
    id: 'prod-acc-3',
    name: 'Waxed Canvas Heavy-Duty Weekender Duffle',
    category: 'Accessories',
    brand: 'Ridge & Roam',
    price: 155.00,
    rating: 4.9,
    reviewCount: 204,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    shortDescription: '18oz water-repellent paraffin waxed cotton canvas with brass YKK hardware and bridle leather straps.',
    fullDescription: 'The ultimate getaway duffle bag built to withstand decades of rigorous travel. Water-repellent waxed canvas sheds rain and snow while the structured base features protective brass studs.',
    features: [
      '42-liter carry-on compliant capacity with dedicated shoe compartment',
      'Heavyweight 18oz Scottish waxed cotton canvas body',
      'Solid brass YKK #10 two-way zippers with leather pulls',
      'Detachable padded shoulder strap with ergonomic weight distribution'
    ],
    inStock: true,
    stockCount: 12,
    isFeatured: false,
    tags: ['bag', 'duffle', 'travel', 'accessories', 'canvas', 'leather']
  },

  // Shoes
  {
    id: 'prod-shoe-1',
    name: 'Velocity AeroKnit Daily Running Shoes',
    category: 'Shoes',
    brand: 'AeroStride',
    price: 148.00,
    originalPrice: 170.00,
    rating: 4.8,
    reviewCount: 382,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Engineered breathable knit upper with supercritical responsive foam cushioning midsole.',
    fullDescription: 'Engineered for smooth transitions whether putting in morning road miles or walking all afternoon. The engineered seamless knit wraps your foot securely while the high-rebound midsole delivers responsive energy return.',
    features: [
      'Supercritical nitrogen-infused foam provides 72% energy return',
      'One-piece seamless breathable AeroKnit upper with zoned ventilation',
      'Durable rubber outsole with high-traction hexagonal lug pattern',
      'Ortholite eco-hybrid cushioned removable footbed'
    ],
    inStock: true,
    stockCount: 26,
    isFeatured: true,
    tags: ['shoes', 'sneakers', 'running', 'footwear', 'sports', 'athletics']
  },
  {
    id: 'prod-shoe-2',
    name: 'Handmade Calfskin Derby Dress Shoes',
    category: 'Shoes',
    brand: 'Oxford & Sons',
    price: 198.00,
    rating: 4.9,
    reviewCount: 114,
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Goodyear welted French box calfskin derby shoes with Dainite rubber studs sole.',
    fullDescription: 'Meticulously crafted using traditional 200-step Goodyear welt construction. Resoleable for a lifetime of formal occasions, meetings, and evening wear with a burnished natural finish.',
    features: [
      'Full-grain French box calf leather upper with calfskin lining',
      'Traditional Goodyear welt construction allowing multiple resoles',
      'Cork footbed that molds to your unique foot shape over time',
      'Durable British studded rubber sole for all-weather traction'
    ],
    inStock: true,
    stockCount: 8,
    isFeatured: false,
    tags: ['shoes', 'derby', 'leather', 'dress-shoes', 'formal', 'menswear']
  },

  // Sports Equipment
  {
    id: 'prod-sport-1',
    name: 'Hex Pro Rubber Hex Dumbbell Pair (25 lbs)',
    category: 'Sports Equipment',
    brand: 'Apex Fitness',
    price: 89.00,
    rating: 4.9,
    reviewCount: 290,
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Commercial-grade virgin rubber hex dumbbell pair with ergonomic knurled chrome handles.',
    fullDescription: 'Heavy-duty commercial fitness dumbbells engineered with solid cast iron heads welded to contoured chrome-plated handles. The anti-roll hex geometry keeps weights steady between sets.',
    features: [
      'Virgin rubber coating reduces floor impact noise and protects surfaces',
      'Ergonomically contoured handle with medium diamond knurling',
      'Permanently friction-welded head prevents loosening',
      'Sold as a matched pair (2 x 25 lbs / 11.3 kg)'
    ],
    inStock: true,
    stockCount: 17,
    isFeatured: false,
    tags: ['fitness', 'gym', 'dumbbells', 'workout', 'weights', 'sports']
  },
  {
    id: 'prod-sport-2',
    name: 'Pure Cork & Natural Rubber 6mm Yoga Mat',
    category: 'Sports Equipment',
    brand: 'Prana Earth',
    price: 72.00,
    originalPrice: 85.00,
    rating: 4.8,
    reviewCount: 163,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Organic sustainable cork surface with dense non-slip tree rubber base for superior dry/wet grip.',
    fullDescription: 'Naturally antimicrobial and odor-resistant, this 6mm cushioned yoga mat provides stability for delicate joints while cork grip actually increases as you perspire. 100% biodegradable and PVC-free.',
    features: [
      'Organic harvested cork top layer that grips better with moisture',
      '6mm high-density natural tree rubber base for maximum cushioning',
      'Antimicrobial surface naturally inhibits mold and bacteria growth',
      'Includes unbleached organic cotton carrying shoulder strap'
    ],
    inStock: true,
    stockCount: 20,
    isFeatured: false,
    tags: ['yoga', 'mat', 'exercise', 'pilates', 'cork', 'wellness', 'sports']
  },

  // Clothing & Fashion
  {
    id: 'prod-cloth-1',
    name: 'Heavyweight French Terry Crewneck Sweatshirt',
    category: 'Clothing & Fashion',
    brand: 'Standard Goods',
    price: 88.00,
    rating: 4.8,
    reviewCount: 210,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    shortDescription: '450 GSM combed organic cotton terry with flatlock seams and ribbed side gussets.',
    fullDescription: 'A modern staple built like vintage athletic wear. Woven on low-tension looms from heavy 450 GSM combed cotton terry for supreme warmth and durability without shrinking or warping.',
    features: [
      '100% GOTS certified organic long-staple combed cotton',
      'Heavyweight 450 GSM French terry with looped back interior',
      'Durable flatlock seam construction with 1x1 heavy ribbing',
      'Preshrunk fabric tailored for modern unisex relaxed fit'
    ],
    inStock: true,
    stockCount: 35,
    isFeatured: true,
    tags: ['clothing', 'sweatshirt', 'crewneck', 'cotton', 'apparel', 'fashion']
  },
  {
    id: 'prod-cloth-2',
    name: 'Selvedge Japanese Raw Denim Jacket',
    category: 'Clothing & Fashion',
    brand: 'Kurashiki Denim',
    price: 195.00,
    originalPrice: 230.00,
    rating: 4.9,
    reviewCount: 135,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
    shortDescription: '14.5oz shuttle-loomed red-line selvedge denim with custom brass hardware.',
    fullDescription: 'Woven slowly on heritage Toyoda shuttle looms in Okayama, Japan. This raw indigo jacket will crease and fade according to your individual life movements, becoming an irreplaceable second skin.',
    features: [
      '14.5oz unsanforized pure indigo dyed Japanese selvedge denim',
      'Red-line selvedge identification detail on interior placket',
      'Solid antique brass buttons with custom laurel leaf embossing',
      'Two chest flap pockets and two deep interior welt stash pockets'
    ],
    inStock: true,
    stockCount: 10,
    isFeatured: false,
    tags: ['denim', 'jacket', 'selvedge', 'japan', 'fashion', 'outerwear', 'menswear']
  }
];

export const CATEGORIES: ProductCategory[] = [
  'All',
  'Electronics',
  'Kitchen',
  'Home & Living',
  'Toys',
  'Accessories',
  'Shoes',
  'Sports Equipment',
  'Clothing & Fashion'
];

export const BRANDS = Array.from(new Set(PRODUCTS_DATA.map(p => p.brand))).sort();
