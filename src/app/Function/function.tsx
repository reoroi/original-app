import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { supabase } from "../../../utils/supabase";
import DiaryList from "../Components/Diary";
import { AuthUserType, ScheduleEventType } from "../Tyeps";

// supabaseへ日記を追加する処理
export const AddDiary = async (
  addTitle: string,
  addDate: string,
  addContent: string,
  addEmotion: string,
  setAddTitle: React.Dispatch<React.SetStateAction<string>>,
  setAddDate: React.Dispatch<React.SetStateAction<string>>,
  setAddContent: React.Dispatch<React.SetStateAction<string>>,
  setAddEmotion: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    await supabase.from("DiaryData").insert({
      Title: addTitle,
      DiaryDate: addDate,
      DiaryContent: addContent,
      DiaryEmotion: addEmotion,
    });
    alert("日記を登録しました");
    setAddTitle("");
    setAddDate("");
    setAddContent("");
    setAddEmotion("");
  } catch (error) {
    console.log(error);
  }
};

//感情クリック処理
export const handleClickEmotion = (
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
export const renderSearchResult = (searchList: ScheduleEventType[], searchStatus: number) => {
  switch (searchStatus) {
    case 0:
      return <DiaryList />;

    case 1:
      return <DiaryList searchList={searchList} />;

    case 2:
      return <p className="text-3xl mx-auto w-max ">検索結果なし</p>;
  }
};

// SignUp処理
export const handleSignUp = async (
  signUpData: AuthUserType,
  setSignUpError: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: signUpData.email,
      password: signUpData.password,
      options: {
        data: {
          first_name: signUpData.userName,
        },
      },
    });
    // supabaseでのエラーメッセージを投げる
    if (error) {
      throw error;
    }
    if (data) {
      console.log(data);
      alert("アカウントを作成しました");
    }
  } catch (error) {
    if (error instanceof Error && error.message === "User already registered") {
      setSignUpError("既に同じユーザが登録されています。");
    } else {
      setSignUpError("アカウント作成時にエラーが発生しました。");
    }
  }
};

// SignIn処理
export const handleSignIn = async (signInData: AuthUserType,setSignInError: React.Dispatch<React.SetStateAction<string>>,router:AppRouterInstance) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: signInData.email,
      password: signInData.password,
    });
    if (error) {
      throw error
    }
    if(data){
      router.push("/")
    }
    
  } catch (error) {
    if (error instanceof Error && error?.message==="Invalid login credentials") {
      setSignInError("メールアドレスまたはパスワードが間違えています");
    } else {
      setSignInError("ログインに失敗しました。しばらくして再度試してください");
    }
  }
};

export const handleLogout=async()=>{
  try{
    const { error } = await supabase.auth.signOut()
    if(error){
      throw error
    }
  }catch(error){
    alert("サインアウトでエラーが発生しました")
  }

}