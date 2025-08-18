// src/components/Footer/Footer.jsx
import { useState } from "react";
import "./Footer.css";

export default function Footer() {
  const [open, setOpen] = useState(false);

  return (
    <footer className="pc-footer">
      <div className="pc-footer__inner">
        {/* 좌측: 고객센터 */}
        <section className="footer-col footer-left">
          <h3 className="footer-heading">CUSTOMER CENTER</h3>
          <ul className="cc-list">
            <li>
              <span>객실예약</span>
              <strong>032-729-2000</strong>
            </li>
            <li>
              <span>Tel.</span>
              <strong>1833-8855</strong>
            </li>
            <li>
              <span>Fax</span>
              <a href="#!">032-729-2100</a>
            </li>
            <li>
              <span>E-mail</span>
              <a href="mailto:p-city@paradian.com">p-city@paradian.com</a>
            </li>
          </ul>

          <nav className="policy-links" aria-label="policy">
            {[
              "개인정보 처리 방침",
              "위치정보 이용약관",
              "영상정보처리기기 운영 · 관리방침",
              "이용약관",
              "ABOUT US",
              "채용안내",
              "오시는 길",
              "사이트맵",
            ].map((txt) => (
              <a key={txt} href="#!">
                {txt}
              </a>
            ))}
          </nav>

          <div className="company-info">
            ㈜파라다이스세가사미 | 대표이사 : 최종환 | 인천광역시 중구
            영종해안남로 321번길 186
            <br />
            사업자 등록번호 : 121-86-18441 | 통신판매업 신고
            2017-인천중구-0027호
            <br />
            Copyright © 2018 - 2025 PARADISE SEGASAMMY Co. Ltd. All rights
            reserved.
          </div>
        </section>

        {/* 우측: 패밀리 사이트 + 배지/앱스토어/소셜 */}
        <section className="footer-col footer-right">
          <div className="family-wrap">
            <button
              type="button"
              className={`family-btn ${open ? "open" : ""}`}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              Family site ::after{" "}
              <span className="caret">{open ? "^" : "^"}</span>
            </button>
            {open && (
              <ul className="family-list">
                <li>
                  <a href="#!">Paradise City</a>
                </li>
                <li>
                  <a href="#!">CIMER</a>
                </li>
                <li>
                  <a href="#!">Art Space</a>
                </li>
              </ul>
            )}
          </div>

          <ul className="badge-row" aria-label="certifications">
            <li className="badge">VERIFIED</li>
            <li className="badge">Forbes ★★★</li>
            <li className="badge">ICR</li>
          </ul>

          <ul className="store-row" aria-label="apps & social">
            <li>
              <a href="#!" className="store">
                Google Play
              </a>
            </li>
            <li>
              <a href="#!" className="store">
                App Store
              </a>
            </li>
            <li>
              <a href="#!" className="sns">
                Instagram
              </a>
            </li>
            <li>
              <a href="#!" className="sns">
                Blog
              </a>
            </li>
            <li>
              <a href="#!" className="sns">
                YouTube
              </a>
            </li>
          </ul>
        </section>
      </div>
    </footer>
  );
}
