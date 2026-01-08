import { Search } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import MenuItemCard from '../components/menu/MenuItemCard';
import './Menu.css';

// Menu gallery assets
import Slide1 from '../Assets/MENU/Slide1.PNG';
import Slide2 from '../Assets/MENU/Slide2.PNG';
import Slide3 from '../Assets/MENU/Slide3.PNG';
import Slide4 from '../Assets/MENU/Slide4.PNG';
import Slide5 from '../Assets/MENU/Slide5.PNG';

/* =========================
   ALL MENU ITEMS (INLINE)
========================= */

let id = 1;

const menuItemsData = [
  /* ================= SALADS ================= */
  {
    id: id++,
    name: 'Green Salad',
    price: 60,
    description: 'Fresh green salad',
    image: 'https://images.unsplash.com/photo-1551248429-40974011e51c?w=400&h=400&fit=crop',
    rating: 4.2,
    reviewCount: 89,
    cookTime: '5 min',
    isVeg: true,
    isSpicy: false,
    tags: [],
    category: 'salads'
  },
  {
    id: id++,
    name: 'Chicken Salad',
    price: 200,
    description: 'Grilled chicken salad',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=400&fit=crop',
    rating: 4.4,
    reviewCount: 92,
    cookTime: '15 min',
    isVeg: false,
    isSpicy: false,
    tags: [],
    category: 'salads'
  },

  /* ================= SOUPS ================= */
  {
    id: id++,
    name: 'Hot & Sour Soup',
    price: 160,
    description: 'Spicy hot and sour soup',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=400&fit=crop',
    rating: 4.5,
    reviewCount: 167,
    cookTime: '15 min',
    isVeg: true,
    isSpicy: true,
    tags: [],
    category: 'soups'
  },
  {
    id: id++,
    name: 'Chicken Manchow Soup',
    price: 170,
    description: 'Classic chicken manchow soup',
    image: 'https://images.unsplash.com/photo-1547595354-60d801a23528?w=400&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 198,
    cookTime: '18 min',
    isVeg: false,
    isSpicy: true,
    tags: ['Popular'],
    category: 'soups'
  },

  /* ================= CHINESE FRIED RICE ================= */
  {
    id: id++,
    name: 'Veg Fried Rice',
    price: 140,
    description: 'Vegetable fried rice',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=400&fit=crop',
    rating: 4.1,
    reviewCount: 189,
    cookTime: '15 min',
    isVeg: true,
    isSpicy: false,
    tags: [],
    category: 'fried-rice'
  },
  {
    id: id++,
    name: 'Chicken Fried Rice',
    price: 190,
    description: 'Chicken fried rice',
    image: 'https://images.unsplash.com/photo-1581184953963-d15972933db1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fENoaWNrZW4lMjBmcmllZCUyMHJpY2V8ZW58MHx8MHx8fDA%3D?w=400&h=400&fit=crop',
    rating: 4.5,
    reviewCount: 298,
    cookTime: '18 min',
    isVeg: false,
    isSpicy: true,
    tags: ['Bestseller'],
    category: 'fried-rice'
  },

  /* ================= BIRIYANI ================= */
  {
    id: id++,
    name: 'Chicken Biriyani',
    price: 200,
    description: 'Traditional chicken biriyani',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 789,
    cookTime: '35 min',
    isVeg: false,
    isSpicy: true,
    tags: ['Popular'],
    category: 'biriyani'
  },
  {
    id: id++,
    name: 'Mutton Biriyani',
    price: 300,
    description: 'Classic mutton biriyani',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 534,
    cookTime: '45 min',
    isVeg: false,
    isSpicy: true,
    tags: [],
    category: 'biriyani'
  },

  /* ================= INDIAN CHICKEN GRAVY ================= */
  {
    id: id++,
    name: 'Chicken Kosha',
    price: 220,
    description: 'Bengali chicken kosha',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 345,
    cookTime: '28 min',
    isVeg: false,
    isSpicy: true,
    tags: ['Popular'],
    category: 'indian-chicken'
  },
  {
    id: id++,
    name: 'Butter Chicken',
    price: 280,
    description: 'Creamy butter chicken',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 378,
    cookTime: '30 min',
    isVeg: false,
    isSpicy: false,
    tags: ['Bestseller'],
    category: 'indian-chicken'
  },

  /* ================= KEBABS ================= */
  {
    id: id++,
    name: 'Reshmi Kebab',
    price: 250,
    description: 'Soft creamy chicken kebab',
    image: 'https://plus.unsplash.com/premium_photo-1661310019346-4cb563a19aec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8a2FiYWJ8ZW58MHx8MHx8fDA%3D?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 423,
    cookTime: '26 min',
    isVeg: false,
    isSpicy: false,
    tags: ['Chef Special'],
    category: 'kebab'
  },
  {
    id: id++,
    name: 'Tikka Kebab',
    price: 230,
    description: 'Classic chicken tikka kebab',
    image: 'https://plus.unsplash.com/premium_photo-1661310070271-8dd22feaf3a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2FiYWJ8ZW58MHx8MHx8fDA%3D?w=400&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 389,
    cookTime: '25 min',
    isVeg: false,
    isSpicy: true,
    tags: ['Popular'],
    category: 'kebab'
  }
];

/* =========================
   CATEGORIES (STATIC)
========================= */

const categories = [
  { key: 'salads', name: 'Salads' },
  { key: 'soups', name: 'Soups' },
  { key: 'fried-rice', name: 'Fried Rice' },
  { key: 'biriyani', name: 'Biriyani' },
  { key: 'indian-chicken', name: 'Indian Chicken' },
  { key: 'kebab', name: 'Kebab' }
];

/* =========================
   MENU PAGE
========================= */

const MenuPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [likedItems, setLikedItems] = useState(new Set());

  const filteredItems = useMemo(() => {
    let items = [...menuItemsData];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      items = items.filter(item =>
        item.name.toLowerCase().includes(term)
      );
    }

    if (selectedCategory !== 'all') {
      items = items.filter(item => item.category === selectedCategory);
    }

    switch (sortBy) {
      case 'price-low':
        return items.sort((a, b) => a.price - b.price);
      case 'price-high':
        return items.sort((a, b) => b.price - a.price);
      case 'rating':
        return items.sort((a, b) => b.rating - a.rating);
      default:
        return items.sort(
          (a, b) =>
            (b.tags.includes('Bestseller') ? 1 : 0) -
            (a.tags.includes('Bestseller') ? 1 : 0)
        );
    }
  }, [searchTerm, selectedCategory, sortBy]);

  const toggleLike = useCallback(id => {
    setLikedItems(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  return (
    <div className="menu-page">
      <header className="menu-header">
        <h1>Our Exquisite Menu</h1>
        <p>Discover a world of flavors crafted with passion.</p>
      </header>

      {/* Menu Gallery Banner */}
      <div className="menu-banner">
        <div className="menu-banner-inner container">
          <div className="menu-banner-heading">
            <h3 className="menu-banner-title">Daawat-e-Ishq Menu</h3>
            <p className="menu-banner-subtitle">Explore our full menu — authentic flavors and chef specials</p>
          </div>

          <div className="menu-banner-gallery" role="list" aria-label="Daawat-e-Ishq menu images">
            {[Slide1, Slide2, Slide3, Slide4, Slide5].map((src, idx) => (
              <div key={idx} className="menu-banner-item" role="listitem">
                <img src={src} alt={`Daawat-e-Ishq menu ${idx + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="menu-controls">
          <div className="search-box">
            <Search size={20} className="search-icon" />
            <input
              placeholder="Search for your favorite dish..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="sort-select">
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="popular">Sort by Popularity</option>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <nav className="category-filters">
          <button
            className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Items
          </button>

          {categories.map(cat => (
            <button
              key={cat.key}
              className={`category-btn ${selectedCategory === cat.key ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.key)}
            >
              {cat.name}
            </button>
          ))}
        </nav>

        <div className="menu-grid">
          {filteredItems.map(item => (
            <MenuItemCard
              key={item.id}
              item={item}
              isLiked={likedItems.has(item.id)}
              onToggleLike={toggleLike}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
