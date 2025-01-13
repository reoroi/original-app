"use client"
import {  useRouter } from "next/navigation";
import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CreateIcon from '@mui/icons-material/Create';
import HomeIcon from '@mui/icons-material/Home';
import { Button } from "@mui/material";
const Header = () => {
  const router = useRouter();
  return (
    <>
      <Button onClick={() => router.push("/Calendar")}><CalendarMonthIcon/></Button>
      <Button onClick={() => router.push("/")}><HomeIcon/></Button>
      <Button onClick={() => router.push("/AddSchedule")}><CreateIcon/></Button>
      <Button onClick={() => router.push("/DiarySearch")}><SearchIcon/></Button>
    </>
  );
};

export default Header;
