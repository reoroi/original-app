"use client";
import { useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";
import { DiaryEventType, CalendarEventType } from "@/app/Types";
import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";
import { currentUserContext } from "@/app/useAuth";

// 日記のすべてのデータを取得
export const getSupabaseData = async () => {
  // DiaryDataからすべてのデータを降順で取得
  const supabaseData = await supabase.from("DiaryData").select("*").order('DiaryDate', { ascending: false });
  ;
  return supabaseData;
};

//supabseのsucheleDataテーブルからデータを取得
export const useGetScheduleData =  () => {
  const [getDiaryData, setGetDiaryData] = useState<CalendarEventType[]>([]);
  // 現在のユーザIDを取得
  useEffect(() => {
    const getSupabaseScheduleData = async () => {
      try {
        // 現在のセッション情報を取得
        const { error:sessionError,data: sessionData } = await supabase.auth.getSession();
        if(sessionError){
          console.log(sessionError,"セッション取得のエラーが発生")
          throw sessionError
        }

        // 現在のユーザIDを取得
      const loginUser=sessionData.session?.user.id
      // すべてのデータを取得する
      const diaryAllData = await getSupabaseData();
        // ユーザごとのデータを取得し格納
        const scheduleEvent: CalendarEventType[] = diaryAllData.data
          ?.filter((filterItems) => filterItems.UserID === loginUser) // ユーザーIDでフィルタリング
          .map((items) => ({
            Id: items.Id,
            UserID: items.UserID,
            title: items.Title,
            date: items.DiaryDate,
            DiaryContent: items.DiaryContent,
            DiaryEmotion: items.DiaryEmotion,
            DiaryImage:items.DiaryImage,
            createdAt: items.createdAt,
          })) || [];
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
  const [getDiaryData, setGetDiaryData] = useState<CalendarEventType[]>([]);
  useEffect(() => {
    const getSupabaseScheduleData = async () => {
      try {
        // 現在のセッション情報を取得
        const { error:sessionError,data: sessionData } = await supabase.auth.getSession();
        if(sessionError){
          console.log(sessionError,"セッション取得のエラーが発生")
          throw sessionError
        }

        // 現在のユーザIDを取得
      const loginUser=sessionData.session?.user.id
  
        const diaryAllData = await getSupabaseData();
        const scheduleEvent: CalendarEventType[] = diaryAllData.data
        ?.filter((filterItems) => filterItems.UserID === loginUser) // ユーザーIDでフィルタリング
        .map((items) => ({
              Id: items.Id,
              UserID:items.UserID,
              title: items.DiaryEmotion + items.Title, //titleでないとCalendarに反応しない,カレンダーに表示する感情を入れる
              date: items.DiaryDate, //dateでないとCalendarに反応しない
              createdAt: items.createdAt,
              DiaryContent: items.DiaryContent,
              DiaryEmotion: items.DiaryEmotion,
          })) || [];
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
  const [diaryDetailData, setDiaryDetailData] = useState<DiaryEventType|null>(null);

  useEffect(() => {
    const getSupabaseScheduleData = async () => {
      try {
        //scheduleDataテーブルからデータの取得
        const diaryAllData = await getSupabaseData();
        //sucheleDataテーブルからIDごとのデータの取得
        const targetData = diaryAllData.data?.find((item) => item.Id === targetID);
        if (targetData) {
          setDiaryDetailData(targetData);
        }else{
          return
        }
      } catch (error) {
        console.log(error, "getScheduleByIdの取得でエラーが発生しました。");
      }
    };

    // supabaseリアルタイム機能を使用して更新後のデータを返す
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
