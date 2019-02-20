import styled from "styled-components"

export const Form = styled.form`
  padding: 20px;
  font-size: 2rem;

  h3 {
    color: #045d75;
  }

  input,
  textarea {
    color: #045d75;
  }

  textarea {
    font-size: 20px;
    width: 100%;
  }
`

export const InputLabel = styled.label`
  font-size: 25px;
  font-weight: bold;
  color: #fff;

  i {
    color: #045d75;
  }
`

export const InputBox = styled.input`
  font-size: 15px;
  padding: 5px;
  width: 100%;
  :focus {
    outline: none;
  }
  border-radius: 5px;
  margin-bottom: 10px;
  border: 1px solid #045d75;
  border-bottom: 4px solid #045d75;
  border-right: none;
  box-shadow: 5px 10px #888888;
  background-color: transparent;
  font-size: 14px;
  ::placeholder {
    color: #fff;
  }
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
  ${({ color }) =>
    color === "primary"
      ? `background-color: #fff; 
         color: #045d75; 
         :hover {
          background-color: #045d75;
          color: white;
         }
        `
      : color === "secondary"
      ? `background-color: #045d75; 
         color: #fff; 
         :hover {
          background-color: #fff;
          color: #045d75;
         }
        `
      : color === "danger" &&
        `background-color: #BC1102; 
         color: #fff;
         :hover {
          background-color: #fff;
          color: #BC1102;
         }
        `}
`

export const Logout = styled.div`
  display: inline-block;
`

export const Message = styled.div`
  color: #bc1102;
  text-align: center;
  margin-top: 100px;
`

export const MessageLogin = styled(Message)`
  background-color: #d7a481;
  font-size: 18px;
  a {
    color: white;
    :hover {
      color: #045d75;
    }
  }
`
