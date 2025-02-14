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
  addImage:File[],
  setAddTitle: React.Dispatch<React.SetStateAction<string>>,
  setAddDate: React.Dispatch<React.SetStateAction<string>>,
  setAddContent: React.Dispatch<React.SetStateAction<string>>,
  setAddEmotion: React.Dispatch<React.SetStateAction<string>>,
  setAddImage: React.Dispatch<React.SetStateAction<File[]>>,
  setImageError:React.Dispatch<React.SetStateAction<string>>,
) => {
    const { error: insertError,data:DiaryData } =await supabase.from("DiaryData").insert({
      Title: addTitle,
      DiaryDate: addDate,
      DiaryContent: addContent,
      DiaryEmotion: addEmotion,
      DiaryImage:[]
    }).select()
    if(insertError){
      alert("日記投稿エラーが発生しました。再度試してください")
      return
    }

  if(addImage.length>0){
    // 選択された最大3つのファイルを順次supabaseへ登録
    const updateImage=await Promise.all(addImage.map(async(image) =>  {
      const imageURL=`Diary/${image.name}`
      const {error:storageError}=await supabase.storage.from("DiaryImage").upload(imageURL, image); //supabaseのstorageへ写真を登録する

      // 写真のアップロードにエラーがあるか
      if (storageError) {
        alert("supabaseへ写真登録処理に失敗しました");
        return;
      }
      
      //画像のURLを作成しテーブルに写真URLを更新
      const { data: DiaryImageURL } = await supabase.storage
      .from("DiaryImage")
      .getPublicUrl(imageURL);


  
      return DiaryImageURL.publicUrl


      // if (DiaryImageURL&&DiaryData) {
      //   // 投稿データに画像URLを更新
      //   const {error:updateError}=await supabase
      //     .from("DiaryData")
      //     .update({DiaryData: ['one', 'two', 'three', 'four']} )
      //     .eq("Id", DiaryData[0].Id); // 投稿IDを基に更新
      //   // 投稿成功後メッセージとクリア
      //   if(updateError){
      //     console.log(updateError)
      //   }
      //   alert("投稿に成功しました");
      //   setAddImage([])
      // }else{
      //   setImageError("画像投稿に失敗しました。再度やり直してください")
      
      // }
    }));

    // supabaseへ写真などの追加処理が成功したら
    if (updateImage&&DiaryData) {
      // 投稿データに画像URLを更新
      const {error:updateError}=await supabase
        .from("DiaryData")
        .update({DiaryImage: updateImage}) //map関数にて取得したURLをupdateする
        .eq("Id", DiaryData[0].Id); // 投稿IDを基に更新
      // 投稿成功後メッセージとクリア
      if(updateError){
        console.log(updateError)
      }
      alert("投稿に成功しました");
      setAddImage([])
    }else{
      setImageError("画像投稿に失敗しました。再度やり直してください")
    }
  }
  // 登録完了後
    alert("日記を登録しました");
    setAddDate("");
    setAddContent("");
    setAddEmotion("");
    setAddTitle("")

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
export const handleSignIn = async (
  signInData: AuthUserType,
  setSignInError: React.Dispatch<React.SetStateAction<string>>,
  router: AppRouterInstance
) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: signInData.email,
      password: signInData.password,
    });
    if (error) {
      throw error;
    }
    if (data) {
      router.push("/");
    }
  } catch (error) {
    if (error instanceof Error && error?.message === "Invalid login credentials") {
      setSignInError("メールアドレスまたはパスワードが間違えています");
    } else {
      setSignInError("ログインに失敗しました。しばらくして再度試してください");
    }
  }
};

export const handleLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  } catch (error) {
    alert("サインアウトでエラーが発生しました");
  }
};

export const handleClickImag = (ref: React.MutableRefObject<HTMLInputElement | null>) => {
  ref.current?.click();
};

export const onchangeUploadImage = (
  e: React.FormEvent<HTMLInputElement>,
  addImage:File[],
  viewImage:string[],
  setViewImage: React.Dispatch<React.SetStateAction<string[]>>,
  setAddImage: React.Dispatch<React.SetStateAction<File[]>>,
  setCapacityError:React.Dispatch<React.SetStateAction<string>>
) => {
  // 選択した写真のファイルを取得
  const targetImage = e.currentTarget.files?.[0];
  
  //選択されいている写真があるか
  if (targetImage) {
    // 選択した写真のファイルサイズが5MB以内であるか
    if (targetImage.size <= 5242880) {
      const imageURL=window.URL.createObjectURL(targetImage)
      // 選択された写真が3つ以内か
      if(viewImage.length>2){
        alert("写真は3つまでです")
        return viewImage
      } else{
        
        const image=[...viewImage,imageURL]
        setViewImage(image);
        console.log(viewImage)
        console.log(viewImage.length)
      }
      setAddImage((prevFile) => [...prevFile, targetImage]);
    } else {
      setCapacityError("写真のサイズは5MBまでです");
    }
  } 
};
