/* eslint react-refresh/only-export-components: off */
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

type AuthUser = { username: string } | null;
type AuthContextValue = {
    user: AuthUser;
    login: (username: string, password: string) => Promise<boolean>;
    register: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<AuthUser>(null);
    // Dummy login function
    const login = useCallback(async (username: string, password: string) => {
        // Simulate login
        // if (username && password) {
        //     setUser({ username });
        //     return true;
        // }
        // return false;

        try {
              const formData = {
                "email": username,
                "password": password

            }
             let res = await fetch("http://localhost:5064/api/Auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON. stringify(formData)

            })
            let res1=await res.json()
            console.log(res1)
            setUser({ username })
            if(res1.success){
                await localStorage.setItem("token",JSON.stringify(res1.token))
            }
            return res1.success
        } catch (error) {
             alert(error.message)
            return false
        }
    }, []);

    // Dummy register function
    const register = useCallback(async (username: string, password: string) => {
        // Simulate registration success
        // console.log(username,password,"kkkk")
        try {
            const formData = {

                "username": username.split("@")[0],
                "email": username,
                "password": password
            }
            let res = await fetch("http://localhost:5064/api/Auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)

            })
            let res1=await res.json()
            console.log(res1)
            return res1.success
        } catch (error:any) {
            alert(error.message)
            return false
        }
        
    }, []);

    // Dummy logout function
    const logout = useCallback(() => {
        setUser(null);
        localStorage.clear()
    }, []);

    // Dummy effect to simulate user session
    useEffect(() => {
        // Optionally, load user from localStorage or just leave empty for demo
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};