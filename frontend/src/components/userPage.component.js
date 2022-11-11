import React, { Component } from "react";

import UserService from "../services/userService";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Page pour les habitants</h3>
          <p>Ici l'utilisateur pourra voir l'état de ses comptes dans l'immeuble et poser des questions</p>
        </header>
      </div>
    );
  }
}