import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Home.css";
import Slide2 from "./slides/Slide2";
import Slide3 from "./slides/Slide3";
import Slide1 from "./slides/Slide1";

function Home() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper min-h-screen"
      >
        <SwiperSlide>
          <Slide1 />
        </SwiperSlide>

        <SwiperSlide>
          <Slide2 />
        </SwiperSlide>

        <SwiperSlide>
          <Slide3 />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Home;
