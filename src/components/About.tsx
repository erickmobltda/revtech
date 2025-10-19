import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Sobre a REVTECH REPRESENTAÇÃO</h2>
          <p className="section-subtitle">Sua parceira em soluções automotivas</p>
        </div>
        
        <div className="about-grid">
          <div className="about-content">
            <h3>Nossa História</h3>
            <p>
              A REVTECH REPRESENTAÇÃO nasceu da paixão por automóveis e do compromisso em fornecer 
              as melhores soluções em peças automotivas para nossos clientes. Com anos de experiência 
              no mercado, nos consolidamos como referência em qualidade e atendimento.
            </p>
            
            <h3>Missão e Valores</h3>
            <p>
              Nossa missão é fornecer peças automotivas de alta qualidade, garantindo a satisfação 
              total de nossos clientes através de um atendimento personalizado e produtos confiáveis. 
              Valorizamos a transparência, a excelência e o relacionamento duradouro com nossos parceiros.
            </p>
          </div>
          
          <div className="about-features">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h4>Qualidade Garantida</h4>
              <p>Trabalhamos apenas com fornecedores certificados e produtos de primeira linha</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
              <h4>Amplo Estoque</h4>
              <p>Variedade de produtos para diversos modelos e marcas de veículos</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                </svg>
              </div>
              <h4>Atendimento Personalizado</h4>
              <p>Equipe especializada pronta para ajudar você a encontrar a peça certa</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
