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
  color: white;
  margin-top: var(--margin-unit);
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
  max-width: calc(50% - 5px - 1vh - 3vh);
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 1vh rgba(0, 0, 0, 0.1);
  padding: 3vh;
`

export const CustomInput = styled.input`
  background-color: #f3f3f3;
  padding: 8px;
  border-radius: 4px;
  width: calc(100% - 8px - 8px);
  color: black;
  border: none;
  outline: none;
  box-shadow: 0 0 3px 1px black;
  margin: 8px 8px;
  transition: all ease .1s;

  &:focus {
    background-color: #fff;
    border-color: black;
    box-shadow: none;
  }

`

export const CustomLink = styled(Link)`
  pointer-events: auto;
  color: white;
  display: inline-block;
  padding: 1vh 2vw;
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
export const Container = styled.div`
  display: flex;
  justify-content: center;
  //max-width: 55vw;
  //max-height: 20vh;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 1vh rgba(0, 0, 0, 0.1);
  margin-bottom: 1vh;
  padding: 5vh;
`

export const PlayerLabel = styled.div`
  display: flex;
  justify-content: center;
  color: black;
  margin: 5px;
`

export const ImgSlot = styled.img`
  width: 50px;
  height: 50px;
`

export const CustomHeader = styled.h1`
  color: #1a1a1a;
`
