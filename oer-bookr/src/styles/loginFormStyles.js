import styled from "styled-components"

import { Form } from "./formStyles"

export const LoginForm = styled(Form)`
  max-width: 600px;
  /* border: 3px solid #007bff; */
  margin: 50px auto;
  background-color: #d7a481;
  border-radius: 10px;

  h1 {
    text-align: center;
    color: white;
  }

  input {
    border: none;
    background-color: #d7a481;
    border-bottom: 1px solid white;
    font-size: 14px;
  }

  button {
    background-color: white;
    color: #045d75;
    border: none;
    border-radius: 10px;

    :hover {
      background-color: #045d75;
      color: white;
    }
  }

  label {
    color: #045d75;
  }
`
