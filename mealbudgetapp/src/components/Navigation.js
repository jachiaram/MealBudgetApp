import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    return (
        <header>
            <div>
                <a></a>
            </div>
        <div className='Navigation'>
            <ul>
            <li className='navItems'>
                <Link to="/">Home</Link>
            </li>
            <li className='navItems'>
                <Link to="/mylists">MyLists</Link>
            </li>
            <li className='navItems'>
                <Link to="/account">Account</Link>
            </li>
            <li className='navItems'>
                <Link to="/about">About</Link>
            </li>
            </ul>
        </div>
        <div>
            <a></a>
        </div>
        </header>
    )
};
 
export default Navigation;