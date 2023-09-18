import React, { Component } from 'react';

import Graph from 'react-graph-vis';

import {getGraphOptions } from '../utils';

export class GraphComp extends Component {
    render() {

        const options = getGraphOptions();
        
        return (

        <div className='graph-border'>
            <Graph
                graph={this.props.graph}
                options={options}
                events={this.props.events}
                getNetwork={network => {
                    this.props.graphRef.current = network;
                }}
            />

        </div>
        )
    }

}