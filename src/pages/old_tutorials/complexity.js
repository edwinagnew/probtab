import React from 'react';
import { NavComp } from '../../components/mainNav';

const CompTut = () => {
  return (
    <div>
      <NavComp />
      <div className="tutorial-container">
        <div className="contents">
          <h3>Contents</h3>
          <ul>
            <li>
              <a href="#introduction">Introduction</a>
            </li>
            <li>
              <a href="#easy-section">Easy Section</a>
              <ul>
                <li>
                  <a href="#easy-subsection-1">Subsection 1</a>
                </li>
                {/* Add more subsections as needed */}
              </ul>
            </li>
            <li>
              <a href="#medium-section">Medium Section</a>
              <ul>
                <li>
                  <a href="#medium-subsection-1">Subsection 1</a>
                </li>
                {/* Add more subsections as needed */}
              </ul>
            </li>
            <li>
              <a href="#hard-section">Hard Section</a>
              <ul>
                <li>
                  <a href="#hard-subsection-1">Subsection 1</a>
                </li>
                {/* Add more subsections as needed */}
              </ul>
            </li>
          </ul>
        </div>
        <div className="tutorial-content">
          <section id="introduction">
            <h1>Introduction</h1>
            {/* Your introduction content goes here */}
          </section>
          <section id="easy-section">
            <h2>Easy Section</h2>
            <section id="easy-subsection-1">
              <h3>Subsection 1</h3>
              {/* Your content for easy subsection 1 goes here */}
            </section>
            {/* Add more subsections as needed */}
          </section>
          <section id="medium-section">
            <h2>Medium Section</h2>
            <section id="medium-subsection-1">
              <h3>Subsection 1</h3>
              {/* Your content for medium subsection 1 goes here */}
            </section>
            {/* Add more subsections as needed */}
          </section>
          <section id="hard-section">
            <h2>Hard Section</h2>
            <section id="hard-subsection-1">
              <h3>Subsection 1</h3>
              {/* Your content for hard subsection 1 goes here */}
            </section>
            {/* Add more subsections as needed */}
          </section>
        </div>
      </div>
    </div>
  );
};

export default CompTut;
