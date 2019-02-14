import styled from "styled-components"

export const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: auto;
`

export const Header = styled.header`
  margin-top: 100px;

  p {
    font-size: 18px;
    margin: 10px auto;
  }

  img {
    width: 6%;
    height: 70px;
    margin-right: 20px;
  }
`

export const App = styled.span`
  font-weight: bold;
  font-size: 45px;
`

export const Icon = styled.div`
  ${props => (!props.show ? `display: none;` : `display: block;`)}
`
