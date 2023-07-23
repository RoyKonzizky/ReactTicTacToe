import styled from "styled-components";
import {Link} from "react-router-dom";

export const ErrorLabel = styled.label`
  min-height: 1em;
  position: relative;
  display: inline-block;
  color: red;
`

export const LabelDiv = styled.div`
  justify-content: center;
  display: inline-block;
`

export const LinkDiv = styled.div`
  justify-content: center;
  display: inline-block;
`

export const DivLinkLabel = styled.div`
  display: flex; /* Use flexbox to create a flexible container */
  flex-direction: column; /* Set the main axis direction to vertical, so items are stacked vertically */
  align-items: center; /* Align items (link and label) horizontally at the center of the container */
  text-align: center; /* Center the text content of the flex items (label) horizontally */
`

export const InputDiv = styled.div`
  display: flex; /*with this the line below doesnt work*/
  justify-content: space-evenly; /*placed the label on opposite sides*/
  margin: 10px;
`

export const Player1Div = styled.div`
  display: grid;
  width: 50%;
  margin: 10px;
  max-width: 400px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

export const Player2Div = styled.div`
  display: grid;
  width: 50%;
  margin: 10px;
  max-width: 400px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

export const CustomLink = styled(Link)`
  pointer-events: auto;
  color: black;
  display: inline-block;
  padding: 10px 20px;
  background-color: #4285f4;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;

  &:hover {
    color: black;
  }
`
export const Container = styled.div`
  max-width: 400px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`