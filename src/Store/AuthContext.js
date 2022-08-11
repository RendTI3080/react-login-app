import React, {useEffect, useState} from 'react';

/**
 * useContext
 *
 * We know. React have rules. if we want to send data or function to another component we need state Chain
 * you must  send state to parent component first if your component had
 *
 * with useContext we don't need to state chain. if we had wide apps. we can maintenance easily if we used useContext
 *
 * */


const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {
    },
    onLogin: (email, password) => {
    }
})

export const AuthContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    /**
     * Lihat catatan di dalam Login.js mengenai useEffect
     * ada beberapa hal yang perlu kita perhatikan mengenai depedency yang ada di dalam useEffect
     *
     * built in data seperti localstorage tidak perlu ditambahkan di dalam depedency karena itau bersifat global
     * dan juga jika ada variabel yang tidak terhubung dengan props atau internal yang ada di return yang tidak
     * memiliki ketergantungan dengan props maka kita tidak perlu menambahkan data di dalam depedency
     *
     * */

    // Check user login data in localStorage
    useEffect(() => {
        // Get localStorage with key name {isLoggedIn}
        const storeUserLogin = localStorage.getItem('isLoggedIn');

        if (storeUserLogin === "1") {
            setIsLoggedIn(true);
        }
    }, []);

    // Logout Hanlder remove data login user in localStorage
    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    }

    // Login Handler set login data user in localStorage
    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', "1")
        setIsLoggedIn(true)
    }

    // return data to component that use this Context
    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )


}

export default AuthContext;