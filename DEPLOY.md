# Deploy no Railway

## Configurações Realizadas

### 1. Arquivos de Configuração Criados
- `railway.json` - Configuração específica do Railway
- `Procfile` - Define como executar a aplicação
- `.npmrc` - Configurações do npm

### 2. Melhorias no Código
- **server.js**: Melhorado para produção com:
  - MIME types mais completos
  - Health check endpoint (`/health`)
  - Logging em produção
  - Tratamento de erros
  - Middleware para rotas não encontradas

- **package.json**: Atualizado com:
  - Script de build
  - Engines especificadas
  - Keywords e descrição

### 3. Problemas Corrigidos
- ✅ Dependências de desenvolvimento separadas
- ✅ Configuração de porta dinâmica
- ✅ MIME types para todos os arquivos estáticos
- ✅ Health check para Railway
- ✅ Tratamento de erros
- ✅ Logging apropriado

## Como Fazer o Deploy

### 1. Via Railway CLI
```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login no Railway
railway login

# Inicializar projeto
railway init

# Deploy
railway up
```

### 2. Via GitHub (Recomendado)
1. Faça push do código para o GitHub
2. Conecte o repositório no Railway
3. Configure as variáveis de ambiente:
   - `NODE_ENV=production`
   - `PORT` (será definido automaticamente)

### 3. Variáveis de Ambiente
```env
NODE_ENV=production
PORT=3000
```

## Verificação do Deploy

1. **Health Check**: Acesse `https://seu-app.railway.app/health`
2. **Página Principal**: Acesse `https://seu-app.railway.app/`
3. **Logs**: Verifique os logs no painel do Railway

## Troubleshooting

### Problema: Build falha
- Verifique se todas as dependências estão em `dependencies` (não `devDependencies`)
- Confirme se o Node.js versão está correta

### Problema: Aplicação não inicia
- Verifique os logs no Railway
- Confirme se a porta está sendo definida corretamente
- Teste localmente com `NODE_ENV=production npm start`

### Problema: Arquivos estáticos não carregam
- Verifique se os caminhos estão corretos
- Confirme se os MIME types estão sendo definidos

## Estrutura Final
```
meu-app-mvc/
├── railway.json          # Configuração Railway
├── Procfile             # Comando de execução
├── .npmrc               # Configuração npm
├── package.json         # Dependências e scripts
├── server.js            # Servidor otimizado
├── public/              # Arquivos estáticos
├── views/               # Templates HTML
└── controllers/         # Controladores
```

## Comandos Úteis

```bash
# Teste local em modo produção
NODE_ENV=production npm start

# Verificar se tudo está funcionando
curl http://localhost:3000/health

# Build local
npm run build
``` 