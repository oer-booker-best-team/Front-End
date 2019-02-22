import styled from "styled-components"

export const BooksWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* width: 80%; */
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
    height: 200px;
    background-size: 100%;
    background-repeat: no-repeat;
  }

  i {
    color: #730200;
    font-size: 18px;
    margin-left: 10px;
  }

  @media (max-width: 1200px) {
    flex-direction: column;
    img {
      margin: 20px auto;
    }
  }
  @media (max-width: 850px) {
    width: 100%;
    flex-direction: row;
    img {
      margin: 0;
      width: 35%;
      height: 180px;
    }
  }
  @media (max-width: 700px) {
    flex-direction: column;
    img {
      margin: 20px auto;
    }
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

  @media (max-width: 1200px) {
    width: 100%;
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
  span,
  i {
    color: #045d75;
  }

  hr {
    width: 80%;
    margin: 20px auto;
  }

  i {
    font-size: 22px;
    margin-bottom: 30px;
  }

  a {
    color: #730200;
  }

  @media (max-width: 1000px) {
    width: 100%;
  }
`

export const BookHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  img {
    height: 200px;
  }

  @media (max-width: 1000px) {
    flex-direction: column;
    margin-bottom: 30px;
  }
`
