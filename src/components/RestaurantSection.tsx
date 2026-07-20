import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Utensils, MapPin, Plus, Trash2, Heart, ExternalLink, Calendar } from 'lucide-react';
import { RestaurantInfo } from '../types';

interface RestaurantSectionProps {
  restaurants: RestaurantInfo[];
  isEditing: boolean;
  onUpdateRestaurants: (updatedRestaurants: RestaurantInfo[]) => void;
  days: { dayNumber: number; date: string; region?: string }[];
}

type DayFilter = number | 'all' | 'none';

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];
const formatDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  const wd = WEEKDAYS[new Date(y, m - 1, d).getDay()];
  return `${m}/${d}(${wd})`;
};

// MM/DD（不含星期）供標籤下半行顯示
const formatShortDate = (iso: string) => {
  const [, m, d] = iso.split('-').map(Number);
  return m && d ? `${String(m).padStart(2, '0')}/${String(d).padStart(2, '0')}` : iso;
};

const todayIso = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

// 依當天日期決定預設篩選的日期；不在行程期間則回到「全部」
const getTodayDayFilter = (days: { dayNumber: number; date: string; region?: string }[]): DayFilter => {
  const today = todayIso();
  const match = days.find(d => d.date === today);
  return match ? match.dayNumber : 'all';
};

export default function RestaurantSection({ restaurants, isEditing, onUpdateRestaurants, days }: RestaurantSectionProps) {
  const [editingRestId, setEditingRestId] = useState<string | null>(null);
  const [dayFilter, setDayFilter] = useState<DayFilter>(() => getTodayDayFilter(days));

  // New Restaurant State Form
  const [newRestName, setNewRestName] = useState('');
  const [newRestDay, setNewRestDay] = useState<number | ''>('');
  const [newRestCuisine, setNewRestCuisine] = useState('');
  const [newRestPriceRange, setNewRestPriceRange] = useState<'low' | 'medium' | 'high'>('medium');
  const [newRestRecommended, setNewRestRecommended] = useState('');
  const [newRestMapsUrl, setNewRestMapsUrl] = useState('');
  const [newRestWebsite, setNewRestWebsite] = useState('');
  const [newRestImageUrl, setNewRestImageUrl] = useState('');
  const [newRestNotes, setNewRestNotes] = useState('');

  const dayInfo = new Map(days.map(d => [d.dayNumber, d]));
  const dayToDate = new Map(days.map(d => [d.dayNumber, d.date]));
  const today = todayIso();

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
      day: newRestDay === '' ? undefined : newRestDay,
      name: newRestName,
      cuisine: newRestCuisine || '推薦',
      priceRange: newRestPriceRange,
      recommendedDishes: dishes.length > 0 ? dishes : ['推薦亮點'],
      googleMapsUrl: newRestMapsUrl || undefined,
      website: newRestWebsite || undefined,
      imageUrl: newRestImageUrl || '',
      notes: newRestNotes
    };

    onUpdateRestaurants([...restaurants, newRest]);

    // Reset Form
    setNewRestName('');
    setNewRestDay('');
    setNewRestCuisine('');
    setNewRestPriceRange('medium');
    setNewRestRecommended('');
    setNewRestMapsUrl('');
    setNewRestWebsite('');
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

  // Build date filter chips: 全部 → 每個有項目的日期 → 其他 (未指定)
  const presentDays = Array.from(
    new Set(restaurants.map(r => r.day).filter((d): d is number => !!d))
  ).sort((a, b) => a - b);
  const hasUndated = restaurants.some(r => !r.day);

  const dayChips: { key: DayFilter; label?: string; dayNumber?: number }[] = [
    { key: 'all', label: '全部' },
    ...presentDays.map(d => ({ key: d as DayFilter, dayNumber: d })),
    ...(hasUndated ? [{ key: 'none' as DayFilter, label: '其他' }] : []),
  ];

  const visibleRestaurants = restaurants.filter(rest =>
    dayFilter === 'all' ? true : dayFilter === 'none' ? !rest.day : rest.day === dayFilter
  );

  // 兩行式標籤：上排 DAY N（當天顯示 TODAY），下排 MM/DD 地區
  const renderChipContent = (chip: { key: DayFilter; label?: string; dayNumber?: number }) => {
    if (chip.dayNumber == null) {
      return <span className="block px-1">{chip.label}</span>;
    }
    const info = dayInfo.get(chip.dayNumber);
    const isToday = info?.date === today;
    const bottom = info
      ? `${formatShortDate(info.date)}${info.region ? ` ${info.region}` : ''}`
      : `D${chip.dayNumber}`;
    return (
      <>
        <span className="block text-[10px] opacity-75 uppercase tracking-wider">
          {isToday ? 'TODAY' : `DAY ${chip.dayNumber}`}
        </span>
        <span className="block text-xs mt-0.5">{bottom}</span>
      </>
    );
  };

  return (
    <section id="restaurant-section" className="space-y-6">
      <div className="border-b border-black/5 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-50 text-red-500 rounded-xl border border-red-100/50">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1A1A1A] font-display">必吃必買</h2>
            <p className="text-xs sm:text-sm text-[#717171]">東北不可錯過的美食與伴手禮清單，可依日期切換查看當天的口袋名單</p>
          </div>
        </div>
      </div>

      {/* Date filter chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {dayChips.map(f => (
          <button
            key={String(f.key)}
            onClick={() => setDayFilter(f.key)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 text-center ${
              dayFilter === f.key
                ? 'bg-red-50 text-red-500 border border-red-100/60 font-bold shadow-sm'
                : 'text-[#717171] hover:text-[#1A1A1A] hover:bg-black/5'
            }`}
          >
            {renderChipContent(f)}
          </button>
        ))}
      </div>

      {/* Grid of Restaurants — 整組卡片一起淡入淡出，避免逐張進退場造成的重疊閃爍 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={String(dayFilter)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {visibleRestaurants.map((rest) => {
            const priceBadge = getPriceBadge(rest.priceRange);
            const isRestEditing = editingRestId === rest.id;
            const hasImage = !!rest.imageUrl;
            const dateLabel = rest.day && dayToDate.has(rest.day) ? formatDate(dayToDate.get(rest.day)!) : null;

            const badges = (
              <div className="flex gap-1.5 flex-wrap">
                {dateLabel && (
                  <span className="bg-white text-[#1A1A1A] text-[10px] font-bold px-2 py-1 rounded-md border border-black/10 inline-flex items-center gap-1 shadow-sm">
                    <Calendar className="w-3 h-3 text-red-500" />
                    {dateLabel}
                  </span>
                )}
                <span className="bg-[#1A1A1A] text-white text-[10px] font-semibold px-2 py-1 rounded-md">
                  {rest.cuisine}
                </span>
                <span className={`text-[10px] font-semibold px-2 py-1 rounded-md border ${priceBadge.style}`}>
                  {priceBadge.text}
                </span>
              </div>
            );

            const adminActions = isEditing && (
              <div className="flex gap-1.5 shrink-0">
                <button
                  onClick={() => setEditingRestId(isRestEditing ? null : rest.id)}
                  className="bg-[#1A1A1A] text-[#FAF9F6] hover:bg-black/80 text-xs font-semibold px-2.5 py-1 rounded-md cursor-pointer"
                >
                  {isRestEditing ? '完成' : '編輯'}
                </button>
                <button
                  onClick={() => handleDeleteRestaurant(rest.id)}
                  className="bg-red-500 text-white hover:bg-red-600 p-1.5 rounded-md cursor-pointer shadow-sm"
                  title="刪除"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );

            return (
              <div
                key={rest.id}
                className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {hasImage ? (
                    /* Photo Banner with Badges */
                    <div className="relative aspect-video bg-black/5 border-b border-black/5">
                      <img
                        src={rest.imageUrl}
                        alt={rest.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3">
                        {badges}
                      </div>
                      {adminActions && (
                        <div className="absolute top-3 right-3">{adminActions}</div>
                      )}
                    </div>
                  ) : (
                    /* Compact header (no image) */
                    <div className="flex items-start justify-between gap-2 px-5 pt-5">
                      {badges}
                      {adminActions}
                    </div>
                  )}

                  {/* Body Content */}
                  <div className={hasImage ? 'p-5 space-y-4' : 'px-5 pt-3 pb-5 space-y-4'}>
                    {isRestEditing ? (
                      <div className="space-y-2">
                        <div>
                          <label className="block text-[10px] font-bold text-[#717171] uppercase">名稱：</label>
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
                            <label className="block text-[10px] font-bold text-[#717171] uppercase">對應日期：</label>
                            <select
                              id={`edit-rest-day-${rest.id}`}
                              value={rest.day ?? ''}
                              onChange={(e) => handleUpdateField(rest.id, 'day', e.target.value === '' ? undefined : Number(e.target.value))}
                              className="w-full border border-black/15 rounded px-2 py-1 text-xs focus:outline-none focus:border-black text-[#1A1A1A]"
                            >
                              <option value="">未指定（其他）</option>
                              {days.map(d => (
                                <option key={d.dayNumber} value={d.dayNumber}>{formatDate(d.date)}</option>
                              ))}
                            </select>
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
                          <label className="block text-[10px] font-bold text-[#717171] uppercase">類型 / 風格：</label>
                          <input
                            id={`edit-rest-cuisine-${rest.id}`}
                            type="text"
                            value={rest.cuisine}
                            onChange={(e) => handleUpdateField(rest.id, 'cuisine', e.target.value)}
                            className="w-full border border-black/15 rounded px-2 py-1 text-xs focus:outline-none focus:border-black text-[#1A1A1A]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-[#717171] uppercase">圖片網址（選填）：</label>
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

                    {/* Recommended highlights */}
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-bold text-[#717171] tracking-widest uppercase flex items-center gap-1.5">
                        <Heart className="w-3 h-3 text-red-500 fill-red-500" /> 推薦亮點
                      </p>
                      {isRestEditing ? (
                        <input
                          id={`edit-rest-rec-${rest.id}`}
                          type="text"
                          value={rest.recommendedDishes.join(', ')}
                          onChange={(e) => handleUpdateField(rest.id, 'recommendedDishes', e.target.value.split(',').map(d => d.trim()))}
                          className="w-full border border-black/15 rounded px-2 py-1 text-xs focus:outline-none focus:border-black text-[#1A1A1A]"
                          placeholder="用逗號分隔（菜色 / 必買品項）"
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

                    {/* Notes */}
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-[#717171] tracking-widest uppercase">筆記 / 備註</p>
                      {isRestEditing ? (
                        <textarea
                          id={`edit-rest-notes-${rest.id}`}
                          value={rest.notes}
                          onChange={(e) => handleUpdateField(rest.id, 'notes', e.target.value)}
                          className="w-full border border-black/15 rounded p-2 text-xs focus:outline-none focus:border-black text-[#1A1A1A] min-h-[60px]"
                          placeholder="輸入推薦理由、必買重點或用餐細節"
                        />
                      ) : (
                        <p className="text-sm text-[#717171] leading-relaxed font-normal whitespace-pre-line bg-[#FAF9F6] p-3 rounded-xl border border-black/5">
                          {rest.notes || '暫無備註。'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer links */}
                {(isRestEditing || rest.website || rest.googleMapsUrl) && (
                  <div className={`px-5 pb-5 pt-2 border-t border-black/5 gap-3 text-xs ${isRestEditing ? 'flex flex-col' : 'flex items-center justify-end'}`}>
                    {!isRestEditing && (
                      <div className="flex items-center gap-3 shrink-0">
                        {rest.website && (
                          <a
                            href={rest.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-500 hover:text-red-600 font-semibold inline-flex items-center gap-0.5 hover:underline whitespace-nowrap"
                          >
                            官方網站 <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {rest.googleMapsUrl && (
                          <a
                            href={rest.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-500 hover:text-red-600 font-semibold inline-flex items-center gap-0.5 hover:underline whitespace-nowrap"
                          >
                            <MapPin className="w-3.5 h-3.5" /> 地圖導航
                          </a>
                        )}
                      </div>
                    )}
                    {isRestEditing && (
                      <div className="w-full space-y-2">
                        <div>
                          <label className="block text-[10px] text-[#717171] mb-0.5">地圖 URL：</label>
                          <input
                            id={`edit-rest-maps-${rest.id}`}
                            type="text"
                            value={rest.googleMapsUrl || ''}
                            onChange={(e) => handleUpdateField(rest.id, 'googleMapsUrl', e.target.value)}
                            className="w-full border border-black/15 rounded px-2 py-1 text-xs focus:outline-none focus:border-black text-[#1A1A1A]"
                            placeholder="https://maps.google.com/?q=..."
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-[#717171] mb-0.5">官方網站：</label>
                          <input
                            id={`edit-rest-web-${rest.id}`}
                            type="text"
                            value={rest.website || ''}
                            onChange={(e) => handleUpdateField(rest.id, 'website', e.target.value)}
                            className="w-full border border-black/15 rounded px-2 py-1 text-xs focus:outline-none focus:border-black text-[#1A1A1A]"
                            placeholder="https://..."
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

        {/* Add New Form Button card */}
        {isEditing && (
          <div
            className="bg-white rounded-2xl border border-dashed border-black/15 p-6 flex flex-col justify-between shadow-sm"
          >
            <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-[#1A1A1A]" /> 新增必吃必買地點
            </h3>
            <form onSubmit={handleAddRestaurant} className="space-y-3 text-xs text-[#717171]">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1 text-xs">名稱：</label>
                  <input
                    id="form-rest-name"
                    type="text"
                    value={newRestName}
                    onChange={(e) => setNewRestName(e.target.value)}
                    placeholder="e.g., 萩之月 / 敘敘苑"
                    className="w-full bg-white border border-black/15 rounded p-1.5 focus:outline-none focus:border-black text-[#1A1A1A]"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-xs">對應日期：</label>
                  <select
                    id="form-rest-day"
                    value={newRestDay}
                    onChange={(e) => setNewRestDay(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-white border border-black/15 rounded p-1.5 focus:outline-none focus:border-black text-[#1A1A1A]"
                  >
                    <option value="">未指定（其他）</option>
                    {days.map(d => (
                      <option key={d.dayNumber} value={d.dayNumber}>{formatDate(d.date)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1 text-xs">類型 / 風格：</label>
                  <input
                    id="form-rest-cuisine"
                    type="text"
                    value={newRestCuisine}
                    onChange={(e) => setNewRestCuisine(e.target.value)}
                    placeholder="e.g., 燒肉 / 伴手禮 / 藥妝"
                    className="w-full bg-white border border-black/15 rounded p-1.5 focus:outline-none focus:border-black text-[#1A1A1A]"
                  />
                </div>
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
                    <option value="high">豪華 $$$</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-xs">推薦亮點 (英文逗號分隔)：</label>
                <input
                  id="form-rest-rec"
                  type="text"
                  value={newRestRecommended}
                  onChange={(e) => setNewRestRecommended(e.target.value)}
                  placeholder="牛舌, 毛豆泥麻糬, 蘋果派"
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
                <label className="block font-semibold mb-1 text-xs">官方網站 (選填)：</label>
                <input
                  id="form-rest-web"
                  type="text"
                  value={newRestWebsite}
                  onChange={(e) => setNewRestWebsite(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-white border border-black/15 rounded p-1.5 focus:outline-none focus:border-black text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-xs">照片網址 (選填，留空用精簡卡)：</label>
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
                <label className="block font-semibold mb-1 text-xs">筆記與備註：</label>
                <textarea
                  id="form-rest-notes"
                  value={newRestNotes}
                  onChange={(e) => setNewRestNotes(e.target.value)}
                  placeholder="在此輸入必買重點、預訂技巧、必點心得..."
                  className="w-full bg-white border border-black/15 rounded p-1.5 focus:outline-none focus:border-black text-[#1A1A1A] min-h-[60px]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#1A1A1A] hover:bg-black/80 text-white font-semibold rounded-lg text-sm transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" /> 新增這個地點
              </button>
            </form>
          </div>
        )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
