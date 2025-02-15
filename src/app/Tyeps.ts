export type AddScheduleType = {
  title:string,
  date:string,
}
//
export type ScheduleEventType={
  Id:string,
  title:string,
  date:string,
  createdAt:string,
  DiaryContent:string,
  DiaryEmotion:string
}

export type DiaryEventType={
  Id:string,
  Title:string,
  DiaryDate:string,
  createdAt:string,
  DiaryContent:string,
  DiaryEmotion:string,
  DiaryImage:string[]
}

export type AuthUserType={
  userName:string,
  email:string,
  password:string
}