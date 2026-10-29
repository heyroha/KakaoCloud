// client와 server가 함께 쓰는 API 타입 정의

export type SlideType = "image" | "video";

export interface Slide {
  id: number;
  type: SlideType;
  src: string;
  title: string;
  sub?: string;
}

export const HOTELS = ["호텔 파라다이스", "호텔 아트 파라디소"] as const;
export type Hotel = (typeof HOTELS)[number];

export interface SearchRequest {
  hotel: Hotel;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  adult: number;
  child: number;
}

export interface Room {
  id: string;
  hotel: Hotel;
  name: string;
  maxGuests: number;
  pricePerNight: number;
}

export interface RoomOffer extends Room {
  totalPrice: number;
}

export interface SearchResult {
  nights: number;
  rooms: RoomOffer[];
}

export interface ApiError {
  message: string;
}
