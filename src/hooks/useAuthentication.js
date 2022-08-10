import { db } from '../firebase/config'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import {useState, useEffect} from 'react'

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // CLEAN UP
    const [cancelled, setCancelled] = useState(null)

    const auth = getAuth()

    function checkIfIsCancelled() {
        if(cancelled) {
            return
        }
    }

    // CADASTRO - REGISTER
    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try {
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false)

            return user
            
        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage

            if (error.message.includes('Password')) {
                systemErrorMessage = 'A senha precisa conter no minimo 6 caracteres'
            }else if(error.message.includes('email-already')) {
                systemErrorMessage = 'E-mail já cadastrado'
            }else {
                systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde!'
            }

            setLoading(false)
            setError(systemErrorMessage)
        }
    }

    // LOGOUT
    const logout = () => {

        checkIfIsCancelled()

        signOut(auth)

    }

    // LOGIN
    const login = async(data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(false)

        try {

            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)
            
        } catch (error) {

            let systemErrorMessage

            if (error.message.includes('user-not-found')) {
                systemErrorMessage = 'Usuário não encontrado!'
            } else if (error.message.includes('wrong-password')) {
                systemErrorMessage = 'Senha incorreta!'
            } else {
                systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde!'
            }

            setLoading(false)
            setError(systemErrorMessage)
            
        }

    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        auth, 
        createUser,
        error,
        loading,
        login,
        logout
    }
}