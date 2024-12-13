"use client";
import React, { useEffect, useState } from "react";
import { ScheduleEventType } from "@/app/Tyeps";
import { getScheduleById } from "../../../../utils/getSuapbaseData";
import { dir } from "console";
import { setMilliseconds } from "date-fns";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../utils/supabase";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";

//paramsでURLのIDを取得
const DiaryDetail = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState<boolean>(false); //日記編集フラグ
  const [editTitle, setEditTitle] = useState<string>();
  const [editDate, setEditDate] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");

  //supabaseからスケジュールイベントテーブルのデータを取得
  const diaryDetailData: any = getScheduleById(params.id);

  // 編集ボタン処理
  const diaryEdit = () => {
    setIsEdit(true);
    setEditTitle(diaryDetailData.Title);
    setEditDate(diaryDetailData.DiaryDate);
    setEditContent(diaryDetailData.DiaryContent);
  };

  //編集内容の保存処理
  const saveDiary = async () => {
    const { error, data } = await supabase
      .from("DiaryData")
      .update({ Title: editTitle, DiaryDate: editDate, DiaryContent: editContent })
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

  return (
    <div>
      <button onClick={deleteDiary}>ゴミ箱</button>
      <button onClick={() => router.push("/")}>戻る</button>
      {isEdit ? <p>編集中</p> : <button onClick={diaryEdit}>編集</button>}
      {isEdit ? (
        <>
          {/* 編集中の画面表示 */}
          <div className="flex flex-col justify-center items-center min-w-full max-h-full py-2 h-screen text-2xl max-w-[1200px] mx-auto">
            <input
              className="text-2xl block"
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
            />
            <div className="w-5/6 flex flex-col">
              <label htmlFor="title" className="flex">
                Title
                <input
                  className="ml-3 w-full"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  id="title"
                />
              </label>
              <textarea
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
          <div className="flex flex-col flex-col items-center min-h-screen max-w-[1200px] mx-auto ">
            <p className="text-2xl mt-[72px] mb-[24px]">{diaryDetailData.DiaryDate}</p>
            <div className="text-4xl w-5/6">
              {/* 編集中ではないときの画面表示 */}
              <div className="flex">
                <p>Title</p>
                <p className="ml-3 w-full">{diaryDetailData.Title}</p>
                <p className="self-end">感情アイコン</p>
              </div>
              <p className="text-2xl mt-10">{diaryDetailData.DiaryContent}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DiaryDetail;
