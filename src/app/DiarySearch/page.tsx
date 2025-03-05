"use client";
import React, {   useState } from "react";
import Header from "../Components/Header";
import UseDiarySearch from "./UseDiarySearch";
import { renderSearchResult } from "../Function/function";
import CustomizedTooltips from "../Components/MaterialUI";
import SearchIcon from "@mui/icons-material/Search";

const DiarySearch = () => {
  const [searchDate, setSearchDate] = useState("");
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [searchEmotion, setSearchEmotion] = useState<string>("");

  // 日記検索関数の実行
  const { searchList, searchStatus } = UseDiarySearch(searchDate, searchKeyWord, searchEmotion);

  return (
    <div className="min-h-screen ">
      <Header />
      <div>
        <div className="my-5">
          <div className="text-center my-3 ">
            <input
              className=" text-center"
              onChange={(e) => setSearchDate(e.target.value)}
              type="date"
            />
          </div>
          <label
            htmlFor="search"
            className="flex items-center bg-white mx-auto w-4/6 px-1 rounded-full  shadow-md border focus-within:ring-2 focus-within:ring-blue-400 mb-5"
          >
            <SearchIcon  />
            <input
              id="search"
              className="w-full m-1 bg-transparent focus:outline-none"
              onChange={(e) => setSearchKeyWord(e.target.value)}
              type="text"
              placeholder="キーワードを検索してください"
            />
          </label>
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
