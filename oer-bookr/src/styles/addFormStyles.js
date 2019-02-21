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

  button {
    width: 20%;
  }

  label {
    font-size: 18px;
    @media (max-width: 900px) {
      width: 28%;
      font-size: 14px;
    }
  }

  @media (max-width: 800px) {
    button {
      width: 40%;
    }
  }
`
