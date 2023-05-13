import React, { useState } from "react";
import "./faq.css";
import imgAjoutUser from "../../images/ajoutUser.png";
import imgAjoutUserClient from "../../images/ajoutUserClient.png";

const HelpPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);


  const onQuestionClick = (index) => {
    setActiveIndex(index);
  };

  const faqData = [
    {
      question: "Comment ajouter un utilisateur ?",
      answer: 
      <div className="ui segment">
        <p>1. Cliquez sur le bouton "Ajouter un utilisateur" dans la page du profil <span style={{color: "red"}}> ADMINISTRATEUR </span>.</p>
        <img src={imgAjoutUser} alt="Ajouter un utilisateur" />
        <p>2. Remplissez le formulaire avec les informations de l'utilisateur.</p>
        <p>3. Cliquez sur le bouton "Ajouter".</p>
      </div>

    },
    {
      question: "Comment lier un utilisateur à un client/habitant ?",
      answer: 
      <div className="ui segment">
      <p>1. Cliquez sur le bouton "Ajouter un utilisateur" dans la page du profil <span style={{color: "red"}}> ADMINISTRATEUR </span>.</p>
      <img src={imgAjoutUser} alt="Ajouter un utilisateur" />
      <p>2. Remplissez le formulaire avec les informations de l'utilisateur.</p>
      <p>3. Cliquez sur le bouton "Appuyer pour lier l'utilisateur à un client" </p>
      <img src={imgAjoutUserClient} alt="Ajouter un utilisateur" />
      <p>4. Remplissez les champs avec les informations du client/habitant.</p>
      <p>5. Cliquez sur le bouton "Ajouter".</p>
    </div>
    },
    {
      question: "Comment ajouter un facturier",
      answer: ""
    },


  ];

  const renderedQuestions = faqData.map((item, index) => {
    const active = index === activeIndex ? "active" : "";

    return (
      <div>
        
        

      <div key={index} className={`question ${active}`}>
        <div className="question-header" onClick={() => onQuestionClick(index)}>
          <h3>{item.question}</h3>
          <span>{active === "active" ? "-" : "+"}</span>
        </div>
        {active === "active" ? <div className="question-body">{item.answer}</div> : null
  }
       
      </div>
      </div>
    );
  });

  return <div className="faq">
    <h1 style = {{textAlign : "center", color: "red", fontSize: 50}}>FAQ</h1>
    {renderedQuestions}</div>;
};

export default HelpPage;
