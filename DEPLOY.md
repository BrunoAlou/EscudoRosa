# Deploy no Railway

## ✅ Problemas Corrigidos

### 1. Package-lock.json Desatualizado
- **Problema**: `npm ci` falhava porque o lock file não estava sincronizado
- **Solução**: Executado `npm install` para atualizar o lock file

### 2. Configuração .npmrc
- **Problema**: Warning sobre `production` deprecated
- **Solução**: Removido `production=false` e adicionado configurações corretas

### 3. Dependências
- **Problema**: Dependências de desenvolvimento causando conflitos
- **Solução**: Separadas corretamente em `dependencies` e `devDependencies`

## Configurações Realizadas

### 1. Arquivos de Configuração Criados
- `railway.json` - Configuração específica do Railway
- `Procfile` - Define como executar a aplicação
- `.npmrc` - Configurações do npm (corrigido)

### 2. Melhorias no Código
- **server.js**: Melhorado para produção com:
  - MIME types mais completos
  - Health check endpoint (`/health`)
  - Logging em produção
  - Tratamento de erros
  - Middleware para rotas não encontradas

- **package.json**: Atualizado com:
  - Script de build
  - Script de teste de produção
  - Engines especificadas
  - Keywords e descrição

### 3. Problemas Corrigidos
- ✅ Package-lock.json sincronizado
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

## Teste Local Antes do Deploy

### 1. Teste de Produção
```bash
# Teste local em modo produção
npm run test:prod

# Ou manualmente
NODE_ENV=production npm start
```

### 2. Verificar Health Check
```bash
# Teste o health check
curl http://localhost:3000/health
```

### 3. Verificar Build
```bash
# Teste o build
npm run build
```

## Verificação do Deploy

1. **Health Check**: Acesse `https://seu-app.railway.app/health`
2. **Página Principal**: Acesse `https://seu-app.railway.app/`
3. **Logs**: Verifique os logs no painel do Railway

## Troubleshooting

### Problema: Build falha no Railway
- ✅ **Resolvido**: Package-lock.json agora está sincronizado
- Verifique se todas as dependências estão em `dependencies` (não `devDependencies`)
- Confirme se o Node.js versão está correta

### Problema: Aplicação não inicia
- Verifique os logs no Railway
- Confirme se a porta está sendo definida corretamente
- Teste localmente com `npm run test:prod`

### Problema: Arquivos estáticos não carregam
- Verifique se os caminhos estão corretos
- Confirme se os MIME types estão sendo definidos

## Estrutura Final
```
meu-app-mvc/
├── railway.json          # Configuração Railway
├── Procfile             # Comando de execução
├── .npmrc               # Configuração npm (corrigido)
├── package.json         # Dependências e scripts
├── package-lock.json    # Lock file sincronizado
├── server.js            # Servidor otimizado
├── test-production.js   # Script de teste
├── public/              # Arquivos estáticos
├── views/               # Templates HTML
└── controllers/         # Controladores
```

## Comandos Úteis

```bash
# Teste local em modo produção
npm run test:prod

# Verificar se tudo está funcionando
curl http://localhost:3001/test

# Build local
npm run build

# Instalar dependências (se necessário)
npm install
```

## Status do Deploy
- ✅ Package-lock.json sincronizado
- ✅ Dependências organizadas
- ✅ Configurações de produção
- ✅ Scripts de teste
- ✅ Health check implementado
- ✅ MIME types corrigidos

**Agora o deploy no Railway deve funcionar sem problemas!** 