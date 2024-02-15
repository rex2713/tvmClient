import React from "react";

const TeamCard = () => {
  return (
    <div className="flex w-[380px] shrink-0 flex-col items-center justify-center gap-4 rounded-3xl border border-transparent bg-[#123659] p-4 shadow-sm duration-500 hover:border-white/30">
      {/* 隊伍基本資訊 */}
      <div>
        <h3 className="whitespace-nowrap text-center text-2xl font-bold leading-10 tracking-widest text-white">
          台北教育大學體育館
        </h3>
        <h2 className="whitespace-nowrap text-center text-xl font-bold leading-8 tracking-wider text-[#FFE8A3]">
          12/01(五)
        </h2>
      </div>
      <div className="flex w-4/5 items-center justify-center whitespace-nowrap border-t border-white/30 px-4 py-2 text-2xl font-bold leading-8 tracking-wider text-white/70">
        Team Apple
      </div>
      {/* 球員名單 */}
      <div className="grid w-full grid-cols-3 items-center justify-between gap-x-2 gap-y-2">
        <div className="flex w-full flex-col items-center justify-center gap-1 rounded-2xl bg-black/20 p-2">
          <div className="flex w-full flex-col items-center justify-center gap-1">
            <img
              loading="lazy"
              src="/pic/icon/member/men2.png"
              className="h-14 w-14  rounded-full bg-white bg-clip-border"
            />
            <p className="w-full whitespace-nowrap text-center text-sm tracking-wide text-white">
              Derek
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 text-xs font-medium tracking-wide text-white/70">
            <p className="whitespace-nowrap">主攻</p>
            <p className="whitespace-nowrap">體保</p>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-1 rounded-2xl bg-black/20 p-2">
          <div className="flex w-full flex-col items-center justify-center gap-1">
            <img
              loading="lazy"
              src="/pic/icon/member/girl3.png"
              className="h-14 w-14  rounded-full bg-white bg-clip-border"
            />
            <p className="w-full whitespace-nowrap text-center text-sm tracking-wide text-white">
              Diana
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 text-xs font-medium tracking-wide text-white/70">
            <p className="whitespace-nowrap">舉球</p>
            <p className="whitespace-nowrap">校隊</p>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-1 rounded-2xl bg-black/20 p-2">
          <div className="flex w-full flex-col items-center justify-center gap-1">
            <img
              loading="lazy"
              src="/pic/icon/member/men6.png"
              className="h-14 w-14  rounded-full bg-white bg-clip-border"
            />
            <p className="w-full whitespace-nowrap text-center text-sm tracking-wide text-white">
              Luka
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 text-xs font-medium tracking-wide text-white/70">
            <p className="whitespace-nowrap">攔中</p>
            <p className="whitespace-nowrap">新手</p>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-1 rounded-2xl bg-black/20 p-2">
          <div className="flex w-full flex-col items-center justify-center gap-1">
            <img
              loading="lazy"
              src="/pic/icon/member/girl1.png"
              className="h-14 w-14  rounded-full bg-white bg-clip-border"
            />
            <p className="w-full whitespace-nowrap text-center text-sm tracking-wide text-white">
              Jessica
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 text-xs font-medium tracking-wide text-white/70">
            <p className="whitespace-nowrap">副攻</p>
            <p className="whitespace-nowrap">系隊</p>
          </div>
        </div>
        <button className="group relative flex h-full w-full flex-col items-center gap-1 rounded-2xl border border-transparent bg-black/10 p-2 duration-500 hover:border-white/30 hover:bg-black/20">
          <div className="absolute top-4 whitespace-nowrap text-center text-base font-medium leading-6 tracking-wider text-white/70 duration-500 group-hover:text-white">
            主攻
          </div>
          <p className="absolute top-8 text-6xl text-[#FFCC66]/50 duration-500 group-hover:text-[#FFCC66]">
            +
          </p>
        </button>
        <button className="group relative flex h-full w-full flex-col items-center gap-1 rounded-2xl border border-transparent bg-black/10 p-2 duration-500 hover:border-white/30 hover:bg-black/20">
          <div className="absolute top-4 whitespace-nowrap text-center text-base font-medium leading-6 tracking-wider text-white/70 duration-500 group-hover:text-white">
            攔中
          </div>
          <p className="absolute top-8 text-6xl text-[#FFCC66]/50 duration-500 group-hover:text-[#FFCC66]">
            +
          </p>
        </button>
      </div>
    </div>
  );
};

export default TeamCard;
