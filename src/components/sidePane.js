import React, { Component } from 'react';

import { InlineTex } from 'react-tex';



import Offcanvas from 'react-bootstrap/Offcanvas';


export class SidePaneComp extends Component {
    render() {
        const selectedNode = this.props.selectedNode;
        const comp_dict = this.props.comp_dict;

        if (!comp_dict[selectedNode]){
            return (<Offcanvas show={this.props.openPanel} scroll={true} backdrop={false} placement='end'>No info</Offcanvas>)
        }
        return (
            // for styling see https://react-bootstrap.netlify.app/docs/components/offcanvas#offcanvasheader 

            
            <Offcanvas show={this.props.openPanel} scroll={true} backdrop={false} placement='end'>
                <Offcanvas.Header>
                <Offcanvas.Title>{selectedNode}</Offcanvas.Title>
                
                <br></br>

                <div>({comp_dict[selectedNode].shortDescription})</div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                <div className="panel-container">

                    

                    <div>Informally: {comp_dict[selectedNode].informalDefinition}</div>

                    <br></br>

                    <div>Formally: <InlineTex texContent={comp_dict[selectedNode].formalDefinition}/></div>
                    

                    <br></br>

                    <div>Includes:</div>
                    
                    <ul>
                    
                        {comp_dict[selectedNode].includes.map((inc) => (
                        <li>{inc}</li>
                        ))}

                    </ul>

                    <div>Notes:</div>
                    <ul>
                    {comp_dict[selectedNode].extraInfos.map((info, index) => (
                        
                        <li key={index}>
                            <InlineTex texContent={info} />
                        </li>
                        ))}
                    </ul>


                </div>
               
                </Offcanvas.Body>
              
            </Offcanvas>
            
        )
    }
}