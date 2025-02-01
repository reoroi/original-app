"use client";
import { useContext, useEffect } from "react";
import DiaryList from "../Components/Diary";
import Header from "../Components/Header";
import { supabase } from "../../../utils/supabase";
import { currentUserContext } from "../useAuth";

const DiaryHome = () => {
  const currentUser = useContext(currentUserContext);
  const TEST = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(currentUser)
  };

  return (
    <div className="min-h-screen bg-[#DBEAFF]">
      
      <button onClick={TEST}>ログアウト</button>
      <button onClick={()=>console.log(currentUser)}>認証状態</button>
      <Header />
      <div className="flex flex-col mt-10 min-h-screen">
        <h1 className="text-5xl mx-auto mb-5">日記一覧</h1>
        <ul>
          <DiaryList />
        </ul>
      </div>
    </div>
  );
};
export default DiaryHome;
