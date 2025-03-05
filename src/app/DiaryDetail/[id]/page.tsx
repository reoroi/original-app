"use client";
import React, { useRef, useState } from "react";
import { useGetScheduleById } from "../../../../utils/getSuapbaseData";
import { useRouter } from "next/navigation";
import { DiaryEventType } from "@/app/Types";
import Header from "@/app/Components/Header";
import {
  deleteDiary,
  onchangeUploadImage,
} from "@/app/Function/function";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import DiaryEditForm from "@/app/Components/DiaryEditForm";
import DiaryDetailView from "@/app/Components/DiaryDetailView";

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
  const ref = useRef<HTMLInputElement | null>(null);

  //supabaseからスケジュールイベントテーブルのデータを取得
  let diaryDetailData: DiaryEventType | null = useGetScheduleById(params.id);

  //日記の画像オブジェクトを取得
  const diaryImageObject = diaryDetailData?.DiaryImage;

  return (
    <div className="min-h-screen bg-[#DBEAFF] w-full ">
      <Header></Header>
      <div className=" mx-auto  w-5/6 max-w-[1300px] shadow-2xl bg-white rounded-[16px] mt-9">
      <div className="py-2  text-2xl  mx-8  mb-7">
      <div className="flex justify-between my-8">
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
          {/* 写真追加input */}
          <input
            onChange={(e) =>
              onchangeUploadImage(e, viewImage, setViewImage, setAddImage, diaryImageObject)
            }
            type="file"
            ref={ref}
            className="hidden"
            accept="image/*"
            multiple
          />
          {isEdit ? (
            <>
              {/* 編集中のコンポーネント */}
              <DiaryEditForm
                editTitle={editTitle}
                editDate={editDate}
                editContent={editContent}
                editEmotion={editEmotion}
                addImage={addImage}
                viewImage={viewImage}
                setEditTitle={setEditTitle}
                setEditDate={setEditDate}
                setEditContent={setEditContent}
                setEditEmotion={setEditEmotion}
                setAddImage={setAddImage}
                setViewImage={setViewImage}
                diaryImageObject={diaryImageObject}
                setIsEdit={setIsEdit}
                params={params}
              />
            </>
          ) : (
            <>
              {/*  編集前の表示（閲覧モード） */}
              <DiaryDetailView
                diaryDetailData={diaryDetailData}
                diaryImageObject={diaryImageObject}
                setEditTitle={setEditTitle}
                setEditDate={setEditDate}
                setEditContent={setEditContent}
                setEditEmotion={setEditEmotion}
                setIsEdit={setIsEdit}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiaryDetail;
