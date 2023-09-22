import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';




import "../utils"
import "../styles/form_styles.css"

export class CheckFormComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '', // State to store the search query
    };
  }

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

    render() {
      const { searchQuery } = this.state;
      const { comp_dict, ticked, changeFunc } = this.props;

      const filteredKeys = Object.keys(comp_dict).filter((cls) =>
        cls.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Create an object to group checkboxes by family
      const groupedCheckboxes = {};

      filteredKeys.forEach((cls) => {
        const family = comp_dict[cls].family || 'Other'; // Use 'Other' if family is undefined
        if (!groupedCheckboxes[family]) {
          groupedCheckboxes[family] = [];
        }
        groupedCheckboxes[family].push(cls);
      });


      return(
          <div className='checkbox-container'>
            <FormControl
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={this.handleSearchChange}
              className="mb-0"
            />

            
          <Form>
            {Object.keys(groupedCheckboxes).map((family) => (
              <div key={`checkbox-group-${family}`}>
                <Form.Label className="mb-0">
                  {family} {/* Display the family name as a label */}
                </Form.Label>
                {groupedCheckboxes[family].map((cls) => (
                  <div key={`checkbox-${cls}`}>
                    <Form.Check
                      label={cls}
                      id={cls}
                      defaultChecked={ticked.includes(cls)}
                      onChange={(e) => changeFunc(cls, e.target.checked)}
                      
                    />
                  </div>
                ))}
              </div>
            ))}
          </Form>
        </div> 
      )
    }
}
