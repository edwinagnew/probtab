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

        console.log("selected", selectedEdge);
        

        const path = [];
        if (selectedEdge in pathDict){
            const path = pathDict[selectedEdge];
            console.log("got", path);
        }
        else{
            console.log("shit.", selectedEdge, "didnt have a path");
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
                Header    
            </Offcanvas.Header>
            
            

            {/* <Accordion> //not working!
                {path.map( (step, index) => (
                    <Accordion.Item eventKey={index.toString()}>
                        <Accordion.Header>{step.from}, {step.to} ({step.complicatedness})</Accordion.Header>
                            <Accordion.Body>
                                Hello 
                            </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion> */}

            <ul>
                {pathDict[selectedEdge].map( (step, index) => (
                    <li key={index}>
                        {step.from}, {step.to}
                    </li>
                    ))}
            </ul>   


            
            
        </Offcanvas>);
    }
}
