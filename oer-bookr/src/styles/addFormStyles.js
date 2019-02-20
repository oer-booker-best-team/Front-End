import styled from "styled-components"

import { Form } from "./formStyles"

export const AddForm = styled(Form)`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 50px auto;
  background-color: #d7a481;
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
    width: 100%;
    margin: 15px 10px;
    font-size: 20px;
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
  width: 100%;
  select {
    width: 50%;
    color: #045d75;
    font-size: 25px;
    font-weight: 700;
    border: 1px solid #045d75;
    border-bottom: 4px solid #045d75;
    border-right: none;
    box-shadow: 5px 10px #888888;
    background-color: transparent;
    border-radius: 5px;
    padding: 10px;
    outline: none;
    margin-left: 10px;
    :hover {
      background-color: #045d75;
      color: #fff;
    }
  }
`

export const Links = styled.div`
  display: flex;

  label {
    width: 25%;
  }
`

export const Group = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 10px;

  label {
    margin: 0 10px;
  }
  input {
    width: 80%;
    padding: 10px;
    border-top: none;
    border-left: none;
    border-right: none;
  }
`
