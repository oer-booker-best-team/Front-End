import styled from "styled-components"

import { Form } from "./formStyles"

export const AddForm = styled(Form)`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 50px auto;
  background-color: rgba(164, 104, 67, 0.7);
  border-radius: 10px;
  position: relative;
  top: 0;
  left: 0;
  margin-top: 100px;
  h1 {
    margin: auto;
    color: #045d75;
    font-weight: 700;
  }
  input {
    width: 45%;
    margin: 20px 10px;
    border-left: none;
    border-right: none;
    font-size: 30px;
    color: #045d75;
    border-color: #045d75;
    ::placeholder {
      font-size: 25px;
      color: #fff;
      font-weight: 700;
    }
  }
  button {
    width: 20%;
    background: transparent;
    border: none;
    border-bottom: 4px solid #045d75;
    color: #fff;
    border-radius: 60px;
    font-weight: 700;
  }
  label {
    color: #fff;
    font-size: 25px;
  }
`

export const BookInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`

export const Subject = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 15px;
  width: 40%;
  select {
    width: 70%;
    color: #fff;
    font-size: 25px;
    font-weight: 700;
    background-color: transparent;
    border: none;
    border-bottom: 4px solid #045d75;
    border-radius: 5px;
    padding: 10px;
    outline: none;
    :hover {
      background-color: #045d75;
      color: #fff;
    }
  }
`

export const Links = styled.div`
  display: flex;
`
