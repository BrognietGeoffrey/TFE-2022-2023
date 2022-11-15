import React, {useState} from "react";
import { Link } from "react-router-dom";
import sideData from "./sideData";
import "./sidebar.css";
import "../App.css";

function SideBar() {
    const [sidebar, setSidebar] = useState(false); 
    const showSideBar = () => setSidebar(!sidebar);

    return (    
        <>
        <div className="navbar">
            
            <Link to="#" className="menu-bars" onClick={showSideBar}>
                <span className="fa-solid fa-bars"></span>
            </Link>
            
            </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            
            <ul className="nav-menu-items" onClick={showSideBar}> 
                <li className="navbar-toggle">
                    
                    <Link to="#" className="menu-bars">
                        <h2 className="fa-solid fa-building"> ACP JV10</h2>
                    </Link>
                </li>
                {sideData.map((item, index) => {   

                    return (
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                <span className={item.icon}></span>
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    );
                })};
            </ul>
        </nav>
        </>
    )};

export default SideBar;