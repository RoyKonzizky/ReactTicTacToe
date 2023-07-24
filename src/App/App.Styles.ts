import styled from "styled-components";

export const Main = styled.div`
  display: flex; /* Use flexbox to create a flexible container */
  justify-content: center;
  flex-direction: column; /* Set the main axis direction to vertical, so items are stacked vertically */
  align-items: center; /* Align items (link and label) horizontally at the center of the container */
`

export const Image = styled.img`
  width: 20vw;
  height: 20vw;
  margin: 15px;
  opacity: 1;
  transition: box-shadow .3s;
  border-radius: 1vh;
  border: 1px solid #ccc;
  background: #fff;

  &:hover {
    box-shadow: 0 0 1vh rgba(33, 33, 33, .2);
  }
`

export const GameModes = styled.div`
  justify-content: center;
  display: inline-block;
`

export const ScoreDiv = styled.div`
  justify-content: center;
  display: inline-block;
`
