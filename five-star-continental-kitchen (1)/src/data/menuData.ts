import { MenuItem, CategoryType, PromoCode, Review } from '../types';

export interface CategoryInfo {
  id: CategoryType;
  title: string;
  tagline: string;
  image: string;
  description: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'Pasta',
    title: 'Pasta',
    tagline: 'Classic & Modern',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281699?auto=format&fit=crop&w=600&q=80',
    description: 'Handcrafted artisan pastas bathed in velvety, authentic Italian sauces.'
  },
  {
    id: 'Pizza',
    title: 'Pizza',
    tagline: 'Wood-fired Goodness',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    description: 'Crisp sourdough crust baked at 450°C with imported San Marzano tomatoes.'
  },
  {
    id: 'Steaks',
    title: 'Steaks',
    tagline: 'Grilled to Perfection',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    description: 'Prime cut Black Angus & Wagyu aged to perfection and flame-seared.'
  },
  {
    id: 'Burgers',
    title: 'Burgers',
    tagline: 'Bold & Satisfying',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    description: 'Stacked gourmet brioche burgers infused with house-cured bacon and cheeses.'
  },
  {
    id: 'Salads',
    title: 'Salads',
    tagline: 'Fresh & Wholesome',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    description: 'Vibrant organic greens, artisanal burrata, and zesty house-made vinaigrettes.'
  },
  {
    id: 'Desserts',
    title: 'Desserts',
    tagline: 'A Sweet Finish',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    description: 'Decadent chocolate ganaches, creamy brûlées, and artisanal European patisserie.'
  }
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // Signature dishes from screenshot
  {
    id: 'dish-1',
    name: 'Truffle Alfredo Pasta',
    category: 'Pasta',
    price: 520,
    description: 'Fettuccine tossed in rich white truffle cream, aged Parmigiano Reggiano, cracked black pepper, and wild forest mushrooms.',
    tagline: 'Rich, Creamy, Irresistible',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 142,
    calories: 680,
    prepTime: '20-25 mins',
    allergens: ['Dairy', 'Gluten'],
    ingredients: ['Fresh Egg Fettuccine', 'Italian White Truffle Oil', 'Heavy Cream', '24-month Parmigiano-Reggiano', 'Portobello Mushrooms'],
    spiceLevel: 'None',
    isSignature: true,
    isPopular: true,
    inStock: true
  },
  {
    id: 'dish-2',
    name: 'Grilled Salmon',
    category: 'Steaks',
    price: 790,
    description: 'Norwegian salmon fillet seared with Meyer lemon herb butter, served alongside grilled tender asparagus and roasted baby potatoes.',
    tagline: 'Fresh & Flavorful',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 98,
    calories: 590,
    prepTime: '25-30 mins',
    allergens: ['Fish', 'Dairy'],
    ingredients: ['Atlantic Salmon', 'Clarified Herb Butter', 'Fresh Dill', 'Asparagus Spears', 'Organic Lemon'],
    spiceLevel: 'Mild',
    isSignature: true,
    isPopular: true,
    inStock: true
  },
  {
    id: 'dish-3',
    name: 'Classic Margherita',
    category: 'Pizza',
    price: 480,
    description: 'Authentic 72-hour cold-fermented dough topped with sweet San Marzano tomato reduction, fresh Fior di Latte mozzarella, and Genovese basil.',
    tagline: 'Wood-fired Perfection',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 215,
    calories: 740,
    prepTime: '15-20 mins',
    allergens: ['Dairy', 'Gluten'],
    ingredients: ['Sourdough Base', 'DOP San Marzano Tomatoes', 'Fresh Buffalo Mozzarella', 'Extra Virgin Olive Oil', 'Fresh Sweet Basil'],
    spiceLevel: 'None',
    isSignature: true,
    isPopular: true,
    inStock: true
  },
  {
    id: 'dish-4',
    name: 'Beef Tenderloin Steak',
    category: 'Steaks',
    price: 990,
    description: '250g Prime grain-fed Australian tenderloin cut, chargrilled to your preferred temperature, glazed with truffle demi-glace and garlic mash.',
    tagline: 'Juicy & Succulent',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: 180,
    calories: 820,
    prepTime: '25-35 mins',
    allergens: ['Dairy'],
    ingredients: ['Angus Beef Tenderloin', 'Rosemary Butter', 'Sea Salt Flakes', 'Red Wine Reduction', 'Yukon Gold Mash'],
    spiceLevel: 'Mild',
    isSignature: true,
    isPopular: true,
    inStock: true
  },
  {
    id: 'dish-5',
    name: 'BBQ Chicken Burger',
    category: 'Burgers',
    price: 460,
    description: 'Crispy marinated chicken breast glazed in smoky Tennessee BBQ glaze, melted sharp cheddar, tangy coleslaw in a golden toasted brioche bun.',
    tagline: 'Bold in Every Bite',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 130,
    calories: 780,
    prepTime: '15-20 mins',
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    ingredients: ['Buttermilk Fried Chicken', 'Smoky Bourbon BBQ Sauce', 'Aged Cheddar', 'Pickled Jalapeños', 'Artisan Brioche'],
    spiceLevel: 'Medium',
    isSignature: true,
    isPopular: true,
    inStock: true
  },
  {
    id: 'dish-6',
    name: 'Chocolate Lava Cake',
    category: 'Desserts',
    price: 350,
    description: 'Warm Belgian 70% dark chocolate souffle cake with a molten truffle center, dusted with gold shimmer and accompanied by artisanal vanilla bean gelato.',
    tagline: 'A Decadent Finish',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 220,
    calories: 520,
    prepTime: '15 mins',
    allergens: ['Dairy', 'Eggs', 'Gluten'],
    ingredients: ['Callebaut Dark Chocolate', 'French Butter', 'Madagascar Vanilla Bean Gelato', 'Raspberry Coulis'],
    spiceLevel: 'None',
    isSignature: true,
    isPopular: true,
    inStock: true
  },

  // Additional Gourmet Items for full functional menu
  {
    id: 'dish-7',
    name: 'Seafood Saffron Linguine',
    category: 'Pasta',
    price: 2450,
    description: 'Tiger prawns, blue mussels, and calamari simmered in a delicate white wine and Iranian saffron emulsion with cherry tomatoes.',
    tagline: 'Oceanic Elegance',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 76,
    calories: 640,
    prepTime: '20-25 mins',
    allergens: ['Shellfish', 'Gluten', 'Dairy'],
    ingredients: ['Bronze-die Linguine', 'Black Tiger Prawns', 'Calamari', 'Saffron Threads', 'Pinot Grigio'],
    spiceLevel: 'Mild',
    isSignature: false,
    isPopular: true,
    inStock: true
  },
  {
    id: 'dish-8',
    name: 'Truffle Wild Mushroom Pizza',
    category: 'Pizza',
    price: 1850,
    description: 'Bianca mozzarella base, fontina cheese, sautéed king oyster and cremini mushrooms, finished with fresh thyme and white truffle oil drizzle.',
    tagline: 'Earthy & Aromatic',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 94,
    calories: 760,
    prepTime: '15-20 mins',
    allergens: ['Dairy', 'Gluten'],
    ingredients: ['Wood-Fired Crust', 'Fontina Cheese', 'King Oyster Mushrooms', 'Truffle Infusion', 'Baby Arugula'],
    spiceLevel: 'None',
    isSignature: false,
    isPopular: true,
    inStock: true
  },
  {
    id: 'dish-9',
    name: 'Rosemary Garlic Lamb Chops',
    category: 'Steaks',
    price: 3250,
    description: 'Triple-cut New Zealand lamb chops seared with garlic herb crust, minted pea purée, and balsamic port wine reduction.',
    tagline: 'Tender & Fragrant',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 88,
    calories: 790,
    prepTime: '25-30 mins',
    allergens: ['Dairy'],
    ingredients: ['NZ Lamb Chops', 'Fresh Rosemary', 'Confit Garlic', 'Sweet Pea Puree', 'Balsamic Glaze'],
    spiceLevel: 'Mild',
    isSignature: true,
    isPopular: true,
    inStock: true
  },
  {
    id: 'dish-10',
    name: 'The Five Star Wagyu Truffle Burger',
    category: 'Burgers',
    price: 1980,
    description: 'A5 Wagyu beef patty, caramelized onion relish, black truffle aioli, melted Gruyère, and rocket leaves in a buttered brioche bun.',
    tagline: 'The Ultimate Luxury Burger',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: 165,
    calories: 910,
    prepTime: '20 mins',
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    ingredients: ['Minced A5 Wagyu', 'Swiss Gruyère', 'Black Truffle Aioli', 'Brioche Bun', 'Beer-battered Onion Rings'],
    spiceLevel: 'None',
    isSignature: true,
    isPopular: true,
    inStock: true
  },
  {
    id: 'dish-11',
    name: 'Mediterranean Burrata & Heirloom Salad',
    category: 'Salads',
    price: 1350,
    description: 'Whole 150g pugliese burrata, rainbow heirloom tomatoes, basil pesto drizzle, toasted pine nuts, and aged balsamic reduction.',
    tagline: 'Creamy & Sun-Drenched',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23049?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 112,
    calories: 420,
    prepTime: '10-15 mins',
    allergens: ['Dairy', 'Nuts'],
    ingredients: ['Imported Burrata', 'Heirloom Tomatoes', 'Genovese Basil', 'Toasted Pine Nuts', '25-Year Modena Balsamic'],
    spiceLevel: 'None',
    isSignature: false,
    isPopular: true,
    inStock: true
  },
  {
    id: 'dish-12',
    name: 'Madagascar Vanilla Bean Crème Brûlée',
    category: 'Desserts',
    price: 890,
    description: 'Velvety chilled egg custard infused with real Madagascar bourbon vanilla beans, topped with a brittle caramelized turbinado sugar crust.',
    tagline: 'Silky, Crackling Perfection',
    image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 140,
    calories: 480,
    prepTime: '10 mins',
    allergens: ['Dairy', 'Eggs'],
    ingredients: ['Heavy Cream', 'Bourbon Vanilla Bean', 'Egg Yolks', 'Caramelized Sugar', 'Fresh Berries'],
    spiceLevel: 'None',
    isSignature: false,
    isPopular: true,
    inStock: true
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    authorName: 'Rahul Mehta',
    authorEmail: 'rahul.m@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    dishName: 'Truffle Alfredo Pasta',
    comment: 'Amazing food, beautiful ambience and excellent service. The pasta and steak were outstanding!',
    date: 'Yesterday',
    isApproved: true,
    source: 'Verified Guest'
  },
  {
    id: 'rev-2',
    authorName: 'Priya Sharma',
    authorEmail: 'priya.s@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    dishName: 'Grilled Salmon',
    comment: 'Perfect place for a date night. The food, ambience and staff everything was top-notch!',
    date: '3 days ago',
    isApproved: true,
    source: 'Verified Guest'
  },
  {
    id: 'rev-3',
    authorName: 'Amit Kapoor',
    authorEmail: 'amit.k@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    dishName: 'Beef Tenderloin Steak',
    comment: 'One of the best continental restaurants in the city. Highly recommended!',
    date: '1 week ago',
    isApproved: true,
    source: 'Verified Guest'
  },
  {
    id: 'rev-4',
    authorName: 'Zara Malik',
    authorEmail: 'zara.m@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    dishName: 'Chocolate Lava Cake',
    comment: 'The molten lava cake was pure heaven, and the dining room lighting creates such a luxurious atmosphere.',
    date: '2 weeks ago',
    isApproved: true,
    source: 'Verified Guest'
  }
];

export const INITIAL_PROMO_CODES: PromoCode[] = [
  {
    code: 'FIVESTAR15',
    discountPercent: 15,
    maxDiscount: 1500,
    minOrder: 2000,
    description: '15% OFF for luxury dining experiences',
    isActive: true
  },
  {
    code: 'WELCOME10',
    discountPercent: 10,
    maxDiscount: 1000,
    minOrder: 1500,
    description: '10% Welcome gift on your order',
    isActive: true
  },
  {
    code: 'CHEFGIFT',
    discountPercent: 20,
    maxDiscount: 2500,
    minOrder: 3500,
    description: '20% Chef VIP dining discount',
    isActive: true
  }
];
