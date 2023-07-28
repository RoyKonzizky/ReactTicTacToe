import styled from "styled-components";
import {Link} from "react-router-dom";

export const CustomTable = styled.table`
  border: 2px solid forestgreen;
  width: 10vw;
  height: 20vh;
  margin-bottom: 10px;
`

export const CustomTh = styled.th`
  border: 1px solid black;
  color: black;
`

export const CustomTd = styled.td`
  text-align: center;
  border: 1px solid black;
  color: black;
`

export const TableDiv = styled.div`
  display: Grid;
  width: 25vw;
  justify-content: center;
  align-items: center;
`

export const CustomLink = styled(Link)`
  pointer-events: auto;
  color: white;
  padding: 1vh ;
  background-color: #4285f4;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  transition: all ease .2s;

  &:hover {
    color: white;
    box-shadow: 0 0 33px -6px #434343;
  }
`

export const DivLink = styled.div`
  display: flex; /* Use flexbox to create a flexible container */
  flex-direction: column; /* Set the main axis direction to vertical, so items are stacked vertically */
  align-items: center; /* Align items (link and label) horizontally at the center of the container */
  text-align: center; /* Center the text content of the flex items (label) horizontally */
`
