"use client";
import { useRouter } from "next/navigation";
import React, { useContext, useRef, useState } from "react";
import CustomizedTooltips from "../Components/MaterialUI";
import {
  AddDiary,
  handleClickImag,
  onchangeUploadImage,
  viewImageDelete,
} from "../Function/function";
import Header from "../Components/Header";
import { getToday } from "./useGetDoday";
import Image from "next/image";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import CameraAltSharpIcon from "@mui/icons-material/CameraAltSharp";
import { currentUserContext } from "../useAuth";

const AddSchedule = () => {
  const router = useRouter();
  const [addTitle, setAddTitle] = useState<string>("");
  const [addDate, setAddDate] = useState<string>("");
  const [addContent, setAddContent] = useState<string>("");
  const [addEmotion, setAddEmotion] = useState<string>("");
  const [addImage, setAddImage] = useState<File[]>([]);
  const [viewImage, setViewImage] = useState<string[]>([]);
  const ref = useRef<HTMLInputElement | null>(null); //画像input

  //現在のユーザ情報を取得
  const currentUser = useContext(currentUserContext);

  // 今日の日付を取得しinputへ反映
  getToday(setAddDate);

  return (
    <div className="min-h-screen bg-[#DBEAFF] w-full ">
      <Header />
      <div className="mx-auto w-5/6 max-w-[1300px] shadow-2xl bg-white rounded-[16px] mt-9 p-6">
        {/* ヘッダータイトル */}
        <h1 className="text-3xl font-bold text-center mb-6">日記を追加</h1>
        <div className="py-2 text-2xl mx-8 mb-7">
          <div className="flex justify-between my-8">
            <button
              className="bg-gray-500 text-2xl text-white flex items-center justify-center rounded-md h-10 w-12 hover:bg-gray-700"
              onClick={() => handleClickImag(ref)}
            >
              <AddAPhotoIcon />
            </button>
            <button
              className="bg-blue-500 text-2xl text-white flex items-center justify-center rounded-md h-10 w-12 hover:bg-blue-700"
              onClick={() => router.push("/")}
            >
              <KeyboardReturnIcon fontSize="large" />
            </button>
          </div>
          <div className="text-center mb-[24px]">
            <label className="text-lg font-semibold">📅日付を選択</label>
            <input
              onChange={(e) => setAddDate(e.target.value)}
              type="date"
              value={addDate}
              className="block mx-auto mt-2 border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          {/* 画像プレビュー */}
          <div className="flex w-full justify-center ">
            {viewImage.length > 0 ? (
              viewImage.map(
                //配列状になっているURLをの抽出
                (imageURL, index) => (
                  <div className="mx-px text-center" key={index}>
                    <Image
                      src={imageURL}
                      className="w-full object-contain mx-1 rounded-lg"
                      alt="uploadImage"
                      width={100}
                      height={100}
                    />
                    <button
                      onClick={() =>
                        viewImageDelete(setViewImage, viewImage, setAddImage, addImage, index)
                      }
                      className="bg-red-500 rounded-full text-base text-white w-6 h-6  active:bg-red-700  hover:bg-red-600 "
                    >
                      ✖
                    </button>
                  </div>
                )
              )
            ) : (
              <></>
            )}
          </div>
          <input
            onChange={(e) => onchangeUploadImage(e, viewImage, setViewImage, setAddImage)}
            ref={ref}
            className="hidden"
            type="file"
            accept="image/*"
            multiple
          />
          <div className="flex justify-center items-center mt-4">
            <p className="mr-4 text-lg font-semibold">今日の気分は？</p>
            <CustomizedTooltips
              selectEmotion={addEmotion}
              emotion="😁"
              setEmotion={setAddEmotion}
            />
            <CustomizedTooltips
              selectEmotion={addEmotion}
              emotion="😡"
              setEmotion={setAddEmotion}
            />
            <CustomizedTooltips
              selectEmotion={addEmotion}
              emotion="😢"
              setEmotion={setAddEmotion}
            />
            <CustomizedTooltips
              selectEmotion={addEmotion}
              emotion="😊"
              setEmotion={setAddEmotion}
            />
          </div>
          {/* 入力エリア */}
          <div className="flex flex-col mt-4">
            <label className="text-lg font-semibold" htmlFor="title">
              タイトル
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
              type="text"
              value={addTitle}
              onChange={(e) => setAddTitle(e.target.value)}
              placeholder="日記のタイトルを記入してください"
            />

            <label className="text-lg font-semibold mt-3" htmlFor="content">
              内容
            </label>
            <textarea
              id="content"
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
              onChange={(e) => setAddContent(e.target.value)}
              value={addContent}
              placeholder="今日の出来事や感じたことを書きましょう"
              rows={6}
            ></textarea>
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="bg-green-500 text-white text-lg font-semibold px-6 py-3 rounded-md hover:bg-green-700 transition duration-300"
              onClick={() =>
                AddDiary(
                  addTitle,
                  addDate,
                  addContent,
                  addEmotion,
                  addImage,
                  currentUser,
                  setAddTitle,
                  setAddContent,
                  setAddEmotion,
                  setAddImage,
                  setViewImage,
                  router
                )
              }
            >
              日記を保存する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSchedule;
