"use client";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CreateIcon from "@mui/icons-material/Create";
import HomeIcon from "@mui/icons-material/Home";
import { Button } from "@mui/material";
import { currentUserContext } from "../useAuth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { handleLogout } from "../Function/function";

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const {authUser} = useContext(currentUserContext);
  return (
    <div className="flex">
      <Button className="w-full" onClick={() => router.push("/Calendar")}>
        <CalendarMonthIcon fontSize="large" />
      </Button>
      <Button className="w-full" onClick={() => router.push("/")}>
        <HomeIcon fontSize="large" />
      </Button>
      <Button className="w-full" onClick={() => router.push("/AddSchedule")}>
        <CreateIcon fontSize="large" />
      </Button>
      <Button className="w-full" onClick={() => router.push("/DiarySearch")}>
        <SearchIcon fontSize="large" />
      </Button>
      <Button className="w-full" onClick={() => setIsOpen(!isOpen)}>
        <AccountCircleIcon fontSize="large"></AccountCircleIcon>
      </Button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-[2]"
          onClick={() => setIsOpen(!isOpen)}
        />
      )}

      <nav
        className={`block fixed bg-white top-0 rounded-s-2xl bottom-0 transition-all z-[2]
          ${isOpen ? "right-0" : "right-[-400px]"} `}
      >
        <div className="flex flex-col p-5 text-2xl h-full ">
          <p className="font-bold">{authUser?.userName}</p>
          <p>{authUser?.email}</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 rounded-md mt-auto p-2 border-b-red-700 solid border-b-4 active:bg-red-700 active:border-none hover:bg-red-600"
          >
            ログアウト
          </button>
          {/*  */}
        </div>
      </nav>
    </div>
  );
};

export default Header;
