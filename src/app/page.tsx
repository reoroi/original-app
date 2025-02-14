import { useContext, useEffect } from "react";
import Header from "./Components/Header";
import DiaryList from "./Components/Diary";
import { currentUserContext } from "./useAuth";
const Home = () => {

  return (
    <div className="min-h-screen ">
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
export default Home;
