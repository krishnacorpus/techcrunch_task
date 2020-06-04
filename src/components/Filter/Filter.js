import React from "react";
import { Button } from "semantic-ui-react";

const Filter = (props) => (
        
      <Button 
        disabled ={!props.show}
        onClick={() =>props.filterListHandler2()}
        >
        Filter
        </Button>
    )
export default Filter;
