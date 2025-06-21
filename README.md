# Meu App MVC - Aplicação de Segurança

Uma aplicação web para reportar incidentes de segurança e navegar por áreas de risco.

## 🚀 Deploy no Railway

### Configuração Automática
O projeto já está configurado para funcionar no Railway:

1. **Porta**: Usa `process.env.PORT` automaticamente
2. **Script de start**: `npm start` (roda `node server.js`)
3. **Arquivos estáticos**: Servidos corretamente via Express
4. **Caminhos**: Ajustados para produção

### Comandos Disponíveis

```bash
# Produção (Railway)
npm start

# Desenvolvimento local
npm run dev

# Desenvolvimento com Live Server
npm run dev-full
```

### Estrutura do Projeto

```
meu-app-mvc/
├── public/                 # Arquivos estáticos
│   ├── css/
│   ├── js/
│   └── images/
├── views/                  # Templates HTML
│   ├── index.html
│   └── pages/
├── controllers/            # Controladores
├── server.js              # Servidor Express
└── package.json
```

### Tecnologias

- **Backend**: Node.js + Express
- **Frontend**: HTML + CSS + JavaScript vanilla
- **Template Engine**: EJS
- **CSS Framework**: Bootstrap 5.3
- **Ícones**: Font Awesome 6.4

### Funcionalidades

- 🚨 Botão de Emergência
- 📝 Formulários de Denúncia
- 🗺️ Mapa de Áreas de Risco
- 🚶 Caminhada Segura
- 📱 Interface Responsiva

### Variáveis de Ambiente

O projeto usa automaticamente:
- `PORT`: Porta do servidor (definida pelo Railway)
- `NODE_ENV`: Ambiente (production/development)

### Troubleshooting

Se os arquivos CSS/JS não carregarem:
1. Verifique se o Express está servindo a pasta `public`
2. Confirme que os caminhos no HTML começam com `/` (não `/public/`)
3. Verifique os logs do Railway para erros

### Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Rodar com Live Server
npm run dev-full
```

Acesse: http://localhost:3000 