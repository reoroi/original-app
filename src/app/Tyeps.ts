import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { MutableRefObject } from "react";

export type AddScheduleType = {
  title: string;
  date: string;
};
//
export type CalendarEventType = {
  Id: string;
  UserID:string
  title: string;
  date: string;
  createdAt: string;
  DiaryContent: string;
  DiaryEmotion: string;
  DiaryImage?: { [key: string]: string }[];
};

export type DiaryEventType = {
  Id: string;
  Title: string;
  UserID:string
  DiaryDate: string;
  createdAt: string;
  DiaryContent: string;
  DiaryEmotion: string;
  DiaryImage?: { [key: string]: string }[];
};

export type AuthUserType = {
  userID:string
  userName: string;
  email: string;
  password: string;
};

export type DiaryStateType = {
  state: {
    editTitle: string;
    editDate: string;
    editContent: string;
    editEmotion: string;
    addImage: File[];
    viewImage: string[];
  };
};
export type EditFormPropsType = {
  editTitle: string;
  setEditTitle: React.Dispatch<React.SetStateAction<string>>;
  editDate: string;
  setEditDate: React.Dispatch<React.SetStateAction<string>>;
  editContent: string;
  setEditContent: React.Dispatch<React.SetStateAction<string>>;
  editEmotion: string;
  setEditEmotion: React.Dispatch<React.SetStateAction<string>>;
  addImage: File[];
  setAddImage: React.Dispatch<React.SetStateAction<File[]>>;
  viewImage: string[];
  setViewImage: React.Dispatch<React.SetStateAction<string[]>>;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  diaryImageObject: { [key: string]: string }[] | undefined;
  params: { id: string };
};

export type DiaryDetailViewProps={
  diaryDetailData:DiaryEventType | null
  diaryImageObject: { [key: string]: string }[] | undefined;
  setEditTitle: React.Dispatch<React.SetStateAction<string>>;
  setEditDate: React.Dispatch<React.SetStateAction<string>>;
  setEditContent: React.Dispatch<React.SetStateAction<string>>;
  setEditEmotion: React.Dispatch<React.SetStateAction<string>>;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;

}