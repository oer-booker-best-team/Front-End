import styled from "styled-components"

export const Form = styled.form`
  padding: 20px;
  font-size: 2rem;

  h3 {
    color: #045d75;
  }

  textarea {
    font-size: 20px;
    width: 100%;
  }

  h1 {
    margin: auto;
    color: white;
    font-weight: 700;
    background-color: #045d75;
    width: 100%;
    text-align: center;
    margin-bottom: 50px;
    padding: 10px;

    @media (max-width: 900px) {
      font-size: 25px;
    }
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

export const Row = styled.div`
  margin-bottom: 25px;
  position: relative;
  overflow: hidden;
  margin-right: 20px;
  margin-left: 20px;

  input {
    width: 100%;
    height: 40px;
    font-size: 25px;
    padding: 10px;
    padding-left: 30%;
    box-sizing: border-box;
    border: 1px solid #045d75;
    border-bottom: 4px solid #045d75;
    box-shadow: 5px 10px #888888;
    background-color: transparent;
    color: white;
    border-radius: 5px;
    transition: all 0.3s cubic-bezier(1, 0.1, 0, 0.9);

    :focus {
      outline: none;
    }
    :focus + label {
      background-color: #730200;
    }
  }

  input + label {
    background-color: #045d75;
  }

  label {
    position: absolute;
    top: auto;
    bottom: 0;
    left: 0;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-weight: bold;
    width: 22%;
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    padding: 0 10px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: white;
    border-radius: 3px 0 0 3px;
    transition: background-color 2s ease-out;

    @media (max-width: 900px) {
      width: 28%;
      font-size: 14px;
    }
    @media (max-width: 600px) {
      width: 40%;
    }

    i {
      color: white;
      margin-right: 5px;

      @media (max-width: 900px) {
        display: none;
      }
    }
  }

  select {
    width: 50%;
    color: white;
    font-size: 25px;
    font-weight: 700;
    border: 1px solid #045d75;
    border-bottom: 4px solid #045d75;
    border-right: none;
    box-shadow: 5px 10px #888888;
    background-color: #045d75;
    border-radius: 5px;
    padding: 10px;
    outline: none;
    transition: background-color 2s ease-out;
    :focus {
      background-color: #730200;
    }

    @media (max-width: 900px) {
      width: 100%;
      font-size: 14px;
    }
  }
`
