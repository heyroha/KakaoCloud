import nav from "../../data/nav";

export default function Header() {
  return (
    <div>
      {/*띠 배너 */}
      <div className="swiper bandBannerWrap on">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <a href="https://www.p-city.com/front/notice/detail?N_SEQ=1164">
              <div className="bandbox">
                <div className="bandcontent">
                  <div className="bandgrp">
                    <div className="bandmbr">
                      <div className="bandBanerFontArea">
                        <span className="bandBanerFont content">
                          <p>[공지] 아트 스페이스 전시기간 및 휴관일정 안내</p>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/*헤더 영역 */}
      <header className="headerWrap" class="bn0n">
        {/*파시티 메인 로고 */}
        <h1>
          <a href="https://www.p-city.com/front?language=KO">PARADISE CITY</a>
        </h1>

        {/*gnb 영역 시작*/}

        <nav className="gnb" aria-label="global">
          <ul>
            {nav.map((m) => (
              <li key={m.label}>
                <a href={m.href}>{m.label}</a>
              </li>
            ))}
            <li className="apGnb">
              ::before<a href="#!">art paradiso</a>
            </li>
          </ul>
        </nav>

        <div className="topLink">
          <div className="more">
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
          </div>

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
        {/*gnb 영역 끝 */}
      </header>
    </div>
  );
}
