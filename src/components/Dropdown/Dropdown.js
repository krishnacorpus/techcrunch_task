import React from "react";
import { Dropdown } from "semantic-ui-react";

const options = [
  { key: "pre", text: "Pre_stage", value: "pre_seed" },
  { key: "early", text: "Early_stage", value: "early_stage" },
  { key: "growth", text: "Growth_stage", value: "growth_stage" },
];
const DropdownExampleMultipleSelection = (props) => (
        <Dropdown
        style={{ margin: 20, display: 'inline-block', maxWidth: 400}}
        placeholder="Filter"
        fluid
        multiple
        selection
        options={options}
        onChange={props.dropdownOnChange}
      />
    )


export default DropdownExampleMultipleSelection;
