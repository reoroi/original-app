'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const Registration = () => {
  const router=useRouter()

  const clickHome=()=>{
    router.push('/')
  }
  return (
    <div>

      <button onClick={clickHome}>戻る</button>
      <div>
        <div className='bg-red-900'>
          content
        </div>
      </div>
    </div>
  )
}

export default Registration