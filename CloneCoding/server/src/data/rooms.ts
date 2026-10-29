import type { Room } from "../../../shared/types";

// 실제 예약 시스템 대신 쓰는 샘플 객실 데이터 (가격은 임의 값)
export const rooms: Room[] = [
  { id: "hp-deluxe", hotel: "호텔 파라다이스", name: "디럭스 더블", maxGuests: 2, pricePerNight: 320000 },
  { id: "hp-family", hotel: "호텔 파라다이스", name: "디럭스 패밀리 트윈", maxGuests: 4, pricePerNight: 410000 },
  { id: "hp-suite", hotel: "호텔 파라다이스", name: "프리미어 스위트", maxGuests: 3, pricePerNight: 780000 },
  { id: "ap-deluxe", hotel: "호텔 아트 파라디소", name: "디럭스 킹", maxGuests: 2, pricePerNight: 450000 },
  { id: "ap-suite", hotel: "호텔 아트 파라디소", name: "아트 스위트", maxGuests: 3, pricePerNight: 900000 },
];
