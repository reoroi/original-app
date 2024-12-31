import { supabase } from "../../../utils/supabase";

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
  setIsEmotionClicked: React.Dispatch<React.SetStateAction<boolean>>,
  editEmotion: string
) => {
   setEmotion(emotion); // 状態を更新

  // クリックされた感情と現在の編集中の感情を直接比較
  if (emotion === editEmotion) {
    setIsEmotionClicked(true); // 一致している場合はクリック状態をtrueに
  } else {
    setIsEmotionClicked(false); // 一致していない場合はクリック状態をfalseに
  }
};
