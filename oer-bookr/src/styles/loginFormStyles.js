import styled from "styled-components"

import Background from "../assets/images/bookcase.jpg"
import { Form } from "./formStyles"

export const LoginForm = styled(Form)`
  max-width: 600px;
  margin: 50px auto;
  background-image: url(${Background});
  border-radius: 10px;
  color: #fff;

  input {
    color: #fff;
    font-size: 20px;
  }
  h1 {
    text-align: center;
    color: white;
    font-weight: 700;
  }
`
