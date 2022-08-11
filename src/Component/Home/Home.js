import React, {useContext} from 'react';
import Card from "../UI/Card/Card";
import style from './Home.module.css';
import Button from "../UI/Button/Button";
import AuthContext from "../../Store/AuthContext";

const Home = () => {

    const ctx = useContext(AuthContext);
    return (
        <Card className={style.home}>
            <h1>Welcome Back</h1>
            <Button onClick={ctx.onLogout}>Logout</Button>
        </Card>
    )
}

export default Home;