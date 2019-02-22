# **OER-Bookr**

> Link to [FrontEnd](https://open-source-edu-books.netlify.com/)

> Link to [backend](https://open-source-edu-books.herokuapp.com/)

## What is it?

- OER-Bookr is a free application that provides digitized materials offered freely and openly for educators, students, and self-learners to use and reuse for teaching, learning, and research.

## Motivation?

- Provide users a reliable way to access interesting books
- Enable users to add their favorite books and share them with others
- Practice creating a mid level project from the ground up.

## How to install and Run?

OER-Bookr was created using create-react-app.

- Fork and clone this repository
- Run the command `yarn install` to install all required dependencies.
- Run yarn start to start it on your computer (http://localhost:3000).

- Dependencies:

  - axios: ^0.18.0
  - bootstrap: ^4.3.0,
  - prop-types: ^15.7.2,
  - react: ^16.8.1,
  - react-dom: ^16.8.1,
  - react-reveal: ^1.2.2,
  - react-router-dom: ^4.3.1,
  - react-scripts: 2.1.5,
  - react-spinners: ^0.5.1,
  - reactstrap": ^7.1.0,
  - styled-components: ^4.1.3

## Project's structure:

- assets: Contains all the images used for the categories and the background image of the application

- components:

  - Booklist: Displays all the books (using the Book component) for all subjects, a specific subject, or all the books added by user
  - CategoryList: Displays all the subjects (using Category component) for the user to choose from
  - modals: Components used to add/update a review as well as for warning before deleting a review or a book
  - navigation: Component for the navigation bar
  - review: Component to display a specific review , with the reviewer and the text of the review, as well as the 5 stars rating. The StarReview component is used in adding/updating a review.
  - BackgroundImage: Used to display the background image of the application
  - BookForm: Form used to add/update a book

- containers:

  - Auth: Login and Sign up are used in the authentication part of the application, to login and sign in a user
  - BookDescription: Used when clicking on the title of a book. It displays all the information about the specific book. It also handles
    add/update/delete of a review about that book
  - Books: Used to display the home page. It also handles add/update/delete a book.

- styles:
  Contains all the styles using styled-components.
