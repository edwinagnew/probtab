import * as React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { NavComp } from "../../components/mainNav";

import {QuizBox} from "../../components/quizBox"

import C1 from "../../tutorials/comp-1.mdx";
import C2 from "../../tutorials/comp-2.mdx";
import C3 from "../../tutorials/comp-3.mdx";

import '../../styles/tut_styles.css'


const CompTut = () => {
  
  return (
    <main>
      <div className="everything-container">
        <NavComp/>
        
        <div className="tut-selector">
          <Tabs
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="easy" title="Level 1">
              <C1/>
            </Tab>  
            <Tab eventKey="medium" title="Level 2">
              <C2/>
            </Tab>
            <Tab eventKey="hard" title="Level 3">
              <C3/>
            </Tab>  
          </Tabs>
        </div>
      </div>
    </main>
  );
};

export default CompTut;
