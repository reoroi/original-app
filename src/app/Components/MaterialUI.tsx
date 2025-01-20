import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { handleClickEmotion } from "../Function/function";
import { useEffect, useState } from "react";

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props } classes={{ popper: className }} />
  
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 13,
    },
}));

const  CustomButton=styled(Button)({
  fontSize:36,
  padding:0,
})


export default function CustomizedTooltips(
  {selectEmotion,emotion,setEmotion}:{selectEmotion:string,emotion:string,setEmotion:React.Dispatch<React.SetStateAction<string>>}
) {

  // クリックされたとき選択された対象の感情スタンプの背景色を変更
  useEffect(()=>{
        setIsEmotionClicked(emotion === selectEmotion);

  },[selectEmotion,emotion])

  // 選択された感情フラグ
  const [isEmotionClicked,setIsEmotionClicked]=useState<boolean>(false)
  let title: string = "";
  // 感情ごとにtooltipのtitleを設定
  switch (emotion) {
    case "😁":
      title = "喜び";
      break;
    case "😡":
      title = "怒り";
      break;
    case "😢":
      title = "哀しみ";
      break;
    case "😊":
      title= "楽しい";
      break;
  }
  
  return (
    <LightTooltip title={title}>
      <CustomButton sx={{
        // 感情スタンプがクリックされている場合背景の変更
        background: isEmotionClicked ?  "rgb(129, 182, 252)":""
      }} onClick={()=>handleClickEmotion(emotion,setEmotion,selectEmotion)} >
        {emotion}
      </CustomButton>
    </LightTooltip>
  );
}
