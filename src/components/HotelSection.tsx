import { useState } from 'react';
import { motion } from 'motion/react';
import { Hotel, MapPin, Calendar, Clock, Phone, Globe, FileText, Check, Plus, X, Copy, Trash2 } from 'lucide-react';
import { HotelInfo } from '../types';

interface HotelSectionProps {
  hotels: HotelInfo[];
  isEditing: boolean;
  onUpdateHotels: (updatedHotels: HotelInfo[]) => void;
}

export default function HotelSection({ hotels = [], isEditing, onUpdateHotels }: HotelSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [newAmenity, setNewAmenity] = useState('');

  const hotel = hotels[activeIndex] || {
    name: "暫無住宿資料",
    address: "",
    checkInDate: "",
    checkInTime: "",
    checkOutDate: "",
    checkOutTime: "",
    bookingRef: "",
    phone: "",
    website: "",
    googleMapsUrl: "",
    imageUrl: "",
    notes: "",
    amenities: []
  };

  const handleCopyBooking = (ref: string, index: number) => {
    navigator.clipboard.writeText(ref);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleHotelChange = (key: keyof HotelInfo, value: any) => {
    const updated = hotels.map((h, idx) => {
      if (idx === activeIndex) {
        return { ...h, [key]: value };
      }
      return h;
    });
    onUpdateHotels(updated);
  };

  const handleAddAmenity = () => {
    if (newAmenity.trim() && hotel) {
      const amenities = hotel.amenities || [];
      handleHotelChange('amenities', [...amenities, newAmenity.trim()]);
      setNewAmenity('');
    }
  };

  const handleRemoveAmenity = (indexToRemove: number) => {
    const amenities = hotel.amenities || [];
    const updated = amenities.filter((_, idx) => idx !== indexToRemove);
    handleHotelChange('amenities', updated);
  };

  const handleAddHotel = () => {
    const newHotel: HotelInfo = {
      name: "新住宿飯店",
      address: "日本東北地區",
      checkInDate: "2026-07-22",
      checkInTime: "15:00",
      checkOutDate: "2026-07-23",
      checkOutTime: "11:00",
      bookingRef: "NEW-STAY-999",
      phone: "+81-00-000-0000",
      website: "",
      googleMapsUrl: "",
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      notes: "輸入給團員的飯店入住提醒...",
      amenities: ["免費高速 Wi-Fi"]
    };
    const updated = [...hotels, newHotel];
    onUpdateHotels(updated);
    setActiveIndex(updated.length - 1);
  };

  const handleDeleteHotel = (idxToDelete: number) => {
    if (hotels.length <= 1) {
      alert("請至少保留一項住宿資料！");
      return;
    }
    const updated = hotels.filter((_, idx) => idx !== idxToDelete);
    onUpdateHotels(updated);
    setActiveIndex(Math.max(0, idxToDelete - 1));
  };

  // Helper to extract a short location name for the tab labels
  const todayIso = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  };
  const today = todayIso();

  const getTabLabel = (h: HotelInfo, idx: number) => {
    const dateStr = h.checkInDate ? h.checkInDate.substring(5) : ''; // e.g. "07-22"
    const displayDate = dateStr ? dateStr.replace('-', '/') : `Night ${idx + 1}`;
    
    // Shorten name
    let shortName = "飯店";
    if (h.name.includes("仙台")) shortName = "仙台";
    else if (h.name.includes("鳴子")) shortName = "鳴子溫泉";
    else if (h.name.includes("雫石")) shortName = "雫石";
    else if (h.name.includes("十和田")) shortName = "十和田";
    else if (h.name.includes("弘前")) shortName = "弘前";
    else if (h.name.includes("青森")) shortName = "青森";
    else if (h.name.includes("溫暖的家") || h.name.includes("Sweet Home") || h.name.includes("家")) shortName = "溫暖家";
    else {
      shortName = h.name.substring(0, 5);
    }
    return `${displayDate} ${shortName}`;
  };

  return (
    <section id="hotel-section" className="bg-white rounded-2xl border border-black/5 shadow-sm p-6 sm:p-8 space-y-6">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/5 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-50 text-red-500 rounded-xl border border-red-100/50">
            <Hotel className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1A1A1A] font-display">每日住宿飯店明細 ({hotels.length} 間)</h2>
            <p className="text-xs sm:text-sm text-[#717171]">本段旅程每日下榻飯店資訊，點選夜數標籤即可切換檢視</p>
          </div>
        </div>

        {/* Dynamic Buttons for editing */}
        {isEditing && (
          <button
            onClick={handleAddHotel}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-black/80 text-white font-semibold text-xs transition-all cursor-pointer shadow-sm shrink-0"
          >
            <Plus className="w-3.5 h-3.5" /> 新增住宿地點
          </button>
        )}
      </div>

      {/* Hotel Day Tabs selector */}
      {hotels.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-black/5 scrollbar-none">
          {hotels.map((h, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div key={idx} className="flex items-center shrink-0">
                <button
                  onClick={() => setActiveIndex(idx)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-red-50 text-red-500 border border-red-100/60 font-bold shadow-sm'
                      : 'text-[#717171] hover:text-[#1A1A1A] hover:bg-black/5'
                  }`}
                >
                  <span className="block text-[10px] opacity-75 uppercase tracking-wider">{h.checkInDate === today ? 'TONIGHT' : `NIGHT ${idx + 1}`}</span>
                  <span className="block text-xs mt-0.5">{getTabLabel(h, idx)}</span>
                </button>
                
                {isEditing && hotels.length > 1 && (
                  <button
                    onClick={() => handleDeleteHotel(idx)}
                    className="p-1 text-[#717171] hover:text-red-500 rounded-full hover:bg-red-50 transition-colors ml-0.5 mr-1"
                    title="刪除此住宿"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Active Hotel Details */}
      {hotels.length === 0 ? (
        <div className="text-center py-12 text-[#717171] text-sm">
          暫無住宿資料，請點擊「新增住宿地點」開始編輯。
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Side - Hotel Image & Quick Links */}
          <div className="lg:col-span-5 space-y-5">
            <div className="relative rounded-xl overflow-hidden aspect-video sm:aspect-auto sm:h-56 bg-black/5 border border-black/5 shadow-sm">
              <img
                key={activeIndex}
                src={hotel.imageUrl || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"}
                alt={hotel.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80";
                }}
              />
              {isEditing && (
                <div className="absolute inset-0 bg-black/60 flex flex-col justify-center p-3">
                  <label className="block text-xs text-red-300 mb-1 font-semibold">修改飯店圖片連結：</label>
                  <input
                    id={`edit-hotel-image-${activeIndex}`}
                    type="text"
                    value={hotel.imageUrl || ''}
                    onChange={(e) => handleHotelChange('imageUrl', e.target.value)}
                    className="bg-white border border-black/15 text-[#1A1A1A] rounded text-xs px-2 py-1 w-full focus:outline-none focus:border-black"
                    placeholder="圖片 URL"
                  />
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-bold text-[#717171] tracking-widest uppercase">聯絡與導航資訊</h3>
                
                {/* Booking Reference Badge */}
                <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#FAF9F6] border border-black/5 text-[10px] text-[#1A1A1A] font-mono shadow-sm">
                  <span className="text-[#717171] text-[9px]">確認碼:</span>
                  {isEditing ? (
                    <input
                      id={`edit-hotel-booking-${activeIndex}`}
                      type="text"
                      value={hotel.bookingRef || ''}
                      onChange={(e) => handleHotelChange('bookingRef', e.target.value)}
                      className="bg-white border border-black/15 rounded px-1 text-[10px] text-[#1A1A1A] focus:outline-none w-20"
                    />
                  ) : (
                    <span className="font-bold text-red-500">{hotel.bookingRef || 'N/A'}</span>
                  )}
                  {!isEditing && hotel.bookingRef && (
                    <button
                      onClick={() => handleCopyBooking(hotel.bookingRef, activeIndex)}
                      className="hover:text-red-500 transition-colors p-0.5 ml-0.5"
                      title="複製預訂確認碼"
                    >
                      {copiedIndex === activeIndex ? (
                        <Check className="w-3 h-3 text-red-500" />
                      ) : (
                        <Copy className="w-3 h-3 text-[#717171] hover:text-[#1A1A1A]" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-sm text-[#717171]">
                {/* Address */}
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    {isEditing ? (
                      <input
                        id={`edit-hotel-address-${activeIndex}`}
                        type="text"
                        value={hotel.address || ''}
                        onChange={(e) => handleHotelChange('address', e.target.value)}
                        className="w-full border border-black/15 bg-white rounded px-2 py-1 text-xs focus:outline-none focus:border-black text-[#1A1A1A]"
                        placeholder="地址"
                      />
                    ) : (
                      <span className="text-[#1A1A1A] line-clamp-2 font-normal text-xs">{hotel.address || '暫無地址'}</span>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-red-500 shrink-0" />
                  <div className="flex-1 min-w-0 text-xs">
                    {isEditing ? (
                      <input
                        id={`edit-hotel-phone-${activeIndex}`}
                        type="text"
                        value={hotel.phone || ''}
                        onChange={(e) => handleHotelChange('phone', e.target.value)}
                        className="w-full border border-black/15 bg-white rounded px-2 py-1 text-xs focus:outline-none focus:border-black text-[#1A1A1A]"
                        placeholder="電話"
                      />
                    ) : hotel.phone && hotel.phone !== '-' ? (
                      <a href={`tel:${hotel.phone}`} className="text-[#1A1A1A] hover:text-red-500 hover:underline">{hotel.phone}</a>
                    ) : (
                      <span className="text-[#717171]">暫無電話資料</span>
                    )}
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-red-500 shrink-0" />
                  <div className="flex-1 min-w-0 text-xs">
                    {isEditing ? (
                      <input
                        id={`edit-hotel-website-${activeIndex}`}
                        type="text"
                        value={hotel.website || ''}
                        onChange={(e) => handleHotelChange('website', e.target.value)}
                        className="w-full border border-black/15 bg-white rounded px-2 py-1 text-xs focus:outline-none focus:border-black text-[#1A1A1A]"
                        placeholder="官方網站"
                      />
                    ) : hotel.website && hotel.website !== '-' ? (
                      <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline truncate block max-w-full font-semibold">
                        造訪官方網站 ↗
                      </a>
                    ) : (
                      <span className="text-[#717171]">暫無網站連結</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Google Maps Button */}
              {!isEditing && hotel.googleMapsUrl && (
                <a
                  href={hotel.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1A1A1A] hover:bg-black/80 text-white font-semibold text-xs transition-all shadow-sm cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  開啟 Google 地圖導航
                </a>
              )}
              {isEditing && (
                <div className="pt-1">
                  <label className="block text-xs text-[#717171] mb-1">Google 地圖連結：</label>
                  <input
                    id={`edit-hotel-maps-${activeIndex}`}
                    type="text"
                    value={hotel.googleMapsUrl || ''}
                    onChange={(e) => handleHotelChange('googleMapsUrl', e.target.value)}
                    className="w-full border border-black/15 bg-white rounded px-2 py-1 text-xs focus:outline-none focus:border-black text-[#1A1A1A]"
                    placeholder="地圖連結 URL"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Hotel Schedule, Details, Amenities */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Hotel Name */}
            <div>
              {isEditing ? (
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#717171]">飯店名稱：</label>
                  <input
                    id={`edit-hotel-name-${activeIndex}`}
                    type="text"
                    value={hotel.name || ''}
                    onChange={(e) => handleHotelChange('name', e.target.value)}
                    className="w-full border border-black/15 bg-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-black font-bold text-[#1A1A1A]"
                    placeholder="飯店名稱"
                  />
                </div>
              ) : (
                <h3 className="text-xl sm:text-2xl font-semibold font-display text-[#1A1A1A] leading-tight">
                  {hotel.name}
                </h3>
              )}
            </div>

            {/* Check-In / Check-Out Timelines */}
            <div className="grid grid-cols-2 gap-4">
              {/* Check-In */}
              <div className="bg-[#FAF9F6] rounded-xl p-4 border border-black/5 flex flex-col justify-between space-y-2">
                <div className="flex items-center gap-2 text-red-500 font-bold text-[9px] uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>入住 Check-In</span>
                </div>
                <div className="space-y-1 pt-1">
                  {isEditing ? (
                    <div className="space-y-1">
                      <input
                        id={`edit-hotel-checkin-date-${activeIndex}`}
                        type="text"
                        value={hotel.checkInDate || ''}
                        onChange={(e) => handleHotelChange('checkInDate', e.target.value)}
                        className="w-full border border-black/15 bg-white rounded p-1 text-xs focus:outline-none focus:border-black text-[#1A1A1A]"
                        placeholder="YYYY-MM-DD"
                      />
                      <input
                        id={`edit-hotel-checkin-time-${activeIndex}`}
                        type="text"
                        value={hotel.checkInTime || ''}
                        onChange={(e) => handleHotelChange('checkInTime', e.target.value)}
                        className="w-full border border-black/15 bg-white rounded p-1 text-xs focus:outline-none focus:border-black text-[#1A1A1A]"
                        placeholder="e.g. 15:00"
                      />
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-bold text-[#1A1A1A]">{hotel.checkInDate || 'N/A'}</p>
                      <p className="text-[10px] text-[#717171] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#717171]" /> {hotel.checkInTime || '15:00'} 之後
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Check-Out */}
              <div className="bg-[#FAF9F6] rounded-xl p-4 border border-black/5 flex flex-col justify-between space-y-2">
                <div className="flex items-center gap-2 text-[#1A1A1A] font-bold text-[9px] uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>退房 Check-Out</span>
                </div>
                <div className="space-y-1 pt-1">
                  {isEditing ? (
                    <div className="space-y-1">
                      <input
                        id={`edit-hotel-checkout-date-${activeIndex}`}
                        type="text"
                        value={hotel.checkOutDate || ''}
                        onChange={(e) => handleHotelChange('checkOutDate', e.target.value)}
                        className="w-full border border-black/15 bg-white rounded p-1 text-xs focus:outline-none focus:border-black text-[#1A1A1A]"
                        placeholder="YYYY-MM-DD"
                      />
                      <input
                        id={`edit-hotel-checkout-time-${activeIndex}`}
                        type="text"
                        value={hotel.checkOutTime || ''}
                        onChange={(e) => handleHotelChange('checkOutTime', e.target.value)}
                        className="w-full border border-black/15 bg-white rounded p-1 text-xs focus:outline-none focus:border-black text-[#1A1A1A]"
                        placeholder="e.g. 11:00"
                      />
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-bold text-[#1A1A1A]">{hotel.checkOutDate || 'N/A'}</p>
                      <p className="text-[10px] text-[#717171] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#717171]" /> {hotel.checkOutTime || '11:00'} 之前
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Hotel Notes */}
            <div className="space-y-2 bg-red-50/30 border border-red-500/10 rounded-xl p-4">
              <h4 className="text-[10px] font-bold text-red-500 uppercase tracking-widest">入住備註與提示</h4>
              {isEditing ? (
                <textarea
                  id={`edit-hotel-notes-${activeIndex}`}
                  value={hotel.notes || ''}
                  onChange={(e) => handleHotelChange('notes', e.target.value)}
                  className="w-full border border-black/15 bg-white rounded-lg p-2 text-xs focus:outline-none focus:border-black text-[#1A1A1A] min-h-[80px]"
                  placeholder="輸入給團員的飯店入住提醒..."
                />
              ) : (
                <p className="text-xs text-[#717171] leading-relaxed font-normal whitespace-pre-line">
                  {hotel.notes || "暫無特別備註。"}
                </p>
              )}
            </div>

            {/* Amenities Badges */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-[#717171] uppercase tracking-widest">飯店設施與特色服務</h4>
              <div className="flex flex-wrap gap-2">
                {(hotel.amenities || []).map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-[#FAF9F6] border border-black/5 text-[11px] text-[#1A1A1A] font-medium"
                  >
                    <Check className="w-3 h-3 text-red-500 shrink-0" />
                    <span>{amenity}</span>
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveAmenity(index)}
                        className="hover:bg-red-50 p-0.5 rounded text-[#1A1A1A] ml-1 cursor-pointer shrink-0"
                      >
                        <X className="w-2.5 h-2.5 text-red-500" />
                      </button>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <div className="flex items-center gap-1">
                    <input
                      id={`add-amenity-input-${activeIndex}`}
                      type="text"
                      value={newAmenity}
                      onChange={(e) => setNewAmenity(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddAmenity();
                        }
                      }}
                      placeholder="新增特色"
                      className="border border-black/15 bg-white rounded px-2 py-1 text-xs focus:outline-none focus:border-black text-[#1A1A1A] w-20"
                    />
                    <button
                      onClick={handleAddAmenity}
                      className="p-1 rounded bg-[#1A1A1A] text-white hover:bg-black/80 cursor-pointer shrink-0"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
