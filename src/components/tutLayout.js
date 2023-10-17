// src/components/Layout.js
import React from 'react';
//import 'path-to-your-shared-styles.css'; // Import your shared styles

const tutLayoutComp = ({ children }) => {
  return (
    <div>
      <SidePane />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default tutLayoutComp;
