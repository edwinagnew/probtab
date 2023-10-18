import React, { Component } from 'react';

import { InlineTex } from 'react-tex';

import Accordion from 'react-bootstrap/Accordion';

import Offcanvas from 'react-bootstrap/Offcanvas';

import { makeTexSafe } from '../utils';

export class NodeSidePaneComp extends Component {
    render() {
        const { selectedNode, comp_dict, openPanel, closePanel, sidePaneRef } = this.props;

        
        if (!comp_dict[selectedNode]){
            return (<Offcanvas show={openPanel} scroll={true} backdrop={false} placement='end'></Offcanvas>);
        }
        return (
            // for styling see https://react-bootstrap.netlify.app/docs/components/offcanvas#offcanvasheader 

            // <div ref={sidePaneRef}>
            <div>
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
                    
                    <Offcanvas.Header closeButton className="text-center">
                        <InlineTex texContent={"$$\\mathsf{" + makeTexSafe(selectedEdge.split("_")[0]) + "} \\subseteq \\mathsf{" + makeTexSafe(selectedEdge.split("_")[1]) + "}$$"} />        
                    </Offcanvas.Header>

                    <Offcanvas.Body>
                        <div className="panel-container" style={{ margin:"10px"}}>
                            Follows from:
                            <Accordion alwaysOpen={true}> 
                                {pathDict[selectedEdge].map( (step, index) => (
                                    <Accordion.Item eventKey={index.toString()} key={index}>
                                        <Accordion.Header>
                                            <div><InlineTex texContent={"$$\\mathsf{" + makeTexSafe(step.from) + "} \\subseteq \\mathsf{" + makeTexSafe(step.to) + "}$$"} /> </div>
                                            
                                            <div style={{marginLeft:'auto', marginRight:0, fontSize:'small'}}>({complicatedness_dict[step.complicatedness]})</div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            {step.info ? step.info : "Follows from definitions. Why not read them?"} 
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </Accordion>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>);
    }
}
