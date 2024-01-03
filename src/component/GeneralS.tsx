import React from 'react';
import Competences from './Competences';
import Contact from './Contact';
import Footer from './Footer';
import Acueil from './Acueil';

const GeneralS: React.FC = () => {
  return (
    <>
      <Acueil />
      <Competences />
      <Contact />
      <Footer />
    </>
  );
}

export default GeneralS;
