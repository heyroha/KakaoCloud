import { useState } from "react";

export default function SearchBar() {
  const [hotel] = useState("호텔 파라다이스");
  const [checkIn, setCheckIn] = useState("2025-08-16");
  const [checkOut, setCheckOut] = useState("2025-08-17");
  const [adult, setAdult] = useState(2);
  const [child, setChild] = useState(0);

  const submit = (e) => {
    e.preventDefault();
    alert(
      `${hotel}\n${checkIn} ~ ${checkOut}\n성인 ${adult} / 어린이 ${child}`
    );
  };

  return (
    <section className="searchbar" aria-label="상품 검색">
      <form className="searchbar__grid" onSubmit={submit}>
        <div className="field">
          <label>호텔/시설 선택</label>
          <button type="button" className="select-like">
            {hotel} <span className="caret">▾</span>
          </button>
        </div>

        <div className="field">
          <label>체크인 / 체크아웃</label>
          <div className="dates">
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
            <span>—</span>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label>성인</label>
          <input
            type="number"
            min="1"
            value={adult}
            onChange={(e) => setAdult(+e.target.value)}
          />
        </div>

        <div className="field">
          <label>어린이</label>
          <input
            type="number"
            min="0"
            value={child}
            onChange={(e) => setChild(+e.target.value)}
          />
        </div>

        <div className="actions">
          <button className="primary" type="submit">
            상품 검색
          </button>
        </div>
      </form>
    </section>
  );
}
