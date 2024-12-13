"use client";

import { useRouter } from "next/navigation";
import { useGetScheduleData } from "../../utils/getSuapbaseData";
import { ScheduleEventType } from "./Tyeps";
import Link from "next/link";

const Home = () => {
  const router = useRouter();
  //supabaseからスケジュールイベントテーブルのデータを取得
  const diaryData: ScheduleEventType[] = useGetScheduleData();
  
  const formatDate=(date:string|undefined)=>{
    if(date){
      //月と日だけを取り出す
      const monthDay=date.substr(5)
      const formatDate=monthDay.replace("-","/")
      return formatDate
    }
  }

  return (
    <div>
      <button onClick={() => router.push("/Calendar")}>カレンダーアイコン</button>
      <ul className="flex flex-col justify-center min-h-screen">
        {diaryData.map((data) => (
          <li className="bg-[#c1e0ff] mx-5 my-2" key={data.Id}>
            <Link href={`DiaryDetail/${data.Id}`}>
            <div className="flex items-center">
              <p className=" flex justify-center items-center w-14 h-14 rounded-full bg-red-200">{formatDate(data.date)}</p>
              <h2 className="text-3xl ml-3">{data.title}</h2>
            </div>
              <p className="mt-3">{data.DiaryContent}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Home;
