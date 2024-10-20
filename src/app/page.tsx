'use client'
import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { useRouter } from 'next/navigation'


const Home = () => {
  const router=useRouter()


  const handleDateClick=(arg:any)=>{
    router.push('/ScheduleRegistration')
  }
  return (
    <div className=''>
      <div className=''>
    <FullCalendar
      plugins={[ dayGridPlugin, interactionPlugin ]}
      initialView="dayGridMonth"
      events={[
        //これでイベントを入れる
        { title: 'event 1', date: '2024-10-20' },
        { title: 'event 2', date: '2019-04-02' }
      ]}
      eventContent={renderEventContent}
      dateClick={handleDateClick}
      height="100vh"
      locale= "ja"

      />
      </div>
      </div>
  )
}

//時間になった際に表示される内容が変わる
  function renderEventContent(eventInfo:any) {
    return(
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  
}

export default Home