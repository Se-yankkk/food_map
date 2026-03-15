import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Map as MapIcon, 
  Utensils, 
  Search as SearchIcon, 
  User, 
  MapPin, 
  Star, 
  Clock, 
  ChevronRight, 
  ArrowLeft,
  Filter,
  Flame,
  Shuffle,
  Sparkles,
  Users,
  Camera,
  Heart,
  History,
  Settings,
  Navigation
} from 'lucide-react';
import { RESTAURANTS, REVIEWS, DISHES } from './data';
import { Restaurant, Page } from './types';

// --- Components ---

const BottomNav = ({ active, onChange }: { active: Page, onChange: (p: Page) => void }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-center z-50">
    <button onClick={() => onChange('map')} className={`flex flex-col items-center gap-1 ${active === 'map' ? 'text-brand-primary' : 'text-slate-400'}`}>
      <MapIcon size={24} />
      <span className="text-[10px] font-medium">地图</span>
    </button>
    <button onClick={() => onChange('recommend')} className={`flex flex-col items-center gap-1 ${active === 'recommend' ? 'text-brand-primary' : 'text-slate-400'}`}>
      <Utensils size={24} />
      <span className="text-[10px] font-medium">吃什么</span>
    </button>
    <button onClick={() => onChange('search')} className={`flex flex-col items-center gap-1 ${active === 'search' ? 'text-brand-primary' : 'text-slate-400'}`}>
      <SearchIcon size={24} />
      <span className="text-[10px] font-medium">搜索</span>
    </button>
    <button onClick={() => onChange('profile')} className={`flex flex-col items-center gap-1 ${active === 'profile' ? 'text-brand-primary' : 'text-slate-400'}`}>
      <User size={24} />
      <span className="text-[10px] font-medium">我的</span>
    </button>
  </div>
);

const RestaurantCard = ({ restaurant, onClick, onFavorite }: { restaurant: Restaurant, onClick: () => void, onFavorite?: (e: React.MouseEvent) => void, key?: string }) => (
  <motion.div 
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="bg-white rounded-2xl p-3 flex gap-4 shadow-sm border border-slate-50 mb-3 cursor-pointer relative group"
  >
    <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
      <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      {restaurant.isStudentFriendly && (
        <div className="absolute top-0 left-0 bg-brand-secondary text-white text-[10px] px-2 py-0.5 rounded-br-lg font-bold">
          学生价
        </div>
      )}
    </div>
    <div className="flex-1 flex flex-col justify-between py-0.5">
      <div>
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-slate-800 leading-tight pr-6">{restaurant.name}</h3>
          <div className="flex items-center gap-0.5 text-brand-secondary">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-bold">{restaurant.rating}</span>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-1">{restaurant.category} · 步行{restaurant.distance}min</p>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-brand-primary">¥{restaurant.avgPrice}/人</span>
        <div className="flex items-center gap-1 text-[10px] text-slate-400">
          <Users size={10} />
          <span>{restaurant.hotness}人正在吃</span>
        </div>
      </div>
    </div>
    
    {/* Favorite Button */}
    <button 
      onClick={(e) => {
        e.stopPropagation();
        onFavorite?.(e);
      }}
      className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm text-slate-300 hover:text-rose-500 transition-colors"
    >
      <Heart size={16} fill={restaurant.isFavorited ? "currentColor" : "none"} className={restaurant.isFavorited ? "text-rose-500" : ""} />
    </button>
  </motion.div>
);

// --- Pages ---

const MapView = ({ restaurants, onSelect, onFavorite }: { restaurants: Restaurant[], onSelect: (r: Restaurant) => void, onFavorite: (id: string) => void }) => {
  const [filter, setFilter] = useState('全部');
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const filteredRestaurants = useMemo(() => {
    if (filter === '全部') return restaurants;
    if (filter === '15元以下') return restaurants.filter(r => r.avgPrice < 15);
    return restaurants.filter(r => r.category.includes(filter));
  }, [filter, restaurants]);

  return (
    <div className="h-full relative overflow-hidden bg-slate-100">
      {/* Simulated Map Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-brand-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-brand-secondary rounded-full blur-3xl" />
      </div>
      
      {/* User Location */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <div className="relative">
          <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
          <div className="absolute inset-0 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-40" />
        </div>
        <div className="bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm border border-slate-100 mt-1">
          <span className="text-[8px] font-bold text-blue-600 whitespace-nowrap">我的位置</span>
        </div>
      </motion.div>
      
      {/* Map Pins */}
      {restaurants.map(r => {
        const isRecommended = filter !== '全部' && filteredRestaurants.some(fr => fr.id === r.id);
        
        return (
          <motion.button
            key={r.id}
            initial={{ scale: 0 }}
            animate={{ 
              scale: isRecommended ? 1.1 : 1,
              zIndex: isRecommended ? 30 : 10
            }}
            whileTap={{ scale: 1.2 }}
            onClick={() => onSelect(r)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group"
            style={{ top: `${r.lat}%`, left: `${r.lng}%` }}
          >
            <div className={`bg-white px-2 py-1 rounded-full shadow-lg border-2 flex items-center gap-1 whitespace-nowrap transition-all ${isRecommended ? 'border-orange-500 ring-4 ring-orange-500/20' : 'border-brand-primary'}`}>
              {isRecommended && <Sparkles size={10} className="text-orange-500 fill-orange-500" />}
              <span className={`text-[10px] font-bold ${isRecommended ? 'text-orange-600' : ''}`}>{r.name}</span>
              <span className="text-[8px] text-slate-400">¥{r.avgPrice}</span>
            </div>
            <div className={`w-2 h-2 rounded-full shadow-md mt-0.5 transition-colors ${isRecommended ? 'bg-orange-500 scale-125' : 'bg-brand-primary'}`} />
            
            {isRecommended && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-6 bg-orange-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold shadow-sm whitespace-nowrap"
              >
                推荐
              </motion.div>
            )}
          </motion.button>
        );
      })}

      {/* Top Search Bar Overlay */}
      <div className="absolute top-12 left-4 right-4 z-10">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 shadow-lg flex items-center gap-3 border border-white/20">
          <SearchIcon size={20} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="搜搜想吃什么..." 
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <Filter size={20} className="text-slate-400" />
        </div>
        
        {/* Quick Filters */}
        <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
          {['全部', '快餐', '中餐', '咖啡/甜品', '15元以下'].map(f => (
            <button 
              key={f}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${filter === f ? 'bg-brand-primary text-white' : 'bg-white/80 text-slate-600'}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Drawer */}
      <motion.div 
        initial={{ y: '85%' }}
        animate={{ y: drawerOpen ? '15%' : '82%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] shadow-2xl z-20 flex flex-col h-full"
      >
        <div 
          className="p-4 cursor-grab active:cursor-grabbing flex-shrink-0"
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Flame size={20} className="text-orange-500" />
              {filter === '全部' ? '本周热榜' : `${filter}精选`}
            </h2>
            <span className="text-xs text-slate-400">{filteredRestaurants.length} 家餐厅</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto px-6 pb-32 no-scrollbar">
          <div className="space-y-1">
            {filteredRestaurants.map(r => (
              <RestaurantCard 
                key={r.id} 
                restaurant={r} 
                onClick={() => onSelect(r)} 
                onFavorite={() => onFavorite(r.id)}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const RecommendView = ({ restaurants, onSelect, onFavorite }: { restaurants: Restaurant[], onSelect: (r: Restaurant) => void, onFavorite: (id: string) => void }) => {
  const [tab, setTab] = useState<'random' | 'smart' | 'scene'>('random');
  const [randomRes, setRandomRes] = useState<Restaurant | null>(restaurants[0]);
  const [selectedScene, setSelectedScene] = useState<string | null>(null);

  const handleShuffle = () => {
    const others = restaurants.filter(r => r.id !== randomRes?.id);
    setRandomRes(others[Math.floor(Math.random() * others.length)]);
  };

  const sceneFilteredRestaurants = useMemo(() => {
    if (!selectedScene) return restaurants;
    if (selectedScene === '1人食') return restaurants.filter(r => r.category === '快餐' || r.avgPrice < 15);
    if (selectedScene === '2-3人小聚') return restaurants.filter(r => r.category === '中餐' || r.category === '咖啡/甜品');
    if (selectedScene === '多人聚餐') return restaurants.filter(r => r.category === '中餐' && r.avgPrice > 15);
    if (selectedScene === '深夜食堂') return restaurants.filter(r => r.tags.includes('校门口烧烤') || r.category === '快餐');
    return restaurants;
  }, [selectedScene, restaurants]);

  return (
    <div className="p-6 pt-12 pb-24 h-full overflow-y-auto no-scrollbar">
      <h1 className="text-2xl font-bold mb-6">今天吃什么？</h1>
      
      <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
        <button 
          onClick={() => setTab('random')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${tab === 'random' ? 'bg-white shadow-sm text-brand-primary' : 'text-slate-500'}`}
        >
          <Shuffle size={16} /> 随机
        </button>
        <button 
          onClick={() => setTab('smart')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${tab === 'smart' ? 'bg-white shadow-sm text-brand-primary' : 'text-slate-500'}`}
        >
          <Sparkles size={16} /> 推荐
        </button>
        <button 
          onClick={() => setTab('scene')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${tab === 'scene' ? 'bg-white shadow-sm text-brand-primary' : 'text-slate-500'}`}
        >
          <Users size={16} /> 场景
        </button>
      </div>

      <AnimatePresence mode="wait">
        {tab === 'random' && (
          <motion.div 
            key="random"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center"
          >
            {randomRes && (
              <div className="w-full">
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl mb-6">
                  <img src={randomRes.image} alt={randomRes.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h2 className="text-2xl font-bold mb-1">{randomRes.name}</h2>
                    <p className="text-sm opacity-90">“{randomRes.description}”</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={handleShuffle}
                    className="flex-1 bg-slate-100 py-4 rounded-2xl font-bold text-slate-600 flex items-center justify-center gap-2"
                  >
                    <Shuffle size={20} /> 换一个
                  </button>
                  <button 
                    onClick={() => onSelect(randomRes)}
                    className="flex-1 bg-brand-primary py-4 rounded-2xl font-bold text-white shadow-lg shadow-emerald-200"
                  >
                    就吃这家
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {tab === 'smart' && (
          <motion.div 
            key="smart"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <p className="text-sm text-slate-400 mb-4">根据你的口味偏好，为你挑选：</p>
            {restaurants.slice(0, 4).map(r => (
              <RestaurantCard key={r.id} restaurant={r} onClick={() => onSelect(r)} onFavorite={() => onFavorite(r.id)} />
            ))}
          </motion.div>
        )}

        {tab === 'scene' && (
          <motion.div 
            key="scene"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="grid grid-cols-2 gap-4 mb-8">
              {['1人食', '2-3人小聚', '多人聚餐', '深夜食堂'].map(s => (
                <button 
                  key={s} 
                  onClick={() => setSelectedScene(s)}
                  className={`p-6 rounded-2xl border transition-all text-center ${selectedScene === s ? 'bg-brand-primary border-brand-primary text-white shadow-lg' : 'bg-white border-slate-100 shadow-sm text-slate-800 hover:border-brand-primary'}`}
                >
                  <span className="text-sm font-bold">{s}</span>
                </button>
              ))}
            </div>
            <h3 className="font-bold mb-4">{selectedScene ? `${selectedScene}精选` : '场景精选'}</h3>
            <div className="space-y-4">
              {sceneFilteredRestaurants.map(r => (
                <RestaurantCard key={r.id} restaurant={r} onClick={() => onSelect(r)} onFavorite={() => onFavorite(r.id)} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProfileView = ({ favoriteCount, onOpenFavorites }: { favoriteCount: number, onOpenFavorites: () => void }) => (
  <div className="p-6 pt-12 pb-24 h-full overflow-y-auto no-scrollbar">
    <div className="flex items-center gap-4 mb-10">
      <div className="w-20 h-20 rounded-full bg-brand-primary/10 flex items-center justify-center border-4 border-white shadow-sm">
        <User size={40} className="text-brand-primary" />
      </div>
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2">
          王小明
          <span className="bg-emerald-100 text-emerald-600 text-[10px] px-2 py-0.5 rounded-full font-bold">本校学生</span>
        </h2>
        <p className="text-sm text-slate-400">A大学 · 计算机学院</p>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-4 mb-10">
      <div className="bg-white p-4 rounded-2xl text-center shadow-sm border border-slate-50">
        <div className="text-lg font-bold">{favoriteCount}</div>
        <div className="text-[10px] text-slate-400 uppercase tracking-wider">收藏</div>
      </div>
      <div className="bg-white p-4 rounded-2xl text-center shadow-sm border border-slate-50">
        <div className="text-lg font-bold">48</div>
        <div className="text-[10px] text-slate-400 uppercase tracking-wider">去过</div>
      </div>
      <div className="bg-white p-4 rounded-2xl text-center shadow-sm border border-slate-50">
        <div className="text-lg font-bold">5</div>
        <div className="text-[10px] text-slate-400 uppercase tracking-wider">评价</div>
      </div>
    </div>

    <div className="space-y-3">
      <button 
        onClick={onOpenFavorites}
        className="w-full bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-slate-50"
      >
        <div className="flex items-center gap-3">
          <Heart size={20} className="text-rose-500" />
          <span className="font-medium">我的收藏</span>
        </div>
        <ChevronRight size={16} className="text-slate-300" />
      </button>
      <button className="w-full bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-slate-50">
        <div className="flex items-center gap-3">
          <History size={20} className="text-blue-500" />
          <span className="font-medium">历史足迹</span>
        </div>
        <ChevronRight size={16} className="text-slate-300" />
      </button>
      <button className="w-full bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-slate-50">
        <div className="flex items-center gap-3">
          <Settings size={20} className="text-slate-500" />
          <span className="font-medium">口味偏好</span>
        </div>
        <ChevronRight size={16} className="text-slate-300" />
      </button>
    </div>
  </div>
);

const FavoritesView = ({ restaurants, onBack, onSelect, onFavorite }: { restaurants: Restaurant[], onBack: () => void, onSelect: (r: Restaurant) => void, onFavorite: (id: string) => void }) => {
  const favorites = useMemo(() => restaurants.filter(r => r.isFavorited), [restaurants]);

  return (
    <div className="fixed inset-0 bg-white z-[60] flex flex-col">
      <div className="p-6 pt-12 flex items-center gap-4 border-b border-slate-50">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">我的收藏</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
        {favorites.length > 0 ? (
          <div className="space-y-1">
            {favorites.map(r => (
              <RestaurantCard 
                key={r.id} 
                restaurant={r} 
                onClick={() => onSelect(r)} 
                onFavorite={() => onFavorite(r.id)}
              />
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <Heart size={48} className="mb-4 opacity-20" />
            <p className="text-sm">还没有收藏任何餐厅哦</p>
          </div>
        )}
      </div>
    </div>
  );
};

const DetailView = ({ restaurant, onBack, onFavorite }: { restaurant: Restaurant, onBack: () => void, onFavorite: (id: string) => void }) => {
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [onlyThisSchool, setOnlyThisSchool] = useState(true);

  const filteredReviews = useMemo(() => {
    const reviews = REVIEWS.filter(r => r.restaurantId === restaurant.id);
    return onlyThisSchool ? reviews.filter(r => r.isFromThisSchool) : reviews;
  }, [restaurant.id, onlyThisSchool]);

  return (
    <div className="fixed inset-0 bg-white z-[60] overflow-y-auto no-scrollbar pb-24">
      <div className="relative h-72">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <button 
          onClick={onBack}
          className="absolute top-12 left-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
        >
          <ArrowLeft size={24} />
        </button>
        
        <button 
          onClick={() => onFavorite(restaurant.id)}
          className="absolute top-12 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
        >
          <Heart size={24} fill={restaurant.isFavorited ? "currentColor" : "none"} className={restaurant.isFavorited ? "text-rose-500" : ""} />
        </button>

        <div className="absolute bottom-6 left-6 right-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-bold">{restaurant.name}</h1>
            {restaurant.isStudentFriendly && (
              <span className="bg-brand-secondary text-white text-[10px] px-2 py-0.5 rounded-full font-bold">学生价</span>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm opacity-90">
            <div className="flex items-center gap-1">
              <Star size={14} fill="currentColor" className="text-brand-secondary" />
              <span>{restaurant.rating}</span>
            </div>
            <span>·</span>
            <span>{restaurant.category}</span>
            <span>·</span>
            <span>¥{restaurant.avgPrice}/人</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-8 bg-slate-50 p-4 rounded-2xl">
          <div className="flex flex-col items-center">
            <Clock size={20} className="text-slate-400 mb-1" />
            <span className="text-[10px] text-slate-400 uppercase">步行</span>
            <span className="text-sm font-bold">{restaurant.distance}min</span>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="flex flex-col items-center">
            <Navigation size={20} className="text-slate-400 mb-1" />
            <span className="text-[10px] text-slate-400 uppercase">路线</span>
            <span className="text-sm font-bold">去这里</span>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="flex flex-col items-center">
            <Users size={20} className="text-slate-400 mb-1" />
            <span className="text-[10px] text-slate-400 uppercase">热度</span>
            <span className="text-sm font-bold">{restaurant.hotness}人</span>
          </div>
        </div>

        <section className="mb-8">
          <h3 className="font-bold mb-4">推荐菜品</h3>
          <div className="flex gap-4 overflow-x-auto no-scrollbar">
            {DISHES.filter(d => d.restaurantId === restaurant.id).map(dish => (
              <div key={dish.id} className="flex-shrink-0 w-32">
                <div className="aspect-square rounded-2xl overflow-hidden mb-2">
                  <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <p className="text-xs font-bold truncate">{dish.name}</p>
                <p className="text-[10px] text-brand-primary font-bold">¥{dish.price}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">同学评价</h3>
            <button 
              onClick={() => setOnlyThisSchool(!onlyThisSchool)}
              className={`text-[10px] px-2 py-1 rounded-full border transition-colors ${onlyThisSchool ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
            >
              仅展示本校学生
            </button>
          </div>
          <div className="space-y-4">
            {filteredReviews.length > 0 ? filteredReviews.map(review => (
              <div key={review.id} className="bg-slate-50 p-4 rounded-2xl">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">{review.userName}</span>
                    <span className="text-[10px] bg-white px-1.5 py-0.5 rounded text-slate-400">{review.userSchool}</span>
                  </div>
                  <div className="flex text-brand-secondary">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} fill={i < review.rating ? "currentColor" : "none"} />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{review.content}</p>
              </div>
            )) : (
              <div className="text-center py-8 text-slate-400 text-xs">暂无评价</div>
            )}
          </div>
        </section>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 p-4 flex gap-4 z-50">
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-1 text-xs font-bold text-orange-500">
            <Flame size={12} />
            <span>今日打卡热度</span>
          </div>
          <p className="text-[10px] text-slate-400">{restaurant.hotness}人打卡 · {restaurant.waitTime}</p>
        </div>
        <button 
          onClick={() => setShowCheckIn(true)}
          className="bg-brand-primary text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-100"
        >
          我到了 · 打卡
        </button>
      </div>

      {/* Check-in Modal */}
      <AnimatePresence>
        {showCheckIn && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCheckIn(false)}
            className="fixed inset-0 bg-black/60 z-[100] flex items-end"
          >
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-white rounded-t-[40px] p-8 pb-12 relative"
            >
              <button 
                onClick={() => setShowCheckIn(false)}
                className="absolute top-6 right-8 text-slate-300 hover:text-slate-500"
              >
                取消
              </button>
              <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-8" />
              <h2 className="text-xl font-bold text-center mb-8">到店打卡问卷</h2>
              
              <div className="space-y-8">
                <div>
                  <p className="text-sm font-bold mb-4">现在人多吗？</p>
                  <div className="flex gap-3">
                    {['不多', '一般', '很多'].map(v => (
                      <button key={v} onClick={() => setShowCheckIn(false)} className="flex-1 py-3 rounded-xl border border-slate-100 text-sm font-medium hover:border-brand-primary hover:bg-brand-primary/5 transition-all">
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-bold mb-4">等了多久？</p>
                  <div className="grid grid-cols-2 gap-3">
                    {['直接进', '5分钟内', '5-15分钟', '15分钟以上'].map(v => (
                      <button key={v} onClick={() => setShowCheckIn(false)} className="py-3 rounded-xl border border-slate-100 text-sm font-medium hover:border-brand-primary hover:bg-brand-primary/5 transition-all">
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setShowCheckIn(false)}
                  className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold shadow-xl shadow-emerald-100 mt-4"
                >
                  完成打卡 (3s)
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [page, setPage] = useState<Page>('map');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>(RESTAURANTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

  const toggleFavorite = (id: string) => {
    setRestaurants(prev => prev.map(r => 
      r.id === id ? { ...r, isFavorited: !r.isFavorited } : r
    ));
    if (selectedRestaurant?.id === id) {
      setSelectedRestaurant(prev => prev ? { ...prev, isFavorited: !prev.isFavorited } : null);
    }
  };

  const filteredSearchRestaurants = useMemo(() => {
    if (!searchQuery.trim()) return restaurants;
    const query = searchQuery.toLowerCase();
    return restaurants.filter(r => {
      // Check restaurant basic info
      const matchesRestaurant = 
        r.name.toLowerCase().includes(query) || 
        r.category.toLowerCase().includes(query) ||
        r.tags.some(t => t.toLowerCase().includes(query));
      
      // Check dishes associated with this restaurant
      const matchesDishes = DISHES.some(d => 
        d.restaurantId === r.id && d.name.toLowerCase().includes(query)
      );
      
      return matchesRestaurant || matchesDishes;
    });
  }, [restaurants, searchQuery]);

  const renderPage = () => {
    switch (page) {
      case 'map': return <MapView restaurants={restaurants} onSelect={setSelectedRestaurant} onFavorite={toggleFavorite} />;
      case 'recommend': return <RecommendView restaurants={restaurants} onSelect={setSelectedRestaurant} onFavorite={toggleFavorite} />;
      case 'profile': return (
        <ProfileView 
          favoriteCount={restaurants.filter(r => r.isFavorited).length} 
          onOpenFavorites={() => setShowFavorites(true)}
        />
      );
      case 'search': return (
        <div className="p-6 pt-12 h-full overflow-y-auto no-scrollbar">
          <div className="bg-slate-100 rounded-2xl p-4 flex items-center gap-3 mb-8">
            <SearchIcon size={20} className="text-slate-400" />
            <input 
              autoFocus 
              type="text" 
              placeholder="搜索餐厅或菜品（如：牛肉面）..." 
              className="bg-transparent outline-none flex-1 text-sm" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <h3 className="font-bold mb-4">热门搜索</h3>
          <div className="flex flex-wrap gap-2 mb-8">
            {['牛肉面', '麻辣拌', '宫保鸡丁', '自习咖啡厅', '奶茶'].map(t => (
              <button 
                key={t} 
                onClick={() => setSearchQuery(t)}
                className="px-4 py-2 bg-white rounded-full text-xs text-slate-600 border border-slate-100 shadow-sm"
              >
                {t}
              </button>
            ))}
          </div>
          <h3 className="font-bold mb-4">{searchQuery ? '搜索结果' : '猜你想搜'}</h3>
          <div className="space-y-1">
            {filteredSearchRestaurants.length > 0 ? filteredSearchRestaurants.map(r => (
              <RestaurantCard 
                key={r.id} 
                restaurant={r} 
                onClick={() => setSelectedRestaurant(r)} 
                onFavorite={() => toggleFavorite(r.id)}
              />
            )) : (
              <div className="text-center py-12 text-slate-400 text-sm">未找到相关餐厅</div>
            )}
          </div>
        </div>
      );
      default: return <MapView restaurants={restaurants} onSelect={setSelectedRestaurant} onFavorite={toggleFavorite} />;
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-bg-soft relative shadow-2xl overflow-hidden">
      {renderPage()}
      
      <BottomNav active={page} onChange={setPage} />

      <AnimatePresence>
        {showFavorites && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60]"
          >
            <FavoritesView 
              restaurants={restaurants}
              onBack={() => setShowFavorites(false)}
              onSelect={setSelectedRestaurant}
              onFavorite={toggleFavorite}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedRestaurant && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60]"
          >
            <DetailView 
              restaurant={selectedRestaurant} 
              onBack={() => setSelectedRestaurant(null)} 
              onFavorite={toggleFavorite}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button for Map Page */}
      {page === 'map' && !selectedRestaurant && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setPage('recommend')}
          className="absolute bottom-24 right-6 w-14 h-14 bg-brand-primary text-white rounded-full shadow-xl flex items-center justify-center z-40"
        >
          <Shuffle size={24} />
        </motion.button>
      )}
    </div>
  );
}
