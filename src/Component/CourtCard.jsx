import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../css/courtCard.css";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { useState, useEffect } from "react";
import CourtService from "../../services/court-service";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth-service";

const CourtCard = () => {
  const navigate = useNavigate();
  const [courtData, setCourtData] = useState(null);
  //處理詳細資訊按鈕
  const handleToCourtInfo = () => {
    navigate("/court");
  };

  //獲得local-storage使用者身份資料
  const user = AuthService.getCurrentUser();
  let userRole;
  if (user) {
    userRole = user.user.role;
  }

  //處理新增球場按鈕
  const linkToAddCourt = () => {
    navigate("/AddCourt");
  };

  //向伺服器請求所有球場資料
  useEffect(() => {
    CourtService.getAllCourts()
      .then((data) => {
        // console.log(data.data);

        setCourtData(data.data);
        // console.log(data.data[0].courtName);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  //
  return (
    <div className="grid grid-cols-3 gap-x-20 gap-y-14">
      {courtData &&
        courtData.length != 0 &&
        courtData.map((court) => {
          return (
            <div
              key={court._id}
              className="courtCard w-full overflow-hidden rounded-2xl bg-[#123659]"
            >
              <figure>
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
                    <img src="../../pic/courtCard/figure-1.png" alt="" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="../../pic/courtCard/figure-2.png" alt="" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="../../pic/courtCard/figure-3.png" alt="" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="../../pic/courtCard/figure-4.png" alt="" />
                  </SwiperSlide>
                </Swiper>
              </figure>
              <div className="flex flex-col gap-y-4 px-6 py-4">
                <div className="flex justify-between">
                  <h3 className="text-xl text-[#FFCC66]">{court.courtName}</h3>
                  <div className="flex gap-x-2">
                    <img src="../../pic/courtCard/star.svg" alt="" />
                    <span className="leading-[28px] text-white">
                      {court.score}
                    </span>
                  </div>
                </div>
                <hr className="border-[#0492D9]" />
                <p className="text-[#FFFFFF]/70">
                  <span>球場數：</span>
                  <span>{court.courtType}</span>
                </p>
                <figure className="flex gap-x-2">
                  <span>{court.traffic}</span>
                  {court.isPark ? (
                    <img src="./pic/courtCard/parking_true.svg"></img>
                  ) : (
                    <img src="./pic/courtCard/parking_false.svg"></img>
                  )}
                  {court.isBus ? (
                    <img src="./pic/courtCard/bus_true.svg"></img>
                  ) : (
                    <img src="./pic/courtCard/bus_false.svg"></img>
                  )}
                  {court.isMRT ? (
                    <img src="./pic/courtCard/mrt_true.svg"></img>
                  ) : (
                    <img src="./pic/courtCard/mrt_false.svg"></img>
                  )}
                  <img src="../../pic/courtCard/parking.svg" alt="" />
                  <img src="../../pic/courtCard/bus.svg" alt="" />
                  <img src="../../pic/courtCard/mrt.svg" alt="" />
                </figure>
                <div className="flex justify-between text-white">
                  <button
                    onClick={handleToCourtInfo}
                    className="rounded-3xl border-2 border-[#FFF]/50 bg-[#0492D9] px-6 py-2 text-[14px] hover:bg-[#009EED]"
                  >
                    詳細資訊
                  </button>
                  <button className="rounded-3xl border-2 border-[#FFF]/50 bg-[#0492D9] px-6 py-2 text-[14px] hover:bg-[#009EED]">
                    前往球場
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      {user && userRole == "admin" && (
        <button onClick={linkToAddCourt} className="text-white">
          管理球場
        </button>
      )}
    </div>
  );
};

export default CourtCard;