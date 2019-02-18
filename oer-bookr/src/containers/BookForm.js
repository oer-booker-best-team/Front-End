import React, { Component } from "react"
import Zoom from "react-reveal/Zoom"
import axios from "axios"

import { Button, InputBox } from "../styles/formStyles"
import { AddForm, BookInfo, Subject, Links } from "../styles/addFormStyles"
import BackgroundImage from "../components/BackgroundImage"
import bookImage from "../assets/images/bookcase.jpg"

class BookForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookInfo: {
        title: "",
        author: "",
        publisher: "",
        license: "",
        subject: "",
        image: bookImage,
        link: ""
      }
    }
  }

  saveInput = event => {
    const newInfo = {
      ...this.state.bookInfo,
      [event.target.name]: event.target.value
    }
    this.setState({ bookInfo: newInfo })
  }

  action = event => {
    event.preventDefault()
    const bookInfoURL = `https://oer-bookr-api.herokuapp.com/books`
    const token = localStorage.getItem("jwt")
    const requestOptions = {
      headers: {
        authorization: token
      }
    }
    if (!token) this.props.history.push("/login")
    else {
      axios
        .post(bookInfoURL, this.state.bookInfo, requestOptions)
        .then(res => {
          this.props.update()
          this.props.history.push(
            `/books/category/${this.state.bookInfo.subject}`
          )
        })
        .catch(err => console.log(err))
    }
  }

  render() {
    return (
      <div>
        <BackgroundImage />
        <Zoom>
          <AddForm onSubmit={this.action}>
            <h1>Add A Book</h1>
            <BookInfo>
              <InputBox
                name="title"
                type="text"
                placeholder="Title"
                onChange={this.saveInput}
                value={this.state.title}
              />
              <InputBox
                name="author"
                type="text"
                placeholder="Author"
                onChange={this.saveInput}
                value={this.state.author}
              />
              <InputBox
                name="publisher"
                type="text"
                placeholder="Publisher"
                onChange={this.saveInput}
                value={this.state.publisher}
              />
              <InputBox
                name="license"
                type="text"
                placeholder="License"
                onChange={this.saveInput}
                value={this.state.license}
              />
            </BookInfo>
            <Subject>
              <select name="subject" required onChange={this.saveInput}>
                <option value="" disabled selected>
                  Subject
                </option>
                <option value="History">History</option>
                <option value="Math">Math</option>
                <option value="Arts">Arts</option>
                <option value="Education">Education</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="Business">Business</option>
              </select>
            </Subject>
            <Links>
              <InputBox
                name="image"
                type="text"
                placeholder="Image"
                onChange={this.saveInput}
                value={this.state.image}
              />
              <InputBox
                name="link"
                type="text"
                placeholder="Link"
                onChange={this.saveInput}
                value={this.state.link}
              />
            </Links>
            <Button color="primary" type="submit">
              Add Book
            </Button>
          </AddForm>
        </Zoom>
      </div>
    )
  }
}

export default BookForm
