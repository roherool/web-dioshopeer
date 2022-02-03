import React from 'react';

import Cart from './Cart';

import './component-styles.css';

const Header = () => {
    return (

        <div className="container-fluid wrapper-header">
            <div className="wrapper-nav">
                <a href="/" className="col-md-6 header-logo col-sm-12 ">DIO Shopeer</a>
                <nav className="col-md-4">
                    <ul className="header-menu">
                        <li className="header-menu-item"><a href="/">HOME</a></li>
                        <li className="header-menu-item"><a href="/contato">CONTATO</a></li>
                        <Cart />
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Header;
