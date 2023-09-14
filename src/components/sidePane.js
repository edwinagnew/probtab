import React, { Component } from 'react';



import Offcanvas from 'react-bootstrap/Offcanvas';


export class SidePaneComp extends Component {
    render() {
        const selectedNode = this.props.selectedNode;
        const comp_dict = this.props.comp_dict;
        return (
            // <SlidingPanel
            //     type="right"
            //     size={30}
            //     isOpen={this.props.openPanel}
            //     noBackdrop={true}
            // >
            //     {comp_dict[selectedNode] && (<div className="panel-container">
            //     <div>Name: {selectedNode}</div>
            //     <div>{comp_dict[selectedNode].shortDescription}</div>
            //     </div>
            //     )}
            // </SlidingPanel>
            <Offcanvas show={this.props.openPanel} scroll={true} backdrop={false} placement='end'>
                <Offcanvas.Header>
                <Offcanvas.Title>{selectedNode}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                {comp_dict[selectedNode] && (<div className="panel-container">
                 <div>{comp_dict[selectedNode].shortDescription}</div>
                 </div>
                 )}
                </Offcanvas.Body>
            </Offcanvas>
        )
    }
}