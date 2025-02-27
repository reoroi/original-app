"use client";
import React, { useEffect, useState } from "react";
import { useGetScheduleById } from "../../../../utils/getSuapbaseData";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../utils/supabase";
import { DiaryEventType } from "@/app/Tyeps";
import CustomizedTooltips from "@/app/Components/MaterialUI";
import Header from "@/app/Components/Header";
import Image from "next/image";

//paramsでURLのIDを取得
const DiaryDetail = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState<boolean>(false); //日記編集フラグ
  const [editTitle, setEditTitle] = useState<string | undefined>("");
  const [editDate, setEditDate] = useState<string | undefined>("");
  const [editContent, setEditContent] = useState<string | undefined>("");
  const [editEmotion, setEditEmotion] = useState<string>("");

  //supabaseからスケジュールイベントテーブルのデータを取得
  const diaryDetailData: any= useGetScheduleById(params.id) ;

  // 編集ボタン処理
  const diaryEdit = () => {
    if (diaryDetailData) {
      setIsEdit(true);
      setEditTitle(diaryDetailData?.Title);
      setEditDate(diaryDetailData?.DiaryDate);
      setEditContent(diaryDetailData?.DiaryContent);
      setEditEmotion(diaryDetailData.DiaryEmotion);
    }
  };

  //編集内容の保存処理
  const saveDiary = async () => {
    const { error } = await supabase
      .from("DiaryData")
      .update({
        Title: editTitle,
        DiaryDate: editDate,
        DiaryContent: editContent,
        DiaryEmotion: editEmotion,
      })
      .eq("Id", params.id);
    if (error) {
      //supabaseへの登録でエラーが出た際の処理
      console.log(error, "supabaseのアップデート処理でエラーが発生しました");
    } else {
      alert("日記を更新しました");
      setIsEdit(false);
    }
  };

  // 日記の削除処理
  const deleteDiary = async () => {
    if (confirm("本当に削除してよろしいですか")) {
      const { error } = await supabase.from("DiaryData").delete().eq("Id", params.id);
      if (error) {
        console.log(error, "supabaseでの削除処理にエラーが発生しました");
      } else {
        //エラーがなければHomeへ戻る
        router.push("/");
      }
    }
  };

  // Create a function to handle inserts
const handleInserts = (payload:any) => {
  console.log('Change received!', payload)
}




  return (
    <div className="min-h-screen bg-[#DBEAFF]">
      <Header></Header>
      <button onClick={deleteDiary}>ゴミ箱</button>
      <button onClick={() => router.push("/")}>戻る</button>
      {isEdit ? (
        <button onClick={() => setIsEdit(false)}>編集中</button>
      ) : (
        <button onClick={diaryEdit}>編集</button>
      )}
      {isEdit ? (
        <>
          {/* 編集中の画面表示 */}
          <div className="flex flex-col items-center py-2  text-2xl max-w-[1200px] mx-auto mt-[72px]">
            <input
              className="text-2xl block mb-[12px] bg-[#DBEAFF]"
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
            />
            <div className="flex flex-col w-5/6">
              <div className="flex justify-center items-center ">
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
              <label htmlFor="title" className="flex items-center text-4xl mt-5 mb-10">
                Title
                <input
                  className="ml-3 w-full bg-[#DBEAFF]"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  id="title"
                />
              </label>
              <textarea
                className="bg-[#DBEAFF]"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={6}
              ></textarea>
              <button onClick={saveDiary}>保存</button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* 編集中ではないときの画面表示 */}
          <div className="flex flex-col items-center min-w-full  py-2 h-screen text-2xl max-w-[1200px] mx-auto mt-[72px]">
            <div className="flex w-full justify-center">
              {/* {diaryDetailData?.DiaryImage.map((image:string, index:string) => (
                <div>
                <Image
                className="w-full h-full object-contain"
                key={index}
                src={image}
                alt="DiaryImage"
                width={500}
                height={500}
                ></Image>
                </div>
              )) } */}
            </div>
            <p className="text-2xl mb-[24px]">{diaryDetailData?.DiaryDate}</p>
            <div className="flex flex-col item-center text-4xl w-5/6 ">
              <div className="flex mt-5 mb-10 w-full ">
                <p className="font-bold">Title</p>
                <p className="font-bold ml-3 ">{diaryDetailData?.Title}</p>
                <p className="ml-[56px]">{diaryDetailData?.DiaryEmotion}</p>
              </div>
              <p className="text-2xl  wx-auto w-full break-all">{diaryDetailData?.DiaryContent}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DiaryDetail;
