import React, {useContext} from 'react';
import MainHeader from "./Component/MainHeader/MainHeader";
import Login from "./Component/Login/Login";
import Home from "./Component/Home/Home";
import AuthContext from "./Store/AuthContext";

const App = () => {

    const ctx = useContext(AuthContext)
    return (
        <React.Fragment>
            <MainHeader></MainHeader>
            <main>
                {!ctx.isLoggedIn && <Login></Login>}
                {ctx.isLoggedIn && <Home></Home>}
            </main>
        </React.Fragment>
    )
}

export default App;