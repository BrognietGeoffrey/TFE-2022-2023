import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route , Redirect} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import Login from "./components/login.component";

import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/userPage.component";
import Register from "./components/register.component";
import BoardModerator from "./components/moderatorPage.component";
import BoardAdmin from "./components/adminPage.component";
import RedirectPage from "./components/redirectPage";
import AddFacture from "./components/ajoutFacture.component";
import SideBar from "./components/sidebar";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';



class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    console.log(this.logOut, "logout");

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      openSidebar: false
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }
  handleOpenSidebar = () => {
    this.setState({ openSidebar : !this.state.openSidebar });
  }
  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user.roles.includes("user"),
        showModeratorBoard: user.roles.includes("moderator"),
        showAdminBoard: user.roles.includes("admin")
      });
      console.log(user.roles, "roles");

    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    // console.log(this.props.user.roles, "user");
    return (
      <Router history={history}>  
         <div className="flex">
          
          
          
          {/* Check if the user is logged in then display the sidebar */}
          {this.logOut && (
            <SideBar
              openSidebar={this.state.openSidebar}
              handleOpenSidebar={this.handleOpenSidebar}
            />
          )}


        <div id="body" className="flex-1">
       



          <Switch>
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/login" component={Login} />
          <Route exact path={["/", "/home"]} component={ Home}  />
              <Route exact path="/register" component={Register} />
              <Route path="/user" component={BoardUser} />
              <Route path="/admin" component={BoardAdmin} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/redirect" component={RedirectPage} />
              <Route path="/addFacture" component={AddFacture} />
            </Switch>
            
          </div>

          </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
  
}


export default connect(mapStateToProps)(App);