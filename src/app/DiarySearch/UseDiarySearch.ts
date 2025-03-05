"use client";
import { useEffect, useState } from "react";
import { CalendarEventType, DiaryEventType } from "../Tyeps";
import { useGetScheduleData } from "../../../utils/getSuapbaseData";

const UseDiarySearch = (searchDate: string, searchKeyWord: string, searchEmotion: string) => {
  const [searchList, setSearchList] = useState<CalendarEventType[]>([]);
  const [searchStatus, setSearchStatus] = useState(0);
  const diaryData: CalendarEventType[] = useGetScheduleData();

  const SEARCH_STATUS = {
    INITIAL: 0, // 初期画面（全データ表示）
    HIT: 1, // 検索結果がヒット
    NOT_FOUND: 2, // 検索結果なし
  };

  useEffect(() => {
    const diarySearch = () => {
      // 日付及び検索キーワードが入力されていない場合
      if (!(searchDate || searchKeyWord || searchEmotion)) {
        setSearchStatus(SEARCH_STATUS.INITIAL);
        return;
      }
      const searchResult = diaryData.filter((diary) => {
        // 感情だけの検索がかかっている場合
        if (diary.DiaryEmotion === searchEmotion && !searchDate && !searchKeyWord) {
          setSearchStatus(SEARCH_STATUS.HIT);
          return diary;
        }
        // 日付だけの検索がかかっている場合
        if (searchDate === diary.date && !searchKeyWord && !searchEmotion) {
          setSearchStatus(SEARCH_STATUS.HIT);
          return diary;
        }
        // 検索キーワードだけの検索がかかっている場合
        if (
          (diary.title.includes(searchKeyWord) || diary.DiaryContent.includes(searchKeyWord)) &&
          !searchDate &&
          !searchEmotion
        ) {
          setSearchStatus(SEARCH_STATUS.HIT);
          return diary;
        }
        // 日付及び検索キーワードの検索がかかっている場合
        if (
          searchDate === diary.date &&
          (diary.title.includes(searchKeyWord) || diary.DiaryContent.includes(searchKeyWord)) &&
          !searchEmotion
        ) {
          setSearchStatus(SEARCH_STATUS.HIT);
          return diary;
        }
        // 日付及び感情スタンプの検索がかかっている場合
        if (diary.date === searchDate && diary.DiaryEmotion === searchEmotion && !searchKeyWord) {
          setSearchStatus(SEARCH_STATUS.HIT);
          return diary;
        }
        // 検索キーワード及び感情スタンプの検索がかかっている場合
        if (
          (diary.title.includes(searchKeyWord) || diary.DiaryContent.includes(searchKeyWord)) &&
          diary.DiaryEmotion === searchEmotion 
          && !searchDate
        ) {
          setSearchStatus(SEARCH_STATUS.HIT);
          return diary;
        }
        // 日付、検索キーワード、感情スタンプの検索がかかっている場合
        if (
          searchDate === diary.date &&
          (diary.title.includes(searchKeyWord) || diary.DiaryContent.includes(searchKeyWord)) &&
          diary.DiaryEmotion == searchEmotion
        ) {
          setSearchStatus(SEARCH_STATUS.HIT);
          return diary;
        }
      });

      // 検索対象の有無でステータスを変更
      if (searchResult.length === 0) {
        setSearchStatus(SEARCH_STATUS.NOT_FOUND);
      }
      // 検索結果を格納
      setSearchList(searchResult);
    };

    // 日記検索関数の実行
    diarySearch();

    // 日付入力と検索キーワードが変更された際に実行
  }, [searchDate, searchKeyWord, searchEmotion]);

  // 検索結果の配列と検索ステータスを返す
  return { searchList, searchStatus };
};

export default UseDiarySearch;
