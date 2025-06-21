# 🛡️ Escudo Rosa

## 📱 Sobre o Projeto

O **Escudo Rosa** é um módulo inovador e essencial, integrado diretamente ao aplicativo BRB Mobilidade. Com uma base de mais de 1 milhão de brasilienses já conectadas, nosso objetivo é oferecer uma solução rápida e acessível para que as mulheres se sintam seguras, sempre. Ele é a ponte entre a sua mobilidade e a sua segurança.

## 🚨 Funcionalidades Principais

### 🆘 **Estou em Perigo!**
Nosso botão de pânico discreto e de acionamento rápido, que envia alertas com sua localização em tempo real para contatos de confiança e autoridades.

### ⚠️ **Botão Insegurança**
Um recurso crucial para registrar um sentimento de insegurança no trajeto, salvando a localização para posterior detalhamento ou categorização. Isso contribui para um **Mapa de Áreas de Risco** dinâmico e colaborativo no DF, identificando pontos de perigo e auxiliando na segurança pública com dados inéditos.

### 📝 **Denúncia Rápida**
Um canal direto para vítimas e testemunhas fazerem denúncias de forma simples e discreta, com opção de anexar fotos e vídeos.

### 🚶‍♀️ **Caminhada Segura**
Compartilhe seu trajeto com pessoas de confiança, que podem acompanhar sua localização, seja a pé ou dentro do transporte público.

### 🏪 **Rede de Guardiões**
Pontos de apoio seguros, como estabelecimentos e vizinhos confiáveis, para onde você pode se dirigir em momentos de necessidade.

## 🗺️ Mapas e Dados

### **Tecnologia de Mapas**
- **Leaflet.js**: Biblioteca JavaScript para mapas interativos
- **OpenStreetMap**: Dados de mapas gratuitos e abertos
- **Mapa da Página Inicial**: Visão geral com pontos principais
- **Mapas Modais**: Visualizações detalhadas com filtros

### **Fontes de Dados**

#### 🟢 **Áreas Seguras (Pontos de Apoio)**
- **Hospitais**: Hospital Regional da Asa Norte (HRAN), Hospital de Base do DF, HUB
- **Delegacias**: 2ª Delegacia da Asa Norte, DEAM (Delegacia da Mulher)
- **Centros de Assistência**: CEPAV Margarida, CREAS Brasília, Centro Pop Asa Sul
- **Shoppings**: Conjunto Nacional, Pátio Brasil, Shopping Brasília
- **Conselhos**: Conselho Tutelar da Asa Norte

#### 🔴 **Áreas de Risco**
- **Alto Risco**: Centro de Brasília, Setor Comercial Sul, Setor de Diversões Sul
- **Médio Risco**: Rodoviária do Plano Piloto, Estação Central do Metrô, Setor Comercial Norte

### **Dados de Coordenadas**
- **Região**: Brasília - DF (Eixo Monumental e entorno)
- **Foco**: Próximo ao Estádio Mané Garrincha
- **Atualização**: Dados baseados em informações oficiais e relatos da comunidade

### **Fontes dos Dados**
- **Pontos de Apoio**: Dados oficiais da Secretaria de Segurança Pública do DF e Secretaria de Saúde do DF
- **Áreas de Risco**: Relatórios da SSP-DF, dados do Disque 100, e relatos da comunidade através do aplicativo
- **Coordenadas**: Mapeamento realizado com base em dados do OpenStreetMap e validação local
- **Atualização**: Sistema colaborativo que permite aos usuários reportar novos pontos e atualizar informações existentes

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
escudo-rosa-app/
├── controllers/          # Controladores MVC
│   └── homeController.js
├── models/              # Modelos de dados
├── views/               # Templates HTML
│   ├── index.html      # Página principal
│   └── pages/          # Páginas dinâmicas
│       ├── home.html   # Página inicial com mapa
│       ├── mapa.html   # Mapa detalhado
│       ├── perfil.html # Perfil do usuário
│       └── ajustes.html # Configurações
├── public/              # Arquivos estáticos
│   ├── css/            # Estilos CSS
│   │   ├── style.css   # Estilos principais
│   │   └── home-fix.css # Correções específicas
│   ├── js/             # JavaScript
│   │   ├── app.js      # Aplicação principal
│   │   ├── component-loader.js # Carregador de componentes
│   │   └── components/ # Componentes JS
│   │       ├── alert-component/     # Botão de pânico
│   │       ├── form-component/      # Formulários de denúncia
│   │       ├── map-component/       # Mapas interativos
│   │       └── safe-walk-component/ # Caminhada segura
│   └── images/         # Imagens e ícones
├── routes/              # Definição de rotas
├── middlewares/         # Middlewares Express
├── services/            # Serviços de negócio
├── server.js           # Servidor principal
├── ecosystem.config.js # Configuração PM2
├── Procfile           # Configuração Heroku/Railway
└── package.json        # Dependências
```

## 🔧 Configuração

### Variáveis de Ambiente

- `PORT`: Porta do servidor (padrão: 3000)
- `NODE_ENV`: Ambiente (development/production)

### Dependências Principais

- **Express.js**: Framework web
- **Leaflet.js**: Mapas interativos
- **OpenStreetMap**: Dados de mapas
- **PM2**: Gerenciador de processos (produção)

## 🌐 Acesso

- **Desenvolvimento**: http://localhost:3000
- **Live Server**: http://localhost:5500
- **Produção**: https://escudorosa-production.up.railway.app/

## 📝 Scripts Disponíveis

- `npm start`: Inicia o servidor em produção
- `npm run dev`: Inicia o servidor com nodemon
- `npm run dev-full`: Inicia servidor + live-server
- `npm run pm2:start`: Inicia com PM2
- `npm run pm2:stop`: Para o PM2
- `npm run pm2:restart`: Reinicia o PM2
- `npm run pm2:logs`: Mostra logs do PM2

## 🎯 Objetivos do Projeto

### **Segurança das Mulheres**
- Fornecer ferramentas rápidas de emergência
- Mapear áreas de risco colaborativamente
- Conectar com pontos de apoio seguros

### **Dados Colaborativos**
- Construir mapa dinâmico de áreas de risco
- Coletar relatos de insegurança
- Contribuir para políticas públicas de segurança

### **Integração com Mobilidade**
- Conectar segurança com transporte público
- Acompanhamento de trajetos
- Alertas em tempo real

## 🤝 Contribuição

Este projeto contribui para a segurança das mulheres no Distrito Federal através de tecnologia e dados colaborativos.

## 📞 Suporte

Para dúvidas técnicas ou suporte, consulte a documentação específica de cada componente ou entre em contato com a equipe de desenvolvimento.

---

**Escudo Rosa** - Segurança na palma da sua mão 🛡️ 