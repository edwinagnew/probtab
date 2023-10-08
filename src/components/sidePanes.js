import React, { Component } from 'react';

import { InlineTex } from 'react-tex';

import Accordion from 'react-bootstrap/Accordion';

import Offcanvas from 'react-bootstrap/Offcanvas';

export class NodeSidePaneComp extends Component {
    render() {
        const { selectedNode, comp_dict, openPanel, closePanel, sidePaneRef } = this.props;

        
        if (!comp_dict[selectedNode]){
            return (<Offcanvas show={openPanel} scroll={true} backdrop={false} placement='end'></Offcanvas>);
        }
        return (
            // for styling see https://react-bootstrap.netlify.app/docs/components/offcanvas#offcanvasheader 

            <div ref={sidePaneRef}>
            <Offcanvas show={openPanel} scroll={true} backdrop={false} onHide={closePanel} placement='end' id="offCanvasNodeComp">
                <Offcanvas.Header closeButton>
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
                    
                        {comp_dict[selectedNode].includes.map((inc, index) => (
                        <li key={index}>{inc}</li>
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
            </div>
            
        );

    }
}

export class EdgeSidePaneComp extends Component {
    render(){
        
        const {selectedEdge, pathDict, openPanel, closePanel, sidePaneRef} = this.props;

        const complicatedness_dict = {
            0: "Trivial",
            1: "Easy",
            2: "Medium",
            3: "Hard"
        }
        
            
        if (selectedEdge == "" || pathDict == {}){
            return (
            <Offcanvas show={openPanel} scroll={true} backdrop={false} onHide={closePanel} placement='end' id="offCanvasEdgeComp">
                <Offcanvas.Header closeButton>
                    Header    
                </Offcanvas.Header>
            </Offcanvas>
            )
        }
        
        return (
        <Offcanvas show={openPanel} scroll={true} backdrop={false} onHide={closePanel} placement='end' id="offCanvasEdgeComp">
            <Offcanvas.Header closeButton>
                <InlineTex texContent={"$$\\mathsf{" + selectedEdge.split("_")[0] + "} \\subseteq \\mathsf{" + selectedEdge.split("_")[1] + "}$$"} />        
            </Offcanvas.Header>
            
            Follows from:

            <Accordion> 
                {pathDict[selectedEdge].map( (step, index) => (
                    <Accordion.Item eventKey={index.toString()}>
                        <Accordion.Header>
                            <InlineTex texContent={"$$\\mathsf{" + step.from + "} \\subseteq \\mathsf{" + step.to + "}$$"} /> 
                            <br></br>
                            <div>({complicatedness_dict[step.complicatedness]})</div>
                        </Accordion.Header>
                        <Accordion.Body>
                            {step.info} 
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>


            
            
        </Offcanvas>);
    }
}
