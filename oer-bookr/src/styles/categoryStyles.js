import styled from "styled-components"

export const CategoriesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin: 100px auto;
`

export const CategoryWrapper = styled.div`
  width: 30%;
  height: 200px;
  margin: 10px;
  position: relative;
  top: 0;
  left: 0;

  :hover {
    filter: drop-shadow(16px 16px 20px grey);
    border: 1px solid black;
    cursor: pointer;
    color: #ff0000;
  }

  img {
    background-repeat: no-repeat;
    background-size: 100%;
    width: 100%;
    height: 100%;
  }

  p {
    position: absolute;
    top: 5px;
    left: 3%;
    font-size: 25px;
    font-weight: 700;
    color: #bc1102;
    width: 70%;
  }
`
