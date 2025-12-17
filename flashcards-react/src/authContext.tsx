import React, { createContext, useContext, useEffect, useState } from 'react'
import {onAuthStateChanged } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from './firebase'


const AuthContext = createContext<{user:User|null, loading:boolean}>({user:null, loading:true})
export const useAuth = () => useContext(AuthContext)


export default function AuthProvider({children}:{children:React.ReactNode}){
const [user,setUser] = useState<User|null>(null)
const [loading,setLoading] = useState(true)
useEffect(()=>{
const unsub = onAuthStateChanged(auth, u=>{ setUser(u); setLoading(false) })
return ()=>unsub()
},[])
return <AuthContext.Provider value={{user,loading}}>{children}</AuthContext.Provider>
}