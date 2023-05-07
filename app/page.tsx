"use client"
import Image from 'next/image'
import { useEffect } from 'react'


export default function Home() {
  useEffect(() => {
    console.log("hello world")
  }, [])
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <a href="/login">login</a>
        <span className="text-9xl m-auto">HOME</span>
        <a href="/register">register</a>
      </div>
    </main>
  )
}
