"use client";
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { useRouter } from "next/navigation";
import { AddScheduleType, ScheduleEventType } from "./Tyeps";
import { format } from "date-fns";
import {  useGetScheduleData } from "../../utils/getSuapbaseData";

const Home = () => {
  const router = useRouter();
  const [addEventTitle, setAddEventTitle] = useState("");
  const [addEventDate, setAddEventDate] = useState("");
  const [testData, setTestData] = useState<AddScheduleType[]>([
    { title: "テスト１", date: "2024-10-20" },
    { title: "テスト2", date: "2024-10-20" },
    {title:'テスト3',date:'2024-10-20'},
    {title:'テスト4',date:'2024-10-20'},
  ]);
  const handleDateClick = (arg: any) => {
    router.push("/AddSchedule");
  };
  
  //supabaseからスケジュールイベントテーブルのデータを取得
  const scheduleData:ScheduleEventType[]= useGetScheduleData()

  const onclickAddEvent = () => {
    // const newAddEvent = [...addEvent, { title: "テスト", date: "2024-10-20" }];
    // setAddEvent(newAddEvent);
  };

  //これからクリックしたイベントの内容を表示させるコードを作成
  const onClickEvent=()=>{

  }



  return (
    <div className="">
      <div className="">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={scheduleData}
          eventClick={}
          // initialEvents={addEvent} //追加したイベント内容
          eventContent={renderEventContent}
          dateClick={handleDateClick} //日付クリック処理
          height="100vh" //高さを100％へ
          locale="ja" //日本語にする
        />
      </div>
      <input
        className="bg-blue-900"
        type="text"
        value={addEventTitle}
        onChange={(e) => setAddEventTitle(e.target.value)}
      />
      <button onClick={onclickAddEvent}>スケジュールする</button>
    </div>
  );
};

//時間になった際に表示される内容が変わる
function renderEventContent(eventInfo: any) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default Home;
