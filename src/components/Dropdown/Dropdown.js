

import React from "react";
import { Dropdown } from "semantic-ui-react";

const options = [
  { key: "pre", text: "Pre_stage", value: "pre" },
  { key: "early", text: "Early_stage", value: "early" },
  { key: "growth", text: "Growth_stage", value: "growth" },
  
//   { key: "ruby", text: "Ruby", value: "ruby" },
//   { key: "ui", text: "UI Design", value: "ui" },
//   { key: "ux", text: "User Experience", value: "ux" }
];


let TYPES =[]
const dropdownOnChange = (target, values) => {
  TYPES=values.value;

  console.log(TYPES);
  
  
};


const DropdownExampleMultipleSelection = (props) => (
        <Dropdown
        placeholder="Filter"
        fluid
        multiple
        selection
        options={options}
        // onChange={dropdownOnChange}
        onChange={props.dropdownOnChange}
      />
    )


export default DropdownExampleMultipleSelection;
