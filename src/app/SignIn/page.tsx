"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AuthUserType } from "../Tyeps";
import { handleSignIn } from "../Function/function";

const SignIn = () => {
  // エラーメッセージの表示変数
  const [signInError,setSignInError]=useState<string>("")
  // ログイン成功時のrouter
  const router=useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthUserType>({ mode: "onChange" });

  return (
    <div className="bg-[#DBEAFF] min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-3 shadow-2xl rounded-md">
        <p className="text-2xl text-center">ログイン</p>
        <p className="text-red-500">{signInError}</p>
        <form
          onSubmit={handleSubmit((signInData) =>   handleSignIn(signInData,setSignInError,router))}
          className="flex flex-col"
        >
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
            type="email"
          />
          <p className="text-red-500">{errors.email?.message}</p>

          <p className="mt-2">パスワード</p>
          <input
            {...register("password", {
              required: "パスワードを入力してください",
              minLength: { value: 10, message: "パスワードは10文字以上です" },
            })}
            className="rounded-md border px-3 py-2 focus:border-2 focus:border-blue-400 focus:outline-none"
            type="password"
          />
          <p className="text-red-500">{errors.password?.message}</p>

          <button type="submit" className="bg-blue-500 text-white mt-3 rounded">
            ログイン
          </button>
          <Link className="underline mx-auto text-xs mt-1 block" href="SignUp">
            アカウント作成
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

