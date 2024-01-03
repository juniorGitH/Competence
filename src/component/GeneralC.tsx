import React from 'react';
import Footer from './Footer';
import Acueil from './Acueil';
import Services from './Services';
import Competences from './Competences';

const GeneralC: React.FC = () => {
  return (
    <>
      <Acueil />
      <Services />
      <Competences />
      <Footer />
    </>
  );
}

export default GeneralC;
