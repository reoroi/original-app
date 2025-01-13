import { supabase } from "../../../utils/supabase";
import DiaryList from "../Components/Diary";
import { ScheduleEventType } from "../Tyeps";

// supabaseへ日記を追加する処理
export const AddDiary = async (
  addTitle: string,
  addDate: string,
  addContent: string,
  addEmotion: string
) => {
  const { error: addDiaryError } = await supabase
    .from("DiaryData")
    .insert({
      Title: addTitle,
      DiaryDate: addDate,
      DiaryContent: addContent,
      DiaryEmotion: addEmotion,
    });
  if (addDiaryError) {
    console.log(addDiaryError);
  }
};

//感情クリック処理
export const handleClickEmotion =  (
  emotion: string,
  setEmotion: React.Dispatch<React.SetStateAction<string>>,
  selectEmotion: string
) => {
    if (emotion === selectEmotion) {
    // 現在の感情が選択済みの場合は選択解除（空文字列に設定）
    setEmotion("");
  } else {
    // 現在の感情を選択
    setEmotion(emotion);
  }

};

// 日記検索にて検索結果のステータスで検索結果表示を変更
export const renderSearchResult=(searchList:ScheduleEventType[],searchStatus:number)=>{
switch(searchStatus){
  case 0 : return(<DiaryList/>) 
   
  case 1 : return(<DiaryList searchList={searchList} />)

  case 2 : return(<p className="text-3xl mx-auto w-max ">検索結果なし</p>)
}
}