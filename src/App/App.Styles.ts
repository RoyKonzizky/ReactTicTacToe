import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  justify-content: center;
`

export const Image = styled.img`
  width: 30vw;
  height: 30vw;
  margin: 1.5vh;
  opacity: 1;
  transition: box-shadow .3s;
  border-radius: 1vh;
  border: 0.1vh solid #ccc;
  background: #fff;

  &:hover {
    box-shadow: 0 0 1vh rgba(33, 33, 33, .2);
  }
`