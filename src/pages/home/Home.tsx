import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "./Home.css";
import Slide2 from "./slides/Slide2";
import Slide3 from "./slides/Slide3";
import Slide1 from "./slides/Slide1";
import { useIntersectionAnimations } from "../../hooks/useIntersectionAnimations";
import { useNavigate } from "react-router-dom";
import { useDictionary } from "../../context/DictionaryProvider";

function Home() {
  useIntersectionAnimations();
  const navigate = useNavigate();
  const { translate } = useDictionary();

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
        className="mySwiper min-h-[70vh]"
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

      <section className="w-full bg-white-a p-4">
        <div className="w-full flex flex-col md:flex-row  p-4 gap-16 justify-center items-center">
          <div
            className="flex flex-col gap-8 justify-center items-center "
            data-animate="left"
          >
            <h1 className="font-bold text-5xl max-w-2xl">
              {translate("facaLogin")}
            </h1>
            <p className="max-w-2xl">{translate("vejaMais")}</p>
            <div className="flex w-full gap-4 max-w-2xl">
              <button
                className="text-white bg-black p-2 px-4 rounded-md shadow-md cursor-pointer hover:scale-105 transition-all"
                onClick={() => navigate("/login")}
              >
                {translate("facaLoginConta")}
              </button>
              <button
                className="cursor-pointer hover:underline transition-all"
                onClick={() => navigate("/cadastro")}
              >
                {translate("semConta")}
              </button>
            </div>
          </div>
          <div className="lex justify-center items-center" data-animate="right">
            <img
              src="https://ik.imagekit.io/z8ilvvp84p/dc1ceb06-f9ec-4c14-aca7-1d35fcea5fea.jpg?updatedAt=1741878339176"
              className="w-full md:max-w-xl rounded-lg shadow-md hover:shadow-lg transition-all"
            />
          </div>
        </div>
      </section>

      <section className="w-full bg-white-a p-4">
        <div className="w-full flex flex-col md:flex-row  p-4 gap-16 justify-center items-center">
          <div className="lex justify-center items-center" data-animate="left">
            <img
              src="https://ik.imagekit.io/z8ilvvp84p/earner-illustra.png?updatedAt=1741868222393"
              className="shadow-md hover:shadow-lg transition-all"
            />
          </div>
          <div
            className="flex flex-col gap-8 justify-center items-center "
            data-animate="right"
          >
            <h1 className="font-bold text-5xl max-w-2xl">
              {translate("oferecaCaronas")}
            </h1>
            <p className="max-w-2xl">{translate("ganheDinheiroCaronas")}</p>
            <div className="flex w-full gap-4 max-w-2xl">
              <button
                className="text-white bg-black p-2 px-4 rounded-md shadow-md cursor-pointer hover:scale-105 transition-all"
                onClick={() => navigate("/viagens")}
              >
                {translate("comecar")}
              </button>
              <button
                className="cursor-pointer hover:underline transition-all"
                onClick={() => navigate("/login")}
              >
                {translate("jaTemConta")}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white-a p-4">
        <div className="w-full flex flex-col md:flex-row p-4 gap-16 justify-center items-center">
          <div
            className="flex flex-col gap-8 justify-center items-center "
            data-animate="left"
          >
            <h1 className="font-bold text-5xl max-w-2xl">
              {translate("oferecaCaronasNecessidades")}
            </h1>
            <p className="max-w-2xl">
              {translate("oferecaCaronasNecessidades")}
            </p>
            <div className="flex w-full gap-4 max-w-2xl">
              <button
                className="text-white bg-black p-2 px-4 rounded-md shadow-md cursor-pointer hover:scale-105 transition-all"
                onClick={() => navigate("/viagens")}
              >
                {translate("comecar")}
              </button>
              <button
                className="cursor-pointer hover:underline transition-all"
                onClick={() => navigate("/login")}
              >
                {translate("jaTemConta")}
              </button>
            </div>
          </div>
          <div className="lex justify-center items-center" data-animate="right">
            <img
              src="https://ik.imagekit.io/z8ilvvp84p/u4b-square.png?updatedAt=1741868222506"
              className="shadow-md hover:shadow-lg transition-all"
            />
          </div>
        </div>
      </section>

      <section className="w-full px-2 py-8 sm:py-11 bg-white-a">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-4">
          <h2 className="font-bold text-2xl md:text-4xl" data-animate="left">
            {translate("maisFacilApp")}
          </h2>
          <div className="flex flex-col w-full gap-5 md:flex-row">
            <a
              data-animate="left"
              className="flex w-full border-2 border-slate-300 px-4 py-6 bg-white items-center justify-between hover:shadow-lg duration-200 rounded-lg"
            >
              <div className="flex items-center">
                <img
                  src="https://ik.imagekit.io/z8ilvvp84p/qrcode_link.png?updatedAt=1741867671000"
                  alt="QRCODE 1"
                  className="hidden md:flex mr-4 w-1/3"
                />
                <div>
                  <h3 className="font-bold text-xl">{translate("baixeApp")}</h3>
                  <span className="hidden md:block">{translate("leiaQR")}</span>
                </div>
              </div>
              <i className="fa fa-chevron-right hover:scale-105 duration-200"></i>
            </a>
            <a
              data-animate="right"
              className="flex w-full border-2 border-slate-300 px-4 py-6 bg-white items-center justify-between hover:shadow-lg duration-200 rounded-lg"
            >
              <div className="flex items-center">
                <img
                  src="https://ik.imagekit.io/z8ilvvp84p/qrcode_link.png?updatedAt=1741867671000"
                  alt="QRCODE 2"
                  className="hidden md:flex mr-4 w-1/3"
                />
                <div>
                  <h3 className="font-bold text-xl">
                    {translate("baixeAppParceiro")}
                  </h3>
                  <span className="hidden md:block">{translate("leiaQR")}</span>
                </div>
              </div>
              <i className="fa fa-chevron-right hover:scale-105 duration-200"></i>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
