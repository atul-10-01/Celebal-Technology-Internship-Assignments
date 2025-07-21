export const categories = [
  { id: 1, name: 'Electronics', slug: 'electronics' },
  { id: 2, name: 'Clothing', slug: 'clothing' },
  { id: 3, name: 'Home & Garden', slug: 'home-garden' },
  { id: 4, name: 'Sports', slug: 'sports' },
  { id: 5, name: 'Books', slug: 'books' },
  { id: 6, name: 'Beauty', slug: 'beauty' },
];

export const products = [
  // Electronics
  {
    id: 1,
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with advanced camera system and A17 Pro chip',
    price: 999,
    originalPrice: 1099,
    category: 'electronics',
    categoryId: 1,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
    rating: 4.8,
    reviews: 324,
    inStock: true,
    brand: 'Apple',
    tags: ['smartphone', 'ios', 'camera'],
    features: ['5G Ready', 'Wireless Charging', 'Water Resistant']
  },
  {
    id: 2,
    name: 'Samsung 4K Smart TV',
    description: '55-inch QLED 4K Smart TV with HDR and built-in streaming',
    price: 799,
    originalPrice: 899,
    category: 'electronics',
    categoryId: 1,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500',
    rating: 4.6,
    reviews: 156,
    inStock: true,
    brand: 'Samsung',
    tags: ['tv', '4k', 'smart'],
    features: ['4K Resolution', 'Smart TV', 'HDR Support']
  },
  {
    id: 3,
    name: 'MacBook Pro M3',
    description: 'Powerful laptop with M3 chip, perfect for professionals',
    price: 1599,
    originalPrice: 1799,
    category: 'electronics',
    categoryId: 1,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    rating: 4.9,
    reviews: 89,
    inStock: true,
    brand: 'Apple',
    tags: ['laptop', 'apple', 'professional'],
    features: ['M3 Chip', 'Retina Display', 'All-day Battery']
  },
  {
    id: 4,
    name: 'Sony WH-1000XM5',
    description: 'Premium noise-canceling wireless headphones',
    price: 349,
    originalPrice: 399,
    category: 'electronics',
    categoryId: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    rating: 4.7,
    reviews: 267,
    inStock: true,
    brand: 'Sony',
    tags: ['headphones', 'wireless', 'noise-canceling'],
    features: ['Noise Canceling', 'Wireless', '30hr Battery']
  },

  // Clothing
  {
    id: 5,
    name: 'Premium Cotton T-Shirt',
    description: 'Comfortable 100% organic cotton t-shirt in various colors',
    price: 29,
    originalPrice: 39,
    category: 'clothing',
    categoryId: 2,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    rating: 4.4,
    reviews: 143,
    inStock: true,
    brand: 'EcoWear',
    tags: ['t-shirt', 'cotton', 'casual'],
    features: ['Organic Cotton', 'Machine Washable', 'Various Colors']
  },
  {
    id: 6,
    name: 'Designer Jeans',
    description: 'Slim-fit designer jeans with premium denim',
    price: 89,
    originalPrice: 129,
    category: 'clothing',
    categoryId: 2,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    rating: 4.5,
    reviews: 201,
    inStock: true,
    brand: 'DenimCo',
    tags: ['jeans', 'denim', 'casual'],
    features: ['Slim Fit', 'Premium Denim', 'Fade Resistant']
  },
  {
    id: 7,
    name: 'Winter Jacket',
    description: 'Waterproof winter jacket with thermal insulation',
    price: 159,
    originalPrice: 199,
    category: 'clothing',
    categoryId: 2,
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500',
    rating: 4.6,
    reviews: 87,
    inStock: true,
    brand: 'WinterWear',
    tags: ['jacket', 'winter', 'waterproof'],
    features: ['Waterproof', 'Thermal Insulation', 'Wind Resistant']
  },
  {
    id: 8,
    name: 'Running Shoes',
    description: 'Lightweight running shoes with advanced cushioning',
    price: 119,
    originalPrice: 149,
    category: 'clothing',
    categoryId: 2,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    rating: 4.7,
    reviews: 312,
    inStock: true,
    brand: 'SportMax',
    tags: ['shoes', 'running', 'athletic'],
    features: ['Lightweight', 'Advanced Cushioning', 'Breathable']
  },

  // Home & Garden
  {
    id: 9,
    name: 'Smart Coffee Maker',
    description: 'WiFi-enabled coffee maker with app control and timer',
    price: 179,
    originalPrice: 219,
    category: 'home-garden',
    categoryId: 3,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500',
    rating: 4.3,
    reviews: 98,
    inStock: true,
    brand: 'BrewMaster',
    tags: ['coffee', 'smart', 'kitchen'],
    features: ['WiFi Enabled', 'App Control', 'Timer Function']
  },
  {
    id: 10,
    name: 'Indoor Plant Collection',
    description: 'Set of 3 low-maintenance indoor plants with decorative pots',
    price: 49,
    originalPrice: 69,
    category: 'home-garden',
    categoryId: 3,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500',
    rating: 4.5,
    reviews: 167,
    inStock: true,
    brand: 'GreenLife',
    tags: ['plants', 'indoor', 'decoration'],
    features: ['Low Maintenance', 'Air Purifying', 'Decorative Pots']
  },

  // Sports
  {
    id: 11,
    name: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat with alignment guides and carrying strap',
    price: 39,
    originalPrice: 59,
    category: 'sports',
    categoryId: 4,
    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=500',
    rating: 4.6,
    reviews: 234,
    inStock: true,
    brand: 'YogaPro',
    tags: ['yoga', 'fitness', 'exercise'],
    features: ['Non-slip Surface', 'Alignment Guides', 'Carrying Strap']
  },
  {
    id: 12,
    name: 'Adjustable Dumbbells',
    description: 'Space-saving adjustable dumbbells set (5-50 lbs each)',
    price: 299,
    originalPrice: 399,
    category: 'sports',
    categoryId: 4,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
    rating: 4.8,
    reviews: 156,
    inStock: true,
    brand: 'FitMax',
    tags: ['dumbbells', 'weights', 'fitness'],
    features: ['Adjustable Weight', 'Space Saving', 'Quick Lock System']
  },

  // Books
  {
    id: 13,
    name: 'The Art of Programming',
    description: 'Comprehensive guide to modern programming practices',
    price: 39,
    originalPrice: 49,
    category: 'books',
    categoryId: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
    rating: 4.7,
    reviews: 89,
    inStock: true,
    brand: 'TechBooks',
    tags: ['programming', 'technology', 'education'],
    features: ['Latest Practices', 'Code Examples', 'Expert Authors']
  },
  {
    id: 14,
    name: 'Mindfulness Journal',
    description: 'Daily mindfulness and gratitude journal with guided prompts',
    price: 19,
    originalPrice: 29,
    category: 'books',
    categoryId: 5,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500',
    rating: 4.4,
    reviews: 167,
    inStock: true,
    brand: 'MindfulPress',
    tags: ['journal', 'mindfulness', 'self-help'],
    features: ['Guided Prompts', 'Quality Paper', 'Compact Size']
  },

  // Beauty
  {
    id: 15,
    name: 'Skincare Routine Set',
    description: 'Complete skincare routine with cleanser, serum, and moisturizer',
    price: 79,
    originalPrice: 99,
    category: 'beauty',
    categoryId: 6,
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500',
    rating: 4.5,
    reviews: 289,
    inStock: true,
    brand: 'GlowSkin',
    tags: ['skincare', 'beauty', 'routine'],
    features: ['Complete Routine', 'Natural Ingredients', 'All Skin Types']
  },
  {
    id: 16,
    name: 'Professional Makeup Brush Set',
    description: 'High-quality makeup brush set with travel case',
    price: 59,
    originalPrice: 89,
    category: 'beauty',
    categoryId: 6,
    image: 'https://images.unsplash.com/photo-1583241800481-9c2e5d0f2d8b?w=500',
    rating: 4.6,
    reviews: 134,
    inStock: true,
    brand: 'BeautyPro',
    tags: ['makeup', 'brushes', 'professional'],
    features: ['Professional Quality', 'Travel Case', 'Synthetic Bristles']
  }
];

export const getProductsByCategory = (categorySlug) => {
  return products.filter(product => product.category === categorySlug);
};

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    product.brand.toLowerCase().includes(searchTerm)
  );
};

export const filterProducts = (products, filters) => {
  let filtered = [...products];

  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(product => product.category === filters.category);
  }

  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    filtered = filtered.filter(product => product.price >= min && product.price <= max);
  }

  if (filters.brand && filters.brand.length > 0) {
    filtered = filtered.filter(product => filters.brand.includes(product.brand));
  }

  if (filters.rating) {
    filtered = filtered.filter(product => product.rating >= filters.rating);
  }

  if (filters.inStock) {
    filtered = filtered.filter(product => product.inStock);
  }

  return filtered;
};

export const sortProducts = (products, sortBy) => {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'reviews':
      return sorted.sort((a, b) => b.reviews - a.reviews);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
};
