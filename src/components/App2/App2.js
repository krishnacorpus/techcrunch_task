
import React from "react";
import { Container } from "semantic-ui-react";
import Dropdown from "../Dropdown/Dropdown";
import Filter from "../Filter/Filter";



const App2 = (props) => (
  <Container style={{ margin: 20, display: 'inline-block', maxWidth: 100}}>
      <Dropdown dropdownOnChange={props.dropdownOnChange} />
      <Filter filterListHandler2={props.filterListHandler2} show={props.show} />
  </Container>
);

// TODO: Switch to https://github.com/palmerhq/the-platform#stylesheet when it will be stable
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);



export default App2;