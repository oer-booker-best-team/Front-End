import styled from "styled-components"

export const Form = styled.form`
  padding: 20px;
  font-size: 2rem;
`

export const InputLabel = styled.label`
  font-size: 1.4rem;
  font-weight: bold;
`

export const InputBox = styled.input`
  font-size: 1.5rem;
  padding: 5px;
  width: 100%;
  :focus {
    outline: none;
  }
  border-radius: 5px;
  margin-bottom: 10px;
`

export const Button = styled.button`
  font-size: 1.4rem;
  padding: 5px 10px;
  margin: 10px;

  border-radius: 5px;
  :focus {
    outline: none;
  }
  border-radius: 5px;
  ${props =>
    props.color === "primary"
      ? `background-color: #007bff; border-color: #007bff; color: #fff;`
      : props.color === "secondary"
      ? `background-color: #08a581; border-color: #08a581; color: #fff;`
      : props.color === "danger" &&
        `background-color: #d30606; border-color: #d30606; color: #fff;`}
`
