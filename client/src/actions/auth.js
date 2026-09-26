"use server"
import "server-only";
import { cookies } from "next/headers";
import { signIn } from "../auth";
import { API_ENDPOINTS } from "../services/api/endpoints";
import AppConfig from "../config/app.config";

export async function getSelf() {
    const { USER } = API_ENDPOINTS;
    try {
        const cookieStore = await cookies();
        const res = await fetch(`${AppConfig.baseUrl}/api/v1${USER.me()}`, {
            headers: { Cookie: cookieStore.toString() },
            cache: "no-store",
            method: "GET"
        });
        if (res.status === 401) {
            const err = new Error("Unauthenticated");
            err.status = res.status;
        }
        return await res.json();
    } catch (error) {
        console.log("ERROR", error);
        throw err;
    }

}

export async function googleLogin() {
    await signIn("google")
}

