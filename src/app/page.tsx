import DiaryList from "./Components/DiaryList";
import Header from "./Components/Header";
const Home = () => {
  return (
    <div className="min-h-screen ">
      <Header />
      <div className="flex flex-col mt-10 min-h-screen  ">
        <h1 className="text-5xl mx-auto mb-5 font-bold ">日記一覧</h1>
          <DiaryList />
      </div>
    </div>
  );
};
export default Home;
