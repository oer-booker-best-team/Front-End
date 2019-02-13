import styled from "styled-components"

export const CategoriesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin: 100px auto;
`

export const CategoryWrapper = styled.div`
  width: 30%;
  height: 150px;
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
    filter: opacity(50%);
    width: 100%;
    height: 100%;

    :hover {
      filter: opacity(80%);
    }
  }

  p {
    position: absolute;
    top: 25px;
    left: 10%;
    font-size: 22px;
    font-weight: bold;
  }
`
