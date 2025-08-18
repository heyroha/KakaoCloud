import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    type: "image",
    src: "https://www.p-city.com/upload_file/202507/1752744777561.png",
    title: "",
    sub: "조엘 메슬러의 감각적인 아트로 물든 트로피컬 서머!",
  },
  {
    id: 2,
    type: "image",
    src: "https://www.p-city.com/upload_file/202507/1753346491248.png",
    title: "TRPOPICAL MEDIA FACADE SHOW With Joel Mesler",
    sub: "낭만적인 여름밤 미디어 파사드 쇼",
  },
  {
    id: 3,
    type: "video",
    src: "https://www.p-city.com/upload_file/202504/1745830105346.mp4",
    title: "Special Offer",
    sub: "Only this week",
  },
];

export default function Hero() {
  return (
    <section className="hero">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, A11y]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        a11y={{ prevSlideMessage: "이전", nextSlideMessage: "다음" }}
      >
        {slides.map((s) => (
          <SwiperSlide key={s.id}>
            <div className="hero__slide">
              {s.type === "image" ? (
                <img src={s.src} alt="" className="hero__bg" />
              ) : (
                <video
                  src={s.src}
                  className="hero__bg"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              )}
              <div className="hero__copy">
                <h2>{s.title}</h2>
                {s.sub && <p>{s.sub}</p>}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
