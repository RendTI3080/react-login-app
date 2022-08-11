import React from 'react';
import style from './MainHeader.module.css'
import Navigation from "./Navigation";

const MainHeader = () => {
    return (
        <header className={style['main-header']}>
            <h1>A Typical Page</h1>
            <Navigation></Navigation>
        </header>
    )
}

export default MainHeader;