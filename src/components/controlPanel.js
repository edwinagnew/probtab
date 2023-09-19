import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


import { recentreGraph } from '../utils';



export class ControlButtonComp extends Component {
    render() {

        const renderTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
              Arrow keys - move
              +/- zoom 
            </Tooltip>
          );

        return(
            <div className='button-panel'>
             <ButtonGroup aria-label="Basic example">
                <Button onClick={() => recentreGraph(this.props.graphRef.current)}>Recentre</Button>
                <Button>Settings</Button>
                <Button>?</Button>
                
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 150, hide: 500 }}
                    overlay={renderTooltip}
                >
                    <Button>Keyboard</Button>
                </OverlayTrigger>
                
            </ButtonGroup>
          </div> 
        )
    }
}