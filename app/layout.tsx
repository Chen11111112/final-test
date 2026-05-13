'use client'
import "@/styles/main.scss";
import { useRouter } from 'next/navigation';
import { useState } from "react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <html> 
      <body>
        <nav style={{background:'#456', display:'flex', gap:'10px' ,padding:'1%',color:'#fff'}}>
          
          <a onClick={() => router.push('/')} > 首頁 </a>
          <a onClick={() => router.push('/user-create')} > 新增用戶 </a>
          <a onClick={() => router.push('/user-edit')} > 編輯用戶 </a>
        </nav>
        {children}
      </body>
    </html>
    
  );
}
