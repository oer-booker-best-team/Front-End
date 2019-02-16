import styled from "styled-components"

export const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: auto;
`

export const Header = styled.header`
  margin-top: 100px;

  h1 {
    font-weight: bold;
    font-size: 45px;
    text-align: center;
    color: #045d75;
  }

  h2 {
    font-weight: bold;
    font-size: 40px;
    text-align: center;
    color: #a46843;
  }

  p {
    font-size: 22px;
    margin: 10px auto;
    text-align: center;
  }

  img {
    width: 6%;
    height: 70px;
    margin-right: 20px;
  }
`

export const IconGroup = styled.div`
  display: flex;
  width: 20%;
  justify-content: space-evenly;
`

export const Icon = styled.div`
  ${props => (!props.show ? `display: none;` : `display: block;`)}
`

export const Image = styled.img`
  min-height: 100%;
  min-width: 1024px;

  width: 100%;
  height: auto;

  position: fixed;
  top: 0;
  left: 0;

  opacity: 0.2;
`
