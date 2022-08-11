import React, {useContext} from 'react';
import Button from "../UI/Button/Button";
import style from './Navigation.module.css';
import authContext from "../../Store/AuthContext";

const Navigation = (props) => {

    const ctx = useContext(authContext)
    return (
        <nav className={style.nav}>
            <ul>
                {
                    ctx.isLoggedIn && (
                        <li>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a href="#">Users</a>
                        </li>
                    )
                }
                {
                    ctx.isLoggedIn && (
                        <li>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a href="#">Admin</a>
                        </li>
                    )
                }
                {
                    ctx.isLoggedIn && (
                        <li>
                            <Button onClick={ctx.onLogout}>Logout</Button>
                        </li>
                    )
                }
            </ul>
        </nav>
    )
}

export default Navigation;