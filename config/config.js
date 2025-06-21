module.exports = {
    // Configurações do servidor
    server: {
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost'
    },

    // Configurações do banco de dados
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        name: process.env.DB_NAME || 'meu_app_mvc',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || ''
    },

    // Configurações de sessão
    session: {
        secret: process.env.SESSION_SECRET || 'meu-app-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 24 horas
        }
    },

    // Configurações de autoload
    autoload: {
        controllers: true,
        models: true,
        middlewares: true,
        services: true,
        routes: true
    },

    // Configurações de view engine
    viewEngine: {
        engine: 'html',
        extension: '.html',
        directory: 'views'
    },

    // Configurações de arquivos estáticos
    static: {
        directory: 'public',
        options: {
            maxAge: '1d'
        }
    },

    // Configurações de logs
    logging: {
        level: process.env.LOG_LEVEL || 'info',
        file: process.env.LOG_FILE || 'logs/app.log'
    },

    // Configurações de segurança
    security: {
        helmet: true,
        cors: {
            origin: process.env.CORS_ORIGIN || '*',
            credentials: true
        }
    }
}; 