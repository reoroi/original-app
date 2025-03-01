"use client";
import React, {  useRef, useState } from "react";
import { useGetScheduleById } from "../../../../utils/getSuapbaseData";
import { useRouter } from "next/navigation";
import { DiaryEventType } from "@/app/Tyeps";
import CustomizedTooltips from "@/app/Components/MaterialUI";
import Header from "@/app/Components/Header";
import Image from "next/image";
import {
  deleteDiary,
  diaryEdit,
  imageDelete,
  onchangeUploadImage,
  saveDiary,
  viewImageDelete,
} from "@/app/Function/function";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

//paramsでURLのIDを取得
const DiaryDetail = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState<boolean>(false); //日記編集フラグ
  const [editTitle, setEditTitle] = useState<string>("");
  const [editDate, setEditDate] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");
  const [editEmotion, setEditEmotion] = useState<string>("");
  const [addImage, setAddImage] = useState<File[]>([]);
  const [viewImage, setViewImage] = useState<string[]>([]);
  const [capacityError, setCapacityError] = useState<string>("");
  const ref = useRef<HTMLInputElement | null>(null);

  //supabaseからスケジュールイベントテーブルのデータを取得
  let diaryDetailData: DiaryEventType | null = useGetScheduleById(params.id);

  //日記の画像オブジェクトを取得
  const diaryImageObject = diaryDetailData?.DiaryImage;

  return (
    <div className="min-h-screen bg-[#DBEAFF] w-full ">
      <Header></Header>
      <div className=" mx-auto  w-5/6 max-w-[1300px]  ">
        <div className="flex justify-evenly my-8">
          <button
            className="bg-red-500 text-2xl text-white flex items-center justify-center rounded-md h-10 w-12 hover:bg-red-700"
            onClick={() => deleteDiary(params, router)}
          >
            <DeleteForeverIcon />
          </button>

          {isEdit ? (
            <button
              className="bg-gray-500 text-2xl text-white flex items-center justify-center rounded-md h-10 w-12  hover:bg-gray-700"
              onClick={() => ref.current?.click()}
            >
              <AddAPhotoIcon />
            </button>
          ) : (
            <></>
          )}
          <button
            className="bg-blue-500 text-2xl text-white flex items-center justify-center rounded-md h-10 w-12 hover:bg-blue-700"
            onClick={() => router.push("/")}
          >
            <KeyboardReturnIcon fontSize="large" />
          </button>
        </div>
        <div className="shadow-2xl bg-white rounded-[16px]">
          {isEdit ? (
            <>
              {/* 編集中の画面表示 */}
              <div className="py-2  text-2xl  mx-auto  mb-5">
                <div className="mx-8 mb-2">
                  <input
                    onChange={(e) =>
                      onchangeUploadImage(
                        e,
                        viewImage,
                        setViewImage,
                        setAddImage,
                        diaryImageObject
                      )
                    }
                    type="file"
                    ref={ref}
                    className="hidden"
                    accept="image/*"
                    multiple
                  />
                  {/* supabaseに格納している画像の表示 */}
                  <div>
                    <input
                      className="text-2xl block mb-[18px] mx-auto  "
                      type="date"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                    />
                  </div>
                  <div className="flex w-full justify-center ">
                    {diaryImageObject ? (
                      diaryImageObject.map((imageObject, index) => {
                        // 画像オブジェクトから公開URLを取得
                        const imageURL = Object.values(imageObject)[0];
                        // 画像のオブジェクトからsubabaseのstorageキー(パス)を取得
                        const storagePath = Object.keys(imageObject)[0];
                        return (
                          <div className="mx-px text-center" key={index}>
                            <Image
                              className="w-full  object-contain "
                              src={imageURL}
                              alt="DiaryImage"
                              width={500}
                              height={500}
                            ></Image>
                            <button
                              onClick={() =>
                                imageDelete(storagePath, diaryImageObject, index, params)
                              }
                              className=" bg-red-500 rounded-full text-base text-white w-6 h-6  active:bg-red-700  hover:bg-red-600 "
                            >
                              ✖
                            </button>
                          </div>
                        );
                      })
                    ) : (
                      <></>
                    )}
                    <p className="text-red-500">{capacityError}</p>
                    {/* 編集で選択された画像の表示 */}
                    {viewImage.length > 0 ? (
                      viewImage.map(
                        //配列状になっているURLをの抽出
                        (imageURL, index) => (
                          <div className="mx-px text-center" key={index}>
                            <Image
                              src={imageURL}
                              className="w-full object-contain mx-1"
                              alt="uploadImage"
                              width={100}
                              height={100}
                            />
                            <button
                              onClick={() =>
                                viewImageDelete(
                                  setViewImage,
                                  viewImage,
                                  setAddImage,
                                  addImage,
                                  index
                                )
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
                  <div className="flex flex-col">
                    <div className="flex justify-center items-center mt-3">
                      <CustomizedTooltips
                        selectEmotion={editEmotion}
                        emotion="😁"
                        setEmotion={setEditEmotion}
                      />
                      <CustomizedTooltips
                        selectEmotion={editEmotion}
                        emotion="😡"
                        setEmotion={setEditEmotion}
                      />
                      <CustomizedTooltips
                        selectEmotion={editEmotion}
                        emotion="😢"
                        setEmotion={setEditEmotion}
                      />
                      <CustomizedTooltips
                        selectEmotion={editEmotion}
                        emotion="😊"
                        setEmotion={setEditEmotion}
                      />
                    </div>
                    <label htmlFor="title">タイトル</label>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      id="title"
                    />
                    <label className="mt-3 " htmlFor="content">
                      内容
                    </label>
                    <textarea
                      id="content"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={8}
                    ></textarea>
                  </div>
                  <button
                    className="bg-green-400 text-white rounded-md hover:bg-green-600 p-2"
                    onClick={() =>
                      saveDiary(
                        editTitle,
                        editDate,
                        editContent,
                        editEmotion,
                        addImage,
                        params,
                        setIsEdit,
                        setAddImage,
                        setViewImage,
                        diaryImageObject
                      )
                    }
                  >
                    保存
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* 編集中ではないときの画面表示 */}
              <div className="py-2  text-2xl  mx-auto  mb-5">
                <div className="mx-8 mb-2">
                  <div className="text-center mb-[24px]">
                    <span>
                      <DateRangeIcon></DateRangeIcon>
                    </span>
                    <span className="text-2xl mx-auto ">{diaryDetailData?.DiaryDate}</span>
                  </div>
                  <div className="flex w-full justify-center  ">
                    {/* 日記の画像がある場合表示 */}
                    {diaryImageObject ? (
                      diaryImageObject.map(
                        (imageObject: { [key: string]: string }, index: number) => {
                          const imageURL = Object.values(imageObject)[0];
                          return (
                            <div className="mx-px" key={index}>
                              <Image
                                className="w-full object-contain"
                                src={imageURL}
                                alt="DiaryImage"
                                width={500}
                                height={500}
                              ></Image>
                            </div>
                          );
                        }
                      )
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="flex flex-col item-center text-3xl  ">
                    <div className="flex mt-5 w-full ">
                      <p className="font-bold  ">{diaryDetailData?.Title}</p>
                      <p className="ml-[56px]">{diaryDetailData?.DiaryEmotion}</p>
                    </div>
                    <p className="my-3 text-xl  wx-auto w-full break-all ">
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
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiaryDetail;
