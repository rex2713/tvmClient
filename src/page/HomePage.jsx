import React from "react";
import TeamSearchBar from "../Component/TeamSearchBar";
// import HpTeamCard from "../Component/HpTeamCard";
import NewsLink from "../Component/NewsLink";
import CupGame from "../Component/CupGame";
import IndexTitle from "../Component/IndexTitle";
import Loading from "../Component/Loading";
import ScrollAnimate from "../Component/ScrollAnimate";
import Map from "../Component/Map";
import { useState, useEffect, useRef } from "react";
import AuthService from "../../services/auth-service";
import "../css/main.css";

const HomePage = () => {
  useEffect(() => {
    //處理永久硬碟複製
    AuthService.copyRenderDisk()
      .then(() => {
        console.log("成功複製RenderDisk資料");
      })
      .catch((e) => {
        console.error("複製RenderDisk失敗:" + e);
      });
  }, []);
  // loading動畫延遲5秒
  const [delayLoading, setDelayLoading] = useState(true);
  setTimeout(() => {
    setDelayLoading(false);
  }, 6000);

  const [indexDelayLoading, setIndexDelayLoading] = useState(true);
  setTimeout(() => {
    setIndexDelayLoading(false);
  }, 2100);

  //確認是否為首次載入頁面
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    const hasShowLoading = sessionStorage.getItem("hasShowLoading");
    if (!hasShowLoading) {
      //沒有此屬性代表為首次登入，正常顯示並將hasShowLoading屬性存入sessionStorage
      sessionStorage.setItem("hasShowLoading", "true");
    } else {
      //設定不顯示開頭動畫以及立即顯示IndexTitle
      setShowLoading(false);
      setIndexDelayLoading(false);
    }
  }, []);

  // 點擊按鈕滾動至指定元素
  const ref = useRef(null);
  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/*<!-- 主要內容 -->*/}
      <main className="relative ">
        {/* 首頁-主視覺 */}
        <section className="relative h-screen bg-[url('../../pic/homepage-bg.jpg')] bg-cover px-20">
          {/* <div className="relative flex h-160 justify-around"> */}
          {/* <div className="absolute left-0 z-10 h-full"> */}
          {/* <div className="h-[100px]"></div> */}
          <div className="">
            <div className="absolute left-0 top-0 z-20 w-full ">
              {showLoading && (delayLoading ? <Loading /> : <></>)}
            </div>
            <div className="absolute left-0 top-0 h-full w-full">
              {indexDelayLoading ? <></> : <IndexTitle />}
            </div>
          </div>
          <button
            onClick={handleClick}
            className="h-30 absolute bottom-6 right-[5vw] flex w-20 items-center justify-center overflow-visible rounded-full bg-transparent duration-500 hover:bg-white/5"
          >
            <ScrollAnimate />
          </button>
        </section>
        {/* 首頁-地圖 */}
        <section
          ref={ref}
          className="flex h-screen items-center justify-center bg-gradient-to-b from-[#082A4D] to-[#000000] px-[5vw] pb-10 pt-28"
        >
          <Map />
        </section>

        {/* 首頁-隊伍 */}
        <section className="flex h-screen w-full overflow-hidden bg-[url('../pic/team_bg.svg')] bg-cover px-[5vw]">
          <div className="flex h-screen w-full justify-center">
            {/* 左半裝飾字-Teams */}
            <h2 className="h-screen w-[15vw] font-['Ubuntu'] text-bg font-bold leading-none text-white [text-orientation:sideways] [text-shadow:5px_-5px_#74D3E5] [writing-mode:vertical-lr]">
              Teams
            </h2>
            {/* 右半內容區 */}
            <div className="flex w-[70vw] flex-col items-center justify-center">
              {/* 上半部篩選器 */}
              <div className="h-30 mb-16 w-full ">
                <TeamSearchBar />
              </div>
              {/* 下半部TeamCard */}

              {/* <HpTeamCard /> */}
            </div>
          </div>
        </section>
        {/* 首頁-最新消息*/}
        <section className="flex h-screen w-full  bg-gradient-to-b from-[#026D8A] via-[#01405E] to-[#030b17] px-[5vw]">
          <div className="flex w-full flex-row-reverse items-center justify-center">
            <h2 className="h-screen w-[12vw] overflow-hidden font-['Ubuntu'] text-bg font-bold leading-none text-white [text-orientation:sideways] [text-shadow:5px_-5px_#74D3E5] [writing-mode:vertical-lr]">
              News
            </h2>
            <div className="flex w-[70vw] flex-col  items-center justify-center gap-y-4 px-20">
              <h3 className="w-full text-2xl font-bold text-[#FFCC66]">
                熱門新聞
              </h3>
              <NewsLink />
              <h3 className="mt-4 w-full text-2xl font-bold text-[#FFCC66]">
                盃賽資訊
              </h3>
              <div className="no-scrollbar flex w-full justify-start gap-10 overflow-x-auto">
                <CupGame cardWidth={"w-1/3 shrink-0 "} />
                <CupGame cardWidth={"w-1/3 shrink-0 "} />
                <CupGame cardWidth={"w-1/3 shrink-0 "} />
                <CupGame cardWidth={"w-1/3 shrink-0 "} />
                <CupGame cardWidth={"w-1/3 shrink-0 "} />
                <CupGame cardWidth={"w-1/3 shrink-0 "} />
                <CupGame cardWidth={"w-1/3 shrink-0 "} />
                <CupGame cardWidth={"w-1/3 shrink-0 "} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default HomePage;
