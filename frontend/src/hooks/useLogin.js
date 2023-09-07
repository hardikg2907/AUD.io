import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (email,password,type) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email, password,type}),

        })
        const json = await response.json()
        console.log(json)
        setError(json.error)
        localStorage.setItem('profile', {name: 'Hardik Garg'})
        if(!response.ok)
        {
            setIsLoading(false)
            setError(json.error)
            setTimeout(()=>{
                setError(null)
            },2000)
        }
        if(response.ok) {
            // save the user to local storage
            localStorage.setItem('profile', JSON.stringify(json))

            // update the auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
            return true
        }
    }

    return { login, isLoading, error}
}