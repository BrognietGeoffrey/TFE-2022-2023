import React, { useState } from "react";
import "./faq.css";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);


  const onQuestionClick = (index) => {
    setActiveIndex(index);
  };

  const faqData = [
    {
      question: "Comment mes données sont-elles stockées ?",
      answer: "Vos données sont stockées dans une base de données sécurisée qui se trouve dans un serveur sécurisé. Ceux-ci sont protégés par des pare-feux et des mesures de sécurités supplémentaires. Nous utilisons également des protocoles de cryptage pour protéger vos données.",
    },
    {
      question: "Comment puis-je accéder à mes données?",
      answer: "Vous pouvez accéder à vos données en vous connectant à votre compte. Une fois connecté, vous pouvez accéder à vos données en cliquant sur le bouton 'Mes données'"
    },
    {
      question: "Qui peut accéder à mes données ?",
      answer: "En ce qui concerne la visualisation de vos données, seul vous-même pouvez y accéder. Cependant, tous les membres du conseil de gérance dont vous avez vôté lors de l'assemblée générale annuelle peuvent ajouter des données qui vous concerne. Ces données sont relatives à votre compte et à votre participation financière dans la copropriété."
    },
    {
      question: "Puis-je exporter mes données ?",
      answer: "Oui. Vous pouvez soit exporter vos données en ce qui concerne les factures vous concernant ou les données de votre compte. Pour exporter vos données, vous devez vous connecter à votre compte et cliquer sur le bouton 'Exporter mes données'.",
    },
    {
      question: "Puis-je supprimer mes données ?",
      answer: "Oui et non, vous pouvez supprimer vos données personnelles, mais vous ne pouvez pas supprimer les données relatives à votre compte. Pour supprimer vos données personnelles, vous devez vous connecter à votre compte et cliquer sur le bouton 'Supprimer mes données'. Vos données personnelles seront supprimées de la base de données, mais vos données de compte resteront dans la base de données. Cela est primordial pour la bonne gestion de la copropriété et de sa comptabilité."
    },
    {
      question: "Puis-je modifier mes données ?",
      answer: "Oui. Afin de garder un contrôle sur les données insérer dans le site, vous pouvez demander à modifier vos données en vous connectant à votre compte et en cliquant sur le bouton 'Nous contactez' dans la page de contact. Vous aurez la possibilé de nous envoyer un mail avec votre demande."
    },
    {
      question: "Puis-je ajouter des données ?",
      answer : "Non, seul un membre du conseil de gérance ou le président de l'immeuble peut ajouter des données dans le site. Cela est primordial pour la bonne gestion de la copropriété et de sa comptabilité."
    },
    {
      question : "J'ai remarqué une erreur dans mes données/factures, que dois-je faire ?",
      answer : "Veuillez-nous en excuser. Vous pouvez prendre contact avec nous via le bouton 'Contacter-nous' dans la page de contact. Vous aurez la possibilité de nous envoyer un mail avec votre demande. Vous pouvez également venir vous présenter chez le président de l'immeuble ou un membre du conseil de gérance aux heures de permanence."
    },
    {
      question : "J'ai oublié mon mot de passe, que dois-je faire ?",
      answer : "Pas de soucis, vous pouvez cliquez sur le bouton 'Mot de passe oublié' dans la page de connexion. Vous recevrez un mail avec un lien pour réinitialiser votre mot de passe."
    },
    { question : "Quand sont les heures de permanence des membres du conseil de gérance ?",
      answer : "Les heures de permanence sont affichées dans la page de contact."
    }, 
    {
      question : "Comment puis-je voir toutes les données que les membres du conseil de gérance possèdent sur moi ?",
      answer : "Vous pouvez venir toutes vos données que le président de l'immeuble. N'oubliez de pas de venir avec une pièce d'identité afin de confirmer votre identité même si le président vous connais déjà."
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

export default Faq;
