"use client";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CreateIcon from "@mui/icons-material/Create";
import HomeIcon from "@mui/icons-material/Home";
import { Button } from "@mui/material";
import { currentUserContext } from "../useAuth";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = useContext(currentUserContext);
  console.log(currentUser,"ユーザ情報")
  return (
    <div className="flex w- ">
      <Button className="w-full" onClick={() => router.push("/Calendar")}>
        <CalendarMonthIcon fontSize="large"/>
      </Button>
      <Button className="w-full" onClick={() => router.push("DiaryHome")}>
        <HomeIcon fontSize="large" />
      </Button> 
      <Button className="w-full" onClick={() => router.push("/AddSchedule")}>
        <CreateIcon fontSize="large"/>
      </Button>
      <Button className="w-full" onClick={() => router.push("/DiarySearch")}>
        <SearchIcon fontSize="large"/>
      </Button>
      <Button className="w-full" onClick={() => setIsOpen(!isOpen)}><AccountCircleIcon fontSize="large"></AccountCircleIcon></Button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 "
          onClick={() => setIsOpen(!isOpen)}
        />
      )}

      <nav
        className={`block fixed bg-white top-0 rounded-s-2xl ${
          isOpen ? "right-0" : "right-[-400px]"
        }  bottom-0 transition-all  z-0 `}
      >
        <div className="p-5 text-2xl ">
          <p>{currentUser?.email}</p>
          <p>{currentUser?.userName}</p>
          <p>メール情報</p>
          <p>可能であればパスワードの初期化</p>
          <button className="bg-red-500 p-2 rounded-md ">ログアウト</button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
