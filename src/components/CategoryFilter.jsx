import { BowlFood, ChefHat, Drumstick, Filter, Fish, Flame, GlassWater, Leaf, Salad, Soup, Utensils } from 'lucide-react';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const getIcon = (iconString) => {
    switch (iconString) {
      case '🍽️': return <Utensils size={18} />; // All Items
      case '🔥': return <Flame size={18} />; // Tadaka Special
      case '🐟': return <Fish size={18} />; // Chinese Fish Gravy & Starters
      case '🍗': return <Drumstick size={18} />; // Chinese Chicken Gravy & Starters
      case '🥬': return <Leaf size={18} />; // Chinese Veg Gravy & Starters
      case '🍚': return <BowlFood size={18} />; // Chinese Fried Rice
      case '🍜': return <Soup size={18} />; // Chinese Noodles (using Soup as a bowl icon)
      case '🥗': return <Salad size={18} />; // Salads & Sides
      case '🍲': return <Soup size={18} />; // Soups
      case '🥟': return <ChefHat size={18} />; // Momo (general cooking/chef icon)
      case '🥤': return <GlassWater size={18} />; // Beverages
      default: return <ChefHat size={18} />; // Fallback icon
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sticky top-20 lg:top-4"> {/* Adjusted sticky top for navbar */}
      <h3 className="text-xl font-bold text-dark-text mb-4 flex items-center gap-2">
        <Filter size={20} className="text-primary-color" /> Categories
      </h3>
      <div className="space-y-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`flex items-center justify-between w-full p-3 rounded-lg text-left transition-all duration-200
              ${selectedCategory === cat.id
                ? 'bg-secondary-color text-primary-color font-semibold shadow-sm'
                : 'text-dark-text hover:bg-gray-100'
              }`}
          >
            <span className="flex items-center gap-3">
              {getIcon(cat.icon)} <span className="whitespace-nowrap">{cat.name}</span>
            </span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              selectedCategory === cat.id ? 'bg-primary-color text-secondary-color' : 'bg-gray-200 text-gray-700'
            }`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;