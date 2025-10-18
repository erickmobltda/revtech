# Guia de Configuração - REVTECH React App

Este guia irá te ajudar a configurar o aplicativo React com Firebase para o REVTECH.

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Conta no Google (para Firebase)

## 🔥 Configuração do Firebase

### 1. Criar Projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Nome do projeto: `revtech-app` (ou o nome que preferir)
4. Desabilite o Google Analytics (opcional)
5. Clique em "Criar projeto"

### 2. Configurar Authentication

1. No painel do Firebase, vá para "Authentication"
2. Clique em "Começar"
3. Vá para a aba "Sign-in method"
4. Habilite "Email/Password"
5. Clique em "Salvar"

### 3. Configurar Firestore Database

1. Vá para "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha "Começar no modo de teste" (para desenvolvimento)
4. Selecione uma localização (escolha a mais próxima do Brasil)
5. Clique em "Concluído"

### 4. Configurar Storage

1. Vá para "Storage"
2. Clique em "Começar"
3. Aceite as regras padrão
4. Escolha a mesma localização do Firestore
5. Clique em "Concluído"

### 5. Obter Configurações do Firebase

1. Vá para "Configurações do projeto" (ícone de engrenagem)
2. Role para baixo até "Seus aplicativos"
3. Clique no ícone da web (</>) para adicionar um app web
4. Nome do app: `revtech-web`
5. **NÃO** marque "Também configure o Firebase Hosting"
6. Clique em "Registrar app"
7. Copie as configurações do Firebase (você precisará delas)

## 🚀 Configuração do Projeto React

### 1. Instalar Dependências

```bash
cd revtech-react
npm install
```

### 2. Configurar Variáveis de Ambiente

1. Copie o arquivo de exemplo:
```bash
cp env.example .env
```

2. Edite o arquivo `.env` com suas configurações do Firebase:

```env
REACT_APP_FIREBASE_API_KEY=sua_api_key_aqui
REACT_APP_FIREBASE_AUTH_DOMAIN=seu_projeto_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=seu_projeto_id
REACT_APP_FIREBASE_STORAGE_BUCKET=seu_projeto_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
REACT_APP_FIREBASE_APP_ID=seu_app_id
```

### 3. Executar o Script de Migração

1. Instale as dependências do script:
```bash
npm install firebase
```

2. Configure as variáveis de ambiente para o script:
```bash
export FIREBASE_API_KEY=sua_api_key_aqui
export FIREBASE_AUTH_DOMAIN=seu_projeto_id.firebaseapp.com
export FIREBASE_PROJECT_ID=seu_projeto_id
export FIREBASE_STORAGE_BUCKET=seu_projeto_id.appspot.com
export FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
export FIREBASE_APP_ID=seu_app_id
```

3. Execute o script de migração:
```bash
node scripts/migrate-products.js
```

Este script irá:
- Criar um usuário administrador
- Importar todos os produtos existentes para o Firebase
- Configurar a estrutura inicial do banco de dados

### 4. Iniciar o Aplicativo

```bash
npm start
```

O aplicativo estará disponível em `http://localhost:3000`

## 👤 Acesso Administrativo

Após executar o script de migração, você terá acesso ao painel administrativo:

- **URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@revtech.com.br`
- **Senha**: `admin123456`

⚠️ **IMPORTANTE**: Altere a senha após o primeiro login!

## 🔧 Funcionalidades do Sistema

### Para Usuários Finais
- ✅ Catálogo de produtos com busca e filtros
- ✅ Carrinho de compras
- ✅ Integração com WhatsApp para pedidos
- ✅ Interface responsiva
- ✅ Design moderno e intuitivo

### Para Administradores
- ✅ Login seguro com Firebase Authentication
- ✅ CRUD completo de produtos
- ✅ Upload de imagens
- ✅ Interface administrativa intuitiva
- ✅ Gerenciamento de fornecedores

## 📱 Deploy (Opcional)

### Netlify (Recomendado)

1. Instale o Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Faça o build do projeto:
```bash
npm run build
```

3. Faça deploy:
```bash
netlify deploy --prod --dir=build
```

### Vercel

1. Instale o Vercel CLI:
```bash
npm install -g vercel
```

2. Faça deploy:
```bash
vercel --prod
```

## 🔒 Configurações de Segurança

### Regras do Firestore

No Firebase Console, vá para "Firestore Database" > "Regras" e configure:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Produtos - leitura pública, escrita apenas para usuários autenticados
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Regras do Storage

No Firebase Console, vá para "Storage" > "Regras" e configure:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 🐛 Solução de Problemas

### Erro de CORS
Se encontrar erros de CORS, verifique se as configurações do Firebase estão corretas.

### Erro de Autenticação
Certifique-se de que o Authentication está habilitado no Firebase Console.

### Erro de Firestore
Verifique se o Firestore está configurado e as regras estão corretas.

## 📞 Suporte

Se encontrar problemas durante a configuração:

1. Verifique se todas as dependências estão instaladas
2. Confirme se as variáveis de ambiente estão corretas
3. Verifique se o Firebase está configurado corretamente
4. Consulte os logs do console para erros específicos

## 🎉 Próximos Passos

Após a configuração:

1. Altere a senha do administrador
2. Adicione mais produtos através do painel administrativo
3. Configure as regras de segurança do Firebase
4. Faça o deploy para produção
5. Configure um domínio personalizado (opcional)

---

**Desenvolvido com ❤️ para REVTECH REPRESENTAÇÃO**
