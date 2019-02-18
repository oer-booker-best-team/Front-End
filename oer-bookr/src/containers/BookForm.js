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

  componentDidMount = () => {
    const token = localStorage.getItem("jwt")
    const requestOptions = {
      headers: {
        authorization: token
      }
    }
    if (!token) this.props.history.push("/login")
    else {
      if (this.props.type === "Update") {
        const getBookInfoUrl = `https://oer-bookr-api.herokuapp.com/books/${
          this.props.match.params.id
        }`
        axios
          .get(getBookInfoUrl, requestOptions)
          .then(res => {
            const currentInfo = { ...res.data }
            delete currentInfo.id
            delete currentInfo.reviews
            this.setState({ bookInfo: currentInfo })
          })
          .catch(err => console.log(err))
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
    const token = localStorage.getItem("jwt")
    const requestOptions = {
      headers: {
        authorization: token
      }
    }
    if (!token) this.props.history.push("/login")
    else {
      if (this.props.type === "Add") {
        const bookInfoURL = `https://oer-bookr-api.herokuapp.com/books`
        axios
          .post(bookInfoURL, this.state.bookInfo, requestOptions)
          .then(res => {
            this.props.update()
            this.props.history.goBack()
          })
          .catch(err => console.log(err))
      } else if (this.props.type === "Update") {
        const getBookInfoUrl = `https://oer-bookr-api.herokuapp.com/books/${
          this.props.match.params.id
        }`
        axios
          .put(getBookInfoUrl, this.state.bookInfo, requestOptions)
          .then(res => {
            this.props.update()
            this.props.history.goBack()
          })
          .catch(err => console.log(err))
      }
    }
  }

  render() {
    return (
      <div>
        <BackgroundImage />
        <Zoom>
          <AddForm onSubmit={this.action}>
            <h1>{this.props.type} A Book</h1>
            <BookInfo>
              <InputBox
                name="title"
                type="text"
                placeholder="Title *"
                onChange={this.saveInput}
                value={this.state.bookInfo.title}
              />
              <InputBox
                name="author"
                type="text"
                placeholder="Author *"
                onChange={this.saveInput}
                value={this.state.bookInfo.author}
              />
              <InputBox
                name="publisher"
                type="text"
                placeholder="Publisher *"
                onChange={this.saveInput}
                value={this.state.bookInfo.publisher}
              />
              <InputBox
                name="license"
                type="text"
                placeholder="License *"
                onChange={this.saveInput}
                value={this.state.bookInfo.license}
              />
            </BookInfo>
            <Subject>
              <select
                name="subject"
                required
                onChange={this.saveInput}
                value={this.state.bookInfo.subject}
              >
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
                value={this.state.bookInfo.image}
              />
              <InputBox
                name="link"
                type="text"
                placeholder="Link"
                onChange={this.saveInput}
                value={this.state.bookInfo.link}
              />
            </Links>
            <Button color="primary" type="submit">
              {this.props.type} Book
            </Button>
          </AddForm>
        </Zoom>
      </div>
    )
  }
}

export default BookForm
