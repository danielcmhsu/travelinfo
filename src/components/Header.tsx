import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Bell, User } from 'lucide-react';
import { TripInfo } from '../types';

interface HeaderProps {
  tripData: TripInfo;
  isEditing: boolean;
  onUpdateHeader: (title: string, subtitle: string, destination: string, announcement: string, bannerUrl: string) => void;
}

export default function Header({ tripData, isEditing, onUpdateHeader }: HeaderProps) {
  const [countdownText, setCountdownText] = useState('');

  // Calculate countdown
  useEffect(() => {
    const calculateCountdown = () => {
      const start = new Date(tripData.startDate + 'T00:00:00');
      const now = new Date();
      const diffTime = start.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 0) {
        setCountdownText(`距離旅行還有 ${diffDays} 天！`);
      } else if (diffDays === 0) {
        setCountdownText('🎉 旅行就是今天！出發囉！');
      } else {
        const end = new Date(tripData.endDate + 'T23:59:59');
        if (now.getTime() <= end.getTime()) {
          setCountdownText('✈️ 正在享受精彩的旅程中！');
        } else {
          setCountdownText('💝 精彩旅程已圓滿結束，留下滿滿回憶！');
        }
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 60000); // update every minute
    return () => clearInterval(interval);
  }, [tripData.startDate, tripData.endDate]);

  return (
    <div id="header-section" className="bg-[#FAF9F6] text-[#1A1A1A] font-sans pt-12 pb-8 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Editorial Header Layout */}
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-3 flex-1"
          >
            {/* Destination Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/5 border border-black/5 text-xs font-semibold tracking-wider uppercase text-[#717171]">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              {isEditing ? (
                <input
                  id="edit-destination"
                  type="text"
                  value={tripData.destination}
                  onChange={(e) => onUpdateHeader(tripData.title, tripData.subtitle, e.target.value, tripData.announcement, tripData.bannerUrl)}
                  className="bg-transparent border-b border-black/30 focus:border-black focus:outline-none py-0.5 text-[#1A1A1A] w-48 font-sans"
                  placeholder="目的地"
                />
              ) : (
                <span>{tripData.destination}</span>
              )}
            </div>

            {/* Trip Title & Subtitle */}
            {isEditing ? (
              <div className="space-y-2 max-w-2xl">
                <input
                  id="edit-title"
                  type="text"
                  value={tripData.title}
                  onChange={(e) => onUpdateHeader(e.target.value, tripData.subtitle, tripData.destination, tripData.announcement, tripData.bannerUrl)}
                  className="bg-transparent border-b border-black/30 focus:border-[#1A1A1A] focus:outline-none py-1 text-3xl sm:text-5xl font-light font-display text-[#1A1A1A] w-full"
                  placeholder="旅程主題"
                />
                <input
                  id="edit-subtitle"
                  type="text"
                  value={tripData.subtitle}
                  onChange={(e) => onUpdateHeader(tripData.title, e.target.value, tripData.destination, tripData.announcement, tripData.bannerUrl)}
                  className="bg-transparent border-b border-black/20 focus:border-[#1A1A1A] focus:outline-none py-1 text-base text-[#717171] w-full"
                  placeholder="副標題"
                />
                <div className="pt-2">
                  <label className="block text-xs text-[#717171] font-semibold mb-1">封面圖片網址 (Unsplash 或任意圖片)：</label>
                  <input
                    id="edit-banner-url"
                    type="text"
                    value={tripData.bannerUrl}
                    onChange={(e) => onUpdateHeader(tripData.title, tripData.subtitle, tripData.destination, tripData.announcement, e.target.value)}
                    className="bg-white border border-black/15 rounded-md px-2 py-1.5 text-xs text-[#1A1A1A] w-full focus:outline-none focus:border-black"
                    placeholder="圖片網址"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-1.5">
                <h1 className="text-4xl sm:text-6xl font-light font-display tracking-tight text-[#1A1A1A] leading-tight">
                  {tripData.title}
                </h1>
                <p className="text-sm sm:text-base text-[#717171] uppercase tracking-[0.2em] font-normal leading-relaxed max-w-3xl">
                  {tripData.subtitle}
                </p>
              </div>
            )}

            {/* Dates & Countdown */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1.5 text-xs sm:text-sm text-[#717171]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#1A1A1A]" />
                <span className="font-semibold bg-black/5 px-2.5 py-1 rounded-md text-[#1A1A1A]">
                  {tripData.startDate} &mdash; {tripData.endDate}
                </span>
              </div>
              <div className="font-medium text-red-500 bg-red-50 border border-red-100 px-3 py-1 rounded-md uppercase tracking-wider text-xs">
                {countdownText}
              </div>
            </div>
          </motion.div>

          {/* Simple Participants Indicator (Top-Right) */}
          <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0 border-t md:border-t-0 border-black/5 pt-4 md:pt-0">
            <span className="text-[10px] uppercase tracking-widest text-[#717171] font-semibold">TOUR LEADER</span>
            <div className="flex -space-x-2">
              {tripData.groupMembers.map((member, index) => (
                <img
                  key={index}
                  src={member.avatarUrl}
                  alt={member.name}
                  className="w-8 h-8 rounded-full border-2 border-[#FAF9F6] object-cover"
                  title={`${member.name} (${member.role})`}
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
          </div>
        </header>

        {/* Elegant Rounded Cover Image Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="relative w-full h-48 sm:h-64 md:h-80 rounded-2xl overflow-hidden border border-black/5 shadow-sm mb-8"
        >
          <img
            src={tripData.bannerUrl || 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80'}
            alt={tripData.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* Info Cards Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Announcement Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-2 bg-white border border-black/5 rounded-2xl p-6 shadow-sm flex gap-4 items-start"
          >
            <div className="p-2.5 rounded-lg bg-red-50 text-red-500 border border-red-100 shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div className="space-y-2 w-full">
              <h3 className="text-xs font-bold tracking-widest text-[#1A1A1A] uppercase">行前核心廣播</h3>
              {isEditing ? (
                <textarea
                  id="edit-announcement"
                  value={tripData.announcement}
                  onChange={(e) => onUpdateHeader(tripData.title, tripData.subtitle, tripData.destination, e.target.value, tripData.bannerUrl)}
                  className="w-full bg-white border border-black/15 rounded-lg p-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-black min-h-[80px]"
                  placeholder="輸入給團員的公告..."
                />
              ) : (
                <p className="text-sm text-[#717171] leading-relaxed font-normal whitespace-pre-line">
                  {tripData.announcement || "暫無公告資訊。"}
                </p>
              )}
            </div>
          </motion.div>

          {/* Group Roster Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white border border-black/5 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xs font-bold tracking-widest text-[#1A1A1A] uppercase mb-4 flex items-center gap-1.5">
                <User className="w-4 h-4" /> 領隊聯絡資訊
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {tripData.groupMembers.map((member, index) => (
                  <div key={index} className="flex items-center gap-2 bg-[#FAF9F6] p-2 rounded-lg border border-black/5">
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="w-8 h-8 rounded-full border border-black/5 object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#1A1A1A] truncate">{member.name}</p>
                      <p className="text-[10px] text-[#717171] truncate">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
