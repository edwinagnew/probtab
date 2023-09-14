import React, { Component } from 'react';



import Offcanvas from 'react-bootstrap/Offcanvas';


export class SidePaneComp extends Component {
    render() {
        const selectedNode = this.props.selectedNode;
        const comp_dict = this.props.comp_dict;
        return (
            // for styling see https://react-bootstrap.netlify.app/docs/components/offcanvas#offcanvasheader 
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