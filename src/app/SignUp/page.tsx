import Link from 'next/link'
import React from 'react'

const page = () => {

  return (
    <div className="bg-[#DBEAFF] min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-3 flex flex-col shadow-2xl rounded-md">
        <p className="text-2xl mx-auto">アカウント作成</p>
          <p>ユーザ名</p>
          <input type="text" className="border border-gray-300" />
          <p>パスワード</p>
          <input type="text" className="border border-gray-300" />
          <button className="bg-blue-500 text-white mt-3 rounded ">ログイン</button>
          <Link className="underline mx-auto text-xs mt-1  " href={"SignUp"}>すでにアカウントお持ちの方</Link>
      </div>
    </div>
  )
}

export default page