import { Router } from "express";
import { HOTELS, type ApiError, type SearchRequest, type SearchResult } from "../../../shared/types";
import { rooms } from "../data/rooms";

export const reservationsRouter = Router();

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const DAY_MS = 24 * 60 * 60 * 1000;

// 요청 본문을 검사해서 올바르면 SearchRequest, 아니면 에러 메시지를 돌려준다
export function parseSearchRequest(body: unknown): SearchRequest | string {
  if (typeof body !== "object" || body === null) return "요청 형식이 올바르지 않습니다.";
  const { hotel, checkIn, checkOut, adult, child } = body as Record<string, unknown>;

  if (!HOTELS.includes(hotel as SearchRequest["hotel"])) return "존재하지 않는 호텔입니다.";
  if (typeof checkIn !== "string" || !DATE_RE.test(checkIn)) return "체크인 날짜가 올바르지 않습니다.";
  if (typeof checkOut !== "string" || !DATE_RE.test(checkOut)) return "체크아웃 날짜가 올바르지 않습니다.";
  if (Date.parse(checkOut) <= Date.parse(checkIn)) return "체크아웃은 체크인 다음 날 이후여야 합니다.";
  if (!Number.isInteger(adult) || (adult as number) < 1) return "성인은 1명 이상이어야 합니다.";
  if (!Number.isInteger(child) || (child as number) < 0) return "어린이 수가 올바르지 않습니다.";

  return { hotel: hotel as SearchRequest["hotel"], checkIn, checkOut, adult: adult as number, child: child as number };
}

reservationsRouter.post("/search", (req, res) => {
  const parsed = parseSearchRequest(req.body);
  if (typeof parsed === "string") {
    const error: ApiError = { message: parsed };
    res.status(400).json(error);
    return;
  }

  const nights = Math.round((Date.parse(parsed.checkOut) - Date.parse(parsed.checkIn)) / DAY_MS);
  const guests = parsed.adult + parsed.child;
  const result: SearchResult = {
    nights,
    rooms: rooms
      .filter((room) => room.hotel === parsed.hotel && room.maxGuests >= guests)
      .map((room) => ({ ...room, totalPrice: room.pricePerNight * nights })),
  };
  res.json(result);
});
