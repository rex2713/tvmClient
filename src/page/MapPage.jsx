import React from "react";
import CourtCard from "../Component/CourtCard";
import CourtSearch from "../Component/CourtSearch";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

const MapPage = () => {
  window.scrollTo(0, 0);
  return (
    <main>
      <section className="flex flex-col items-center justify-center gap-6 bg-gradient-to-b from-[#082A4D] to-[#000000] pt-28">
        {/* 球場輪播圖 */}
        <figure className="h-[45vh] w-full overflow-hidden">
          <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img src="../../pic/courtPic/outdoorA/outdoorA1.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src=".../../pic/courtPic/outdoorA/outdoorA2.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="../../pic/courtPic/outdoorA/outdoorA3.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="../../pic/courtPic/outdoorA/outdoorA4.jpg" alt="" />
            </SwiperSlide>
          </Swiper>
        </figure>
        {/* 球場內容 */}
        <div className="flex w-[80vw] flex-col items-center justify-center gap-20 rounded-t-3xl bg-[#082A4D] px-20 py-5">
          <section className="flex w-full px-10">
            {/* 資訊文字 */}
            <article className="w-7/12">
              {/* 球場標題 */}
              <div className="my-8 flex items-center gap-6">
                <img
                  className="h-12 w-12"
                  src="../../pic/icon/ball_green.svg"
                  alt=""
                />
                <h2 className="text-4xl font-black tracking-[.15rem] text-white">
                  綠寶石公園
                </h2>
                <div className="flex items-center gap-2">
                  <img
                    className="h-6 w-6"
                    src="../../pic/icon/star.svg"
                    alt=""
                  />
                  <p className="text-2xl font-black tracking-[.15rem] text-white">
                    4.8
                  </p>
                </div>
              </div>
              {/* 詳細資訊 */}
              <div className="my-4 flex text-xl tracking-wider text-white/70">
                <p className="w-[6.5rem] font-bold">開放時間</p>
                <p>24小時</p>
              </div>
              <div className="my-4 flex text-xl tracking-wider text-white/70">
                <p className="w-[6.5rem] font-bold">球場數</p>
                <p>4座 (男網2座/女網2座)</p>
              </div>
              <div className="my-4 flex text-xl tracking-wider text-white/70">
                <p className="w-[6.5rem] font-bold">地址</p>
                <p>234新北市永和區環河西路二段</p>
              </div>
              <div className="my-4 flex text-xl tracking-wider text-white/70">
                <p className="w-[6.5rem] font-bold">交通</p>
                <p>捷運頂溪站</p>
              </div>
              <div className="my-4 flex text-xl tracking-wider text-white/70">
                <p className="w-[6.5rem] font-bold">停車場</p>
                <p>綠寶石區汽機車停車場</p>
              </div>
              <div className="my-4 flex text-xl tracking-wider text-white/70">
                <p className="w-[6.5rem] font-bold">費用</p>
                <p>免費</p>
              </div>
            </article>
            {/* Google地圖 */}
            <div className="mt-8 h-80 w-5/12 rounded-xl bg-white py-1"></div>
          </section>
          {/* 加入隊伍 */}
          <section className="flex w-full flex-col items-center justify-center gap-5">
            <h3 className="text-2xl font-bold text-[#FFCC66]">加入隊伍</h3>
            <div className="no-scrollbar flex w-full justify-start gap-[1.5vw] overflow-x-auto">
              {/* 隊伍 */}
              <button className="h-45 flex w-56 shrink-0 flex-col items-center justify-center rounded-xl border border-transparent bg-[#011E37] p-4 duration-300 hover:border-white/30 hover:bg-[#01213d]">
                <h4 className="w-full text-center text-xl font-black tracking-widest text-white">
                  Team-Apple
                </h4>
                <h5 className="text-l w-full text-center font-black tracking-widest text-[#FFE8A3]">
                  12/1(五)-下午
                </h5>
                <p className="my-2 w-full text-center text-white/70">
                  徵求: 主攻、攔中
                </p>
                <p className="w-4/5 rounded-full border border-transparent bg-[#0492D9] py-1 tracking-widest text-white">
                  加入隊伍
                </p>
              </button>
              <button className="h-45 flex w-56 shrink-0 flex-col items-center justify-center rounded-xl border border-transparent bg-[#011E37] p-4 duration-300 hover:border-white/30 hover:bg-[#01213d]">
                <h4 className="w-full text-center text-xl font-black tracking-widest text-white">
                  Team-Apple
                </h4>
                <h5 className="text-l w-full text-center font-black tracking-widest text-[#FFE8A3]">
                  12/1(五)-下午
                </h5>
                <p className="my-2 w-full text-center text-white/70">
                  徵求: 主攻、攔中
                </p>
                <p className="w-4/5 rounded-full border border-transparent bg-[#0492D9] py-1 tracking-widest text-white">
                  加入隊伍
                </p>
              </button>
              <button className="h-45 flex w-56 shrink-0 flex-col items-center justify-center rounded-xl border border-transparent bg-[#011E37] p-4 duration-300 hover:border-white/30 hover:bg-[#01213d]">
                <h4 className="w-full text-center text-xl font-black tracking-widest text-white">
                  Team-Apple
                </h4>
                <h5 className="text-l w-full text-center font-black tracking-widest text-[#FFE8A3]">
                  12/1(五)-下午
                </h5>
                <p className="my-2 w-full text-center text-white/70">
                  徵求: 主攻、攔中
                </p>
                <p className="w-4/5 rounded-full border border-transparent bg-[#0492D9] py-1 tracking-widest text-white">
                  加入隊伍
                </p>
              </button>
              <button className="h-45 flex w-56 shrink-0 flex-col items-center justify-center rounded-xl border border-transparent bg-[#011E37] p-4 duration-300 hover:border-white/30 hover:bg-[#01213d]">
                <h4 className="w-full text-center text-xl font-black tracking-widest text-white">
                  Team-Apple
                </h4>
                <h5 className="text-l w-full text-center font-black tracking-widest text-[#FFE8A3]">
                  12/1(五)-下午
                </h5>
                <p className="my-2 w-full text-center text-white/70">
                  徵求: 主攻、攔中
                </p>
                <p className="w-4/5 rounded-full border border-transparent bg-[#0492D9] py-1 tracking-widest text-white">
                  加入隊伍
                </p>
              </button>
              <button className="h-45 flex w-56 shrink-0 flex-col items-center justify-center rounded-xl border border-transparent bg-[#011E37] p-4 duration-300 hover:border-white/30 hover:bg-[#01213d]">
                <h4 className="w-full text-center text-xl font-black tracking-widest text-white">
                  Team-Apple
                </h4>
                <h5 className="text-l w-full text-center font-black tracking-widest text-[#FFE8A3]">
                  12/1(五)-下午
                </h5>
                <p className="my-2 w-full text-center text-white/70">
                  徵求: 主攻、攔中
                </p>
                <p className="w-4/5 rounded-full border border-transparent bg-[#0492D9] py-1 tracking-widest text-white">
                  加入隊伍
                </p>
              </button>
              <button className="h-45 flex w-56 shrink-0 flex-col items-center justify-center rounded-xl border border-transparent bg-[#011E37] p-4 duration-300 hover:border-white/30 hover:bg-[#01213d]">
                <h4 className="w-full text-center text-xl font-black tracking-widest text-white">
                  Team-Apple
                </h4>
                <h5 className="text-l w-full text-center font-black tracking-widest text-[#FFE8A3]">
                  12/1(五)-下午
                </h5>
                <p className="my-2 w-full text-center text-white/70">
                  徵求: 主攻、攔中
                </p>
                <p className="w-4/5 rounded-full border border-transparent bg-[#0492D9] py-1 tracking-widest text-white">
                  加入隊伍
                </p>
              </button>
              <button className="h-45 flex w-56 shrink-0 flex-col items-center justify-center rounded-xl border border-transparent bg-[#011E37] p-4 duration-300 hover:border-white/30 hover:bg-[#01213d]">
                <h4 className="w-full text-center text-xl font-black tracking-widest text-white">
                  Team-Apple
                </h4>
                <h5 className="text-l w-full text-center font-black tracking-widest text-[#FFE8A3]">
                  12/1(五)-下午
                </h5>
                <p className="my-2 w-full text-center text-white/70">
                  徵求: 主攻、攔中
                </p>
                <p className="w-4/5 rounded-full border border-transparent bg-[#0492D9] py-1 tracking-widest text-white">
                  加入隊伍
                </p>
              </button>
            </div>
          </section>
          {/* 場地評論 */}
          <section className="flex w-full flex-col items-center justify-center gap-5 px-10">
            <h3 className="text-2xl font-bold text-[#FFCC66]">場地評價</h3>
            {/* 撰寫評論 */}
            <div className="flex w-full items-center gap-10 rounded-xl bg-[#011E37] px-16 py-5 tracking-widest text-white/50">
              <img
                className="h-14 w-14 shrink-0 rounded-full bg-white bg-clip-border"
                src="../../pic/icon/member/no login.png"
                alt=""
              />
              <form action="" className="flex w-full items-center gap-4">
                <input type="text" className="rounded-xl h-10 w-full bg-white/20 px-4 focus:bg-white/90 focus:text-black/90" placeholder="撰寫評論" />
                <button type="submit" className="flex w-10 h-10 bg-white/20 rounded-full hover:bg-[#0492D9] ">
                  <div className="w-10 h-10 flex opacity-20 hover:opacity-100 justify-center items-center">
                    <img className="w-6 h-6 " src="../../pic/icon/send.svg" alt="" />
                  </div>
                </button>
              </form>
            </div>
            {/* 其他評論 */}
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <div className="flex w-full items-center gap-10 rounded-xl bg-[#011E37] px-16 py-5 tracking-widest text-white/50">
                <img
                  className="h-14 w-14 shrink-0 rounded-full bg-white bg-clip-border"
                  src="../../pic/icon/member/girl1.png"
                  alt=""
                />
                <p>
                  場地乾淨整潔，場地乾淨整潔，場地乾淨整潔，場地乾淨整潔，場地乾淨整潔，場地乾淨整潔，場地乾淨整潔。
                </p>
              </div>
              <div className="flex w-full items-center gap-10 rounded-xl bg-[#011E37] px-16 py-5 tracking-widest text-white/50">
                <img
                  className="h-14 w-14 shrink-0 rounded-full bg-white bg-clip-border"
                  src="../../pic/icon/member/men5.png"
                  alt=""
                />
                <p>
                  場地乾淨整潔，場地乾淨整潔，場地乾淨整潔，場地乾淨整潔，場地乾淨整潔，場地乾淨整潔，場地乾淨整潔，場地乾淨整潔，場地乾淨整潔，場地乾淨整潔，場地乾淨整潔，場地乾淨整潔，場地乾淨整潔，場地乾淨整潔，場地乾淨整潔，場地乾淨整潔，場地乾淨整潔，場地乾淨整潔，場地乾淨整潔，場地乾淨整潔。
                </p>
              </div>
              <div className="flex w-full items-center gap-10 rounded-xl bg-[#011E37] px-16 py-5 tracking-widest text-white/50">
                <img
                  className="h-14 w-14 shrink-0 rounded-full bg-white bg-clip-border"
                  src="../../pic/icon/member/girl2.png"
                  alt=""
                />
                <p>
                  場地乾淨整潔，，場地乾淨整潔，場地乾淨整潔，場地乾淨整潔。
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* <div className="h-[120px] w-full bg-gradient-to-b from-[#082A4D] to-[#000000]"></div> */}
      <section className="flex h-screen items-center justify-center bg-gradient-to-b from-[#082A4D] to-[#000000]  px-[5vw] pb-10 pt-28">
        <div className="relative flex h-full w-full justify-center ">
          {/* 行政區快速跳轉 */}
          <div className="absolute top-0 flex w-full justify-center gap-x-4 bg-transparent py-4 text-base">
            <button className="rounded-full border border-transparent bg-black/70 px-5 py-1 text-sm tracking-[0.2rem] text-white duration-500 hover:border-white/50 hover:bg-black hover:text-white">
              中正區
            </button>
            <button className="rounded-full border border-transparent bg-black/70 px-5 py-1 text-sm tracking-[0.2rem] text-white duration-500 hover:border-white/50 hover:bg-black hover:text-white">
              中山區
            </button>
            <button className="rounded-full border border-transparent bg-black/70 px-5 py-2 text-sm tracking-[0.2rem] text-white duration-500 hover:border-white/50 hover:bg-black hover:text-white">
              大同區
            </button>
            <button className="rounded-full border border-transparent bg-black/70 px-5 py-2 text-sm tracking-[0.2rem] text-white duration-500 hover:border-white/50 hover:bg-black hover:text-white">
              大安區
            </button>
            <button className="rounded-full border border-transparent bg-black/70 px-5 py-2 text-sm tracking-[0.2rem] text-white duration-500 hover:border-white/50 hover:bg-black hover:text-white">
              松山區
            </button>
            <button className="rounded-full border border-transparent bg-black/70 px-5 py-2 text-sm tracking-[0.2rem] text-white duration-500 hover:border-white/50 hover:bg-black hover:text-white">
              信義區
            </button>
            <button className="rounded-full border border-transparent bg-black/70 px-5 py-2 text-sm tracking-[0.2rem] text-white duration-500 hover:border-white/50 hover:bg-black hover:text-white">
              北投區
            </button>
            <button className="rounded-full border border-transparent bg-black/70 px-5 py-2 text-sm tracking-[0.2rem] text-white duration-500 hover:border-white/50 hover:bg-black hover:text-white">
              萬華區
            </button>
          </div>
          {/* 地圖 */}
          <div className="no-scrollbar h-full overflow-scroll rounded-3xl">
            <div className="w-[400vw]">
              <img className="map" src="../pic/map.jpg" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-y-10 bg-gradient-to-b from-[#082A4D] to-[#000000] px-60 py-10">
        <CourtSearch />
        <div className="grid grid-cols-3 gap-x-20 gap-y-14 ">
          <CourtCard />
          <CourtCard />
          <CourtCard />
          <CourtCard />
          <CourtCard />
          <CourtCard />
          <CourtCard />
          <CourtCard />
          <CourtCard />
          <CourtCard />
          <CourtCard />
          <CourtCard />
        </div>
      </section>
    </main>
  );
};

export default MapPage;
