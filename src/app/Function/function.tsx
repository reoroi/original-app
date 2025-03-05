import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { supabase } from "../../../utils/supabase";
import { AuthUserType, DiaryEventType, CalendarEventType } from "../Types";
import { v4 as uuidv4 } from "uuid";
import DiaryList from "../Components/DiaryList";

// supabaseへ日記を追加する処理
export const AddDiary = async (
  addTitle: string,
  addDate: string,
  addContent: string,
  addEmotion: string,
  addImage: File[],
  authUser: AuthUserType | null,
  setAddTitle: React.Dispatch<React.SetStateAction<string>>,
  setAddContent: React.Dispatch<React.SetStateAction<string>>,
  setAddEmotion: React.Dispatch<React.SetStateAction<string>>,
  setAddImage: React.Dispatch<React.SetStateAction<File[]>>,
  setViewImage: React.Dispatch<React.SetStateAction<string[]>>,
  router: AppRouterInstance
) => {
  try {
    //テーブルへ保存する画像の変数を宣言
    let uploadImage: { [key: string]: string }[] = [];

    // アップロードする画像がある場合処理を実行
    if (addImage.length > 0) {
      // supabaseへ画像を登録しテーブルに保存する画像オブジェクトを受け取る
      uploadImage = await diaryUploadImage(addImage);
    }

    //supabaseへ日記のデータ登録
    const { error: insertError } = await supabase
      .from("DiaryData")
      .insert({
        Title: addTitle,
        UserID: authUser?.userID, //現在サイインしているユーザIDを格納
        DiaryDate: addDate,
        DiaryContent: addContent,
        DiaryEmotion: addEmotion,
        DiaryImage: uploadImage,
      })
      .select();

    if (insertError) {
      console.log(insertError);
      throw new Error("insertError");
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
    return;
  }
  // 登録完了後alert及びinputのクリア
  alert("日記を登録しました");
  setAddContent("");
  setAddEmotion("");
  setAddTitle("");
  setAddImage([]);
  setViewImage([]);

  router.push("/");
};

//supabaseへ写真を追加し公開URLの取得処理
export const diaryUploadImage = async (
  addImage: File[],
) => {
  // アップロードする画像を格納するオブジェクト配列を宣言
  let updateImage: { [key: string]: string }[] = [];

  // 選択された最大3つのファイルを順次supabaseへ登録
  updateImage = await Promise.all(
    addImage.map(async (image) => {
      // supabaseのストレージへ登録する画像URL
      const supabaseImageURL = `DiaryImage/${uuidv4()}`;
      // supabaseのストレージへ画像を登録
      const { error: storageError } = await supabase.storage
        .from("DiaryImage")
        .upload(supabaseImageURL, image);

      // 写真のアップロードにエラーがあるか
      if (storageError) {
        console.log(storageError);
        throw new Error("storageError");
      }

      //テーブルに保存する画像のURLを作成
      const { data: DiaryImageURL } = await supabase.storage
        .from("DiaryImage")
        .getPublicUrl(supabaseImageURL);

      return { [supabaseImageURL]: DiaryImageURL.publicUrl };
    })
  );
  return updateImage;
};

// supabaseから登録画像の削除
export const imageDelete = async (
  storagePath: string,
  diaryImageObject: { [key: string]: string }[],
  index: number,
  { id }: { id: string }
) => {
  try {
    // supabaseのストレージから画像の削除
    const { data: deleteData, error: deleteError } = await supabase.storage
      .from("DiaryImage")
      .remove([storagePath]);

    if (deleteData) {
      console.log(deleteData, "削除成功");
    }
    if (deleteError) {
      console.log(deleteError);
      throw deleteError;
    }

    // クリック対象の画像データを削除
    diaryImageObject.splice(index, 1);

    // ストレージから画像の削除成功後更新
    if (deleteData) {
      const { error: updateError } = await supabase
        .from("DiaryData")
        .update({ DiaryImage: diaryImageObject })
        .eq("Id", id);
      if (updateError) {
        console.log(updateError);
        throw updateError;
      }
    }
  } catch (error) {
    console.log(error);
    alert("画像の削除に失敗しました");
  }

};

// 編集時の写真変更処理
export const viewImageDelete = (
  setViewImage: React.Dispatch<React.SetStateAction<string[]>>,
  viewImage: string[],
  setAddImage: React.Dispatch<React.SetStateAction<File[]>>,
  addImage: File[],
  index: number
) => {
  // 削除選択された表示画像を格納
  const deleteViewImage = [...viewImage];
  // 削除選択された登録画像を格納
  const deleteAddImage = [...addImage];

  // 表示画像の削除
  deleteViewImage.splice(index, 1);
  // 登録画像の削除
  deleteAddImage.splice(index, 1);

  // 反映
  setViewImage(deleteViewImage);
  setAddImage(deleteAddImage);
};

// 編集保存ボタン
export const saveDiary = async (
  editTitle: string,
  editDate: string,
  editContent: string,
  editEmotion: string,
  addImage: File[],
  params: { id: string },
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>,
  setAddImage: React.Dispatch<React.SetStateAction<File[]>>,
  setViewImage: React.Dispatch<React.SetStateAction<string[]>>,
  diaryImageObject: { [key: string]: string }[] | undefined
) => {
  //既存の画像とテーブルへ保存する画像の変数を宣言
  let uploadImage: { [key: string]: string }[] = diaryImageObject ? [...diaryImageObject] : [];

  // アップロードする画像が選択されているか
  if (addImage.length > 0) {
    const newUploadedImages = await diaryUploadImage(addImage);
    uploadImage = [...uploadImage, ...newUploadedImages]; // 既存の画像と新規画像を結合
  }
  console.log(uploadImage, "最終的なuploadImage");
  //内容をアップデートする
  const { error } = await supabase
    .from("DiaryData")
    .update({
      Title: editTitle,
      DiaryDate: editDate,
      DiaryContent: editContent,
      DiaryEmotion: editEmotion,
      DiaryImage: uploadImage,
    })
    .eq("Id", params.id);

  if (error) {
    //supabaseへの登録でエラーが出た際の処理
    console.log(error, "supabaseのアップデート処理でエラーが発生しました");
  } else {
    alert("日記を更新しました");
    setIsEdit(false);
    setAddImage([]);
    setViewImage([]);
  }
};

// 編集ボタン処理
export const diaryEdit = (
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>,
  setEditTitle: React.Dispatch<React.SetStateAction<string>>,
  setEditDate: React.Dispatch<React.SetStateAction<string>>,
  setEditContent: React.Dispatch<React.SetStateAction<string>>,
  setEditEmotion: React.Dispatch<React.SetStateAction<string>>,
  diaryDetailData: DiaryEventType | null
) => {
  if (diaryDetailData) {
    setIsEdit(true);
    setEditTitle(diaryDetailData?.Title);
    setEditDate(diaryDetailData?.DiaryDate);
    setEditContent(diaryDetailData?.DiaryContent);
    setEditEmotion(diaryDetailData.DiaryEmotion);
  }
};

// 編集時の日記削除ボタン
export const deleteDiary = async (params: { id: string }, router: AppRouterInstance) => {
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
export const renderSearchResult = (searchList: CalendarEventType[], searchStatus: number) => {
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
  setSignUpError: React.Dispatch<React.SetStateAction<string>>,
  router: AppRouterInstance,
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
      alert("アカウントを作成しました");
    }
  } catch (error) {
    if (error instanceof Error && error.message === "User already registered") {
      setSignUpError("既に同じユーザが登録されています。");
    } else {
      setSignUpError("アカウント作成時にエラーが発生しました。");
    }
  }

  router.push("SignIn");
};

// SignIn処理
export const handleSignIn = async (
  signInData: AuthUserType,
  setSignInError: React.Dispatch<React.SetStateAction<string>>,
  router: AppRouterInstance,
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUserType | null>>
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
      // サイイン後各ユーザの情報を取得し格納
      const signInUser = {
        userID: data.user.id,
        email: data.user.user_metadata.email,
        userName: data.user.user_metadata.first_name,
      } as AuthUserType;

      setAuthUser(signInUser);
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
    console.log(error)
    alert("サインアウトでエラーが発生しました");
  }
};

export const handleClickImag = (ref: React.MutableRefObject<HTMLInputElement | null>) => {
  ref.current?.click();
};

// 日記画像をinputへ追加処理
export const onchangeUploadImage = (
  e: React.FormEvent<HTMLInputElement>,
  viewImage: string[],
  setViewImage: React.Dispatch<React.SetStateAction<string[]>>,
  setAddImage: React.Dispatch<React.SetStateAction<File[]>>,
  diaryImageObject?: { [key: string]: string }[] //編集が画面でのみ渡される引数
) => {
  // 選択した写真のファイルを取得
  const targetImage = e.currentTarget.files?.[0];

  // supabaseに保存されている写真数
  const supabaseImageCount = diaryImageObject?.length || 0;

  //選択されいている写真があるか
  if (targetImage) {
    // 選択した写真のファイルサイズが5MB以内であるか
    if (targetImage.size <= 5242880) {
      // ローカルで表示する写真画像のURLを作成
      const imageURL = window.URL.createObjectURL(targetImage);

      // 選択された写真が3つ以内か(編集時にはsupabsaeの写真数も入れる)
      if (viewImage.length + supabaseImageCount > 2) {
        alert("写真は3つまでです");
        return viewImage;
      } else {
        // 選択されている写真を格納
        const image = [...viewImage, imageURL];
        setViewImage(image);
      }
      setAddImage((prevFile) => [...prevFile, targetImage]);
    } else {
      alert("写真のサイズは5MBまでです");
    }
  }
};

//日付を月と日に分ける
export const formatDate = (date: string | undefined) => {
  if (date) {
    //月と日だけを取り出す
    const monthDay = date.slice(5);
    const formatDate: string = monthDay.replace("-", "/");
    return formatDate;
  }
};

// Titleを30字以内で表示
export const formatTitle = (title: string) => {
  if (title.length > 30) {
    const formatTitle = title.slice(0, 29);
    return formatTitle;
  } else {
    return title;
  }
};

// Contentを60字以内で表示
export const formatContent = (Content: string) => {
  if (Content.length > 60) {
    const formatContent = Content.slice(0, 59);
    return formatContent;
  } else {
    return Content;
  }
};
