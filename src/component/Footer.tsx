import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="contact-info">
          <h4>Coordonnées</h4>
          <p>158 HDN Hedzranawoé, Lomé</p>
          <p>Phone: +228 935 647 75</p>
        </div>
        <div className="social-media">
          <h4>Suis-moi</h4>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-github"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
       
      </div>
      <div className="copyright">
        <p>&copy; 2023 Emmanuel AMELA. Tous les droits sont réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;