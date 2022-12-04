import React, { Component } from "react";
import { connect } from "react-redux";
import {  Link, Redirect } from "react-router-dom";

import { logout } from "../actions/auth";



class  Sidebar  extends  Component  {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

    this.state = {
       
        openSidebar: false
      };
    
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
    
    
    handleOpenSidebar = () => {
        this.setState({ openSidebar : !this.state.openSidebar });
        }
        logOut() {
            // if only the link 
            this.props.dispatch(logout());
            // <Redirect to="/login" />
          }
          
    render() {
      console.log(this.props.user, "user");
      const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

  const Menusmoderator = [
    { title: "Home", link: "/home", icon: "home" },
    { title: "Ajout une nouvelle facture", link: "/addFacture", src: "../../assets/add-file.png" },
    { title: "Liste des factures", link: "/factures", icon: "user" },
    
  ];
  const Menusadmin = [
    { title: "Dashboard", src: "Chart_fill", link: "/admin" },


  ]
  const Menususer = [
    { title: "Mes données", src: "../../user-list.png", alt:"photos des données", link: "/user" },
    { title: "Mon profil", src: "../../assets/user.png", link : "/profile" },

  ]
  const MenuLogout = [
    { title: "", src: "", link: "" },
  ]


  return (
    
    <div className="flex">


        <div
        className={` ${
          this.state.openSidebar ? "w-40" : "w-20 "
        } bg-primary h-screen p-4  pt-8 relative duration-300`}
      >
        <img
          src="../control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!this.state.openSidebar && "rotate-180"}`}
          onClick={() => this.handleOpenSidebar(!this.state.openSidebar)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="../logojv10.png" width="100" height="auto"
            className={`cursor-pointer duration-500 ${
              this.state.openSidebar 
            }`}
          />
          <h1 className={`text-white origin-left font-medium text-xl duration-200 ${
              !this.state.openSidebar && "scale-0"
            }`}></h1>
         </div>
         <ul className="pt-6">
          {
            currentUser ?  (
               Menususer.map((menu, index) => (
              <li key={index} className="flex items-center gap-x-4 py-2">
                <img src={menu.src}
                alt={menu.alt}
                className="w-6 h-6" />
                <Link to={menu.link} className="text-white text-sm font-medium">
                  {menu.title}
                </Link>
              </li>
            ) )
            ) : (
              showModeratorBoard ? (
                Menusmoderator.map((menu, index) => (
                  <li key={index} className="flex items-center gap-x-4 py-2">
                    <img src={menu.src}
                    alt={menu.alt}
                    className="w-6 h-6" />
                    <Link to={menu.link} className="text-white text-sm font-medium">
                      {this.state.openSidebar ? menu.title : ""}
                    </Link>
                  </li>
                ) )
              ) : (
                showAdminBoard ? (
                  Menusadmin.map((menu, index) => (
                    <li key={index} className="flex items-center gap-x-4 py-2">
                      <img src={menu.src}
                      alt={menu.alt}
                      className="w-6 h-6" />
                      <Link to={menu.link} className="text-white text-sm font-medium">
                        {menu.title}
                      </Link>
                    </li>
                  ) )
                ) : (
                  MenuLogout.map((menu, index) => (
                    <li key={index} className="flex items-center gap-x-4 py-2">
                      <img src={menu.src}
                      alt={menu.alt}
                      className="w-6 h-6" />
                      <Link to={menu.link} className="text-white text-sm font-medium">
                        {menu.title}
                      </Link>
                    </li>
                  ) )
                )
              )
            )

          }
        
           
           
            <br/>
          <div className="flex items-center gap-x-2 py-1 ml-2 cursor-pointer">
            {
              !this.logOut ? (
                ""
              ) : (
                <a href="/login" onClick={this.logOut} className="flex-1 ml-1 text-white ">
                <img className={!this.state.openSidebar ? "flex items-center gap-x-2 py-1 -ml-0.5 cursor-pointer" : "flex-1 items-center gap-x-2 py-1 ml-10 cursor-pointer"} src="../../assets/shutdown.png" width="20" height="auto" /> 
                {this.state.openSidebar ? "Déconnexion" : ""}</a>
              )

            }
            
           
            
            </div>

                
          
        </ul>
      </div>
    </div>
  );
};
}


function mapStateToProps(state) {
    const { user } = state.auth;
    return {
      user,
    };
    
  }
  
  
  export default connect(mapStateToProps)(Sidebar);