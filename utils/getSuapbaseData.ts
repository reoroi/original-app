"use client";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { DiaryEventType, ScheduleEventType } from "@/app/Tyeps";

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
            Id: item.Id,
            title: item.Title,//titleでないとCalendarに反応しない
            date: item.DiaryDate,//dateでないとCalendarに反応しない
            createdAt:item.createdAt,
            DiaryContent:item.DiaryContent,
            DiaryEmotion:item.DiaryEmotion
          };
        }) || []
        setGetDiaryData(scheduleEvent);
      } catch (error) {
        console.log(error, "scheduledataの取得でエラーが発生しました。");
      }
    };
    getSupabaseScheduleData();
  }, []);
  return getDiaryData;
};

export const useDiaryCalendar = () => {
  const [getDiaryData, setGetDiaryData] = useState<ScheduleEventType[]>([]);
  useEffect(() => {
    const getSupabaseScheduleData = async () => {
      try {
        const diaryAllData = await getSupabaseData();
        const scheduleEvent:ScheduleEventType[] = diaryAllData.data?.map((item) => {
          return {
            Id: item.Id,
            title: item.DiaryEmotion+item.Title,//titleでないとCalendarに反応しない,カレンダーに表示する感情を入れる
            date: item.DiaryDate,//dateでないとCalendarに反応しない
            createdAt:item.createdAt,
            DiaryContent:item.DiaryContent,
            DiaryEmotion:item.DiaryEmotion
          };
        }) || []
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
  const [diaryDetailData, setDiaryDetailData] = useState<DiaryEventType|undefined>();

  useEffect(() => {
    const getSupabaseScheduleData = async () => {
      try {
        //scheduleDataテーブルからデータの取得
        const diaryAllData = await getSupabaseData();
        //sucheleDataテーブルからIDごとのデータの取得
        const targetData = diaryAllData.data?.find((item) => item.Id===targetID);
        setDiaryDetailData(targetData);
      } catch (error) {
        console.log(error, "getScheduleByIdの取得でエラーが発生しました。",error);
      }
    };
    getSupabaseScheduleData();
  }, [diaryDetailData]);
  return diaryDetailData;
};

