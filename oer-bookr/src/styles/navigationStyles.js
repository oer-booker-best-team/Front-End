import styled from "styled-components"

export const NavWrapper = styled.div`
  max-width: 1500px;
  width: 80%;
  margin: auto;

  img {
    margin-right: 10px;
    width: 33px;
    height: 33px;
  }

  a {
    margin: 0 10px;
    color: white;
  }
  .active {
    padding: 5px;
    border-bottom: 3px solid #045d75;
  }

  span {
    color: white;
    margin-left: 30px;
  }
`
