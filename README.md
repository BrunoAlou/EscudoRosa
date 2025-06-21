# Meu App MVC

Aplicativo MVC simples com Express.js e sistema de carregamento dinâmico de páginas.

## 🚀 Instalação

```bash
# Instalar dependências
npm install

# Instalar PM2 globalmente (opcional, para produção)
npm install -g pm2
```

## 🛠️ Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento com nodemon
npm run dev

# Iniciar com live-server (duas abas)
npm run dev-full

# Apenas live-server
npm run live-server
```

## 🚀 Produção

```bash
# Iniciar com PM2
npm run pm2:start

# Parar aplicação
npm run pm2:stop

# Reiniciar aplicação
npm run pm2:restart

# Ver logs
npm run pm2:logs

# Iniciar sem PM2
npm start
```

## 📁 Estrutura do Projeto

```
meu-app-mvc/
├── controllers/          # Controladores MVC
├── models/              # Modelos de dados
├── views/               # Templates HTML
│   └── pages/          # Páginas dinâmicas
├── public/              # Arquivos estáticos
│   ├── css/            # Estilos CSS
│   ├── js/             # JavaScript
│   │   └── components/ # Componentes JS
│   └── images/         # Imagens
├── routes/              # Definição de rotas
├── middlewares/         # Middlewares Express
├── services/            # Serviços de negócio
├── server.js           # Servidor principal
└── package.json        # Dependências
```

## 🔧 Configuração

### Variáveis de Ambiente

- `PORT`: Porta do servidor (padrão: 3000)
- `NODE_ENV`: Ambiente (development/production)

### Problemas Comuns

#### Erros de MetaMask/Ethereum
O aplicativo inclui um script de correção (`ethereum-fix.js`) que resolve conflitos entre extensões de carteira.

#### Arquivos estáticos não carregam
Verifique se os caminhos no HTML estão corretos (sem `/public/` no início).

#### MIME type errors
O servidor está configurado para servir arquivos com os MIME types corretos.

## 🌐 Acesso

- **Desenvolvimento**: http://localhost:3000
- **Live Server**: http://localhost:5500

## 📝 Scripts Disponíveis

- `npm start`: Inicia o servidor em produção
- `npm run dev`: Inicia o servidor com nodemon
- `npm run dev-full`: Inicia servidor + live-server
- `npm run pm2:start`: Inicia com PM2
- `npm run pm2:stop`: Para o PM2
- `npm run pm2:restart`: Reinicia o PM2
- `npm run pm2:logs`: Mostra logs do PM2 