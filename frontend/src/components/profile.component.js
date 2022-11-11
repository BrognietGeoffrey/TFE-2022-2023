import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";

class Profile extends Component {

  render() {
    
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      
      
      <div className="container">
        
      <Card style={{ width: '18rem' }}>
        <Card.Body>
        <i  style={{display: 'flex',justifyContent: 'center' }} class="fa-solid fa-circle-user fa-4x"></i>          
        <Card.Title style={{ marginTop: '0.5em',textAlign: 'center' }}>{currentUser.username}  </Card.Title>
          <Card.Text>
          <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {console.log(currentUser)}
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
          </Card.Text>
        </Card.Body>
      </Card>


        
        
      </div>
      
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);