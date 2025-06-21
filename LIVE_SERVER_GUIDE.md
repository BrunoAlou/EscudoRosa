# 🚀 Guia do Live Server - Meu App MVC

## 🎯 O que é o Live Server?

O **Live Server** é uma ferramenta que:
- ✅ Serve arquivos estáticos (HTML, CSS, JS)
- ✅ Recarrega automaticamente o navegador quando você salva arquivos
- ✅ Funciona muito bem para desenvolvimento frontend
- ✅ Pode ser usado junto com seu backend Express.js

## 🛠️ Como usar no seu projeto:

### **Opção 1: VS Code Live Server (Mais Fácil)**

1. **Instale a extensão:**
   - Abra o VS Code
   - `Ctrl+Shift+X` → Procure "Live Server"
   - Instale a extensão do Ritwick Dey

2. **Use o Live Server:**
   - Clique direito em `views/index.html`
   - Selecione "Open with Live Server"
   - Ou use `Ctrl+Shift+P` → "Live Server: Open With Live Server"

3. **Configure o proxy (opcional):**
   - O arquivo `.vscode/settings.json` já está configurado
   - Isso permite que o Live Server faça proxy para o backend

### **Opção 2: Comando NPM (Recomendado)**

```bash
# Instalar dependências (já feito)
npm install

# Rodar backend + Live Server juntos
npm run dev

# Ou rodar apenas o Live Server
npm run live-server
```

### **Opção 3: Live Server Manual**

```bash
# Instalar globalmente
npm install -g live-server

# Rodar na pasta views
cd views
live-server --port=5500
```

## 🔧 Configuração Atual:

### **Portas:**
- **Backend (Express)**: http://localhost:3000
- **Live Server**: http://localhost:5500

### **Estrutura:**
```
meu-app-mvc/
├── views/           ← Live Server serve daqui
│   └── index.html
├── public/          ← Arquivos estáticos
│   ├── css/
│   └── js/
└── server.js        ← Backend Express
```

## 🚀 Como testar:

### **Método 1: VS Code**
1. Abra o VS Code
2. Clique direito em `views/index.html`
3. "Open with Live Server"
4. Modifique arquivos e veja as mudanças!

### **Método 2: NPM Script**
```bash
# Terminal 1: Backend
npm start

# Terminal 2: Live Server
npm run live-server
```

### **Método 3: Integrado**
```bash
# Roda ambos juntos
npm run dev
```

## 📝 Vantagens do Live Server:

✅ **Recarregamento instantâneo** - Não precisa recarregar manualmente
✅ **Funciona com qualquer editor** - VS Code, Sublime, etc.
✅ **Suporte a WebSockets** - Recarregamento em tempo real
✅ **Configuração simples** - Funciona out-of-the-box
✅ **Proxy para APIs** - Pode fazer proxy para seu backend

## 🔄 Diferenças:

| Ferramenta | Backend | Frontend | Recarregamento |
|------------|---------|----------|----------------|
| **Nodemon** | ✅ | ❌ | Reinicia servidor |
| **Live Server** | ❌ | ✅ | Recarrega navegador |
| **NPM run dev** | ✅ | ✅ | Ambos |

## 💡 Dicas de uso:

1. **Para desenvolvimento frontend**: Use Live Server
2. **Para desenvolvimento backend**: Use `npm start`
3. **Para desenvolvimento completo**: Use `npm run dev`
4. **Para produção**: Use apenas o Express.js

## 🎯 Fluxo de trabalho recomendado:

1. **Inicie o desenvolvimento:**
   ```bash
   npm run dev
   ```

2. **Abra no navegador:**
   - Frontend: http://localhost:5500
   - Backend: http://localhost:3000

3. **Desenvolva:**
   - Modifique arquivos HTML/CSS/JS
   - Veja mudanças instantaneamente
   - Backend reinicia automaticamente

4. **Teste APIs:**
   - Use http://localhost:3000/api/status
   - Ou configure proxy no Live Server

## 🚨 Solução de problemas:

**Live Server não abre:**
- Verifique se a porta 5500 está livre
- Tente `npm run live-server` manualmente

**Backend não funciona:**
- Verifique se o Express está rodando na porta 3000
- Use `npm start` para rodar apenas o backend

**Proxy não funciona:**
- Verifique a configuração em `.vscode/settings.json`
- Use `npm run dev` para integração completa 