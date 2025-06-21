# Meu App MVC - Sistema de Autoload

Este projeto implementa um sistema de autoload completo para aplicações Node.js/Express seguindo o padrão MVC.

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Executar o projeto
npm start
```

O servidor estará disponível em: http://localhost:3000

## 📁 Estrutura do Projeto

```
meu-app-mvc/
├── config/
│   ├── autoload.js      # Sistema de autoload
│   └── config.js        # Configurações centralizadas
├── controllers/         # Controllers da aplicação
├── models/             # Models para acesso a dados
├── middlewares/        # Middlewares customizados
├── services/           # Services para lógica de negócio
├── routes/             # Definições de rotas
├── views/              # Templates HTML
├── public/             # Arquivos estáticos
├── app.js              # Classe principal da aplicação
├── server.js           # Ponto de entrada
└── package.json
```

## 🔧 Sistema de Autoload

O sistema de autoload carrega automaticamente todos os componentes da aplicação:

### Controllers
- **Localização**: `controllers/`
- **Carregamento**: Automático
- **Uso**: `autoloader.getController('nomeController')`

### Models
- **Localização**: `models/`
- **Carregamento**: Automático
- **Uso**: `autoloader.getModel('nomeModel')`

### Middlewares
- **Localização**: `middlewares/`
- **Carregamento**: Automático
- **Uso**: `autoloader.getMiddleware('nomeMiddleware')`

### Services
- **Localização**: `services/`
- **Carregamento**: Automático
- **Uso**: `autoloader.getService('nomeService')`

### Routes
- **Localização**: `routes/`
- **Carregamento**: Automático
- **Uso**: `autoloader.getRoute('nomeRoute')`

## 📝 Como Criar Novos Componentes

### 1. Controller
```javascript
// controllers/exemploController.js
class ExemploController {
    getIndex(req, res) {
        res.render('exemplo', { title: 'Exemplo' });
    }
}

module.exports = new ExemploController();
```

### 2. Model
```javascript
// models/exemploModel.js
class ExemploModel {
    async findAll() {
        // Lógica de acesso a dados
        return [];
    }
}

module.exports = new ExemploModel();
```

### 3. Service
```javascript
// services/exemploService.js
class ExemploService {
    processData(data) {
        // Lógica de negócio
        return processedData;
    }
}

module.exports = new ExemploService();
```

### 4. Middleware
```javascript
// middlewares/exemploMiddleware.js
module.exports = (req, res, next) => {
    // Lógica do middleware
    next();
};
```

### 5. Route
```javascript
// routes/exemplo.js
module.exports = (app, components) => {
    const controller = components.controllers.exemploController;
    
    app.get('/exemplo', controller.getIndex);
    app.post('/exemplo', controller.create);
};
```

## 🔄 API Endpoints

### Status da Aplicação
- **GET** `/api/status` - Informações sobre componentes carregados

### Usuários (Exemplo)
- **GET** `/api/users` - Lista todos os usuários
- **GET** `/api/users/:id` - Busca usuário específico
- **POST** `/api/users` - Cria novo usuário
- **PUT** `/api/users/:id` - Atualiza usuário
- **DELETE** `/api/users/:id` - Remove usuário

## ⚙️ Configurações

As configurações estão centralizadas em `config/config.js`:

```javascript
module.exports = {
    server: {
        port: 3000,
        host: 'localhost'
    },
    database: {
        // Configurações do banco
    },
    autoload: {
        controllers: true,
        models: true,
        middlewares: true,
        services: true,
        routes: true
    }
    // ... outras configurações
};
```

## 🎯 Vantagens do Autoload

1. **Organização**: Estrutura clara e organizada
2. **Escalabilidade**: Fácil adição de novos componentes
3. **Manutenibilidade**: Código modular e reutilizável
4. **Produtividade**: Menos código boilerplate
5. **Padronização**: Estrutura consistente

## 🔍 Logs do Sistema

O sistema exibe logs detalhados durante o carregamento:

```
🚀 Iniciando autoload...

✅ Controller carregado: homeController
✅ Controller carregado: userController
✅ Model carregado: userModel
✅ Middleware carregado: auth
✅ Service carregado: userService
✅ Route carregada: api

✅ Autoload concluído!

🔧 Middleware aplicado: auth
🛣️  Rotas carregadas: api
🛣️  Rota padrão configurada: /

✅ Servidor rodando em http://localhost:3000
📊 Status da API: http://localhost:3000/api/status

🎉 Aplicação iniciada com sucesso!
```

## 🛠️ Desenvolvimento

### Adicionando Novos Componentes

1. Crie o arquivo na pasta apropriada
2. Exporte o componente corretamente
3. Reinicie o servidor (nodemon fará isso automaticamente)
4. O componente será carregado automaticamente

### Debugging

- Acesse `/api/status` para ver todos os componentes carregados
- Verifique os logs do console para identificar problemas
- Use `console.log()` nos componentes para debug

## 📚 Próximos Passos

- [ ] Integração com banco de dados real
- [ ] Sistema de autenticação completo
- [ ] Validação de dados
- [ ] Testes automatizados
- [ ] Documentação da API
- [ ] Sistema de logs avançado 