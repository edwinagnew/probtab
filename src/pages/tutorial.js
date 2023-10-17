// src/pages/tutorial.js
import React from 'react';
import { Link } from 'gatsby';

const TutorialPage = () => {
  return (
    <div>
        <h1>Help</h1>
        <ul>
        This website is an interactive Hasse diagram of complexity theory. What's the problem?
        <li>
            <Link to="/tutorials/comp_tutorial">I dont know what complexity theory is</Link>
        </li>
        <li>
            <Link to="/tutorials/poset_tutorial">I dont know what a Hasse diagram is</Link>
        </li>
        <li>
            <Link to="/tutorial3">I dont know how to interact</Link>
        </li>
        </ul>
    </div>
  );
};

export default TutorialPage;
