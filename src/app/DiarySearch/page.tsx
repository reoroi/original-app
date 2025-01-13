"use client";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import DiaryList from "../Components/Diary";
import { useGetScheduleData } from "../../../utils/getSuapbaseData";
import { ScheduleEventType } from "../Tyeps";
import UseDiarySearch from "./UseDiarySearch";
import { renderSearchResult } from "../Function/function";
import CustomizedTooltips from "../Components/MaterialUI";

const DiarySearch = () => {
  const [searchDate, setSearchDate] = useState("");
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [searchEmotion, setSearchEmotion] = useState<string>("");

  // 日記検索関数の実行
  const { searchList, searchStatus } = UseDiarySearch(searchDate, searchKeyWord,searchEmotion);

  useEffect(()=>{
    console.log(searchEmotion)
  },[searchEmotion])
  
  return (
    <div>
      <Header />
      <div>
        <div className="my-5">
          <div className="text-center my-3 ">
            <input
              className=" text-center "
              onChange={(e) => setSearchDate(e.target.value)}
              type="date"
            />
          </div>
          <div className="flex justify-between items-center bg-gray-200 mx-auto w-4/6">
            <span className="text-center whitespace-nowrap">検索アイコン</span>
            <input
              className="bg-gray-200 w-full mx-0"
              onChange={(e) => setSearchKeyWord(e.target.value)}
              type="text"
            />
          </div>
          <div className="mx-auto w-max">
            <CustomizedTooltips
              selectEmotion={searchEmotion}
              emotion="😁"
              setEmotion={setSearchEmotion}
            />
            <CustomizedTooltips
              selectEmotion={searchEmotion}
              emotion="😡"
              setEmotion={setSearchEmotion}
            />
            <CustomizedTooltips
              selectEmotion={searchEmotion}
              emotion="😢"
              setEmotion={setSearchEmotion}
            />
            <CustomizedTooltips
              selectEmotion={searchEmotion}
              emotion="😊"
              setEmotion={setSearchEmotion}
            />
          </div>
        </div>
        <div>{renderSearchResult(searchList, searchStatus)}</div>
      </div>
    </div>
  );
};

export default DiarySearch;
