'use client'
import { useEffect, useState } from "react"
import { supabase } from "./supabase"
import { useSearchParams } from "next/navigation"
import { ScheduleEventType } from "@/app/Tyeps"

export const getSupabaseData =async()=>{
const supabaseData=await supabase.from('ScheduleData').select('*')
return supabaseData
}

//supabseからsucheleDataテーブルのデータを取得
export const useGetScheduleData= ()=>{
  
  const [scheduleData,setScheduleData]=useState<any>([])
  useEffect(()=>{
    const getSupabaseScheduleData=async()=>{
      const scheduleData=await getSupabaseData()
      const scheduleEvent=scheduleData.data?.map((item)=>{
        return {
          id:item.id,
          title:item.Title,
          date:item.ScheduleDate
        }
      })
      setScheduleData(scheduleEvent)
    }
    getSupabaseScheduleData()
  },[])
  return scheduleData
}