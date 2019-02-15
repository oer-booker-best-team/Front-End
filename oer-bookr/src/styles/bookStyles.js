import styled from "styled-components"

export const BooksWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin: 0 auto;
  position: relative;
  top: 0;
  left: 0;
`

export const BookWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  margin: 20px;
  padding: 10px;
  box-shadow: 1px 2px 1px #d1d1d1;
  border-radius: 2px;
  background-color: #d7a481;

  width: 45%;

  img {
    height: 150px;
    background-size: 100%;
    background-repeat: no-repeat;
  }
`

export const BookInfo = styled.div`
  width: 70%;
  margin-left: 2%;
  font-size: 18px;

  span {
    font-weight: 700;
  }

  a {
    color: #730200;
    cursor: pointer;
    :hover {
      color: #bc1102;
      text-decoration: none;
    }
  }
`

export const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 100px auto;
  padding: 20px;
  background-color: #d7a481;
  font-size: 18px;
  position: relative;
  top: 0;
  left: 0;

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  h1,
  h2,
  h3,
  span {
    color: #045d75;
  }

  hr {
    width: 80%;
    margin: 20px auto;
  }
`
