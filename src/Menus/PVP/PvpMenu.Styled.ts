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

export const PlayerDiv = styled.div`
  display: grid;
  width: 50%;
  margin: 1vh;
  max-width: 40vw;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 1vh rgba(0, 0, 0, 0.1);
`

export const CustomInput = styled.input`
  background-color: white;
  border-color: #1a1a1a;
  border-radius: 4px;
  margin-bottom: 5px;
  color: black;
`

export const CustomLink = styled(Link)`
  pointer-events: auto;
  color: black;
  display: inline-block;
  padding: 1vh 2vw;
  background-color: #4285f4;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;

  &:hover {
    color: black;
  }
`
export const Container = styled.div`
  display: flex;
  justify-content: center;
  max-width: 55vw;
  max-height: 20vh;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 1vh rgba(0, 0, 0, 0.1);
  margin-bottom: 1vh;
`

export const PlayerLabel = styled.div`
  display: flex;
  justify-content: center;
  color: black;
  margin: 5px;
`
