"use client"
import { ScheduleEventType } from '../Tyeps';
import { useDiaryCalendar, useGetScheduleData } from '../../../utils/getSuapbaseData';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { EventClickArg } from '@fullcalendar/core/index.js';
import Header from '../Components/Header';

const Calendar = () => {
  const router = useRouter();
  const handleDateClick = () => {
    router.push("/AddSchedule");
  };

  const testEvent={title:"これはテストになります",date:"2024-12-31"}
  
  //supabaseからスケジュールイベントテーブルのデータを取得
  const diaryData: ScheduleEventType[] = useDiaryCalendar();
  const event={testEvent,diaryData}
  console.log(event)
    // 対象イベントへの詳細画面へ遷移
    const onClickEvent=(e:EventClickArg,router:AppRouterInstance)=>{
    console.log(e)
    // 対象イベントのIDを取得
    const diaryEventID=e.event._def.extendedProps.Id  
    router.push(`http://localhost:3000/DiaryDetail/${diaryEventID}`)
  }

  return (
    <div className="bg-transparent">
      <Header></Header>
      <div className="w-full h-full">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={diaryData}
          eventClick={(e)=>onClickEvent(e,router)} //各イベントクリック処理
          // eventContent={renderEventContent}
          dateClick={handleDateClick} //日付クリック処理
          height="100vh" //高さを100％へ
          locale="ja" //日本語にする
        />
      </div>
      <button
      onClick={()=>router.push("/")}
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