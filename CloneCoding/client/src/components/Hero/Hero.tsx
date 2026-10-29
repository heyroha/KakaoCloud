import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { Slide } from "../../../../shared/types";
import { fetchSlides } from "../../api/client";

export default function Hero() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSlides()
      .then(setSlides)
      .catch((e: Error) => setError(e.message));
  }, []);

  return (
    <section className="hero">
      {error && <p className="hero__error">{error}</p>}
      {/* Swiper는 처음 마운트될 때 슬라이드 수를 세므로 데이터가 온 다음에 그림 */}
      {slides.length > 0 && (
        <Swiper
          modules={[Navigation, Pagination, Autoplay, A11y]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          rewind // 슬라이드 3장으로는 loop 모드가 동작하지 않아 마지막 → 처음으로 되감기
          a11y={{ prevSlideMessage: "이전", nextSlideMessage: "다음" }}
        >
          {slides.map((s) => (
            <SwiperSlide key={s.id}>
              <div className="hero__slide">
                {s.type === "image" ? (
                  <img src={s.src} alt="" className="hero__bg" />
                ) : (
                  <video src={s.src} className="hero__bg" autoPlay muted loop playsInline />
                )}
                <div className="hero__copy">
                  <h2>{s.title}</h2>
                  {s.sub && <p>{s.sub}</p>}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}
