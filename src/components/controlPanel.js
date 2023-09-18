import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


import { recentreGraph } from '../utils';



export class ControlButtonComp extends Component {
    render() {
        return(
            <div className='button-panel'>
             <ButtonGroup aria-label="Basic example">
                <Button onClick={() => recentreGraph(this.props.graphRef.current)}>Recentre</Button>
                <Button>Settings</Button>
                <Button>?</Button>
                <Button>Keyboard</Button>
            </ButtonGroup>
          </div> 
        )
    }
}