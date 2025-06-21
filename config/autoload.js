const fs = require('fs');
const path = require('path');

class Autoloader {
    constructor() {
        this.controllers = {};
        this.models = {};
        this.middlewares = {};
        this.services = {};
        this.routes = {};
    }

    /**
     * Carrega todos os controllers automaticamente
     */
    loadControllers() {
        const controllersPath = path.join(__dirname, '..', 'controllers');
        
        if (fs.existsSync(controllersPath)) {
            const files = fs.readdirSync(controllersPath);
            
            files.forEach(file => {
                if (file.endsWith('.js')) {
                    const controllerName = path.basename(file, '.js');
                    const controllerPath = path.join(controllersPath, file);
                    
                    try {
                        const controller = require(controllerPath);
                        this.controllers[controllerName] = controller;
                        console.log(`✅ Controller carregado: ${controllerName}`);
                    } catch (error) {
                        console.error(`❌ Erro ao carregar controller ${controllerName}:`, error.message);
                    }
                }
            });
        }
        
        return this.controllers;
    }

    /**
     * Carrega todos os models automaticamente
     */
    loadModels() {
        const modelsPath = path.join(__dirname, '..', 'models');
        
        if (fs.existsSync(modelsPath)) {
            const files = fs.readdirSync(modelsPath);
            
            files.forEach(file => {
                if (file.endsWith('.js')) {
                    const modelName = path.basename(file, '.js');
                    const modelPath = path.join(modelsPath, file);
                    
                    try {
                        const model = require(modelPath);
                        this.models[modelName] = model;
                        console.log(`✅ Model carregado: ${modelName}`);
                    } catch (error) {
                        console.error(`❌ Erro ao carregar model ${modelName}:`, error.message);
                    }
                }
            });
        }
        
        return this.models;
    }

    /**
     * Carrega todos os middlewares automaticamente
     */
    loadMiddlewares() {
        const middlewaresPath = path.join(__dirname, '..', 'middlewares');
        
        if (fs.existsSync(middlewaresPath)) {
            const files = fs.readdirSync(middlewaresPath);
            
            files.forEach(file => {
                if (file.endsWith('.js')) {
                    const middlewareName = path.basename(file, '.js');
                    const middlewarePath = path.join(middlewaresPath, file);
                    
                    try {
                        const middleware = require(middlewarePath);
                        this.middlewares[middlewareName] = middleware;
                        console.log(`✅ Middleware carregado: ${middlewareName}`);
                    } catch (error) {
                        console.error(`❌ Erro ao carregar middleware ${middlewareName}:`, error.message);
                    }
                }
            });
        }
        
        return this.middlewares;
    }

    /**
     * Carrega todos os services automaticamente
     */
    loadServices() {
        const servicesPath = path.join(__dirname, '..', 'services');
        
        if (fs.existsSync(servicesPath)) {
            const files = fs.readdirSync(servicesPath);
            
            files.forEach(file => {
                if (file.endsWith('.js')) {
                    const serviceName = path.basename(file, '.js');
                    const servicePath = path.join(servicesPath, file);
                    
                    try {
                        const service = require(servicePath);
                        this.services[serviceName] = service;
                        console.log(`✅ Service carregado: ${serviceName}`);
                    } catch (error) {
                        console.error(`❌ Erro ao carregar service ${serviceName}:`, error.message);
                    }
                }
            });
        }
        
        return this.services;
    }

    /**
     * Carrega todas as rotas automaticamente
     */
    loadRoutes() {
        const routesPath = path.join(__dirname, '..', 'routes');
        
        if (fs.existsSync(routesPath)) {
            const files = fs.readdirSync(routesPath);
            
            files.forEach(file => {
                if (file.endsWith('.js')) {
                    const routeName = path.basename(file, '.js');
                    const routePath = path.join(routesPath, file);
                    
                    try {
                        const route = require(routePath);
                        this.routes[routeName] = route;
                        console.log(`✅ Route carregada: ${routeName}`);
                    } catch (error) {
                        console.error(`❌ Erro ao carregar route ${routeName}:`, error.message);
                    }
                }
            });
        }
        
        return this.routes;
    }

    /**
     * Carrega todos os componentes automaticamente
     */
    loadAll() {
        console.log('🚀 Iniciando autoload...\n');
        
        this.loadControllers();
        this.loadModels();
        this.loadMiddlewares();
        this.loadServices();
        this.loadRoutes();
        
        console.log('\n✅ Autoload concluído!');
        
        return {
            controllers: this.controllers,
            models: this.models,
            middlewares: this.middlewares,
            services: this.services,
            routes: this.routes
        };
    }

    /**
     * Obtém um controller específico
     */
    getController(name) {
        return this.controllers[name];
    }

    /**
     * Obtém um model específico
     */
    getModel(name) {
        return this.models[name];
    }

    /**
     * Obtém um middleware específico
     */
    getMiddleware(name) {
        return this.middlewares[name];
    }

    /**
     * Obtém um service específico
     */
    getService(name) {
        return this.services[name];
    }

    /**
     * Obtém uma route específica
     */
    getRoute(name) {
        return this.routes[name];
    }
}

module.exports = Autoloader; 