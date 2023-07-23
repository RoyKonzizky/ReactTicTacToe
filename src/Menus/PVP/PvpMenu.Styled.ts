import styled from "styled-components";

export const ErrorLabel = styled.label`
  visibility: hidden;
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

export const SignsDiv = styled.div`
  display: grid;
  width: 50%;
  margin: 10px;
`

export const NamesDiv = styled.div`
  display: grid;
  width: 50%;
  margin: 10px;
`

