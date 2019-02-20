import styled from "styled-components"

import { Form } from "./formStyles"

export const LoginForm = styled(Form)`
  max-width: 600px;
  margin: 50px auto;
  background-color: #d7a481;
  border-radius: 10px;
  color: #fff;
  position: relative;
  top: 0;
  left: 0;

  input {
    color: #fff;
    font-size: 25px;
  }
  h1 {
    text-align: center;
    color: #045d75;
    font-weight: 700;
  }
`
