// src/pages/tutorial.js
import React from 'react';
import { Link } from 'gatsby';

import { NavComp } from '../../components/mainNav';


const MainTutorialPage = () => {
  return (
    <div>
        <NavComp/>

        <h1>About</h1>
        <ul>
        This website is an interactive Hasse diagram of complexity theory. What's the problem?
        <li>
            <Link to="/tutorials/complexity">I dont know what complexity theory is</Link>
        </li>
        <li>
            <Link to="/tutorials/poset">I dont know what a Hasse diagram is</Link>
        </li>
        <li>
            <Link to="/tutorial3">I dont know how to interact</Link>
        </li>
        </ul>
    </div>
  );
};

export default MainTutorialPage;
