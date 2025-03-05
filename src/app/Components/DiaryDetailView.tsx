import React from "react";
import DateRangeIcon from "@mui/icons-material/DateRange";
import Image from "next/image";
import { diaryEdit } from "../Function/function";
import { DiaryDetailViewProps } from "../Types";

const DiaryDetailView: React.FC<DiaryDetailViewProps> = ({
  diaryDetailData,
  diaryImageObject,
  setEditTitle,
  setEditDate,
  setEditContent,
  setEditEmotion,
  setIsEdit,
}) => {
  return (
    <>
      {/* 編集中ではないときの画面表示 */}
          <div className="text-center mb-[24px]">
            <span>
              <DateRangeIcon></DateRangeIcon>
            </span>
            <span className="text-2xl mx-auto ">{diaryDetailData?.DiaryDate}</span>
          </div>
          <div className="flex w-full justify-center  ">
            {/* 日記の登録画像がある場合表示 */}
            {diaryImageObject ? (
              diaryImageObject.map((imageObject: { [key: string]: string }, index: number) => {
                const imageURL = Object.values(imageObject)[0];
                return (
                  <div className="mx-px" key={index}>
                    <Image
                      className="w-full object-contain rounded-lg"
                      src={imageURL}
                      alt="DiaryImage"
                      width={500}
                      height={500}
                    ></Image>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col item-center text-3xl  ">
          <div className="flex justify-between items-center mb-3 border-b pb-2">
          <p className="font-bold  ">{diaryDetailData?.Title}</p>
              <p className="ml-[56px]">{diaryDetailData?.DiaryEmotion}</p>
            </div>
            <p className="mt-2 mb-8 text-xl  wx-auto w-full break-all ">
              {diaryDetailData?.DiaryContent}
            </p>
          </div>
          <button
            className="rounded-md bg-yellow-500 text-white p-2 hover:bg-yellow-700"
            onClick={() =>
              diaryEdit(
                setIsEdit,
                setEditTitle,
                setEditDate,
                setEditContent,
                setEditEmotion,
                diaryDetailData
              )
            }
          >
            編集
          </button>
    </>
  );
};

export default DiaryDetailView;
