'use client'
import { useParams } from 'next/navigation'
import React from 'react'
import { getScheduleById } from '../../../../utils/getSuapbaseData'
import { ScheduleEventType } from '@/app/Tyeps'

const EventDetail = async () => {
  // 対象のスケジュールイベントのIDを取得
  const {id}  =useParams() as {id :string}
  // スケジュールイベントを取得
  // const {title,date,createdAt,description} = getScheduleById(id);
const scheduleData=await getScheduleById(id)
console.log(scheduleData,'scheduledatadesu')
  return (
    <div className='flex fl'>
      <h1>TITLE</h1>
    </div>
  )
}

export default EventDetail