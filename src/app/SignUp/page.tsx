"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthUserType } from "../Tyeps";
import { handleSignUp } from "../Function/function";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [signUpError, setSignUpError] = useState<string>("");
  const router=useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthUserType>({ mode: "onChange" });

  return (
    <div className="bg-[#DBEAFF] min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-3 shadow-2xl rounded-md ">
        <p className="text-2xl text-center">アカウント作成</p>
        <p>{signUpError}</p>
        <form
          onSubmit={handleSubmit(
            async (signUpData) => await handleSignUp(signUpData, setSignUpError,router)
          )}
          className="flex flex-col"
        >
          <p className="mt-2">ユーザ名</p>
          <input
            {...register("userName", {
              required: "ユーザ名を入力してください",
              minLength: { value: 3, message: "ユーザ名は3文字以上にしてください" },
              maxLength:{value:15,message:"ユーザ名は15文字以内にしてください"}
            })}
            className="rounded-md border px-3 py-2 focus:border-2 focus:border-blue-400 focus:outline-none"
            type="text"
            name="userName"
          />
          <p className="text-red-500">{errors.userName?.message}</p>
          <p className="mt-2">メール</p>
          <input
            {...register("email", {
              required: "メールを入力してください",
              pattern: {
                value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
                message: "正しいメールアドレスを入力してください",
              },
            })}
            className="rounded-md border px-3 py-2 focus:border-2 focus:border-blue-400 focus:outline-none"
            type="e-mail"
            name="email"
          />
          <p className="text-red-500">{errors.email?.message}</p>

          <p className="mt-2">パスワード</p>
          <input
            {...register("password", {
              required: "パスワードを入力してください",
              minLength: { value: 10, message: "パスワードは10文字以上にしてください" },
            })}
            className="rounded-md border px-3 py-2 focus:border-2 focus:border-blue-400 focus:outline-none"
            type="password"
            name="password"
          />
          <p className="text-red-500">{errors.password?.message}</p>
          <button type="submit" className="bg-blue-500 text-white mt-3 rounded ">
            作成
          </button>
          <Link className="underline mx-auto text-xs mt-1 block " href={"/SignIn"}>
            すでにアカウントお持ちの方
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
