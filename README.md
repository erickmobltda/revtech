# REVTECH React App




Aplicativo React moderno para REVTECH REPRESENTAÇÃO com integração Firebase e painel administrativo.

## 🚀 Funcionalidades

### Para Clientes
- 📱 Interface responsiva e moderna
- 🔍 Busca avançada de produtos
- 🛒 Carrinho de compras
- 📱 Integração com WhatsApp
- ⚡ Performance otimizada

### Para Administradores
- 🔐 Autenticação segura
- 📦 CRUD completo de produtos
- 🖼️ Upload de imagens
- 📊 Painel administrativo intuitivo
- 👥 Gerenciamento de fornecedores

## 🛠️ Tecnologias

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Firebase** - Backend e autenticação
- **Firestore** - Banco de dados
- **Firebase Storage** - Armazenamento de imagens
- **React Router** - Navegação
- **CSS Modules** - Estilização

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp env.example .env
# Edite o arquivo .env com suas configurações do Firebase

# Executar script de migração
node scripts/migrate-products.js

# Iniciar aplicação
npm start
```

## 🔧 Configuração

Consulte o [Guia de Configuração](SETUP_GUIDE.md) para instruções detalhadas.

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── admin/          # Componentes administrativos
│   ├── Header.tsx      # Cabeçalho
│   ├── Hero.tsx        # Seção hero
│   ├── About.tsx       # Seção sobre
│   ├── Services.tsx    # Seção serviços
│   ├── Contact.tsx     # Seção contato
│   ├── ProductGrid.tsx # Grid de produtos
│   ├── SearchAndFilters.tsx # Busca e filtros
│   └── Cart.tsx        # Carrinho de compras
├── pages/              # Páginas principais
│   ├── Home.tsx        # Página inicial
│   ├── AdminLogin.tsx  # Login administrativo
│   └── AdminDashboard.tsx # Painel administrativo
├── services/           # Serviços
│   ├── authService.ts  # Autenticação
│   └── productService.ts # Produtos
├── types/              # Tipos TypeScript
│   └── Product.ts      # Interface do produto
├── firebase/           # Configuração Firebase
│   └── config.ts       # Configuração
└── App.tsx             # Componente principal
```

## 🔐 Acesso Administrativo

- **URL**: `/admin/login`
- **Email**: `admin@revtech.com.br`
- **Senha**: `admin123456`

⚠️ **Altere a senha após o primeiro login!**

## 🚀 Deploy

### Build para Produção

```bash
npm run build
```

### Deploy no Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

### Deploy no Vercel

```bash
npm install -g vercel
vercel --prod
```

## 🔒 Segurança

- Autenticação Firebase
- Regras de segurança Firestore
- Validação de formulários
- Sanitização de dados

## 📱 Responsividade

- Design mobile-first
- Breakpoints otimizados
- Interface adaptativa
- Performance otimizada

## 🎨 Design

- Design system consistente
- Cores e tipografia padronizadas
- Componentes reutilizáveis
- Animações suaves

## 📊 Performance

- Lazy loading de imagens
- Otimização de bundle
- Cache inteligente
- Compressão de assets

## 🧪 Testes

```bash
# Executar testes
npm test

# Executar testes com coverage
npm run test:coverage
```

## 📝 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm build` - Cria build de produção
- `npm test` - Executa testes
- `npm run eject` - Ejecta configurações (não recomendado)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte técnico ou dúvidas:

- 📧 Email: contato@revtech.com.br
- 📱 WhatsApp: (47) 98429-3996

---

**Desenvolvido com ❤️ para REVTECH REPRESENTAÇÃO**
