import nav from "../../data/nav";

export default function Header() {
  return (
    <header className="pc-header">
      <div className="pc-header__inner">
        <h1>
          <a href="https://www.p-city.com/front?language=KO">PARADISE CITY</a>
        </h1>
        <nav className="gnb" aria-label="global">
          <ul>
            {nav.map((m) => (
              <li key={m.label}>
                <a href={m.href}>{m.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="top-links">
          <ul>
            <li>
              {" "}
              <a href="#!">로그인</a>
            </li>
            <li>
              <a href="#!">회원가입</a>
            </li>
            <li>
              <a href="#!">예약 확인</a>
            </li>
            <li>
              <a href="#!">고객지원</a>
            </li>
            <li>
              <a href="#!">멤버십</a>{" "}
            </li>
          </ul>
          <div className="dropdown eshop">
            ::before
            <a href="#!">"E-SHOP" ::after</a>
          </div>
          <div className="dropdown language">
            ::before
            <a href="#!">" KR "::after</a>
          </div>
          <div class="offer">
            <a href="#!" className="btn btnFull">
              예약하기
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
