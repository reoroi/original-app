"use client"
import { ScheduleEventType } from '../Tyeps';
import { useGetScheduleData } from '../../../utils/getSuapbaseData';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Calendar = () => {
  const router = useRouter();
  const [addEventTitle, setAddEventTitle] = useState("");
  const [addEventDate, setAddEventDate] = useState("");
  const handleDateClick = (arg: any) => {
    router.push("/AddSchedule");
  };

    //supabaseからスケジュールイベントテーブルのデータを取得
    const diaryData: ScheduleEventType[] = useGetScheduleData();

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
          events={diaryData}
          // eventClick={(e)=>onClickEvent(e,router)} //各イベントクリック処理
          eventContent={renderEventContent}
          dateClick={handleDateClick} //日付クリック処理
          height="100vh" //高さを100％へ
          locale="ja" //日本語にする
        />
      </div>
      <button
      onClick={()=>router.push("/")}
        value={addEventTitle}
      >
      HOME
      </button>
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


export default Calendar