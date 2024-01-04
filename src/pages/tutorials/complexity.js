import * as React from "react"

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { NavComp } from "../../components/mainNav";



import C1 from "../../tutorials/comp-1.mdx"
import C2 from "../../tutorials/comp-2.mdx"




const CompTut = () => {
  return (
    <main>
        <div className="everything-container">
          <NavComp/>
          <div style={{ marginTop: '70px', height: 'calc(100vh - 70px)', overflowY: 'auto' }}>

            <Tabs
              defaultActiveKey="easy"
              id="uncontrolled-tab-example"
              className="mb-3"
              position="absolute"
              fill

            >
              <Tab eventKey="easy" title="Easy">
                <C1/>
              </Tab>  
              <Tab eventKey="medium" title="Medium">
                <C2/>
              </Tab>  
          </Tabs>

          </div>

          
        </div>
    </main>
  )
}

export default CompTut
