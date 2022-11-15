import React from "react";
import { Link } from "react-router-dom";
import BoardUser from "../components/userPage.component";
import {faHouse} from "@fortawesome/free-solid-svg-icons";

const sideData = [
    {
        title: "Home", 
        path: "/",
        icon: "fa-solid fa-house", 
        cName : "nav-text"
    },
    {
        title: "Page Comptable",
        path: "/mod",
        icon: "fa-solid fa-sheet-plastic",
        cName : "nav-text"
    }, 
   {
        title: "Page Président",
        path: "/admin",
        icon: "fa-solid fa-user-tie",
        cName : "nav-text"
   }, 
   {
        title: "Page utilisateur",
        path: "/user",
        icon: "fa-solid fa-universal-access",
        cName : "nav-text"
   }, 
   {
        title: "Se connecter",
        path: "/login",
        icon: "fa-solid fa-user",
        cName : "nav-text"
   },
   {
        title: "Sign Up",
        path: "/register",
        icon: "fa-solid fa-right-to-bracket",
        cName : "nav-text"

   }

   
]

export default sideData;