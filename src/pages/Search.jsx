import { Clock, Search as SearchIcon, SlidersHorizontal, Star, Users } from 'lucide-react';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { MenuContext } from '../context/MenuContext';
import './Search.css'; // Your new CSS file

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    rating: '',
    dietary: '' // 'veg' or 'non-veg'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  const { addToCart } = useContext(CartContext);
  const { menuItems } = useContext(MenuContext);

  const categories = useMemo(() => [...new Set(menuItems.map(item => item.type))], [menuItems]);

  const performSearch = useCallback(() => {
    setIsLoading(true);

    let filtered = menuItems.filter(item => {
      const isAvailable = (item.status || 'available') === 'available';

      const matchesQuery = !searchQuery || 
                           item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = !filters.category || item.type === filters.category;
      
      let matchesDietary = true;
      if (filters.dietary) {
        matchesDietary = filters.dietary === 'veg' ? item.isVeg : !item.isVeg;
      }
      
      let matchesPrice = true;
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        matchesPrice = max ? (item.price >= min && item.price <= max) : (item.price >= min);
      }
      
      const matchesRating = !filters.rating || item.rating >= parseFloat(filters.rating);
      
      return isAvailable && matchesQuery && matchesCategory && matchesDietary && matchesPrice && matchesRating;
    });
    
    switch (sortBy) {
      case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
      case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
      case 'popularity': filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)); break;
      default: break;
    }
    
    setSearchResults(filtered);
    // Simulate loading for better UX
    setTimeout(() => setIsLoading(false), 500);
  }, [searchQuery, filters, sortBy, menuItems]);

  useEffect(() => {
    performSearch();
  }, [performSearch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams(searchQuery.trim() ? { q: searchQuery.trim() } : {});
    performSearch();
  };

  const clearFilters = () => {
    setFilters({ category: '', priceRange: '', rating: '', dietary: '' });
  };

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const renderStars = (rating) => (
    Array.from({ length: 5 }, (_, i) => (
      <Star key={i} size={16} className={i < Math.round(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
    ))
  );

  return (
    <div className="search-page">
      <div className="search-header">
        <div className="container">
          <div className="search-header-content">
            <h1>Search Our Menu</h1>
            <p>Find your perfect dish from our extensive menu</p>
          </div>
        </div>
      </div>

      <div className="container search-container">
        <div className="search-bar-section">
          <form onSubmit={handleSearchSubmit} className="search-form-main">
            <div className="search-input-wrapper">
              <SearchIcon size={20} className="search-icon" />
              <input type="text" placeholder="Search for dishes, e.g., 'Biryani'..."
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input-main"
              />
              <button type="submit" className="search-button">Search</button>
            </div>
          </form>
          <div className="search-actions">
            <button onClick={() => setShowFilters(!showFilters)} className={`filter-toggle ${showFilters ? 'active' : ''}`}>
              <SlidersHorizontal size={18} /> Filters
            </button>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
              <option value="relevance">Sort by: Relevance</option>
              <option value="rating">Sort by: Rating</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popularity">Sort by: Popularity</option>
            </select>
          </div>
        </div>

        <div className="search-content">
          <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
            <div className="filters-header">
              <h3>Filters</h3>
              <button onClick={clearFilters} className="clear-filters">Clear All</button>
            </div>
            <div className="filter-group">
              <h4>Category</h4>
              <select value={filters.category} onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))} className="filter-select">
                <option value="">All Categories</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <h4>Dietary</h4>
              <select value={filters.dietary} onChange={(e) => setFilters(prev => ({ ...prev, dietary: e.target.value }))} className="filter-select">
                <option value="">All</option>
                <option value="veg">Vegetarian</option>
                <option value="non-veg">Non-Vegetarian</option>
              </select>
            </div>
            <div className="filter-group">
              <h4>Price Range (₹)</h4>
              <select value={filters.priceRange} onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))} className="filter-select">
                <option value="">Any Price</option>
                <option value="0-150">Under ₹150</option>
                <option value="150-300">₹150 - ₹300</option>
                <option value="300-">Above ₹300</option>
              </select>
            </div>
            <div className="filter-group">
              <h4>Minimum Rating</h4>
              <select value={filters.rating} onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value }))} className="filter-select">
                <option value="">Any Rating</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
              </select>
            </div>
          </aside>

          <main className="search-results">
            {isLoading ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Searching for delicious dishes...</p>
              </div>
            ) : searchResults.length > 0 ? (
              <>
                <div className="results-header">
                  <h2>Found {searchResults.length} results for "{searchQuery || 'all dishes'}"</h2>
                </div>
                <div className="results-grid">
                  {searchResults.map(item => (
                    <div key={item.id} className="result-card">
                      <div className="result-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="result-content">
                        <div className="result-header">
                          <h3>{item.name}</h3>
                          <div className="result-rating">{renderStars(item.rating)}</div>
                        </div>
                        <p className="result-description">{item.description}</p>
                        <div className="result-meta">
                          <div className="meta-item"><Clock size={14} /><span>{item.cookTime}</span></div>
                          <div className="meta-item"><Users size={14} /><span>{item.type}</span></div>
                        </div>
                        <div className="result-tags">
                          <span className={`tag ${item.isVeg ? 'vegetarian' : 'nonveg'}`}>{item.isVeg ? 'Vegetarian' : 'Non-Veg'}</span>
                          {item.isSpicy && <span className="tag spice-hot">Spicy</span>}
                        </div>
                        <div className="result-footer">
                          <div className="price">₹{item.price}</div>
                          <button onClick={() => handleAddToCart(item)} className="add-to-cart-btn">Add to Cart</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h3>No results found</h3>
                <p>Try adjusting your search terms or filters.</p>
                <button onClick={clearFilters} className="clear-filters-btn">Clear All Filters</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;