import React from "react";
import { imageDelete, onchangeUploadImage, saveDiary, viewImageDelete } from "../Function/function";
import CustomizedTooltips from "./MaterialUI";
import { EditFormPropsType  } from "../Tyeps";
import Image from "next/image";

const DiaryEditForm: React.FC<EditFormPropsType> = ({
  editTitle,
  editDate,
  editContent,
  editEmotion,
  addImage,
  viewImage,
  setEditTitle,
  setEditDate,
  setEditContent,
  setEditEmotion,
  setAddImage,
  setViewImage,
  diaryImageObject,
  setIsEdit,
  params,
}) => {
  return (
    <>
      {/* 編集中の画面表示 */}
      <div className="py-2  text-2xl  mx-auto  mb-5">
        <div className="mx-8 mb-2">
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
                      onClick={() => imageDelete(storagePath, diaryImageObject, index, params)}
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
  );
};

export default DiaryEditForm;
