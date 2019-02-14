import styled from "styled-components"

export const BooksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 100px auto;

  h1 {
    text-align: center;
  }
`

export const BookWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  margin-top: 20px;
  padding: 10px;
  box-shadow: 1px 2px 1px #d1d1d1;
  border-radius: 2px;

  img {
    height: 150px;
    background-size: 100%;
    background-repeat: no-repeat;
  }
`

export const BookInfo = styled.div`
  width: 70%;
  margin-left: 2%;

  span {
    font-weight: bold;
  }

  a {
    color: #628bd6;
    cursor: pointer;
    :hover {
      color: #d2e6cc;
    }
  }
`

export const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 100px auto;

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
`
