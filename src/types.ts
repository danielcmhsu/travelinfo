export interface HotelInfo {
  name: string;
  address: string;
  checkInDate: string;
  checkInTime: string;
  checkOutDate: string;
  checkOutTime: string;
  bookingRef: string;
  phone: string;
  website: string;
  googleMapsUrl: string;
  imageUrl: string;
  notes: string;
  amenities: string[];
}

export type ActivityCategory = 'sightseeing' | 'food' | 'transport' | 'hotel' | 'shopping' | 'leisure';

export interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  location: string;
  category: ActivityCategory;
  description: string;
  googleMapsUrl?: string;
  cost?: string;
}

export interface ItineraryDay {
  dayNumber: number;
  date: string;
  theme: string;
  items: ItineraryItem[];
}

export interface RestaurantInfo {
  id: string;
  type?: 'food' | 'shopping'; // 未設定時視為美食，向下相容舊資料
  day?: number; // 對應行程天數 1–6；未設定=未指定
  name: string;
  cuisine: string;
  priceRange: 'low' | 'medium' | 'high';
  recommendedDishes: string[];
  address?: string;
  googleMapsUrl?: string;
  website?: string;
  imageUrl: string;
  notes: string;
}

export interface PackingItem {
  id: string;
  category: string;
  text: string;
  checked: boolean;
}

export interface GroupMember {
  name: string;
  avatarUrl: string;
  role: string;
}

export interface TripInfo {
  title: string;
  subtitle: string;
  startDate: string;
  endDate: string;
  destination: string;
  announcement: string;
  bannerUrl: string;
  myMapsIframeUrl?: string; // Standard My Maps iframe embed src url
  groupMembers: GroupMember[];
  hotels: HotelInfo[];
  itinerary: ItineraryDay[];
  restaurants: RestaurantInfo[];
  packingList: PackingItem[];
}
