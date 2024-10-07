import React from 'react';
import EA1 from '../img/EA1.png';

const Acueil: React.FC = () => {
  return (
    <>
      <div className="pag" id="accueil">
        <div className="page a">
          <p className="presentation text-67xl">
            Salut ! Je suis
            <span> Emmanuel AMELA </span> Étudiant Dev full stack
          </p>

          <img src={EA1} alt="" className="cadre1" />

          <div className="slogan">
            <h1>
            stagiaire à Quantum-Arise. Je travaille actuellement comme
              <span> Freelance </span>,
              <br />sur plusieurs projets
            </h1>
            <br /><br /><br />
            <h1>Education</h1>
            <ul>
              <li>UML et Mérise</li>
              <li>Conception des bases de données Relationnelles</li>
              <li>Développement Back-end .net C# et Java Spring Boot </li>
              <li>Implémentation des interfaces Web avec React</li>
              <li>Machine learning et deep learning</li>
              <li>Git</li>
              <li>Un peu de connaissance en web design</li>
             
            </ul>
            <button>CV <i className="fa-solid fa-download"></i></button>
            <br /><br /><br />
          </div>
        </div>
      </div>
    </>
  );
};

export default Acueil;
