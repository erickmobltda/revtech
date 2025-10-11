# 🚀 Quick Start Guide - REVTECH

## Configuração Rápida em 3 Passos

### 1️⃣ Configure o WhatsApp (OBRIGATÓRIO)

Abra o arquivo `js/config.js` e altere o número:

```javascript
WHATSAPP_NUMBER: '5511999999999', // ⬅️ ALTERE PARA SEU NÚMERO
```

**Formato**: País + DDD + Número (sem espaços)
- Exemplo: `5511987654321`

### 2️⃣ Teste Localmente

Escolha uma opção para rodar o servidor local:

**Opção A - Python** (mais comum):
```bash
cd REVTECH
python -m http.server 8000
```

**Opção B - Node.js**:
```bash
cd REVTECH
npx http-server -p 8000
```

**Opção C - PHP**:
```bash
cd REVTECH
php -S localhost:8000
```

Depois acesse: `http://localhost:8000`

### 3️⃣ Deploy no GitHub Pages

1. **Criar repositório no GitHub**
   - Acesse: https://github.com/new
   - Nome: `revtech`
   - Clique em "Create repository"

2. **Fazer upload**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/revtech.git
   git push -u origin main
   ```

3. **Ativar Pages**
   - Vá em Settings → Pages
   - Source: Branch `main`, Folder `/root`
   - Save
   - Aguarde 2-5 minutos

4. **Acessar**
   - URL: `https://SEU-USUARIO.github.io/revtech/`

---

## ✅ Checklist Antes do Deploy

- [ ] Número do WhatsApp configurado
- [ ] Testado localmente
- [ ] Todos os produtos estão em `data/products.json`
- [ ] Informações da empresa atualizadas em `index.html`
- [ ] Logo adicionado (opcional)

---

## 📝 Personalizações Opcionais

### Alterar Nome da Empresa
Edite em `js/config.js`:
```javascript
COMPANY_NAME: 'REVTECH Auto Peças',
```

E em `index.html`, busque e substitua "REVTECH" pelo nome desejado.

### Adicionar Logo
Salve sua logo como `images/logo.png` ou `images/logo.svg`

### Alterar Cores
Edite `css/styles.css`:
```css
:root {
  --primary-color: #2563eb;  /* Sua cor aqui */
}
```

### Adicionar/Editar Produtos
Edite `data/products.json`:
```json
{
  "code": "CODIGO",
  "name": "NOME DO PRODUTO",
  "nomeFornecedor": "FORNECEDOR",
  "imageUrl": "URL_IMAGEM",
  "description": "",
  "url": ""
}
```

---

## 🆘 Problemas Comuns

**Produtos não aparecem**
- Certifique-se de estar usando servidor local
- Verifique o Console do navegador (F12)

**WhatsApp não funciona**
- Verifique o formato do número
- Teste em um celular

**Site não funciona após deploy**
- Aguarde 5-10 minutos
- Limpe o cache do navegador (Ctrl+Shift+R)
- Verifique se o repositório é público

---

## 📚 Documentação Completa

Veja `README.md` para documentação completa.

---

## 💡 Dicas

1. **Teste em mobile**: A maioria dos usuários usará pelo celular
2. **Imagens leves**: Use imagens otimizadas (< 100KB cada)
3. **Backup**: Mantenha backup dos arquivos
4. **Atualizações**: Use `git push` para atualizar o site

---

**Pronto! Seu site está pronto para uso! 🎉**

Qualquer dúvida, consulte o `README.md` completo.

