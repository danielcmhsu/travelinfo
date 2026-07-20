import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Hotel, Utensils, Map, Luggage, FileJson, 
  Eye, Edit3, Sparkles, ChevronUp, Github, Smartphone, HelpCircle 
} from 'lucide-react';

import Header from './components/Header';
import HotelSection from './components/HotelSection';
import ItinerarySection from './components/ItinerarySection';
import RestaurantSection from './components/RestaurantSection';
import MapSection from './components/MapSection';
import ChecklistSection from './components/ChecklistSection';
import DataManagement from './components/DataManagement';

import { defaultTripData } from './data/defaultTripData';
import { TripInfo, HotelInfo, ItineraryDay, PackingItem, RestaurantInfo } from './types';

const STORAGE_KEY = 'group_trip_planner_data';

// 依當天主題推導出簡短地區名，供必吃必買篩選標籤使用（與飯店標籤一致）
const REGION_KEYWORDS = ['仙台', '松島', '雫石', '十和田', '弘前', '青森'];
const deriveRegion = (theme: string) => REGION_KEYWORDS.find(k => theme.includes(k)) || '';

export default function App() {
  const [tripData, setTripData] = useState<TripInfo>(defaultTripData);
  const [isEditing, setIsEditing] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('itinerary');

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && parsed.title) {
          setTripData(parsed);
        }
      } catch (e) {
        console.error('Failed to parse saved trip data', e);
      }
    }
  }, []);

  // Save to LocalStorage
  const saveTripData = (newData: TripInfo) => {
    setTripData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  // Scroll to Top monitoring
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Section highlighters for active navigation
      const sections = ['hotel-section', 'itinerary-section', 'restaurant-section', 'map-section', 'checklist-section', 'data-management-section'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(sectionId.replace('-section', ''));
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll smoothly to a target section
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // height of sticky bar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id.replace('-section', ''));
    }
  };

  // Update trip general metadata (Header details)
  const handleUpdateHeader = (title: string, subtitle: string, destination: string, announcement: string, bannerUrl: string) => {
    const updated = {
      ...tripData,
      title,
      subtitle,
      destination,
      announcement,
      bannerUrl
    };
    saveTripData(updated);
  };

  // Update hotels list
  const handleUpdateHotels = (updatedHotels: HotelInfo[]) => {
    const updated = {
      ...tripData,
      hotels: updatedHotels
    };
    saveTripData(updated);
  };

  // Update full itinerary days
  const handleUpdateItinerary = (updatedItinerary: ItineraryDay[]) => {
    const updated = {
      ...tripData,
      itinerary: updatedItinerary
    };
    saveTripData(updated);
  };

  // Update restaurants array
  const handleUpdateRestaurants = (updatedRestaurants: RestaurantInfo[]) => {
    const updated = {
      ...tripData,
      restaurants: updatedRestaurants
    };
    saveTripData(updated);
  };

  // Update map iframe source
  const handleUpdateMapUrl = (url: string) => {
    const updated = {
      ...tripData,
      myMapsIframeUrl: url
    };
    saveTripData(updated);
  };

  // Update packing list items
  const handleUpdatePackingList = (updatedList: PackingItem[]) => {
    const updated = {
      ...tripData,
      packingList: updatedList
    };
    saveTripData(updated);
  };

  // Import JSON action
  const handleImportData = (newData: TripInfo) => {
    saveTripData(newData);
  };

  // Reset to default action
  const handleResetData = () => {
    saveTripData(defaultTripData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] selection:bg-[#1A1A1A] selection:text-[#FAF9F6] antialiased font-sans">
      
      {/* Dynamic Header */}
      <Header 
        tripData={tripData} 
        isEditing={isEditing} 
        onUpdateHeader={handleUpdateHeader} 
      />

      {/* Sticky Navigation & Mode Toggle Controller */}
      <div className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-black/5 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14 sm:h-16 gap-3">
          
          {/* Quick Nav Anchors */}
          <nav className="flex items-center gap-1 overflow-x-auto h-full scrollbar-none pr-4 scroll-smooth">
            <button
              onClick={() => scrollToSection('itinerary-section')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeSection === 'itinerary' 
                  ? 'bg-[#1A1A1A] text-[#FAF9F6] font-semibold' 
                  : 'text-[#717171] hover:text-[#1A1A1A] hover:bg-black/5'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>行程表</span>
            </button>
            <button
              onClick={() => scrollToSection('hotel-section')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeSection === 'hotel' 
                  ? 'bg-[#1A1A1A] text-[#FAF9F6] font-semibold' 
                  : 'text-[#717171] hover:text-[#1A1A1A] hover:bg-black/5'
              }`}
            >
              <Hotel className="w-3.5 h-3.5" />
              <span>住宿飯店</span>
            </button>
            <button
              onClick={() => scrollToSection('restaurant-section')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeSection === 'restaurant' 
                  ? 'bg-[#1A1A1A] text-[#FAF9F6] font-semibold' 
                  : 'text-[#717171] hover:text-[#1A1A1A] hover:bg-black/5'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>特色美食</span>
            </button>
            <button
              onClick={() => scrollToSection('map-section')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeSection === 'map' 
                  ? 'bg-[#1A1A1A] text-[#FAF9F6] font-semibold' 
                  : 'text-[#717171] hover:text-[#1A1A1A] hover:bg-black/5'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>互動地圖</span>
            </button>
            <button
              onClick={() => scrollToSection('checklist-section')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeSection === 'checklist' 
                  ? 'bg-[#1A1A1A] text-[#FAF9F6] font-semibold' 
                  : 'text-[#717171] hover:text-[#1A1A1A] hover:bg-black/5'
              }`}
            >
              <Luggage className="w-3.5 h-3.5" />
              <span>行李清單</span>
            </button>
            <button
              onClick={() => scrollToSection('data-management-section')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeSection === 'data-management' 
                  ? 'bg-[#1A1A1A] text-[#FAF9F6] font-semibold' 
                  : 'text-[#717171] hover:text-[#1A1A1A] hover:bg-black/5'
              }`}
            >
              <FileJson className="w-3.5 h-3.5" />
              <span>備份匯入</span>
            </button>
          </nav>

          {/* Mode Selector Pill Toggle */}
          <div className="flex items-center gap-1 bg-black/5 p-1 rounded-lg border border-black/5 shrink-0">
            <button
              onClick={() => setIsEditing(false)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                !isEditing
                  ? 'bg-white text-[#1A1A1A] shadow-sm font-semibold'
                  : 'text-[#717171] hover:text-[#1A1A1A]'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span className="hidden sm:inline">團員預覽</span>
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                isEditing
                  ? 'bg-[#1A1A1A] text-[#FAF9F6] shadow-sm font-semibold'
                  : 'text-[#717171] hover:text-[#1A1A1A]'
              }`}
            >
              <Edit3 className="w-3 h-3" />
              <span className="hidden sm:inline">行程編輯</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        
        {/* Floating Quick Action Widget for Mobile-friendly reminder */}
        {!isEditing && (
          <div className="p-4 bg-white border border-black/5 rounded-xl text-xs text-[#717171] flex items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#1A1A1A] shrink-0" />
              <p className="leading-relaxed font-normal">
                <b>💡 手機出遊神隊友：</b> 建議團員可以將本網頁加入手機主畫面（或設為書籤）。點選景點旁的「地圖導航」可直接連動 Google Maps App 開始導航。
              </p>
            </div>
          </div>
        )}

        {/* 1. Itinerary Timeline Section */}
        <div id="itinerary-section" className="scroll-mt-24">
          <ItinerarySection 
            itinerary={tripData.itinerary} 
            isEditing={isEditing} 
            onUpdateItinerary={handleUpdateItinerary} 
          />
        </div>

        {/* 2. Hotel Section */}
        <div id="hotel-section" className="scroll-mt-24">
          <HotelSection 
            hotels={tripData.hotels} 
            isEditing={isEditing} 
            onUpdateHotels={handleUpdateHotels} 
          />
        </div>

        {/* 3. Restaurant Grid Section */}
        <div id="restaurant-section" className="scroll-mt-24">
          <RestaurantSection
            restaurants={tripData.restaurants}
            isEditing={isEditing}
            onUpdateRestaurants={handleUpdateRestaurants}
            days={tripData.itinerary.map(d => ({ dayNumber: d.dayNumber, date: d.date, region: deriveRegion(d.theme) }))}
          />
        </div>

        {/* 4. Interactive Maps Section */}
        <div id="map-section" className="scroll-mt-24">
          <MapSection 
            tripData={tripData} 
            isEditing={isEditing} 
            onUpdateMapUrl={handleUpdateMapUrl} 
          />
        </div>

        {/* 5. Checklists Section */}
        <div id="checklist-section" className="scroll-mt-24">
          <ChecklistSection 
            packingList={tripData.packingList} 
            isEditing={isEditing} 
            onUpdatePackingList={handleUpdatePackingList} 
          />
        </div>

        {/* 6. Admin Data Import/Export Control Section */}
        <div id="data-management-section" className="scroll-mt-24">
          <DataManagement 
            tripData={tripData} 
            onImportData={handleImportData} 
            onResetData={handleResetData} 
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white text-[#717171] py-10 border-t border-black/5 font-sans">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-center md:text-left">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-[#1A1A1A] tracking-wide font-display">
              {tripData.title} · 旅遊指南
            </h4>
            <p className="font-normal text-[#717171]">
              響應式簡約架構。由 React, Tailwind v4 及 Lucide Icons 強力驅動。
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-1 text-[10px] text-[#717171] font-mono">
            <div>2026 行程備份服務 · 支援 HTML5 離線本機儲存</div>
            <div className="flex items-center gap-2">
              <span>Made with ❤️ for Travellers</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Trigger button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 p-3 rounded-full bg-[#1A1A1A] text-[#FAF9F6] hover:bg-black/80 transition-all z-40 cursor-pointer shadow-md"
            title="回到頂端"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
