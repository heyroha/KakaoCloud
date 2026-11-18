import { Router } from "express";
import { HOTELS, type ApiError, type SearchRequest, type SearchResult } from "../../../shared/types";
import { rooms } from "../data/rooms";

export const reservationsRouter = Router();

const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;
const DAY_MS = 24 * 60 * 60 * 1000;

// "YYYY-MM-DD" → UTC 자정 기준 일 수. 2026-02-31 처럼 달력에 없는 날짜면 null.
// (Date.parse 는 2026-02-31 을 3월 3일로 넘겨 버리고, 2026-13-01 은 NaN 이 되어 검증을 통과했다)
export function toDayNumber(value: unknown): number | null {
  if (typeof value !== "string") return null;
  const m = DATE_RE.exec(value);
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const date = new Date(Date.UTC(y, mo - 1, d));
  if (date.getUTCFullYear() !== y || date.getUTCMonth() !== mo - 1 || date.getUTCDate() !== d) return null;
  return date.getTime() / DAY_MS;
}

// 요청 본문을 검사해서 올바르면 SearchRequest, 아니면 에러 메시지를 돌려준다
export function parseSearchRequest(body: unknown): SearchRequest | string {
  if (typeof body !== "object" || body === null) return "요청 형식이 올바르지 않습니다.";
  const { hotel, checkIn, checkOut, adult, child } = body as Record<string, unknown>;

  if (!HOTELS.includes(hotel as SearchRequest["hotel"])) return "존재하지 않는 호텔입니다.";
  const inDay = toDayNumber(checkIn);
  const outDay = toDayNumber(checkOut);
  if (inDay === null) return "체크인 날짜가 올바르지 않습니다.";
  if (outDay === null) return "체크아웃 날짜가 올바르지 않습니다.";
  if (outDay <= inDay) return "체크아웃은 체크인 다음 날 이후여야 합니다.";
  if (!Number.isInteger(adult) || (adult as number) < 1) return "성인은 1명 이상이어야 합니다.";
  if (!Number.isInteger(child) || (child as number) < 0) return "어린이 수가 올바르지 않습니다.";

  return { hotel: hotel as SearchRequest["hotel"], checkIn: checkIn as string, checkOut: checkOut as string, adult: adult as number, child: child as number };
}

reservationsRouter.post("/search", (req, res) => {
  const parsed = parseSearchRequest(req.body);
  if (typeof parsed === "string") {
    const error: ApiError = { message: parsed };
    res.status(400).json(error);
    return;
  }

  const nights = (toDayNumber(parsed.checkOut) as number) - (toDayNumber(parsed.checkIn) as number);
  const guests = parsed.adult + parsed.child;
  const result: SearchResult = {
    nights,
    rooms: rooms
      .filter((room) => room.hotel === parsed.hotel && room.maxGuests >= guests)
      .map((room) => ({ ...room, totalPrice: room.pricePerNight * nights })),
  };
  res.json(result);
});
