import React, { Component } from 'react';


import SlidingPanel from 'react-sliding-side-panel';
import 'react-sliding-side-panel/lib/index.css';

export class SidePaneComp extends Component {
    render() {
        const selectedNode = this.props.selectedNode;
        const comp_dict = this.props.comp_dict;
        return (
            <SlidingPanel
                type="right"
                size={30}
                isOpen={this.props.openPanel}
                noBackdrop={true}
            >
                {comp_dict[selectedNode] && (<div className="panel-container">
                <div>Name: {selectedNode}</div>
                <div>{comp_dict[selectedNode].shortDescription}</div>
                </div>
                )}
            </SlidingPanel>
        )
    }
}