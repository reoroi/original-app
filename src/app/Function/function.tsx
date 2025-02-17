import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { supabase } from "../../../utils/supabase";
import DiaryList from "../Components/Diary";
import { AuthUserType, ScheduleEventType } from "../Tyeps";
import { v4 as uuidv4 } from "uuid";

// supabaseへ日記を追加する処理
export const AddDiary = async (
  addTitle: string,
  addDate: string,
  addContent: string,
  addEmotion: string,
  addImage: File[],
  setAddTitle: React.Dispatch<React.SetStateAction<string>>,
  setAddDate: React.Dispatch<React.SetStateAction<string>>,
  setAddContent: React.Dispatch<React.SetStateAction<string>>,
  setAddEmotion: React.Dispatch<React.SetStateAction<string>>,
  setAddImage: React.Dispatch<React.SetStateAction<File[]>>,
  setImageError: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    // 登録する写真があるか
    if (addImage.length > 0) {
      // 選択された最大3つのファイルを順次supabaseへ登録
      const updateImage = await Promise.all(
        addImage.map(async (image) => {
          // supabaseのストレージへ登録する画像URL
          const imageURL = `DiaryImage/${uuidv4()}`;
          // supabaseのストレージへ画像を登録
          const { error: storageError } = await supabase.storage
            .from("DiaryImage")
            .upload(imageURL, image); 

          // 写真のアップロードにエラーがあるか
          if (storageError) {
            console.log(storageError)
            throw new Error("storageError");
          }

          //テーブルに保存する画像のURLを作成
          const { data: DiaryImageURL } = await supabase.storage
            .from("DiaryImage")
            .getPublicUrl(imageURL);

          return DiaryImageURL.publicUrl;
        })
      );

      //初めにsupabaseへ写真以外のデータを登録
      const { error: insertError, data: DiaryData } = await supabase
        .from("DiaryData")
        .insert({
          Title: addTitle,
          DiaryDate: addDate,
          DiaryContent: addContent,
          DiaryEmotion: addEmotion,
          DiaryImage: updateImage,
        })
        .select();
      if (insertError) {
        console.log(insertError)
        throw new Error("insertError");
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "storageError") {
        alert("画像のアップロードに失敗しました。再度試してください。");
      } else if (error.message === "insertError") {
        alert("日記の登録に失敗しました。再度試してください。");
      } else {
        alert("予期しないエラーが発生しました。時間を置いて再度お試しください。");
      }
    } else {
      alert("エラーが発生しました。時間を置き再度やり直してください");
    }
    console.log(error);
    }
  // 登録完了後alert及びinputのクリア
  alert("日記を登録しました");
  setAddDate("");
  setAddContent("");
  setAddEmotion("");
  setAddTitle("");
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
  addImage: File[],
  viewImage: string[],
  setViewImage: React.Dispatch<React.SetStateAction<string[]>>,
  setAddImage: React.Dispatch<React.SetStateAction<File[]>>,
  setCapacityError: React.Dispatch<React.SetStateAction<string>>
) => {
  // 選択した写真のファイルを取得
  const targetImage = e.currentTarget.files?.[0];

  //選択されいている写真があるか
  if (targetImage) {
    // 選択した写真のファイルサイズが5MB以内であるか
    if (targetImage.size <= 5242880) {
      const imageURL = window.URL.createObjectURL(targetImage);
      // 選択された写真が3つ以内か
      if (viewImage.length > 2) {
        alert("写真は3つまでです");
        return viewImage;
      } else {
        const image = [...viewImage, imageURL];
        setViewImage(image);
        console.log(viewImage);
        console.log(viewImage.length);
      }
      setAddImage((prevFile) => [...prevFile, targetImage]);
    } else {
      setCapacityError("写真のサイズは5MBまでです");
    }
  }
};
