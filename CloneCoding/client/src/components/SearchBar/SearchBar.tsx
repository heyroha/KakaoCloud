import { useState, type FormEvent } from "react";
import { HOTELS, type Hotel, type SearchRequest, type SearchResult } from "../../../../shared/types";
import { searchRooms } from "../../api/client";

// 기준 날짜에서 n일 뒤를 로컬 날짜 YYYY-MM-DD 로.
// toISOString() 은 UTC 라서 한국 시간 오전 9시 전에는 하루 이른 날짜가 나왔다.
function dateAfter(days: number, from: Date | string = new Date()): string {
  const d = typeof from === "string" ? new Date(`${from}T00:00:00`) : new Date(from);
  d.setDate(d.getDate() + days);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function SearchBar() {
  const [form, setForm] = useState<SearchRequest>({
    hotel: HOTELS[0],
    checkIn: dateAfter(1),
    checkOut: dateAfter(2),
    adult: 2,
    child: 0,
  });
  // 결과와 함께 '검색한 조건'을 저장해, 검색 후 폼을 바꿔도 결과 제목이 바뀌지 않게 한다
  const [result, setResult] = useState<{ query: SearchRequest; data: SearchResult } | null>(null);
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
      const query = form;
      setResult({ query, data: await searchRooms(query) });
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
              min={dateAfter(0)}
              value={form.checkIn}
              onChange={(e) => update("checkIn", e.target.value)}
            />
            <span>—</span>
            <input
              aria-label="체크아웃"
              type="date"
              min={form.checkIn ? dateAfter(1, form.checkIn) : undefined}
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
            {result.query.hotel} · {result.data.nights}박 · 예약 가능 객실 {result.data.rooms.length}개
          </h3>
          {result.data.rooms.length === 0 ? (
            <p>조건에 맞는 객실이 없습니다.</p>
          ) : (
            <ul>
              {result.data.rooms.map((room) => (
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
