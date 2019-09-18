import React from 'react';
import {NavLink} from 'react-router-dom';

const Home = () => {
    return(
        <div className='home-container'>
            <h1>Please Login!</h1>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/logout'>Logout</NavLink>
        </div>
    );
};

export default Home;