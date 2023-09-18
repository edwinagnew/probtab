import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';


import "../utils"

export class CheckFormComp extends Component {
    render() {
        return(
            <div className='checkbox-container'>
            <Form>
            {Object.keys(this.props.comp_dict).map((cls) => (
              <div className="mb-0" key={`checkbox-${cls}`}>
                <Form.Check // prettier-ignore
                  label={cls}
                  id={cls}
                  defaultChecked={this.props.ticked.includes(cls)}
                  onChange={(e) => this.props.changeFunc(cls, e.target.checked)}
                />
              </div>
            ))}
            </Form>
          </div> 
        )
    }
}
