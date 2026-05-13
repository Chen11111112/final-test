"use client"

import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import styles from "@/styles/components/User.module.scss"


export default function UserCreatePage() {

  // 考題1: useForm表單管理
  const {
    register,
    handleSubmit,
  } = useForm({
    values: { username: "", email: "" }
  })

  // 考題2: POST
  const onCreate = async (data: any) => {
    const res = await fetch(`/api/user/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    const result = await res.json()
    console.log(result.data)
    if (res.ok) {
      
      alert(result.message)
    }else {
        alert(result.message)
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>使用者管理系統 - 新增</h1>

          <form onSubmit={handleSubmit(onCreate)}>

            <div className={styles.formGroup}>
              <label>Username</label>
              <input 
                {...register("username", { required: "必填欄位" })} 
              />
            </div>

            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                {...register("email", { required: "必填欄位" })}
              />
            </div>

            <div className={styles.btnGroup}>
              <button type="submit" className={styles.submit} >新增</button>
            </div>
          </form>
      </div>
    </div>
  );
}