"use client";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { DiaryEventType, ScheduleEventType } from "@/app/Tyeps";
import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";

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
        const scheduleEvent: ScheduleEventType[] =
          diaryAllData.data?.map((item) => {
            return {
              Id: item.Id,
              title: item.Title, //titleでないとCalendarに反応しない
              date: item.DiaryDate, //dateでないとCalendarに反応しない
              createdAt: item.createdAt,
              DiaryContent: item.DiaryContent,
              DiaryEmotion: item.DiaryEmotion,
            };
          }) || [];
        setGetDiaryData(scheduleEvent);
      } catch (error) {
        console.log(error, "scheduledataの取得でエラーが発生しました。");
      }
    };
    getSupabaseScheduleData();
  }, []);
  return getDiaryData;
};

// カレンダーに感情スタンプを表示
export const useDiaryCalendar = () => {
  const [getDiaryData, setGetDiaryData] = useState<ScheduleEventType[]>([]);
  useEffect(() => {
    const getSupabaseScheduleData = async () => {
      try {
        const diaryAllData = await getSupabaseData();
        const scheduleEvent: ScheduleEventType[] =
          diaryAllData.data?.map((item) => {
            return {
              Id: item.Id,
              title: item.DiaryEmotion + item.Title, //titleでないとCalendarに反応しない,カレンダーに表示する感情を入れる
              date: item.DiaryDate, //dateでないとCalendarに反応しない
              createdAt: item.createdAt,
              DiaryContent: item.DiaryContent,
              DiaryEmotion: item.DiaryEmotion,
            };
          }) || [];
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
export const useGetScheduleById = (targetID: string) => {
  const [diaryDetailData, setDiaryDetailData] = useState<DiaryEventType>();

  useEffect(() => {
    const getSupabaseScheduleData = async () => {
      try {
        //scheduleDataテーブルからデータの取得
        const diaryAllData = await getSupabaseData();
        //sucheleDataテーブルからIDごとのデータの取得
        const targetData = diaryAllData.data?.find((item) => item.Id === targetID);
        if (targetData) {
          setDiaryDetailData(targetData);
        }
      } catch (error) {
        console.log(error, "getScheduleByIdの取得でエラーが発生しました。");
      }
    };

    // supabaseノリアルタイム機能を使用して更新後のデータを返す
    supabase
      .channel("DiaryData")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "DiaryData",
        },
        (payload) => {
          // 変更後のデータを取得して返す
          const updateDiary = payload.new as DiaryEventType;
          setDiaryDetailData(updateDiary)
        }
      )
      .subscribe();

    // 関数の実行
    getSupabaseScheduleData();
  }, []);

  return diaryDetailData;
};
