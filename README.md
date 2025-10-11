# REVTECH Auto Peças - Sistema de Pedidos Online

Sistema de pedidos online moderno e responsivo para auto peças, com integração ao WhatsApp. Desenvolvido como Single Page Application (SPA) totalmente estática, pronta para deploy no GitHub Pages.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração](#configuração)
- [Como Usar](#como-usar)
- [Deploy no GitHub Pages](#deploy-no-github-pages)
- [Personalização](#personalização)
- [Testes](#testes)
- [Suporte a Navegadores](#suporte-a-navegadores)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

## 🎯 Sobre o Projeto

O REVTECH é um sistema completo de pedidos para auto peças que permite aos clientes:
- Navegar por um catálogo completo de produtos
- Buscar produtos por código, nome ou fornecedor
- Adicionar produtos ao carrinho
- Enviar pedidos diretamente via WhatsApp

### Características Principais

✅ **100% Estático** - Sem necessidade de backend ou banco de dados  
✅ **Mobile First** - Design responsivo otimizado para dispositivos móveis  
✅ **Integração WhatsApp** - Pedidos enviados diretamente pelo WhatsApp  
✅ **Busca Inteligente** - Sistema de busca em tempo real  
✅ **Carrinho Persistente** - Utiliza localStorage para manter os itens  
✅ **Performance** - Carregamento rápido e otimizado  
✅ **Acessível** - Suporte a leitores de tela e navegação por teclado  

## 🚀 Tecnologias

- **HTML5** - Marcação semântica
- **CSS3** - Estilização moderna com variáveis CSS e Grid/Flexbox
- **JavaScript (ES6+)** - Vanilla JS, sem dependências externas
- **JSON** - Armazenamento de dados dos produtos
- **SVG** - Ícones e imagens vetoriais

## ⚡ Funcionalidades

### Seção Principal
- Hero section com call-to-action
- Seção "Sobre" com história e valores da empresa
- Seção de serviços destacando diferenciais
- Seção de contato com informações e redes sociais

### Sistema de Pedidos
- **Busca em Tempo Real**: Busque por código, nome ou fornecedor
- **Filtros Avançados**: Filtre por fornecedor e ordene por diferentes critérios
- **Grade de Produtos**: Exibição responsiva de produtos com imagens
- **Carrinho de Compras**: 
  - Adicionar/remover produtos
  - Ajustar quantidades
  - Visualização em painel lateral
  - Persistência de dados
- **Integração WhatsApp**: Geração automática de mensagem formatada

### Experiência do Usuário
- Animações suaves e transições
- Feedback visual em todas as ações
- Estados de loading, vazio e erro
- Notificações toast
- Scroll suave entre seções

## 📁 Estrutura do Projeto

```
REVTECH/
├── index.html                 # Página principal
├── README.md                  # Este arquivo
├── css/
│   └── styles.css            # Estilos principais
├── js/
│   ├── config.js             # Configurações do sistema
│   ├── cart.js               # Gerenciamento do carrinho
│   ├── products.js           # Gerenciamento de produtos
│   └── main.js               # Lógica principal da aplicação
├── data/
│   └── products.json         # Catálogo de produtos
└── images/
    ├── logo.png              # Logo da empresa (adicionar)
    └── placeholder.svg       # Placeholder para produtos
```

## ⚙️ Configuração

### 1. Configurar Número do WhatsApp

Edite o arquivo `js/config.js`:

```javascript
const CONFIG = {
  WHATSAPP_NUMBER: '5511999999999', // ⬅️ ALTERE AQUI
  COMPANY_NAME: 'REVTECH Auto Peças',
  // ... outras configurações
};
```

**Formato do número**: Código do país + DDD + número (sem espaços, hífens ou parênteses)
- Exemplo Brasil: `5511999999999`
- Exemplo EUA: `15551234567`

### 2. Adicionar Logo da Empresa

1. Salve o logo da empresa como `images/logo.png`
2. Recomendado: PNG transparente, dimensões aproximadas 200x50px
3. O sistema já tem fallback caso a imagem não seja encontrada

### 3. Personalizar Dados da Empresa

Edite o arquivo `index.html` e atualize:
- Nome da empresa
- Descrições e textos
- Informações de contato
- Links de redes sociais
- Horário de atendimento

### 4. Adicionar/Atualizar Produtos

Edite o arquivo `data/products.json`:

```json
[
  {
    "code": "CODIGO123",
    "name": "NOME DO PRODUTO",
    "nomeFornecedor": "Nome do Fornecedor",
    "description": "",
    "imageUrl": "URL_DA_IMAGEM",
    "url": "URL_DETALHES" 
  }
]
```

## 🎮 Como Usar

### Desenvolvimento Local

1. **Clone ou baixe o repositório**
   ```bash
   git clone https://github.com/seu-usuario/revtech.git
   cd revtech
   ```

2. **Abra com um servidor local**
   
   Opção 1 - Python:
   ```bash
   python -m http.server 8000
   ```
   
   Opção 2 - Node.js (http-server):
   ```bash
   npx http-server -p 8000
   ```
   
   Opção 3 - PHP:
   ```bash
   php -S localhost:8000
   ```

3. **Acesse no navegador**
   ```
   http://localhost:8000
   ```

### Uso do Sistema

1. **Navegação**: Use o menu superior para navegar entre seções
2. **Busca**: Digite no campo de busca para filtrar produtos
3. **Adicionar ao Carrinho**: Clique no botão "+" nos produtos desejados
4. **Gerenciar Carrinho**: Clique no ícone do carrinho para abrir o painel
5. **Ajustar Quantidades**: Use os botões +/- ou digite o valor
6. **Enviar Pedido**: Clique em "Enviar Pedido" para gerar mensagem do WhatsApp

## 🚢 Deploy no GitHub Pages

### Passo a Passo

1. **Criar Repositório no GitHub**
   - Acesse [github.com](https://github.com) e faça login
   - Clique em "New repository"
   - Nome: `revtech` (ou nome de sua preferência)
   - Visibilidade: Public
   - Clique em "Create repository"

2. **Fazer Upload dos Arquivos**
   
   Opção A - Via Interface Web:
   - Clique em "uploading an existing file"
   - Arraste todos os arquivos do projeto
   - Clique em "Commit changes"
   
   Opção B - Via Git (linha de comando):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/revtech.git
   git push -u origin main
   ```

3. **Ativar GitHub Pages**
   - No repositório, vá em **Settings** (Configurações)
   - No menu lateral, clique em **Pages**
   - Em "Source", selecione:
     - Branch: `main`
     - Folder: `/ (root)`
   - Clique em **Save**
   - Aguarde alguns minutos

4. **Acessar o Site**
   - O site estará disponível em: `https://seu-usuario.github.io/revtech/`
   - O link aparecerá na página de Settings > Pages

### Atualizar o Site

Sempre que fizer alterações:

```bash
git add .
git commit -m "Descrição das alterações"
git push
```

O site será atualizado automaticamente em alguns minutos.

### Configurar Domínio Personalizado (Opcional)

1. Compre um domínio
2. Configure os DNS do domínio:
   ```
   A     @     185.199.108.153
   A     @     185.199.109.153
   A     @     185.199.110.153
   A     @     185.199.111.153
   CNAME www   seu-usuario.github.io
   ```
3. Em Settings > Pages, adicione o domínio personalizado
4. Aguarde a verificação do DNS (pode levar até 24h)

## 🎨 Personalização

### Cores

Edite as variáveis CSS em `css/styles.css`:

```css
:root {
  --primary-color: #2563eb;        /* Cor primária */
  --primary-dark: #1d4ed8;         /* Cor primária escura */
  --success-color: #25d366;        /* Cor do WhatsApp */
  /* ... outras cores */
}
```

### Produtos por Página

Edite `js/config.js`:

```javascript
PRODUCTS_PER_PAGE: 24,  // Altere o número
```

### Mensagens do Sistema

Todas as mensagens estão em `js/config.js` no objeto `MESSAGES`:

```javascript
MESSAGES: {
  CART_EMPTY: 'Seu carrinho está vazio',
  ADD_TO_CART_SUCCESS: 'Produto adicionado!',
  // ... outras mensagens
}
```

## 🧪 Testes

### Checklist de Funcionalidades

- [ ] Busca por código funciona
- [ ] Busca por nome funciona
- [ ] Busca por fornecedor funciona
- [ ] Filtro de fornecedor funciona
- [ ] Ordenação funciona
- [ ] Adicionar ao carrinho funciona
- [ ] Incrementar quantidade funciona
- [ ] Decrementar quantidade funciona
- [ ] Remover item funciona
- [ ] Limpar carrinho funciona
- [ ] Enviar pedido gera link WhatsApp correto
- [ ] Carrinho persiste ao recarregar página
- [ ] Imagens com fallback funcionam
- [ ] Layout responsivo em mobile
- [ ] Layout responsivo em tablet
- [ ] Layout responsivo em desktop

### Testar em Diferentes Dispositivos

- **Desktop**: Chrome, Firefox, Safari, Edge
- **Mobile**: iOS Safari, Android Chrome
- **Tablet**: iPad, Android tablets

### Testar Acessibilidade

- [ ] Navegação por teclado (Tab, Enter, Esc)
- [ ] Leitor de tela (NVDA, JAWS, VoiceOver)
- [ ] Contraste de cores (WCAG AA)
- [ ] Zoom até 200%

## 🌐 Suporte a Navegadores

| Navegador | Versão Mínima |
|-----------|---------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| Opera | 76+ |
| iOS Safari | 14+ |
| Android Chrome | 90+ |

## 📱 Responsividade

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

## 🔒 Segurança

- ✅ Sem armazenamento de dados sensíveis
- ✅ Sem processamento de pagamentos
- ✅ Sem coleta de informações pessoais
- ✅ 100% client-side

## ⚡ Performance

- Tempo de carregamento: < 3 segundos
- Imagens otimizadas com lazy loading
- CSS e JS minificados para produção
- Sem dependências externas pesadas

## 🐛 Solução de Problemas

### Produtos não aparecem
- Verifique se o arquivo `data/products.json` está correto
- Abra o Console do navegador (F12) para ver erros
- Certifique-se de estar usando um servidor local

### WhatsApp não abre
- Verifique se o número está no formato correto em `config.js`
- Teste em dispositivo mobile (funciona melhor)

### Imagens não carregam
- Verifique as URLs no arquivo `products.json`
- O placeholder será exibido automaticamente

### Carrinho não persiste
- Verifique se o localStorage está habilitado no navegador
- Alguns navegadores bloqueiam em modo privado/anônimo

## 📈 Melhorias Futuras

- [ ] Sistema de categorias de produtos
- [ ] Favoritos/Wishlist
- [ ] Histórico de pedidos
- [ ] Modo escuro
- [ ] PWA (Progressive Web App)
- [ ] Multi-idioma
- [ ] Sistema de avaliações
- [ ] Comparador de produtos
- [ ] Integração com Google Analytics
- [ ] Chatbot de atendimento

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Autores

**REVTECH Auto Peças**
- Website: [revtech.com.br](#)
- WhatsApp: (47) 98429-3996
- Email: contato@revtech.com.br

## 📞 Suporte

Para suporte, entre em contato:
- 📧 Email: contato@revtech.com.br
- 💬 WhatsApp: (47) 98429-3996
- 🌐 Website: [revtech.com.br](#)

---

**Desenvolvido com ❤️ para REVTECH Auto Peças**

*Última atualização: Outubro 2025*

