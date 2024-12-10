"use client";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { useSearchParams } from "next/navigation";
import { ScheduleEventType } from "@/app/Tyeps";

export const getSupabaseData = async () => {
  const supabaseData = await supabase.from("DiaryData").select("*");
  return supabaseData;
};

//supabseのsucheleDataテーブルからデータを取得
export const useGetScheduleData = () => {
  const [getDiaryData, setGetDiaryData] = useState<ScheduleEventType[]>([]);
  useEffect(() => {
    const getSupabaseScheduleData = async () => {
      try {
        const diaryAllData = await getSupabaseData();
        const scheduleEvent:ScheduleEventType[] = diaryAllData.data?.map((item) => {
          return {
            Id: item.id,
            title: item.Title,
            date: item.DiaryDate,
            createdAt:item.createdAt,
            DiaryContent:item.DiaryContent
          };
        }) || []
        console.log(scheduleEvent)
        setGetDiaryData(scheduleEvent);
      } catch (error) {
        console.log(error, "scheduledataの取得でエラーが発生しました。");
      }
    };
    getSupabaseScheduleData();
  }, []);
  return getDiaryData;
};


//supabseのsucheleDataテーブルからIDごとのデータを取得
export const getScheduleById = (targetID:string) => {
  const [scheduleData, setScheduleData] = useState<ScheduleEventType[]|undefined>([]);
  useEffect(() => {
    const getSupabaseScheduleData = async () => {
      try {
        //scheduleDataテーブルからデータの取得
        const scheduleData = await getSupabaseData();
        //sucheleDataテーブルからIDごとのデータの取得
        const scheduleEvent = scheduleData.data?.find((item) => item.id===Number(targetID));
        setScheduleData(scheduleEvent);
      } catch (error) {
        console.log(error, "getScheduleByIdの取得でエラーが発生しました。");
      }
    };
    getSupabaseScheduleData();
  }, []);
  return scheduleData;
};

