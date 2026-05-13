"use client"

import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import styles from "@/styles/components/User.module.scss"

interface UserType {
  id: string
  username: string
  email: string
}

export default function UserEditPage() {
  const [searchId, setSearchId] = useState("")
  const [targetUser, setTargetUser] = useState<UserType | null>(null)

  // 考題1: useForm表單管理
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: targetUser || { username: "", email: "" },
  })

  // 考題2: 手動呼叫API，而非mount()呼叫
  const handleFetchUser = async () => { // GET by ID
    if (!searchId){
      alert('please input id first') 
      return
    }
    try {
      const response = await fetch(`/api/user/${searchId}`)
      const res = await response.json()
      if (res.result) {
        setTargetUser(res.data)
      } else {
        alert("找不到該 ID 的使用者")
        setTargetUser(null)
      }
    } catch (err) {
      alert(err)
    }
  }

  const onUpdate = async (data: any) => { // PATCH
    const res = await fetch(`/api/user/${targetUser?.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      const result = await res.json()
      alert(result.message)
      setTargetUser(result.user)
    }
  }

  // 考題3: 渲染問題，理解useEffect
  const [count, setCount] = useState(0)
    const handleUpdate = () => {
    setCount(count + 1)
    // 陷阱題!：此時的 count 還是舊的！要使用useEffect進行reRender
    document.title = `目前計數：${count}` 
  }
  // 正確寫法:
  useEffect(()=>{
    document.title = `目前計數：${count}`
  },[count])



  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>使用者管理系統 - 編輯</h1>
        <div className={styles.searchGroup}>
          <div className={styles.inputRow}>
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="輸入要查詢的 ID (例如 1 或 2)"
            />
            {/* handleUpdate() */}
            <button onClick={() => {handleFetchUser();setCount((perv)=> perv+=1) }}>查詢</button>
          </div>
        </div>
        {!targetUser && <p style={{ textAlign: "center", color: "#999", marginTop: "30px" }}>請先查詢使用者</p>}
      </div>

      {targetUser && (
        <div className={styles.overlay} onClick={() => setTargetUser(null)}>
          <form className={styles.modal} onSubmit={handleSubmit(onUpdate)} onClick={(e) => e.stopPropagation()}>
            <h3>編輯使用者 ID: {targetUser.id}</h3>

            <div className={styles.formGroup}>
              <label>Username</label>
              <input 
                className={errors.username ? styles.error : ""} 
                {...register("username", { required: "必填欄位" })} 
              />
              {errors.username && <p className={styles.errorText}>{errors.username.message}</p>}
            </div>

            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                className={errors.email ? styles.error : ""}
                {...register("email", { required: "必填欄位" })}
              />
              {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}
            </div>

            <div className={styles.btnGroup}>
              <button type="button" className={styles.cancel} onClick={() => setTargetUser(null)}>取消</button>
              <button type="submit" className={styles.submit}>儲存修改</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}