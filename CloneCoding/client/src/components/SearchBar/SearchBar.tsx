import { useState, type FormEvent } from "react";
import { HOTELS, type Hotel, type SearchRequest, type SearchResult } from "../../../../shared/types";
import { searchRooms } from "../../api/client";

// 오늘 기준 n일 뒤 날짜를 YYYY-MM-DD 로
function dateAfter(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export default function SearchBar() {
  const [form, setForm] = useState<SearchRequest>({
    hotel: HOTELS[0],
    checkIn: dateAfter(1),
    checkOut: dateAfter(2),
    adult: 2,
    child: 0,
  });
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 키 이름과 값 타입이 맞지 않으면 컴파일 에러가 나도록 제네릭으로 묶음
  const update = <K extends keyof SearchRequest>(key: K, value: SearchRequest[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      setResult(await searchRooms(form));
    } catch (err) {
      setResult(null);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="searchbar" aria-label="상품 검색">
      <form className="searchbar__grid" onSubmit={submit}>
        <div className="field">
          <label htmlFor="hotel">호텔/시설 선택</label>
          <select
            id="hotel"
            className="select-like"
            value={form.hotel}
            onChange={(e) => update("hotel", e.target.value as Hotel)}
          >
            {HOTELS.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="checkIn">체크인 / 체크아웃</label>
          <div className="dates">
            <input
              id="checkIn"
              type="date"
              value={form.checkIn}
              onChange={(e) => update("checkIn", e.target.value)}
            />
            <span>—</span>
            <input
              aria-label="체크아웃"
              type="date"
              value={form.checkOut}
              onChange={(e) => update("checkOut", e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="adult">성인</label>
          <input
            id="adult"
            type="number"
            min="1"
            value={form.adult}
            onChange={(e) => update("adult", Number(e.target.value))}
          />
        </div>

        <div className="field">
          <label htmlFor="child">어린이</label>
          <input
            id="child"
            type="number"
            min="0"
            value={form.child}
            onChange={(e) => update("child", Number(e.target.value))}
          />
        </div>

        <div className="actions">
          <button className="primary" type="submit" disabled={loading}>
            {loading ? "검색 중…" : "상품 검색"}
          </button>
        </div>
      </form>

      {error && (
        <p className="search-result__error" role="alert">
          {error}
        </p>
      )}
      {result && (
        <div className="search-result">
          <h3>
            {form.hotel} · {result.nights}박 · 예약 가능 객실 {result.rooms.length}개
          </h3>
          {result.rooms.length === 0 ? (
            <p>조건에 맞는 객실이 없습니다.</p>
          ) : (
            <ul>
              {result.rooms.map((room) => (
                <li key={room.id}>
                  <span className="room-name">{room.name}</span>
                  <span className="room-guests">최대 {room.maxGuests}인</span>
                  <strong className="room-price">{room.totalPrice.toLocaleString()}원</strong>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
