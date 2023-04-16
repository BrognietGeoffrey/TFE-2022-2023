// import React, { Component } from "react";
// import { connect } from "react-redux";
// import {  Link, Redirect } from "react-router-dom";
// import { Menu } from 'primereact/menu';
// import { logout } from "../actions/auth";



// class  Sidebar  extends  Component  {
//     constructor(props) {
//         super(props);
//         this.logOut = this.logOut.bind(this);

//     this.state = {
       
//         openSidebar: false
//       };
    
//     }
//     componentDidMount() {
//       const user = this.props.user;
//       if (user) {
//         this.setState({
//           currentUser: user.roles.includes("user"),
//           showModeratorBoard: user.roles.includes("moderator"),
//           showAdminBoard: user.roles.includes("admin")
//         });
//         console.log(user.roles, "roles");
  
//       }
//     }
    
    
//     handleOpenSidebar = () => {
//         this.setState({ openSidebar : !this.state.openSidebar });
//         }
//         logOut() {
//             // if only the link 
//             this.props.dispatch(logout());
//             // <Redirect to="/login" />
//           }
          
//     render() {
//       console.log(this.props.user, "user");
//       const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

//   const Menusmoderator = [
//     { title: "Dashboard", link: "/dashboard", src: "../../assets/analysis.png" },
//     { title: "Factures", link: "/factures", src: "../../assets/add-file.png" },
//     { title: "Facturier" , link: "/facturier", src: "../../assets/add-file.png" },
    
//   ];
//   const Menusadmin = [
//     { title: "Dashboard", src: "Chart_fill", link: "/admin" },


//   ]
//   const Menususer = [
//     { title: "Mes données", src: "../../user-list.png", alt:"photos des données", link: "/user" },
//     { title: "Mon profil", src: "../../assets/user.png", link : "/profile" },

//   ]
//   const MenuLogout = [
    
//   ]


//   return (
    
//     <div className="flex">


//         <div
//         className={` ${
//           this.state.openSidebar ? "w-40" : "w-20 "
//         } bg-primary h-screen  p-4  pt-8 relative duration-300`}
//       >
//         <img
//           src="../control.png"
//           className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
//            border-2 rounded-full  ${!this.state.openSidebar && "rotate-180"}`}
//           onClick={() => this.handleOpenSidebar(!this.state.openSidebar)}
//         />
//         <div className="flex gap-x-4 items-center">
//           <img
//             src="../logojv10.png" width="100" height="auto"
//             className={`cursor-pointer duration-500 ${
//               this.state.openSidebar 
//             }`}
//           />
//           <h1 className={`text-white origin-left font-medium text-xl duration-200 ${
//               !this.state.openSidebar && "scale-0"
//             }`}></h1>
//          </div>
//          <ul className="pt-6">
//           {
//             currentUser ?  (
//                Menususer.map((menu, index) => (
//               <li key={index} className="flex items-center gap-x-4 py-2">
//                 <img src={menu.src}
//                 alt={menu.alt}
//                 className="w-6 h-6" />
//                 <Menu model={Menususer} popup={true} ref={el => this.menu = el} id="popup_menu" />
//                 <Link to={menu.link} className="text-white text-sm font-medium">
//                   {menu.title}
//                 </Link>
//               </li>
//             ) )
//             ) : (
//               showModeratorBoard ? (
//                 Menusmoderator.map((menu, index) => (
//                   <li key={index} className="flex items-center gap-x-4 py-2">
//                     <img src={menu.src}
//                     alt={menu.alt}
//                     className="w-6 h-6" />
//                     <Link to={menu.link} className="text-white text-sm font-medium">
//                       {this.state.openSidebar ? menu.title : ""}
//                     </Link>
//                   </li>
//                 ) )
//               ) : (
//                 showAdminBoard ? (
//                   Menusadmin.map((menu, index) => (
//                     <li key={index} className="flex items-center gap-x-4 py-2">
//                       <img src={menu.src}
//                       alt={menu.alt}
//                       className="w-6 h-6" />
//                       <Link to={menu.link} className="text-white text-sm font-medium">
//                         {menu.title}
//                       </Link>
//                     </li>
//                   ) )
//                 ) : (
//                   MenuLogout.map((menu, index) => (
//                     <li key={index} className="flex items-center gap-x-4 py-2">
//                       <img src={menu.src}
//                       alt={menu.alt}
//                       className="w-6 h-6" />
//                       <Link to={menu.link} className="text-white text-sm font-medium">
//                         {menu.title}
//                       </Link>
//                     </li>
//                   ) )
//                 )
//               )
//             )

//           }
        
           
           
//             <br/>
//           <div className="flex items-center gap-x-2 py-1 ml-2 cursor-pointer">
//             {
//               !this.logOut ? (
//                 ""
//               ) : (
//                 <a href="/login" onClick={this.logOut} className="flex-1 ml-1 text-white ">
//                 <img className={!this.state.openSidebar ? "flex items-center gap-x-2 py-1 -ml-0.5 cursor-pointer" : "flex-1 items-center gap-x-2 py-1 ml-10 cursor-pointer"} src="../../assets/shutdown.png" width="20" height="auto" /> 
//                 {this.state.openSidebar ? "Déconnexion" : ""}</a>
//               )

//             }
            
           
            
//             </div>

                
          
//         </ul>
//       </div>
//     </div>
//   );
// };
// }


// function mapStateToProps(state) {
//     const { user } = state.auth;
//     return {
//       user,
//     };
    
//   }
  
  
//   export default connect(mapStateToProps)(Sidebar);

import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';

import { useEffect } from 'react';

const Side_bar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        setUser(currentUser);
    }, []);


    

    


    // const menu with items and icons just for currentUser
    const menuModerator = [
       // label with the redirection to the profile page
        {   
            label: 'Profil',
            icon: 'pi pi-fw pi-plus',
            items: [
                { label: 'Votre profile', icon: 'pi pi-fw pi-user-plus', url : '/profile' },
                { label: 'Vos données', icon: 'pi pi-fw pi-filter' }
            ]
        },
        {
            label: 'Facturiers',
            icon: 'pi pi-fw pi-external-link',
            items: [
                { label: 'Le facturiers', icon: 'pi pi-fw pi-undo', url : '/facturier' },
                { label: 'Les factures', icon: 'pi pi-fw pi-redo', url : '/factures'  }, 
                { label: 'Les données', icon:'pi pi-fw pi-redo'}
            ]
        },
        {
            label: 'Analyse',
            icon: 'pi-chart-line',
            items: [
                { label: 'Analyse sur le facturiers', icon: 'pi-wallet', url : '/analyse' },
                
            ]
        },

    ];
    const menuUser = [
        {
            label: 'Profil',
            icon: 'pi pi-fw pi-plus',
            items: [
                { label: 'Votre profile', icon: 'pi pi-fw pi-user-plus' },
                { label: 'Vos données', icon: 'pi pi-fw pi-filter' }
            ]
        }

    ];
    const menuAdmin = [
        {
            label: 'Profil',
            icon: 'pi pi-fw pi-plus',
            items: [
                { label: 'Votre profile', icon: 'pi pi-fw pi-user-plus', url : '/profile' },
                { label: 'Vos données', icon: 'pi pi-fw pi-filter' }
            ]
        },
        {
            label: 'Facturiers',
            icon: 'pi pi-fw pi-external-link',
            items: [
                { label: 'Le facturiers', icon: 'pi pi-fw pi-undo', url : '/facturiers' },
                { label: 'Les factures', icon: 'pi pi-fw pi-redo' }, 
                { label: 'Les données', icon:'pi pi-fw pi-redo'}
            ]
        },
        {
            label : "Discussions",
            icon: 'pi pi-fw pi-external-link',
            items: [
                { label: 'Le chat', icon: 'pi pi-fw pi-undo' },
               
            ]
        }

    ]; 

    const logout = () => {
        localStorage.clear();
        setUser(null);
        window.location = "/login";
    }

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        setUser(currentUser);
    }, []);

    









    return (
        <div>
           
            {user ? (
                <div>
                    <Menubar model={user.roles.includes("ROLE_ADMIN") ? menuAdmin : user.roles.includes("ROLE_MODERATOR") ? menuModerator : menuUser} end={<Button label="Déconnexion" icon="pi pi-power-off" onClick={logout} />} />
                    </div>
            ) : (
                <div></div>
            )}
        </div>
    )
}

export default Side_bar;