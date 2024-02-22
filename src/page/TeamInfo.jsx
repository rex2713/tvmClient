import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import "../css/SweepLight.css";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TeamService from "../../services/team-service";
import AuthService from "../../services/auth-service";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const TeamInfo = () => {
  const [teamData, setTeamData] = useState();
  // const [leaderData, setLeaderData] = useState();
  const [memberData, setMemberData] = useState();
  const [editTeamName, setEditTeamName] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const params = useParams();
  const user = AuthService.getCurrentUser();
  const [isLeader, setIsLeader] = useState(false);
  const [teamMessage, setTeamMessage] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [oldTeamMessage, setOldTeamMessage] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);

  let { _id } = params;
  // console.log(_id);
  const navigate = useNavigate();

  const containerRef = useRef(null);

  useEffect(() => {
    // 比较新的消息数组和旧的消息数组
    const hasDifference =
      JSON.stringify(teamMessage) !== JSON.stringify(oldTeamMessage);

    // 如果有差异且不是初始加载，则滚动到底部
    if (containerRef.current && !initialLoad && hasDifference) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }

    // 更新旧的消息数组
    setOldTeamMessage(teamMessage);

    // 设置初始加载状态为 false
    if (initialLoad) {
      setInitialLoad(false);
    }
  }, [teamMessage, initialLoad, oldTeamMessage]);

  useEffect(() => {
    //設定聊天室定時更新訊息
    let intervalId = setInterval(async () => {
      let message = await TeamService.teamGetMessage(_id);
      let setting = ["請開始輸入訊息"];
      console.log(message.data.teamMessage);
      if (message.data.teamMessage.length == 0) {
        setTeamMessage(setting);
      } else {
        setTeamMessage(message.data.teamMessage);
      }
    }, 5000);
    //卸載時清除定時更新訊息
    return () => {
      console.log("Cleaning up interval...");
      clearInterval(intervalId);
    };
  });

  useEffect(() => {
    const fetchTeamInfo = async () => {
      try {
        const teamFound = await TeamService.teamGetInfo(_id);
        setTeamData(teamFound.data);
        setMemberData(teamFound.data.teamMember);
        if (teamFound.data) {
          if (user.user._id == teamFound.data.teamLeader._id) setIsLeader(true);
          // console.log(isLeader);
        }
      } catch (error) {
        console.error("Error fetching team info:", error);
      }
    };
    fetchTeamInfo(_id);
  }, []);

  const handleJoinTeam = async () => {
    // console.log(isLeader);
    const userEmail = window.prompt("請輸入好友信箱：");
    // console.log(userInput);
    if (userEmail === "") return;
    // window.alert("信箱不能為空");
    Swal.fire({
      title: "信箱不能為空",
      // text: "",
      icon: "warning",
      background: "#123659",
      color: "#FFFFFF",
      confirmButtonColor: "#0492D9",
    });
    try {
      let userFound = await TeamService.getUserByEmail(userEmail)
        .then((data) => {
          if (
            teamData.teamMember
              .map((member) => {
                return member._id;
              })
              .includes(data.data._id)
          ) {
            // window.alert("此隊友已在隊伍中");
            Swal.fire({
              title: "此隊友已在隊伍中",
              icon: "warning",
              background: "#123659",
              color: "#FFFFFF",
              showConfirmButton: false,
              timer: 1500,
            });
          } else if (teamData.teamMember.length >= 5) {
            // window.alert("此隊伍已滿員");
            Swal.fire({
              title: "此隊伍已滿員",
              icon: "warning",
              background: "#123659",
              color: "#FFFFFF",
              showConfirmButton: false,
              timer: 1500,
            });
          } else if (userEmail == "") {
            // window.alert("信箱不能為空");
            Swal.fire({
              title: "信箱不能為空",
              icon: "warning",
              background: "#123659",
              color: "#FFFFFF",
              showConfirmButton: false,
              timer: 1500,
            });
          } else if (teamData.teamLeader._id == data.data._id) {
            // window.alert("此用戶已是隊伍的隊長");
            Swal.fire({
              title: "此用戶已是隊伍的隊長",
              icon: "warning",
              background: "#123659",
              color: "#FFFFFF",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            if (data.data == "") {
              // window.alert("找不到此用戶");
              Swal.fire({
                title: "找不到此用戶",
                icon: "warning",
                background: "#123659",
                color: "#FFFFFF",
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              setMemberData([...memberData, data.data]);
              TeamService.teamAdd(data.data._id, teamData._id);
            }
          }
        })
        .catch((e) => {
          console.error(e);
        });
    } catch (e) {
      console.log(e);
    }
  };
  const handleTeamEdit = () => {
    setEditTeamName(true);
  };
  const handleSaveTeamName = () => {
    setEditTeamName(false);
    teamData.teamName = newTeamName;
  };

  const handleNewTeamName = (e) => {
    setNewTeamName(e.target.value);
  };

  //  刪除隊友｜｜退出隊伍
  const handleDelete = async (member_id, team_id) => {
    const confirm = window.confirm("確定要刪除隊友嗎？");
    if (confirm) {
      await TeamService.teamLeave(member_id, team_id);
      setMemberData(memberData.filter((person) => person._id !== member_id));
    }
    return;
  };

  //刪除隊伍
  const handleDeleteTeam = async () => {
    const confirm = window.confirm("確定要刪除隊伍嗎？（刪除後將無法復原）");
    if (confirm) {
      // console.log(teamData);
      let court_id = teamData.court._id;
      let team_id = teamData._id;
      let user_ids = [];
      let member_ids = teamData.teamMember.map((member) => {
        return member._id;
      });
      user_ids = [...member_ids, teamData.teamLeader._id];
      // console.log(user_ids);
      // console.log(team_id);
      // console.log(court_id);
      await TeamService.teamDelete(user_ids, team_id, court_id);
      navigate("/team/manage");
    }
  };

  const handleMessage = (e) => {
    setMessageInput(e.target.value);
  };
  const handleMessageBtn = async (e) => {
    let currentTime = new Date().toLocaleString();
    let name = user.user.username;
    let sendMessage = currentTime + "  " + name + "  " + messageInput;

    try {
      // 在此处调用 messageSend 函数以发送消息
      await TeamService.teamSendMessage(_id, sendMessage);

      // 如果消息发送成功，则更新消息数组
      setTeamMessage((prevMessages) => [...prevMessages, sendMessage]);

      // 清空消息输入框
      setMessageInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  return (
    <main className="flex w-full bg-gradient-to-b from-[#082A4D] via-[#041526] to-[#000000] px-[8vw] py-10">
      {/* 球場內容 */}
      {teamData && (
        <div className="flex h-full w-[80vw] flex-col items-center justify-center gap-40 rounded-t-3xl bg-[#082A4D] px-[2vw] py-8 sm:gap-20">
          <section className="flex w-full flex-col items-center gap-[5vw] px-[2vw] md:px-[5vw] lg:flex-row">
            {/* 資訊 */}
            <article className="flex w-full flex-col justify-between gap-4 sm:gap-6 lg:w-1/2">
              {/* 球場標題 */}
              <div className="flex items-center gap-4">
                {editTeamName ? (
                  <input
                    onChange={handleNewTeamName}
                    autoFocus
                    placeholder={teamData.teamName}
                    defaultValue={teamData.teamName}
                    className="bg-transparent text-4xl font-black  tracking-wider text-[#FFCC66] placeholder:text-[#FFCC66]"
                  ></input>
                ) : (
                  <h3 className="text-4xl font-black tracking-wider text-[#FFCC66]">
                    {teamData.teamName}
                  </h3>
                )}
                {editTeamName ? (
                  <button className="text-white" onClick={handleSaveTeamName}>
                    完成
                  </button>
                ) : (
                  isLeader && (
                    <figure className="my-auto flex items-center">
                      <img
                        onClick={handleTeamEdit}
                        className="h-8 w-8 cursor-pointer opacity-20 duration-500 hover:opacity-60"
                        src="/pic/edit.svg"
                        alt=""
                      />
                    </figure>
                  )
                )}
              </div>
              {/* 詳細資訊 */}
              <div className="flex flex-col gap-2 sm:gap-4">
                <div className="flex text-xl tracking-widest text-white/70">
                  <p className="w-[3rem] text-base">球場</p>
                  <p className="font-bold">{teamData.court.courtName}</p>
                </div>
                <div className="flex text-xl tracking-wider text-white/70">
                  <p className="w-[3rem] text-base">日期</p>
                  <p className="font-bold">{teamData.date}</p>
                </div>
              </div>
              {/* 公告欄 */}
              <div className="flex h-full w-full flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 font-bold text-white/70 duration-500 hover:border-white/20">
                <p className="my-2 w-full text-center text-xl tracking-widest">
                  公告
                </p>
                <div className="no-scrollbar flex h-full w-full flex-col gap-1 overflow-scroll">
                  <div className="flex flex-col items-start gap-0 sm:flex-row sm:gap-4">
                    <p className="whitespace-nowrap text-xs tracking-wider text-white/50 sm:text-sm">
                      2023.12.4 15:23
                    </p>
                    <p className="text-base tracking-widest">大家自己帶裝備</p>
                  </div>
                  <div className="flex flex-col items-start gap-0 sm:flex-row sm:gap-4">
                    <p className="whitespace-nowrap text-xs tracking-wider text-white/50 sm:text-sm">
                      2023.12.6 18:00
                    </p>
                    <p className="text-base tracking-widest">六點半門口見!</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    className="h-6 w-5/6 rounded-lg bg-white/10 px-2 focus:bg-white/80 focus:text-black"
                  />
                  <input
                    type="submit"
                    className="h-6 w-1/6 rounded-lg bg-white/10 text-xs text-white/50 duration-500 hover:bg-white/20 md:text-sm"
                    value={"送出公告"}
                  />
                </div>
              </div>
            </article>
            <div className="grid h-40 w-full grid-cols-3 justify-items-center gap-x-2 gap-y-4 text-white sm:h-full sm:grid-cols-6 lg:w-1/2 lg:grid-cols-3 lg:gap-x-4">
              {/* 隊長 */}
              <button className="group h-full w-full rounded-lg border border-transparent bg-black/30 px-2 py-2 duration-500 hover:border-white/50">
                <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                  <img
                    className="h-8 w-8 rounded-full bg-white bg-clip-border outline outline-1 outline-offset-4 outline-[#FFCC66] md:h-10 md:w-10 lg:h-12 lg:w-12 lg:outline-2 xl:h-14 xl:w-14"
                    src={teamData.teamLeader.photoSelected}
                    alt=""
                  />
                  <div className="flex flex-col items-center justify-center gap-1">
                    <p className="text-base font-bold tracking-wide sm:text-sm md:text-base">
                      {teamData.teamLeader.username}
                    </p>
                    <p className="text-sm tracking-widest text-white/70">
                      <Swiper
                        loop={false}
                        speed={500}
                        centeredSlides={true}
                        autoplay={{
                          delay: 2000,
                          disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                        className="mySwiper sweepLight flex h-full w-20 justify-center "
                      >
                        {teamData.teamLeader.goodAtPosition &&
                          teamData.teamLeader.goodAtPosition.map((position) => {
                            return (
                              <SwiperSlide
                                key={uuidv4()}
                                className="sweepLight h-4 w-20 whitespace-nowrap bg-transparent text-[.8rem] font-medium tracking-widest text-white/70 md:text-xs md:tracking-wide"
                              >
                                {position}
                              </SwiperSlide>
                            );
                          })}
                      </Swiper>
                    </p>
                    <p className="text-[.8rem] font-medium tracking-widest text-white/70 md:text-xs md:tracking-wide">
                      {teamData.teamLeader.skillLevel &&
                        teamData.teamLeader.skillLevel}
                    </p>
                  </div>
                </div>
              </button>

              {/* 隊員 */}
              {memberData &&
                memberData.length > 0 &&
                memberData.map((member) => {
                  return (
                    <button
                      key={member._id}
                      className="group relative h-full w-full rounded-lg border border-transparent bg-black/30 px-2 py-2 duration-500 hover:border-white/50"
                    >
                      {isLeader && (
                        <div
                          onClick={() => {
                            handleDelete(member._id, teamData._id);
                          }}
                          className="absolute right-1 top-1 flex h-3 w-3 items-center justify-center rounded-full bg-white/20 bg-clip-border text-xl duration-500 group-hover:bg-white/50 lg:right-2 lg:top-2 lg:h-4 lg:w-4 xl:h-5 xl:w-5"
                        >
                          -
                        </div>
                      )}
                      <div className=" flex h-full w-full flex-col items-center justify-center gap-2">
                        <img
                          className="h-8 w-8 rounded-full bg-white bg-clip-border md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-14 xl:w-14 "
                          src={member.photoSelected}
                          alt=""
                        />
                        <div className="flex flex-col items-center justify-center gap-1">
                          <p className="text-base font-bold tracking-wide sm:text-sm md:text-base">
                            {member.username}
                          </p>
                          <Swiper
                            loop={false}
                            speed={500}
                            centeredSlides={true}
                            autoplay={{
                              delay: 2000,
                              disableOnInteraction: false,
                            }}
                            modules={[Autoplay]}
                            className="mySwiper sweepLight flex h-full w-20 justify-center "
                          >
                            {member.goodAtPosition &&
                              member.goodAtPosition.map((position) => {
                                return (
                                  <SwiperSlide
                                    key={uuidv4()}
                                    className="sweepLight h-4 w-20 whitespace-nowrap bg-transparent text-[.8rem] font-medium tracking-widest text-white/70 md:text-xs md:tracking-wide"
                                  >
                                    {position}
                                  </SwiperSlide>
                                );
                              })}
                          </Swiper>
                          <p className="text-[.8rem] font-medium tracking-widest text-white/70 md:text-xs md:tracking-wide">
                            {member.skillLevel && member.skillLevel}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}

              {/* <button className="group relative h-52 w-full rounded-lg border border-transparent bg-black/30 duration-500 hover:border-white/50">
                <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white/20 bg-clip-border text-xl duration-500 group-hover:bg-white/50">
                  -
                </div>
                <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                  <img
                    className="w-1/3 rounded-full bg-white bg-clip-border"
                    src="/pic/icon/member/men6.png"
                    alt=""
                  />
                  <div className="flex flex-col items-center justify-center gap-1">
                    <p className="text-base font-bold tracking-wide">
                      北商學生2
                    </p>
                    <p className="text-sm tracking-widest text-white/70">
                      主攻、攔中
                    </p>
                    <p className="text-sm tracking-widest text-white/70">
                      體保
                    </p>
                  </div>
                </div>
              </button>
              <button className="group relative h-52 w-full rounded-lg border border-transparent bg-black/30 duration-500 hover:border-white/50">
                <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white/20 bg-clip-border text-xl duration-500 group-hover:bg-white/50">
                  -
                </div>
                <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                  <img
                    className="w-1/3 rounded-full bg-white bg-clip-border"
                    src="/pic/icon/member/men1.png"
                    alt=""
                  />
                  <div className="flex flex-col items-center justify-center gap-1">
                    <p className="text-base font-bold tracking-wide">
                      北商學生4
                    </p>
                    <p className="text-sm tracking-widest text-white/70">
                      舉球
                    </p>
                    <p className="text-sm tracking-widest text-white/70">
                      新手
                    </p>
                  </div>
                </div>
              </button>
              <button className="group relative h-52 w-full rounded-lg border border-transparent bg-black/30 duration-500 hover:border-white/50">
                <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white/20 bg-clip-border text-xl duration-500 group-hover:bg-white/50">
                  -
                </div>
                <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                  <img
                    className="w-1/3 rounded-full bg-white bg-clip-border"
                    src="/pic/icon/member/girl4.png"
                    alt=""
                  />
                  <div className="flex flex-col items-center justify-center gap-1">
                    <p className="text-base font-bold tracking-wide">
                      北商學生5
                    </p>
                    <p className="text-sm tracking-widest text-white/70">
                      副攻
                    </p>
                    <p className="text-sm tracking-widest text-white/70">
                      校隊
                    </p>
                  </div>
                </div>
              </button> */}

              {isLeader && memberData && memberData.length < 5 && (
                <label
                  onClick={handleJoinTeam}
                  htmlFor="seek"
                  className="group flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-transparent bg-black/30 pb-6 duration-500 hover:border-white/50 lg:h-full"
                >
                  <p className="text-6xl text-[#FFCC66]/50 duration-500 group-hover:text-[#FFCC66]">
                    +
                  </p>
                </label>
              )}

              {/* <select
                  name=""
                  id="seek"
                  className="h-8 w-2/3 shrink cursor-pointer rounded-md border border-white/20 bg-white/10 px-4 text-center text-base text-white/70 duration-300 focus:bg-white/90 focus:text-black/90 group-hover:bg-white/20"
                >
                  <option value="" disabled>
                    選擇徵選對象
                  </option>
                  <option value="主攻">主攻</option>
                  <option value="攔中">攔中</option>
                  <option value="副攻">副攻</option>
                  <option value="舉球">舉球</option>
                  <option value="自由">自由</option>
                </select> */}
            </div>
          </section>

          {/* 留言板 */}
          <section className="flex w-full flex-col items-center justify-center gap-5 px-[2vw] sm:px-10">
            <h3 className="text-2xl font-bold text-[#FFCC66]">留言板</h3>
            <div className="flex h-80 w-full flex-col justify-between gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 font-bold duration-500 hover:border-white/20 sm:p-4">
              <div className="no-scrollbar flex flex-col gap-1 overflow-scroll text-base">
                {/* <div className="flex flex-col sm:flex-row sm:gap-4">
                  <p className="whitespace-nowrap text-sm leading-6 tracking-wider text-white/50">
                    2023.12.4 15:23
                  </p>
                  <p className="whitespace-nowrap text-sm leading-6 tracking-wider text-white/50">
                    北商學生1
                  </p>
                  <p className="text-base tracking-widest text-white/70">
                    幾點在球場集合?
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <p className="whitespace-nowrap text-sm leading-6 tracking-wider text-white/50">
                    2023.12.4 15:36
                  </p>
                  <p className="whitespace-nowrap text-sm leading-6 tracking-wider text-white/50">
                    北商學生2
                  </p>
                  <p className="text-base tracking-widest text-white/70">
                    看大家意見
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <p className="whitespace-nowrap text-sm leading-6 tracking-wider text-white/50">
                    2023.12.4 15:37
                  </p>
                  <p className="whitespace-nowrap text-sm leading-6 tracking-wider text-white/50">
                    北商學生5
                  </p>
                  <p className="text-base tracking-widest text-white/70">
                    我六點半才會到
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <p className="whitespace-nowrap text-sm leading-6 tracking-wider text-white/50">
                    2023.12.4 15:38
                  </p>
                  <p className="whitespace-nowrap text-sm leading-6 tracking-wider text-white/50">
                    北商學生1
                  </p>
                  <p className="text-base tracking-widest text-white/70">
                    那我們就約六點半門口見嗎?
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <p className="whitespace-nowrap text-sm leading-6 tracking-wider text-white/50">
                    2023.12.4 15:40
                  </p>
                  <p className="whitespace-nowrap text-sm leading-6 tracking-wider text-white/50">
                    北商學生2
                  </p>
                  <p className="text-base tracking-widest text-white/70">
                    沒問題
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <p className="whitespace-nowrap text-sm leading-6 tracking-wider text-white/50">
                    2023.12.4 15:41
                  </p>
                  <p className="whitespace-nowrap text-sm leading-6 tracking-wider text-white/50">
                    北商學生4
                  </p>
                  <p className="text-base tracking-widest text-white/70">
                    好喔~
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <p className="whitespace-nowrap text-sm leading-6 tracking-wider text-white/50">
                    2023.12.4 15:41
                  </p>
                  <p className="whitespace-nowrap text-sm leading-6 tracking-wider text-white/50">
                    北商學生3
                  </p>
                  <p className="text-base tracking-widest text-white/70">收</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <p className="whitespace-nowrap text-sm leading-6 tracking-wider text-white/50">
                    2023.12.4 15:42
                  </p>
                  <p className="whitespace-nowrap text-sm leading-6 tracking-wider text-white/50">
                    北商學生1
                  </p>
                  <p className="text-base tracking-widest text-white/70">
                    球具各自帶喔
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <p className="whitespace-nowrap text-sm leading-6 tracking-wider text-white/50">
                    2023.12.4 15:45
                  </p>
                  <p className="whitespace-nowrap text-sm leading-6 tracking-wider text-white/50">
                    北商學生4
                  </p>
                  <p className="text-base tracking-widest text-white/70">
                    收到
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <p className="whitespace-nowrap text-sm leading-6 tracking-wider text-white/50">
                    2023.12.9 21:30
                  </p>
                  <p className="whitespace-nowrap text-sm leading-6 tracking-wider text-white/50">
                    北商學生2
                  </p>
                  <p className="text-base tracking-widest text-white/70">
                    明天有人要我幫買晚餐嗎
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <p className="whitespace-nowrap text-sm leading-6 tracking-wider text-white/50">
                    2023.12.9 21:30
                  </p>
                  <p className="whitespace-nowrap text-sm leading-6 tracking-wider text-white/50">
                    北商學生1
                  </p>
                  <p className="text-base tracking-widest text-white/70">
                    我要
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <p className="whitespace-nowrap text-sm leading-6 tracking-wider text-white/50">
                    2023.12.9 21:31
                  </p>
                  <p className="whitespace-nowrap text-sm leading-6 tracking-wider text-white/50">
                    北商學生1
                  </p>
                  <p className="text-base tracking-widest text-white/70">
                    隨意買個飯糰，感謝
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <p className="whitespace-nowrap text-sm leading-6 tracking-wider text-white/50">
                    2023.12.9 21:32
                  </p>
                  <p className="whitespace-nowrap text-sm leading-6 tracking-wider text-white/50">
                    北商學生2
                  </p>
                  <p className="text-base tracking-widest text-white/70">收</p>
                </div> */}
              </div>
              <div ref={containerRef} className="h-full overflow-auto">
                {teamMessage && teamMessage.length == 0 ? (
                  <p className="text-center text-xl text-white">Loading...</p>
                ) : (
                  <></>
                )}
                {teamMessage &&
                  teamMessage.map((message) => {
                    return (
                      <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                        <div>
                          <span className="whitespace-nowrap text-sm leading-6 tracking-wider text-white/50">
                            {message.split(" ")[0]}
                          </span>
                          <span className="whitespace-nowrap text-sm leading-6 tracking-wider text-white/50">
                            {message.split(" ")[1]}
                          </span>
                          <span className="text-base tracking-widest text-blue-300/70">
                            {message.split(" ")[3]}
                          </span>
                        </div>
                        <span className="text-base tracking-widest text-white/70">
                          {message.split(" ")[5]}
                        </span>
                      </div>
                    );
                  })}
              </div>

              <div className="flex gap-2">
                <input
                  value={messageInput}
                  onChange={handleMessage}
                  type="text"
                  className="h-6 w-5/6 rounded-lg bg-white/10 px-2 focus:bg-white/80 focus:text-black sm:w-11/12"
                />
                <input
                  onClick={(e) => {
                    handleMessageBtn();
                  }}
                  type="submit"
                  className="h-6 w-1/6 rounded-lg bg-white/10 text-white/50 duration-500 hover:bg-white/20 sm:w-1/12"
                  value={"送出訊息"}
                />
              </div>
            </div>
          </section>

          {isLeader && (
            <button
              onClick={handleDeleteTeam}
              className="w-1/2 rounded-xl border-2 border-white/50 bg-red-800/50 py-1 text-base font-bold tracking-[.2rem] text-white duration-300 hover:bg-red-600/50 sm:w-1/5 sm:py-2 sm:text-lg md:w-1/6 xl:w-1/5"
            >
              刪除隊伍
            </button>
          )}
        </div>
      )}
    </main>
  );
};

export default TeamInfo;
