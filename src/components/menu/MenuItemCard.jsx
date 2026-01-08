import { Clock, Flame, Heart, ShoppingBag, Star } from 'lucide-react';
import { memo, useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const MenuItemCard = memo(({ item, isLiked, onToggleLike }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card click event
    addToCart(item);
  };

  return (
    <div className="menu-card">
      <div className="card-image">
        <img src={item.image} alt={item.name} />
        <div className="card-badges">
          {item.tags.map((tag, index) => (
            <span key={index} className="badge">{tag}</span>
          ))}
        </div>
        <button
          className="like-btn"
          onClick={(e) => { e.stopPropagation(); onToggleLike(item.id); }}
        >
          <Heart size={18} fill={isLiked ? '#ef4444' : 'none'} color={isLiked ? '#ef4444' : '#374151'} />
        </button>
      </div>

      <div className="card-content">
        <div className="card-header">
          <h3 className="dish-name">{item.name}</h3>
          <div className="dish-indicators">
            <div className={`veg-indicator ${item.isVeg ? 'veg' : 'non-veg'}`}></div>
            {item.isSpicy && <Flame size={14} className="spicy-indicator" />}
          </div>
        </div>

        <p className="dish-description">{item.description}</p>

        <div className="dish-meta">
          <div className="rating">
            <Star size={14} fill="currentColor" />
            <span>{item.rating}</span>
            <span className="review-count">({item.reviewCount})</span>
          </div>
          <div className="cook-time">
            <Clock size={14} />
            <span>{item.cookTime}</span>
          </div>
        </div>

        <div className="card-footer">
          <div className="price-section">
            <span className="current-price">₹{item.price}</span>
          </div>
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
          >
            <ShoppingBag size={16} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
});

export default MenuItemCard;