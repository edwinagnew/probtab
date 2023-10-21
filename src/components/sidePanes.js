import React, { Component } from 'react';

import { InlineTex } from 'react-tex';

import Accordion from 'react-bootstrap/Accordion';

import Offcanvas from 'react-bootstrap/Offcanvas';

import { makeTexSafe } from '../utils';

export class NodeSidePaneComp extends Component {
    render() {
      const { selectedNode, comp_dict, openPanel, closePanel, sidePaneRef } = this.props;
  
      return (
        <div>
          <Offcanvas show={openPanel} scroll={true} backdrop={false} onHide={closePanel} placement='end' id="offCanvasNodeComp">
            {comp_dict[selectedNode] ? (
              <>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>{selectedNode}</Offcanvas.Title>
                  <br></br>
                  <div>({comp_dict[selectedNode].shortDescription})</div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <div className="panel-container">
                    <div>Informally: {comp_dict[selectedNode].informalDefinition}</div>
                    <br></br>
                    <div>Formally: <InlineTex texContent={comp_dict[selectedNode].formalDefinition} /></div>
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
              </>
            ) : (
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>You're not supposed to see this!</Offcanvas.Title>
              </Offcanvas.Header>
            )}
          </Offcanvas>
        </div>
      );
    }
  }
  

  export class EdgeSidePaneComp extends Component {
    render() {
      const { selectedEdge, pathDict, openPanel, closePanel, sidePaneRef } = this.props;
  
      const complicatedness_dict = {
        0: "Trivial",
        1: "Easy",
        2: "Medium",
        3: "Hard",
        4: "Very Hard"
      };
  
      return (
        <Offcanvas show={openPanel} scroll={true} backdrop={false} onHide={closePanel} placement='end' id="offCanvasEdgeComp">
          {selectedEdge && pathDict && pathDict[selectedEdge] ? (
            <>
              <Offcanvas.Header closeButton className="text-center">
                <InlineTex texContent={"$$\\mathsf{" + makeTexSafe(selectedEdge.split("_")[0]) + "} \\subseteq \\mathsf{" + makeTexSafe(selectedEdge.split("_")[1]) + "}$$"} />
              </Offcanvas.Header>
              <Offcanvas.Body>
                <div className="panel-container" style={{ margin: "10px" }}>
                  Follows from:
                  <Accordion alwaysOpen={true}>
                    {pathDict[selectedEdge].map((step, index) => (
                      <Accordion.Item eventKey={index.toString()} key={index}>
                        <Accordion.Header>
                          <div>
                            <InlineTex texContent={"$$\\mathsf{" + makeTexSafe(step.from) + "} \\subseteq \\mathsf{" + makeTexSafe(step.to) + "}$$"} />
                          </div>
  
                          <div style={{ marginLeft: 'auto', marginRight: 0, fontSize: 'small' }}>{complicatedness_dict[step.complicatedness]}</div>
                        </Accordion.Header>
                        <Accordion.Body>{step.info ? <InlineTex texContent={step.info} /> : "Follows from definitions. Why not read them?"}</Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </div>
              </Offcanvas.Body>
            </>
          ) : (
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>You're not supposed to see this!</Offcanvas.Title>
            </Offcanvas.Header>
          )}
        </Offcanvas>
      );
    }
  }
  