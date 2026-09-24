
"use client"
import { getAuthStorage } from "../../../shared/utils";

export default function AuthLayout({ children }){
    const tokens = getAuthStorage();    
    return <div>{children}</div>
}