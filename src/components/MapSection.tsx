import { useState } from 'react';
import { Map, HelpCircle, ExternalLink, Compass, Navigation, Info, ChevronDown, ChevronUp, LocateFixed } from 'lucide-react';
import { TripInfo } from '../types';

interface MapSectionProps {
  tripData: TripInfo;
  isEditing: boolean;
  onUpdateMapUrl: (url: string) => void;
}

export default function MapSection({ tripData, isEditing, onUpdateMapUrl }: MapSectionProps) {
  const [showGuide, setShowGuide] = useState(false);
  const [localUrlInput, setLocalUrlInput] = useState(tripData.myMapsIframeUrl || '');

  // Flatten all itinerary items into a chronological waypoint list
  const waypoints = tripData.itinerary.flatMap(day => 
    day.items.map(item => ({
      dayNumber: day.dayNumber,
      time: item.time,
      title: item.title,
      location: item.location,
      googleMapsUrl: item.googleMapsUrl,
      category: item.category
    }))
  ).filter(wp => wp.location); // Only show ones with listed locations

  const handleSaveUrl = () => {
    let cleanUrl = localUrlInput.trim();
    // Support parsing iframe src from raw <iframe> tags
    if (cleanUrl.startsWith('<iframe')) {
      const match = cleanUrl.match(/src="([^"]+)"/);
      if (match && match[1]) {
        cleanUrl = match[1];
      }
    }
    onUpdateMapUrl(cleanUrl);
  };

  // 使用者目前位置（按下「定位」後取得），用來把景點連結改成「從你的位置導航過去」
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [geoStatus, setGeoStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const handleLocate = () => {
    if (!('geolocation' in navigator)) {
      setGeoStatus('error');
      return;
    }
    setGeoStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGeoStatus('idle');
      },
      () => setGeoStatus('error'),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // 從景點連結（?q=地名）或 location 文字取出目的地，組成 Google Maps 路線連結
  const buildDirectionsUrl = (wp: { googleMapsUrl?: string; location: string; title: string }) => {
    let dest = '';
    if (wp.googleMapsUrl) {
      const m = wp.googleMapsUrl.match(/[?&]q=([^&]+)/);
      if (m) dest = decodeURIComponent(m[1].replace(/\+/g, ' '));
    }
    if (!dest) dest = wp.location || wp.title;
    const origin = userCoords ? `${userCoords.lat},${userCoords.lng}` : '';
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(dest)}`;
  };

  return (
    <section id="map-section" className="bg-white rounded-2xl border border-black/5 shadow-sm p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-50 text-red-500 rounded-xl border border-red-100/50">
            <Map className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1A1A1A] font-display">旅行路線與景點地圖</h2>
            <p className="text-xs sm:text-sm text-[#717171]">串聯整趟行程的必訪地標，支持 Google My Maps 互動地圖嵌入</p>
          </div>
        </div>

        {/* Info button */}
        <button
          onClick={() => setShowGuide(!showGuide)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-black/5 hover:bg-black/10 border border-black/5 text-xs text-[#1A1A1A] font-semibold cursor-pointer transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-[#717171]" />
          <span>地圖嵌入教學</span>
          {showGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Embedded Map Guide Section */}
      {showGuide && (
        <div className="bg-[#FAF9F6] rounded-xl border border-black/5 p-4 sm:p-5 text-sm text-[#1A1A1A] space-y-3">
          <h3 className="font-bold flex items-center gap-1.5 text-red-500 text-sm font-display">
            <Info className="w-4.5 h-4.5 text-red-500" /> 如何在網頁中嵌入您自己的「Google 我的地圖」？
          </h3>
          <ol className="list-decimal pl-5 space-y-2 text-xs text-[#717171] leading-relaxed font-normal">
            <li>造訪 <a href="https://www.google.com/maps/about/mymaps/" target="_blank" rel="noopener noreferrer" className="underline font-bold text-red-500 hover:text-red-600">Google My Maps ↗</a>，並點選「開始建立」。</li>
            <li>建立您專屬的旅遊地圖，將飯店、每日景點與餐廳依序「新增地標」並規劃連線。</li>
            <li>點選地圖左側控制面板的「分享」，將地圖權限設定為「<b>任何知道連結的人都可以查看</b>」。</li>
            <li>點選「分享」旁邊的三個小點（選單按鈕），選擇「<b>嵌入我的網站 (Embed on my site)</b>」。</li>
            <li>複製出現的 <code>&lt;iframe src="..."&gt;</code> 程式碼（或直接複製 src 裡面的連結網址）。</li>
            <li>在下方編輯欄位中直接貼上該段代碼，點選「儲存地圖連結」即可即時更換為您的客製化地圖！</li>
          </ol>
        </div>
      )}

      {/* Map URL Editor */}
      {isEditing && (
        <div className="bg-[#FAF9F6] rounded-xl p-4 border border-black/5 space-y-3">
          <div>
            <label className="block text-xs font-bold text-[#717171] mb-1">
              Google Maps 或 My Maps 嵌入代碼/連結：
            </label>
            <div className="flex gap-2">
              <input
                id="edit-map-iframe-url"
                type="text"
                value={localUrlInput}
                onChange={(e) => setLocalUrlInput(e.target.value)}
                placeholder="貼上 <iframe> 網頁代碼 或 Google Maps Embed URL"
                className="flex-1 bg-white border border-black/15 rounded px-3 py-1.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-black"
              />
              <button
                onClick={handleSaveUrl}
                className="px-3 py-1.5 bg-[#1A1A1A] hover:bg-black/80 text-white rounded text-xs font-semibold cursor-pointer shrink-0 transition-colors"
              >
                儲存地圖連結
              </button>
            </div>
          </div>
          <p className="text-[10px] text-[#717171] font-normal leading-tight">
            * 支援標準 Google 地圖、Google 街景服務以及 Google 我的地圖 (My Maps) 的共用嵌入連結。
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Map Display (Iframe) */}
        <div className="lg:col-span-8 bg-black/5 rounded-xl overflow-hidden border border-black/5 min-h-[350px] sm:min-h-[420px] relative flex shadow-inner">
          {tripData.myMapsIframeUrl ? (
            <iframe
              id="trip-embed-map"
              src={tripData.myMapsIframeUrl}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer"
              title="Trip Waypoints Map"
            />
          ) : (
            <div className="m-auto text-center p-8 max-w-sm space-y-2">
              <Compass className="w-12 h-12 text-[#717171] mx-auto stroke-[1.5] animate-spin-slow" />
              <h4 className="font-bold text-[#1A1A1A] font-display">暫無嵌入地圖</h4>
              <p className="text-xs text-[#717171] leading-relaxed font-normal">
                目前尚未設定地圖連結。點選右上角的「地圖嵌入教學」來新增一個，或者可以在下方列表查看所有景點導航！
              </p>
            </div>
          )}
        </div>

        {/* Waypoints Navigation list */}
        <div className="lg:col-span-4 bg-[#FAF9F6] border border-black/5 rounded-xl p-4 flex flex-col justify-between">
          <div className="space-y-3 flex-1 overflow-y-auto max-h-[330px] sm:max-h-[360px] pr-1 scrollbar-thin">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-widest flex items-center gap-1.5">
                <Navigation className="w-4.5 h-4.5 text-red-500" /> 行程景點清單 ({waypoints.length})
              </h3>
              <button
                onClick={handleLocate}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-colors cursor-pointer shrink-0 ${
                  userCoords
                    ? 'bg-red-500 text-white border-red-500'
                    : 'bg-white text-[#1A1A1A] border-black/10 hover:border-black/30'
                }`}
                title="取得你目前位置，景點導航將從你的位置出發"
              >
                <LocateFixed className={`w-3.5 h-3.5 ${geoStatus === 'loading' ? 'animate-pulse' : ''} ${userCoords ? '' : 'text-red-500'}`} />
                {geoStatus === 'loading' ? '定位中…' : userCoords ? '已定位' : '定位'}
              </button>
            </div>
            {geoStatus === 'error' && (
              <p className="text-[10px] text-red-500 font-medium -mt-1">無法取得位置，請確認已允許瀏覽器定位權限。</p>
            )}
            {userCoords && (
              <p className="text-[10px] text-[#2D5A27] font-medium -mt-1">已定位 · 點景點的導航圖示即可從你的位置出發規劃路線。</p>
            )}

            <div className="space-y-2">
              {waypoints.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#717171]">
                  行前行程中目前暫無明確地標。
                </div>
              ) : (
                waypoints.map((wp, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between gap-3 p-2.5 rounded-lg bg-white border border-black/5 hover:border-black/15 transition-colors"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/5 text-[#1A1A1A] uppercase font-mono">
                          D{wp.dayNumber} {wp.time.split(' ')[0]}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-[#1A1A1A] truncate">{wp.title}</h4>
                      <p className="text-[10px] text-[#717171] truncate">{wp.location}</p>
                    </div>

                    {(wp.googleMapsUrl || userCoords) && (
                      <a
                        href={userCoords ? buildDirectionsUrl(wp) : wp.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md hover:bg-black/5 text-red-500 hover:text-red-600 transition-colors shrink-0"
                        title={userCoords ? `從你的位置導航到 ${wp.title}` : `前往 ${wp.title} 的導航`}
                      >
                        {userCoords ? <Navigation className="w-3.5 h-3.5" /> : <ExternalLink className="w-3.5 h-3.5" />}
                      </a>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="border-t border-black/5 pt-3 mt-3 text-[10px] text-[#717171] font-normal leading-relaxed">
            💡 出遊時先按上方<b>「定位」</b>允許取用位置，再點各景點的<b>導航圖示</b>，即可用手機 Google Maps 從你目前的位置直接規劃前往該點的路線與距離。
          </div>
        </div>
      </div>
    </section>
  );
}
