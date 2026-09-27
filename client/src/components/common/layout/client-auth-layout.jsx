"use client";
import { useEffect } from "react";
import authStore from "../../../store/auth.store";


const ClientAuthLayout = ({ user, children }) => {
    const { setUser } = authStore(s => s);
    useEffect(() => {
        if (user) {
            setUser(user);
        }
    }, [user, setUser]);

    return (
        <main>{children}</main>
    )
}

export default ClientAuthLayout