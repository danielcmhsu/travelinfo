import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Utensils, Plane, Hotel, ShoppingBag, Sparkles, 
  Clock, MapPin, Plus, Trash2, ChevronDown, ChevronUp, ExternalLink 
} from 'lucide-react';
import { ItineraryDay, ItineraryItem, ActivityCategory } from '../types';

interface ItinerarySectionProps {
  itinerary: ItineraryDay[];
  isEditing: boolean;
  onUpdateItinerary: (updatedItinerary: ItineraryDay[]) => void;
}

const CATEGORY_MAP: Record<ActivityCategory, { icon: any; color: string; bg: string; border: string; label: string }> = {
  sightseeing: { icon: Compass, color: 'text-[#2D5A27]', bg: 'bg-[#F0F5EF]', border: 'border-[#E0EBE0]', label: '景點參訪' },
  food: { icon: Utensils, color: 'text-[#96641E]', bg: 'bg-[#FAF4EB]', border: 'border-[#F1E4D0]', label: '美食餐廳' },
  transport: { icon: Plane, color: 'text-[#244E66]', bg: 'bg-[#EEF4F8]', border: 'border-[#DCE9F0]', label: '交通移動' },
  hotel: { icon: Hotel, color: 'text-[#1C5C5A]', bg: 'bg-[#EDF6F5]', border: 'border-[#D6EBE9]', label: '飯店入住' },
  shopping: { icon: ShoppingBag, color: 'text-[#483366]', bg: 'bg-[#F3EFF7]', border: 'border-[#E3D9ED]', label: '購物逛街' },
  leisure: { icon: Sparkles, color: 'text-[#853030]', bg: 'bg-[#FAF0F0]', border: 'border-[#F2D7D7]', label: '休閒放鬆' }
};

export default function ItinerarySection({ itinerary, isEditing, onUpdateItinerary }: ItinerarySectionProps) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState<ActivityCategory | 'all'>('all');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  // New Item State Form
  const [newItemTime, setNewItemTime] = useState('');
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemLocation, setNewItemLocation] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<ActivityCategory>('sightseeing');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemMapsUrl, setNewItemMapsUrl] = useState('');
  const [newItemCost, setNewItemCost] = useState('');

  const currentDay = itinerary[selectedDayIndex] || itinerary[0];

  const handleUpdateDayTheme = (themeValue: string) => {
    const updated = [...itinerary];
    updated[selectedDayIndex] = {
      ...currentDay,
      theme: themeValue
    };
    onUpdateItinerary(updated);
  };

  const handleUpdateDayDate = (dateValue: string) => {
    const updated = [...itinerary];
    updated[selectedDayIndex] = {
      ...currentDay,
      date: dateValue
    };
    onUpdateItinerary(updated);
  };

  // Add Item to selected day
  const handleAddItem = (e: FormEvent) => {
    e.preventDefault();
    if (!newItemTitle.trim()) return;

    const newItem: ItineraryItem = {
      id: `item-${Date.now()}`,
      time: newItemTime || '09:00',
      title: newItemTitle,
      location: newItemLocation,
      category: newItemCategory,
      description: newItemDescription,
      googleMapsUrl: newItemMapsUrl || undefined,
      cost: newItemCost || undefined
    };

    // Auto-sort by time (simple alphabetical string sort is usually fine for HH:MM format)
    const updatedItems = [...currentDay.items, newItem].sort((a, b) => a.time.localeCompare(b.time));

    const updated = [...itinerary];
    updated[selectedDayIndex] = {
      ...currentDay,
      items: updatedItems
    };

    onUpdateItinerary(updated);

    // Reset Form
    setNewItemTime('');
    setNewItemTitle('');
    setNewItemLocation('');
    setNewItemCategory('sightseeing');
    setNewItemDescription('');
    setNewItemMapsUrl('');
    setNewItemCost('');
  };

  const handleDeleteItem = (itemId: string) => {
    const updatedItems = currentDay.items.filter(item => item.id !== itemId);
    const updated = [...itinerary];
    updated[selectedDayIndex] = {
      ...currentDay,
      items: updatedItems
    };
    onUpdateItinerary(updated);
  };

  const handleUpdateItemInline = (itemId: string, key: keyof ItineraryItem, value: any) => {
    const updatedItems = currentDay.items.map(item => {
      if (item.id === itemId) {
        return { ...item, [key]: value };
      }
      return item;
    });

    const updated = [...itinerary];
    updated[selectedDayIndex] = {
      ...currentDay,
      items: updatedItems
    };
    onUpdateItinerary(updated);
  };

  const handleAddDay = () => {
    const nextDayNum = itinerary.length + 1;
    // Calculate next day's date
    let nextDate = '';
    if (itinerary.length > 0) {
      const lastDate = new Date(itinerary[itinerary.length - 1].date);
      lastDate.setDate(lastDate.getDate() + 1);
      nextDate = lastDate.toISOString().split('T')[0];
    } else {
      nextDate = new Date().toISOString().split('T')[0];
    }

    const newDay: ItineraryDay = {
      dayNumber: nextDayNum,
      date: nextDate,
      theme: `第 ${nextDayNum} 天行程主題`,
      items: []
    };

    onUpdateItinerary([...itinerary, newDay]);
    setSelectedDayIndex(itinerary.length);
  };

  const handleDeleteDay = (indexToDelete: number) => {
    if (itinerary.length <= 1) return; // Must have at least one day
    if (window.confirm(`確定要刪除第 ${indexToDelete + 1} 天的所有行程嗎？此操作無法復原。`)) {
      const filtered = itinerary.filter((_, i) => i !== indexToDelete);
      // Re-index remaining days
      const reindexed = filtered.map((day, idx) => ({
        ...day,
        dayNumber: idx + 1
      }));
      onUpdateItinerary(reindexed);
      setSelectedDayIndex(Math.max(0, indexToDelete - 1));
    }
  };

  const filteredItems = currentDay?.items.filter(item => 
    categoryFilter === 'all' ? true : item.category === categoryFilter
  ) || [];

  return (
    <section id="itinerary-section" className="space-y-6">
      {/* Day Selector Navigation */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1A1A1A] font-display">行前與每日行程安排</h2>
            <p className="text-xs sm:text-sm text-[#717171]">點擊天數切換行程表，支持按照分類過濾與地圖跳轉</p>
          </div>
          {isEditing && (
            <button
              onClick={handleAddDay}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#1A1A1A] hover:bg-black/80 text-white rounded-md text-xs font-semibold cursor-pointer transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> 增加一天
            </button>
          )}
        </div>

        {/* Day Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-black/5 pb-3">
          {itinerary.map((day, index) => {
            const isSelected = index === selectedDayIndex;
            return (
              <div key={day.dayNumber} className="relative group flex items-center">
                <button
                  onClick={() => setSelectedDayIndex(index)}
                  className={`px-4 py-2 rounded-md text-xs transition-all flex flex-col items-center justify-center min-w-[76px] cursor-pointer ${
                    isSelected
                      ? 'bg-[#1A1A1A] text-[#FAF9F6] font-semibold shadow-sm'
                      : 'bg-white hover:bg-neutral-50 text-[#717171] border border-black/5'
                  }`}
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider opacity-90">DAY {day.dayNumber}</span>
                  <span className="text-[10px] font-medium opacity-85">{day.date.substring(5)}</span>
                </button>
                {isEditing && itinerary.length > 1 && (
                  <button
                    onClick={() => handleDeleteDay(index)}
                    className="absolute -top-1.5 -right-1.5 p-0.5 rounded-full bg-red-500 text-white hover:bg-red-600 shadow-md cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                    title="刪除這一天"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Day Theme & Date Inputs */}
      {currentDay && (
        <div className="bg-white border border-black/5 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">
                DAY {currentDay.dayNumber} Focus
              </span>
              {isEditing && (
                <input
                  id={`edit-day-date-${currentDay.dayNumber}`}
                  type="date"
                  value={currentDay.date}
                  onChange={(e) => handleUpdateDayDate(e.target.value)}
                  className="bg-white border border-black/15 rounded px-2 py-0.5 text-xs text-[#1A1A1A] focus:outline-none"
                />
              )}
            </div>
            {isEditing ? (
              <input
                id={`edit-day-theme-${currentDay.dayNumber}`}
                type="text"
                value={currentDay.theme}
                onChange={(e) => handleUpdateDayTheme(e.target.value)}
                className="w-full bg-white border border-black/15 rounded-lg px-3 py-1.5 text-base text-[#1A1A1A] font-bold focus:outline-none focus:border-black"
                placeholder="輸入本日主題"
              />
            ) : (
              <h3 className="text-xl font-light font-display text-[#1A1A1A] leading-tight">
                {currentDay.theme || "本日行程"}
              </h3>
            )}
          </div>

          {/* Category Filter Badges */}
          <div className="flex flex-wrap gap-1.5 shrink-0">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer transition-all ${
                categoryFilter === 'all'
                  ? 'bg-[#1A1A1A] text-white'
                  : 'bg-white hover:bg-neutral-50 text-[#717171] border border-black/5'
              }`}
            >
              全部
            </button>
            {Object.keys(CATEGORY_MAP).map((catKey) => {
              const key = catKey as ActivityCategory;
              const config = CATEGORY_MAP[key];
              const isActive = categoryFilter === key;
              return (
                <button
                  key={key}
                  onClick={() => setCategoryFilter(key)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer transition-all flex items-center gap-1 ${
                    isActive
                      ? `${config.bg} ${config.color} border border-transparent font-bold shadow-sm`
                      : 'bg-white hover:bg-neutral-50 text-[#717171] border border-black/5'
                  }`}
                >
                  <config.icon className="w-3 h-3" />
                  <span>{config.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Itinerary Timeline */}
      <div className="relative border-l border-black/10 ml-4 pl-6 sm:pl-8 py-2 space-y-8">
        <AnimatePresence mode="popLayout">
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-10 text-center"
            >
              <Compass className="w-10 h-10 text-slate-300 mx-auto mb-3 stroke-[1.5]" />
              <p className="text-slate-400 text-sm">此分類下目前暫無行程安排。</p>
            </motion.div>
          ) : (
            filteredItems.map((item, index) => {
              const catConfig = CATEGORY_MAP[item.category] || CATEGORY_MAP.sightseeing;
              const IconComp = catConfig.icon;
              const isItemEditing = editingItemId === item.id;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="relative group"
                >
                  {/* Category Bullet Indicator */}
                  <span className={`absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full border bg-white ${catConfig.border} ${catConfig.color} shadow-sm z-10 transition-transform group-hover:scale-110`}>
                    <IconComp className="h-3 w-3" />
                  </span>

                  {/* Timeline Entry Card */}
                  <div className="bg-white rounded-xl border border-black/5 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all relative">
                    
                    {/* Top row: Time, Title and Delete Controls */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 border-b border-black/5 pb-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {isItemEditing ? (
                          <input
                            id={`edit-item-time-${item.id}`}
                            type="text"
                            value={item.time}
                            onChange={(e) => handleUpdateItemInline(item.id, 'time', e.target.value)}
                            className="border border-black/15 bg-white rounded-md px-2 py-1 text-xs text-[#1A1A1A] font-mono focus:outline-none w-24"
                          />
                        ) : (
                          <div className="flex items-center gap-1 text-[#717171] font-mono text-xs font-semibold uppercase tracking-wider bg-black/5 px-2 py-0.5 rounded">
                            <Clock className="w-3 h-3 text-[#717171]" />
                            {item.time}
                          </div>
                        )}

                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${catConfig.bg} ${catConfig.color}`}>
                          {isItemEditing ? (
                            <select
                              id={`edit-item-cat-${item.id}`}
                              value={item.category}
                              onChange={(e) => handleUpdateItemInline(item.id, 'category', e.target.value as ActivityCategory)}
                              className="bg-transparent focus:outline-none cursor-pointer text-[#1A1A1A]"
                            >
                              {Object.keys(CATEGORY_MAP).map(key => (
                                <option key={key} value={key} className="text-[#1A1A1A]">
                                  {CATEGORY_MAP[key as ActivityCategory].label}
                                </option>
                              ))}
                            </select>
                          ) : (
                            catConfig.label
                          )}
                        </span>

                        {/* Cost Badge */}
                        {isItemEditing ? (
                          <input
                            id={`edit-item-cost-${item.id}`}
                            type="text"
                            value={item.cost || ''}
                            onChange={(e) => handleUpdateItemInline(item.id, 'cost', e.target.value)}
                            className="border border-black/15 bg-white rounded-md px-2 py-1 text-xs text-[#1A1A1A] focus:outline-none w-24"
                            placeholder="花費/門票"
                          />
                        ) : (
                          item.cost && (
                            <span className="text-[10px] bg-[#FAF4EB] text-[#96641E] px-2 py-0.5 rounded border border-[#F1E4D0]/50 font-medium">
                              💰 {item.cost}
                            </span>
                          )
                        )}
                      </div>

                      {/* Admin action triggers */}
                      {isEditing && (
                        <div className="flex items-center gap-2 text-xs">
                          <button
                            onClick={() => setEditingItemId(isItemEditing ? null : item.id)}
                            className="px-2 py-0.5 text-[#717171] hover:text-[#1A1A1A] rounded hover:bg-black/5 cursor-pointer font-medium"
                          >
                            {isItemEditing ? '完成' : '編輯'}
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-1 text-[#717171] hover:text-red-500 rounded hover:bg-red-50 cursor-pointer"
                            title="刪除行程"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="space-y-2">
                      {isItemEditing ? (
                        <div className="space-y-2 pt-1">
                          <input
                            id={`edit-item-title-${item.id}`}
                            type="text"
                            value={item.title}
                            onChange={(e) => handleUpdateItemInline(item.id, 'title', e.target.value)}
                            className="w-full border border-black/15 bg-white rounded-lg px-2.5 py-1 text-sm font-semibold focus:outline-none focus:border-black text-[#1A1A1A]"
                            placeholder="活動名稱"
                          />
                          <input
                            id={`edit-item-loc-${item.id}`}
                            type="text"
                            value={item.location}
                            onChange={(e) => handleUpdateItemInline(item.id, 'location', e.target.value)}
                            className="w-full border border-black/15 bg-white rounded-lg px-2.5 py-1 text-sm focus:outline-none focus:border-black text-[#1A1A1A]"
                            placeholder="地點"
                          />
                          <textarea
                            id={`edit-item-desc-${item.id}`}
                            value={item.description}
                            onChange={(e) => handleUpdateItemInline(item.id, 'description', e.target.value)}
                            className="w-full border border-black/15 bg-white rounded-lg p-2 text-xs focus:outline-none focus:border-black text-[#1A1A1A] min-h-[60px]"
                            placeholder="活動描述"
                          />
                          <input
                            id={`edit-item-maps-${item.id}`}
                            type="text"
                            value={item.googleMapsUrl || ''}
                            onChange={(e) => handleUpdateItemInline(item.id, 'googleMapsUrl', e.target.value)}
                            className="w-full border border-black/15 bg-white rounded-lg px-2.5 py-1 text-xs focus:outline-none"
                            placeholder="Google 地圖導航網址"
                          />
                        </div>
                      ) : (
                        <>
                          <h4 className="text-base font-semibold text-[#1A1A1A] leading-snug">
                            {item.title}
                          </h4>
                          
                          {/* Location with map link */}
                          {item.location && (
                            <div className="flex items-center gap-1 text-xs font-semibold text-[#717171]">
                              <MapPin className="w-3.5 h-3.5 text-[#717171] shrink-0" />
                              <span className="truncate max-w-sm">{item.location}</span>
                              {item.googleMapsUrl && (
                                <a
                                  href={item.googleMapsUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-red-500 hover:text-red-600 p-0.5 inline-flex items-center gap-0.5 hover:underline ml-1"
                                >
                                  地圖 ↗
                                </a>
                              )}
                            </div>
                          )}

                          <p className="text-sm text-[#717171] leading-relaxed font-normal whitespace-pre-line">
                            {item.description}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Add New Item Panel */}
      {isEditing && (
        <div className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm mt-6">
          <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-widest mb-4 flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-[#1A1A1A]" /> 新增 DAY {currentDay?.dayNumber} 行程項目
          </h3>
          <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#717171] mb-1">時間 (例如 09:00 - 10:30)：</label>
                <input
                  id="form-item-time"
                  type="text"
                  value={newItemTime}
                  onChange={(e) => setNewItemTime(e.target.value)}
                  placeholder="e.g., 09:00 - 10:30"
                  className="w-full bg-white border border-black/15 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-black text-[#1A1A1A]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#717171] mb-1">行程名稱：</label>
                <input
                  id="form-item-title"
                  type="text"
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  placeholder="e.g., 淺草寺參拜、雷門合照"
                  className="w-full bg-white border border-black/15 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-black text-[#1A1A1A]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#717171] mb-1">行程分類：</label>
                <select
                  id="form-item-cat"
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value as ActivityCategory)}
                  className="w-full bg-white border border-black/15 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-black cursor-pointer text-[#1A1A1A]"
                >
                  {Object.keys(CATEGORY_MAP).map(key => (
                    <option key={key} value={key}>
                      {CATEGORY_MAP[key as ActivityCategory].label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#717171] mb-1">預估花費 / 門票費 (選填)：</label>
                <input
                  id="form-item-cost"
                  type="text"
                  value={newItemCost}
                  onChange={(e) => setNewItemCost(e.target.value)}
                  placeholder="e.g., 約 1,500 日圓 / 門票已付款"
                  className="w-full bg-white border border-black/15 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-black text-[#1A1A1A]"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#717171] mb-1">地點名稱 (選填)：</label>
                <input
                  id="form-item-location"
                  type="text"
                  value={newItemLocation}
                  onChange={(e) => setNewItemLocation(e.target.value)}
                  placeholder="e.g., 淺草寺雷門"
                  className="w-full bg-white border border-black/15 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-black text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#717171] mb-1">Google 地圖連結 URL (選填)：</label>
                <input
                  id="form-item-maps"
                  type="text"
                  value={newItemMapsUrl}
                  onChange={(e) => setNewItemMapsUrl(e.target.value)}
                  placeholder="https://maps.google.com/?q=..."
                  className="w-full bg-white border border-black/15 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-black text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#717171] mb-1">行程詳細說明：</label>
                <textarea
                  id="form-item-desc"
                  value={newItemDescription}
                  onChange={(e) => setNewItemDescription(e.target.value)}
                  placeholder="在此輸入活動詳情、注意事項、必吃或必看內容..."
                  className="w-full bg-white border border-black/15 rounded-lg p-2.5 text-sm focus:outline-none focus:border-black text-[#1A1A1A] min-h-[90px]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2 bg-[#1A1A1A] hover:bg-black/80 text-white font-semibold rounded-lg text-sm transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> 新增行程項目
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
