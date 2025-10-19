import React from 'react';
import './Services.css';

const Services: React.FC = () => {
  const services = [
    {
      icon: (
        <svg width="56" height="56" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      ),
      title: "Busca Rápida",
      description: "Sistema de busca inteligente por código, nome ou fornecedor para encontrar a peça que você precisa em segundos"
    },
    {
      icon: (
        <svg width="56" height="56" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      ),
      title: "Pedido via WhatsApp",
      description: "Faça seu pedido de forma rápida e prática diretamente pelo WhatsApp com apenas alguns cliques"
    },
    {
      icon: (
        <svg width="56" height="56" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
        </svg>
      ),
      title: "Catálogo Completo",
      description: "Acesso a um catálogo completo com centenas de produtos de fornecedores renomados do mercado"
    },
    {
      icon: (
        <svg width="56" height="56" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      title: "Atendimento Ágil",
      description: "Equipe preparada para responder suas dúvidas e processar seu pedido com rapidez e eficiência"
    },
    {
      icon: (
        <svg width="56" height="56" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
        </svg>
      ),
      title: "Produtos Certificados",
      description: "Todas as peças são originais ou de fabricantes homologados, garantindo qualidade e durabilidade"
    },
    {
      icon: (
        <svg width="56" height="56" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
        </svg>
      ),
      title: "Acesso Mobile",
      description: "Site totalmente responsivo, permitindo que você faça pedidos de qualquer dispositivo, onde estiver"
    }
  ];

  return (
    <section className="section section-alt" id="services">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Nossos Serviços</h2>
          <p className="section-subtitle">Tudo que você precisa em um só lugar</p>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
