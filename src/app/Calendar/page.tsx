import React, { useState } from 'react'
import { ScheduleEventType } from '../Tyeps';
import { useRouter } from 'next/router';
import { useGetScheduleData } from '../../../utils/getSuapbaseData';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

const Home = () => {
  const router = useRouter();
  const [addEventTitle, setAddEventTitle] = useState("");
  const [addEventDate, setAddEventDate] = useState("");
  const handleDateClick = (arg: any) => {
    router.push("/AddSchedule");
  };

    //supabaseからスケジュールイベントテーブルのデータを取得
    const scheduleData: ScheduleEventType[] = useGetScheduleData();
    console.log(scheduleData);
  const onclickAddEvent = () => {
    // const newAddEvent = [...addEvent, { title: "テスト", date: "2024-10-20" }];
    // setAddEvent(newAddEvent);
  };

  return (
    <div className="">
      <div className="">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={scheduleData}
          // eventClick={(e)=>onClickEvent(e,router)} //各イベントクリック処理
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
    </div>
  );
}

//時間になった際に表示される内容が変わる
function renderEventContent(eventInfo: any) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}


export default Home