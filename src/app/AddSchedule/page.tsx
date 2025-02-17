"use client";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import CustomizedTooltips from "../Components/MaterialUI";
import { AddDiary, handleClickImag, onchangeUploadImage } from "../Function/function";
import Header from "../Components/Header";
import { getToday } from "./useGetDoday";
import Image from "next/image";
import { Button } from "@mui/material";

const AddSchedule = () => {
  const router = useRouter();
  const [addTitle, setAddTitle] = useState<string>("");
  const [addDate, setAddDate] = useState<string>("");
  const [addContent, setAddContent] = useState<string>("");
  const [addEmotion, setAddEmotion] = useState<string>("");
  const [addImage, setAddImage] = useState<File[]>([]);
  const [viewImage, setViewImage] = useState<string[]>([]);
  const [capacityError, setCapacityError] = useState<string>("");
  const [imageError, setImageError] = useState<string>("");
  const ref = useRef<HTMLInputElement | null>(null);

  // 今日の日付を取得しinputへ反映
  getToday(setAddDate);

  return (
    <div className="min-h-screen  bg-[#DBEAFF]">
      <Header></Header>
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-50px)] py-2  text-2xl	max-w-[1200px] mx-auto">
        <div className="flex w-full">
          {addImage.length > 0 ? ( //選択された写真があるか
            viewImage.map(
              //配列状になっているURLをの抽出
              (imageURL, index) => (
                <div key={index}>
                  <Image
                    src={imageURL}
                    className="w-full h-full object-contain block"
                    alt="uploadImage"
                    width={100}
                    height={100}
                  />
                </div>
              )
            )
          ) : (
            <></>
          )}
        </div>
        <p className="text-red-500">{capacityError}</p>
        <p className=" text-red-500">{imageError}</p>
        <input
          onChange={(e) =>
            onchangeUploadImage(e, addImage, viewImage, setViewImage, setAddImage, setCapacityError)
          }
          ref={ref}
          className="hidden"
          type="file"
          accept="image/*"
          multiple
        />
        <button onClick={() => handleClickImag(ref)}>写真アイコン</button>
        <input
          onChange={(e) => setAddDate(e.target.value)}
          type="date"
          value={addDate}
          className="bg-[#DBEAFF]"
        />
        <div className="flex justify-between w-1/3 ">
          <CustomizedTooltips selectEmotion={addEmotion} emotion="😁" setEmotion={setAddEmotion} />
          <CustomizedTooltips selectEmotion={addEmotion} emotion="😡" setEmotion={setAddEmotion} />
          <CustomizedTooltips selectEmotion={addEmotion} emotion="😢" setEmotion={setAddEmotion} />
          <CustomizedTooltips selectEmotion={addEmotion} emotion="😊" setEmotion={setAddEmotion} />
        </div>
        <div className="w-5/6 ">
          <button onClick={() => router.push("/")}>戻る</button>
          <div className="flex flex-col ">
            <button></button>
            <label className="flex">
              <input
                className="ml-1 w-full outline-none bg-[#DBEAFF]"
                type="text"
                value={addTitle}
                onChange={(e) => setAddTitle(e.target.value)}
                placeholder="Titleを記入してください"
              />
            </label>
            <textarea
              className="outline-none bg-[#DBEAFF]"
              onChange={(e) => setAddContent(e.target.value)}
              value={addContent}
              placeholder="内容を記入してください"
              rows={6}
            ></textarea>
            <Button
              className="self-center bg-b-500"
              onClick={() =>
                AddDiary(
                  addTitle,
                  addDate,
                  addContent,
                  addEmotion,
                  addImage,
                  setAddTitle,
                  setAddDate,
                  setAddContent,
                  setAddEmotion,
                  setAddImage,
                  setImageError
                )
              }
            >
              保存
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSchedule;
