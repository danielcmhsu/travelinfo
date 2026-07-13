import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Utensils, MapPin, Plus, Trash2, Heart, ExternalLink } from 'lucide-react';
import { RestaurantInfo } from '../types';

interface RestaurantSectionProps {
  restaurants: RestaurantInfo[];
  isEditing: boolean;
  onUpdateRestaurants: (updatedRestaurants: RestaurantInfo[]) => void;
}

export default function RestaurantSection({ restaurants, isEditing, onUpdateRestaurants }: RestaurantSectionProps) {
  const [editingRestId, setEditingRestId] = useState<string | null>(null);

  // New Restaurant State Form
  const [newRestName, setNewRestName] = useState('');
  const [newRestCuisine, setNewRestCuisine] = useState('');
  const [newRestPriceRange, setNewRestPriceRange] = useState<'low' | 'medium' | 'high'>('medium');
  const [newRestRecommended, setNewRestRecommended] = useState('');
  const [newRestAddress, setNewRestAddress] = useState('');
  const [newRestMapsUrl, setNewRestMapsUrl] = useState('');
  const [newRestImageUrl, setNewRestImageUrl] = useState('');
  const [newRestNotes, setNewRestNotes] = useState('');

  const handleUpdateField = (id: string, key: keyof RestaurantInfo, value: any) => {
    const updated = restaurants.map(rest => {
      if (rest.id === id) {
        return { ...rest, [key]: value };
      }
      return rest;
    });
    onUpdateRestaurants(updated);
  };

  const handleAddRestaurant = (e: FormEvent) => {
    e.preventDefault();
    if (!newRestName.trim()) return;

    const dishes = newRestRecommended
      .split(',')
      .map(d => d.trim())
      .filter(Boolean);

    const newRest: RestaurantInfo = {
      id: `rest-${Date.now()}`,
      name: newRestName,
      cuisine: newRestCuisine || '日式料理',
      priceRange: newRestPriceRange,
      recommendedDishes: dishes.length > 0 ? dishes : ['招牌推薦'],
      address: newRestAddress,
      googleMapsUrl: newRestMapsUrl || undefined,
      imageUrl: newRestImageUrl || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
      notes: newRestNotes
    };

    onUpdateRestaurants([...restaurants, newRest]);

    // Reset Form
    setNewRestName('');
    setNewRestCuisine('');
    setNewRestPriceRange('medium');
    setNewRestRecommended('');
    setNewRestAddress('');
    setNewRestMapsUrl('');
    setNewRestImageUrl('');
    setNewRestNotes('');
  };

  const handleDeleteRestaurant = (id: string) => {
    onUpdateRestaurants(restaurants.filter(rest => rest.id !== id));
  };

  const getPriceBadge = (range: 'low' | 'medium' | 'high') => {
    switch (range) {
      case 'low': return { text: '平價 $', style: 'bg-[#F0F5EF] text-[#2D5A27] border-[#E0EBE0]' };
      case 'medium': return { text: '中等 $$', style: 'bg-[#FAF4EB] text-[#96641E] border-[#F1E4D0]' };
      case 'high': return { text: '豪華 $$$', style: 'bg-[#FAF0F0] text-[#853030] border-[#F2D7D7]' };
    }
  };

  return (
    <section id="restaurant-section" className="space-y-6">
      <div className="border-b border-black/5 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-50 text-red-500 rounded-xl border border-red-100/50">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1A1A1A] font-display">必吃美食與特色餐廳</h2>
            <p className="text-xs sm:text-sm text-[#717171]">東京不可錯過的口袋美食名單，已為您標記好必點菜色與預算</p>
          </div>
        </div>
      </div>

      {/* Grid of Restaurants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {restaurants.map((rest, index) => {
            const priceBadge = getPriceBadge(rest.priceRange);
            const isRestEditing = editingRestId === rest.id;

            return (
              <motion.div
                key={rest.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Photo Banner with Badges */}
                  <div className="relative aspect-video bg-black/5 border-b border-black/5">
                    <img
                      src={rest.imageUrl}
                      alt={rest.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                      <span className="bg-[#1A1A1A] text-white text-[10px] font-semibold px-2 py-1 rounded-md">
                        {rest.cuisine}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-1 rounded-md border ${priceBadge.style}`}>
                        {priceBadge.text}
                      </span>
                    </div>

                    {/* Admin Actions overlay */}
                    {isEditing && (
                      <div className="absolute top-3 right-3 flex gap-1.5">
                        <button
                          onClick={() => setEditingRestId(isRestEditing ? null : rest.id)}
                          className="bg-[#1A1A1A] text-[#FAF9F6] hover:bg-black/80 text-xs font-semibold px-2.5 py-1 rounded-md cursor-pointer"
                        >
                          {isRestEditing ? '完成' : '編輯'}
                        </button>
                        <button
                          onClick={() => handleDeleteRestaurant(rest.id)}
                          className="bg-red-500 text-white hover:bg-red-600 p-1.5 rounded-md cursor-pointer shadow-sm"
                          title="刪除餐廳"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-4">
                    {isRestEditing ? (
                      <div className="space-y-2">
                        <div>
                          <label className="block text-[10px] font-bold text-[#717171] uppercase">餐廳名稱：</label>
                          <input
                            id={`edit-rest-name-${rest.id}`}
                            type="text"
                            value={rest.name}
                            onChange={(e) => handleUpdateField(rest.id, 'name', e.target.value)}
                            className="w-full border border-black/15 rounded px-2 py-1 text-sm font-semibold focus:outline-none focus:border-black text-[#1A1A1A]"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-bold text-[#717171] uppercase">料理類型：</label>
                            <input
                              id={`edit-rest-cuisine-${rest.id}`}
                              type="text"
                              value={rest.cuisine}
                              onChange={(e) => handleUpdateField(rest.id, 'cuisine', e.target.value)}
                              className="w-full border border-black/15 rounded px-2 py-1 text-xs focus:outline-none focus:border-black text-[#1A1A1A]"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-[#717171] uppercase">價格等級：</label>
                            <select
                              id={`edit-rest-price-${rest.id}`}
                              value={rest.priceRange}
                              onChange={(e) => handleUpdateField(rest.id, 'priceRange', e.target.value)}
                              className="w-full border border-black/15 rounded px-2 py-1 text-xs focus:outline-none focus:border-black text-[#1A1A1A]"
                            >
                              <option value="low">平價 $</option>
                              <option value="medium">中等 $$</option>
                              <option value="high">奢華 $$$</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-[#717171] uppercase">圖片網址：</label>
                          <input
                            id={`edit-rest-img-${rest.id}`}
                            type="text"
                            value={rest.imageUrl}
                            onChange={(e) => handleUpdateField(rest.id, 'imageUrl', e.target.value)}
                            className="w-full border border-black/15 rounded px-2 py-1 text-xs focus:outline-none focus:border-black text-[#1A1A1A]"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-xl font-light font-display text-[#1A1A1A] leading-tight">
                          {rest.name}
                        </h3>
                      </div>
                    )}

                    {/* Recommended Dishes Pills */}
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-bold text-[#717171] tracking-widest uppercase flex items-center gap-1.5">
                        <Heart className="w-3 h-3 text-red-500 fill-red-500" /> 主打必點招牌菜色
                      </p>
                      {isRestEditing ? (
                        <input
                          id={`edit-rest-rec-${rest.id}`}
                          type="text"
                          value={rest.recommendedDishes.join(', ')}
                          onChange={(e) => handleUpdateField(rest.id, 'recommendedDishes', e.target.value.split(',').map(d => d.trim()))}
                          className="w-full border border-black/15 rounded px-2 py-1 text-xs focus:outline-none focus:border-black text-[#1A1A1A]"
                          placeholder="用逗號分隔菜色"
                        />
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {rest.recommendedDishes.map((dish, i) => (
                            <span
                              key={i}
                              className="bg-red-50/50 text-red-700 text-xs px-2.5 py-1 rounded-md border border-red-100/50 font-medium"
                            >
                              ✨ {dish}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Restaurant Notes */}
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-[#717171] tracking-widest uppercase">吃貨筆記 / 評論</p>
                      {isRestEditing ? (
                        <textarea
                          id={`edit-rest-notes-${rest.id}`}
                          value={rest.notes}
                          onChange={(e) => handleUpdateField(rest.id, 'notes', e.target.value)}
                          className="w-full border border-black/15 rounded p-2 text-xs focus:outline-none focus:border-black text-[#1A1A1A] min-h-[60px]"
                          placeholder="輸入推薦理由或用餐細節"
                        />
                      ) : (
                        <p className="text-sm text-[#717171] leading-relaxed font-normal whitespace-pre-line bg-[#FAF9F6] p-3 rounded-xl border border-black/5">
                          {rest.notes || "暫無評論筆記。"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer address and button */}
                <div className="px-5 pb-5 pt-2 border-t border-black/5 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-[#717171] min-w-0">
                    <MapPin className="w-4 h-4 text-[#717171] shrink-0" />
                    {isRestEditing ? (
                      <input
                        id={`edit-rest-addr-${rest.id}`}
                        type="text"
                        value={rest.address}
                        onChange={(e) => handleUpdateField(rest.id, 'address', e.target.value)}
                        className="w-full border border-black/15 rounded px-2 py-0.5 text-xs focus:outline-none focus:border-black text-[#1A1A1A]"
                        placeholder="餐廳地址"
                      />
                    ) : (
                      <span className="truncate">{rest.address}</span>
                    )}
                  </div>
                  {!isRestEditing && rest.googleMapsUrl && (
                    <a
                      href={rest.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-500 hover:text-red-600 font-semibold inline-flex items-center gap-0.5 hover:underline whitespace-nowrap shrink-0"
                    >
                      地圖導航 <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {isRestEditing && (
                    <div>
                      <label className="block text-[10px] text-[#717171]">地圖 URL：</label>
                      <input
                        id={`edit-rest-maps-${rest.id}`}
                        type="text"
                        value={rest.googleMapsUrl || ''}
                        onChange={(e) => handleUpdateField(rest.id, 'googleMapsUrl', e.target.value)}
                        className="border border-black/15 rounded px-1.5 py-0.5 text-xs focus:outline-none focus:border-black text-[#1A1A1A] w-28"
                        placeholder="地圖 URL"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Add New Restaurant Form Button card */}
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl border border-dashed border-black/15 p-6 flex flex-col justify-between shadow-sm"
          >
            <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-[#1A1A1A]" /> 新增特色餐廳推薦
            </h3>
            <form onSubmit={handleAddRestaurant} className="space-y-3 text-xs text-[#717171]">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1 text-xs">餐廳名稱：</label>
                  <input
                    id="form-rest-name"
                    type="text"
                    value={newRestName}
                    onChange={(e) => setNewRestName(e.target.value)}
                    placeholder="e.g., 敘敘苑 晴空塔店"
                    className="w-full bg-white border border-black/15 rounded p-1.5 focus:outline-none focus:border-black text-[#1A1A1A]"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-xs">料理風格：</label>
                  <input
                    id="form-rest-cuisine"
                    type="text"
                    value={newRestCuisine}
                    onChange={(e) => setNewRestCuisine(e.target.value)}
                    placeholder="e.g., 日式燒肉 / 壽喜燒"
                    className="w-full bg-white border border-black/15 rounded p-1.5 focus:outline-none focus:border-black text-[#1A1A1A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1 text-xs">價格定位：</label>
                  <select
                    id="form-rest-price"
                    value={newRestPriceRange}
                    onChange={(e) => setNewRestPriceRange(e.target.value as any)}
                    className="w-full bg-white border border-black/15 rounded p-1.5 focus:outline-none focus:border-black text-[#1A1A1A]"
                  >
                    <option value="low">平價 $</option>
                    <option value="medium">中高檔 $$</option>
                    <option value="high">豪華美食 $$$</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-xs">精選推薦菜色 (英文逗號分隔)：</label>
                  <input
                    id="form-rest-rec"
                    type="text"
                    value={newRestRecommended}
                    onChange={(e) => setNewRestRecommended(e.target.value)}
                    placeholder="牛舌, 五花肉, 石鍋拌飯"
                    className="w-full bg-white border border-black/15 rounded p-1.5 focus:outline-none focus:border-black text-[#1A1A1A]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-xs">餐廳地址：</label>
                <input
                  id="form-rest-addr"
                  type="text"
                  value={newRestAddress}
                  onChange={(e) => setNewRestAddress(e.target.value)}
                  placeholder="e.g., 東京都中央區..."
                  className="w-full bg-white border border-black/15 rounded p-1.5 focus:outline-none focus:border-black text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-xs">Google Maps 網址：</label>
                <input
                  id="form-rest-maps"
                  type="text"
                  value={newRestMapsUrl}
                  onChange={(e) => setNewRestMapsUrl(e.target.value)}
                  placeholder="https://maps.google.com/?q=..."
                  className="w-full bg-white border border-black/15 rounded p-1.5 focus:outline-none focus:border-black text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-xs">美食照片網址 (選填)：</label>
                <input
                  id="form-rest-img"
                  type="text"
                  value={newRestImageUrl}
                  onChange={(e) => setNewRestImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-white border border-black/15 rounded p-1.5 focus:outline-none focus:border-black text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-xs">吃貨評論與備註：</label>
                <textarea
                  id="form-rest-notes"
                  value={newRestNotes}
                  onChange={(e) => setNewRestNotes(e.target.value)}
                  placeholder="在此輸入包廂資訊、預訂技巧、必點心得..."
                  className="w-full bg-white border border-black/15 rounded p-1.5 focus:outline-none focus:border-black text-[#1A1A1A] min-h-[60px]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#1A1A1A] hover:bg-black/80 text-white font-semibold rounded-lg text-sm transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" /> 新增這家餐廳
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
}
