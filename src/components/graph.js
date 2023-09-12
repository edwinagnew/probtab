import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Graph from 'react-graph-vis';

import { recentreGraph, getGraphOptions } from '../utils';

export class GraphComp extends Component {
    render() {

        const options = getGraphOptions();
        
        return (

        <div className='graph-border'>
            <div style={{padding:5}}>
                <Button variant="secondary" onClick={() => recentreGraph(this.props.graphRef.current)}>Recentre</Button>{' '}
            </div>

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