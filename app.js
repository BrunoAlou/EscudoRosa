const express = require('express');
const path = require('path');
const Autoloader = require('./config/autoload');
const config = require('./config/config');

class App {
    constructor() {
        this.app = express();
        this.autoloader = new Autoloader();
        this.port = config.server.port;
        this.host = config.server.host;
    }

    /**
     * Inicializa a aplicação
     */
    async init() {
        try {
            console.log('🚀 Iniciando aplicação...\n');
            
            // Carrega todos os componentes automaticamente
            const components = this.autoloader.loadAll();
            
            // Configura middlewares básicos
            this.setupMiddlewares();
            
            // Configura view engine
            this.setupViewEngine();
            
            // Configura arquivos estáticos
            this.setupStaticFiles();
            
            // Configura rotas
            this.setupRoutes(components);
            
            // Configura middlewares de erro
            this.setupErrorHandlers();
            
            // Inicia o servidor
            this.startServer();
            
        } catch (error) {
            console.error('❌ Erro ao inicializar aplicação:', error);
            process.exit(1);
        }
    }

    /**
     * Configura middlewares básicos
     */
    setupMiddlewares() {
        // Parser para JSON
        this.app.use(express.json());
        
        // Parser para dados de formulário
        this.app.use(express.urlencoded({ extended: true }));
        
        // Middleware de logging
        this.app.use((req, res, next) => {
            console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
            next();
        });

        // Carrega middlewares customizados
        const middlewares = this.autoloader.getMiddleware();
        Object.keys(middlewares).forEach(middlewareName => {
            const middleware = middlewares[middlewareName];
            if (typeof middleware === 'function') {
                this.app.use(middleware);
                console.log(`🔧 Middleware aplicado: ${middlewareName}`);
            }
        });
    }

    /**
     * Configura view engine
     */
    setupViewEngine() {
        const viewConfig = config.viewEngine;
        this.app.set('views', path.join(__dirname, viewConfig.directory));
        this.app.engine(viewConfig.extension, require('ejs').renderFile);
        this.app.set('view engine', viewConfig.extension);
    }

    /**
     * Configura arquivos estáticos
     */
    setupStaticFiles() {
        const staticConfig = config.static;
        this.app.use(express.static(
            path.join(__dirname, staticConfig.directory),
            staticConfig.options
        ));
    }

    /**
     * Configura rotas
     */
    setupRoutes(components) {
        // Carrega rotas automaticamente
        const routes = components.routes;
        Object.keys(routes).forEach(routeName => {
            const route = routes[routeName];
            if (typeof route === 'function') {
                route(this.app, components);
                console.log(`🛣️  Rotas carregadas: ${routeName}`);
            }
        });

        // Rota padrão se não houver rotas definidas
        if (Object.keys(routes).length === 0) {
            this.setupDefaultRoutes(components);
        }
    }

    /**
     * Configura rotas padrão
     */
    setupDefaultRoutes(components) {
        const controllers = components.controllers;
        
        // Rota principal
        if (controllers.homeController) {
            this.app.get('/', controllers.homeController.getIndex);
            console.log('🛣️  Rota padrão configurada: /');
        }

        // Rota de API para verificar status
        this.app.get('/api/status', (req, res) => {
            res.json({
                status: 'OK',
                timestamp: new Date().toISOString(),
                components: {
                    controllers: Object.keys(components.controllers),
                    models: Object.keys(components.models),
                    middlewares: Object.keys(components.middlewares),
                    services: Object.keys(components.services),
                    routes: Object.keys(components.routes)
                }
            });
        });

        // Rota 404
        this.app.use('*', (req, res) => {
            res.status(404).render('404', {
                title: 'Página não encontrada',
                message: 'A página que você está procurando não existe.'
            });
        });
    }

    /**
     * Configura handlers de erro
     */
    setupErrorHandlers() {
        // Handler para erros 500
        this.app.use((err, req, res, next) => {
            console.error('❌ Erro na aplicação:', err);
            
            res.status(err.status || 500);
            
            if (req.xhr || req.path.startsWith('/api/')) {
                res.json({
                    error: {
                        message: err.message || 'Erro interno do servidor',
                        status: err.status || 500
                    }
                });
            } else {
                res.render('error', {
                    title: 'Erro',
                    message: err.message || 'Erro interno do servidor',
                    error: process.env.NODE_ENV === 'development' ? err : {}
                });
            }
        });
    }

    /**
     * Inicia o servidor
     */
    startServer() {
        this.app.listen(this.port, this.host, () => {
            console.log(`\n✅ Servidor rodando em http://${this.host}:${this.port}`);
            console.log(`📊 Status da API: http://${this.host}:${this.port}/api/status`);
            console.log(`\n🎉 Aplicação iniciada com sucesso!\n`);
        });
    }

    /**
     * Obtém a instância do Express
     */
    getApp() {
        return this.app;
    }
}

module.exports = App; 