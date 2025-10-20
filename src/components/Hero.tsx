import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <div className="hero-logo-title">
            <div className="hero-logo">
              <img src={`${process.env.PUBLIC_URL}/images/logo-revtech.jpeg`}  alt="REVTECH Logo" className="hero-logo-img" />
            </div>
            <h1 className="hero-title">Peças Automotivas de Qualidade</h1>
          </div>
          <p className="hero-subtitle">
            Encontre as melhores peças para o seu veículo com rapidez e confiança
          </p>
          <a href="#order" className="btn btn-primary btn-lg">
            Faça seu Pedido
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
