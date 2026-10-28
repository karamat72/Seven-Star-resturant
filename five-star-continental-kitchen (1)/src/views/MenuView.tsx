import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Star, 
  Plus, 
  Check, 
  Heart, 
  SlidersHorizontal,
  Flame,
  Clock,
  ArrowUpDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/menuData';
import { CategoryType, MenuItem } from '../types';

export const MenuView: React.FC = () => {
  const { 
    menuItems, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    addToCart,
    setSelectedDishModal,
    favorites,
    toggleFavorite,
    cartItems
  } = useApp();

  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'signature' | 'spicy'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');

  const filteredDishes = useMemo(() => {
    return menuItems.filter((dish) => {
      // Category filter
      if (selectedCategory !== 'All' && dish.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = dish.name.toLowerCase().includes(query);
        const matchesDesc = dish.description.toLowerCase().includes(query);
        const matchesCategory = dish.category.toLowerCase().includes(query);
        const matchesIngredient = dish.ingredients?.some((ing) => ing.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesIngredient) {
          return false;
        }
      }
      // Dietary filter
      if (dietaryFilter === 'signature' && !dish.isSignature) return false;
      if (dietaryFilter === 'spicy' && (!dish.spiceLevel || dish.spiceLevel === 'None')) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount; // popular
    });
  }, [menuItems, selectedCategory, searchQuery, dietaryFilter, sortBy]);

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-white pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#c5a059] uppercase block">
            ARTISAN CONTINENTAL GASTRONOMY
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Our Culinary Menu
          </h1>
          <p className="text-stone-300 text-sm sm:text-base font-light">
            Each creation is an interplay of authentic European heritage, hand-selected seasonal ingredients, and exquisite culinary presentation.
          </p>
        </div>

        {/* Filter and Search Bar Controls */}
        <div className="bg-[#131618] border border-[#262c31] rounded-2xl p-4 sm:p-6 mb-10 shadow-xl space-y-5">
          
          {/* Top Row: Search input and Sorting */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#c5a059] absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes, ingredients (truffle, salmon, burrata)..."
                className="w-full bg-[#1b2024] border border-stone-700 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-white focus:border-[#c5a059] focus:outline-none placeholder:text-stone-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3 text-stone-400 hover:text-white text-xs cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort & Dietary Selectors */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#1b2024] border border-stone-700 px-3 py-2 rounded-xl text-xs text-stone-300">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#c5a059]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-white focus:outline-none cursor-pointer"
                >
                  <option value="popular" className="bg-[#1b2024]">Most Popular</option>
                  <option value="rating" className="bg-[#1b2024]">Highest Rated</option>
                  <option value="price-asc" className="bg-[#1b2024]">Price: Low to High</option>
                  <option value="price-desc" className="bg-[#1b2024]">Price: High to Low</option>
                </select>
              </div>

              <div className="flex items-center gap-1 bg-[#1b2024] border border-stone-700 p-1 rounded-xl text-xs">
                <button
                  onClick={() => setDietaryFilter('all')}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    dietaryFilter === 'all' ? 'bg-[#c5a059] text-black font-semibold' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setDietaryFilter('signature')}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    dietaryFilter === 'signature' ? 'bg-[#c5a059] text-black font-semibold' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Signatures
                </button>
                <button
                  onClick={() => setDietaryFilter('spicy')}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    dietaryFilter === 'spicy' ? 'bg-[#c5a059] text-black font-semibold' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Spiced
                </button>
              </div>
            </div>
          </div>

          {/* Category Tabs Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-t border-[#202529] pt-4">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-[#c5a059] text-black shadow-md'
                  : 'bg-[#181d20] text-stone-300 hover:bg-[#20272b] hover:text-white border border-stone-800'
              }`}
            >
              All Categories ({menuItems.length})
            </button>

            {CATEGORIES.map((cat) => {
              const count = menuItems.filter((m) => m.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    selectedCategory === cat.id
                      ? 'bg-[#c5a059] text-black shadow-md'
                      : 'bg-[#181d20] text-stone-300 hover:bg-[#20272b] hover:text-white border border-stone-800'
                  }`}
                >
                  <span>{cat.title}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat.id ? 'bg-black/20 text-black' : 'bg-stone-800 text-stone-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-stone-400">
          <p>
            Showing <strong className="text-white">{filteredDishes.length}</strong> delicacies
            {selectedCategory !== 'All' && <span> in <strong className="text-[#c5a059]">{selectedCategory}</strong></span>}
            {searchQuery && <span> matching "<strong className="text-white">{searchQuery}</strong>"</span>}
          </p>
        </div>

        {/* Menu Cards Grid */}
        {filteredDishes.length === 0 ? (
          <div className="bg-[#14171a] border border-stone-800 rounded-2xl p-12 text-center space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-stone-900 mx-auto flex items-center justify-center text-stone-600">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">No Dishes Found</h3>
            <p className="text-xs text-stone-400">
              We couldn't find any dish matching your search filters. Try clearing your search query or selecting another category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setDietaryFilter('all');
              }}
              className="px-6 py-2.5 rounded-full bg-[#c5a059] text-black font-semibold text-xs uppercase tracking-wider cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDishes.map((dish) => {
              const isFav = favorites.includes(dish.id);
              const inCart = cartItems.some((ci) => ci.menuItem.id === dish.id);

              return (
                <div
                  key={dish.id}
                  className="group bg-[#14171a] rounded-2xl overflow-hidden border border-[#262c31] hover:border-[#c5a059]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#c5a059]/10 flex flex-col justify-between"
                >
                  {/* Dish Image */}
                  <div
                    className="relative aspect-[16/11] w-full overflow-hidden bg-stone-900 cursor-pointer"
                    onClick={() => setSelectedDishModal(dish)}
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(dish.id);
                      }}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                        isFav ? 'bg-red-500 text-white' : 'bg-black/50 text-stone-300 hover:text-white hover:bg-black/80'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                    </button>

                    {/* Category / Signature Badge */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider bg-black/70 backdrop-blur-md text-[#c5a059] border border-[#c5a059]/30 px-2.5 py-0.5 rounded-full">
                        {dish.category}
                      </span>
                      {dish.isSignature && (
                        <span className="text-[10px] font-bold bg-amber-500/90 text-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                          <Sparkles className="w-2.5 h-2.5" /> Signature
                        </span>
                      )}
                    </div>

                    {!dish.inStock && (
                      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="text-xs font-bold text-red-400 bg-red-950/90 border border-red-800 px-3 py-1 rounded-full uppercase tracking-wider">
                          Sold Out
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Dish Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div 
                      className="cursor-pointer space-y-1.5"
                      onClick={() => setSelectedDishModal(dish)}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#c5a059] transition-colors line-clamp-1">
                          {dish.name}
                        </h3>
                        <div className="flex items-center gap-1 text-[#c5a059] text-xs font-semibold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{dish.rating}</span>
                        </div>
                      </div>

                      <p className="text-xs text-stone-400 font-light line-clamp-2 leading-relaxed">
                        {dish.description}
                      </p>
                    </div>

                    {/* Metadata tags */}
                    <div className="flex items-center gap-3 text-[11px] text-stone-400 pt-1">
                      {dish.prepTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {dish.prepTime}
                        </span>
                      )}
                      {dish.spiceLevel && dish.spiceLevel !== 'None' && (
                        <span className="flex items-center gap-1 text-orange-400">
                          <Flame className="w-3 h-3" /> {dish.spiceLevel}
                        </span>
                      )}
                    </div>

                    {/* Price & Action */}
                    <div className="pt-3 border-t border-[#1f2529] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-stone-500 block uppercase font-mono">Price</span>
                        <span className="font-sans text-base font-bold text-white">
                          PKR {dish.price.toLocaleString()}
                        </span>
                      </div>

                      <button
                        onClick={() => addToCart(dish, 1)}
                        disabled={!dish.inStock}
                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                          !dish.inStock
                            ? 'bg-stone-800 text-stone-600 cursor-not-allowed'
                            : inCart
                            ? 'bg-[#c5a059] text-black shadow-md'
                            : 'bg-[#1b2024] hover:bg-[#c5a059] text-stone-200 hover:text-black border border-stone-700 hover:border-[#c5a059]'
                        }`}
                      >
                        {inCart ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        <span>{inCart ? 'In Cart' : 'Add'}</span>
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
