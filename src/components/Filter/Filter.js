



import React from "react";
import { Button } from "semantic-ui-react";




// let TYPES =[]
// const dropdownOnChange = (target, values) => {
//   TYPES=values.value;

//   console.log(TYPES);
  
  
// };


const Filter = (props) => (
        
      <Button 
        onClick={() =>props.filterListHandler2()}
        >
        Filter
        </Button>
    )


export default Filter;
