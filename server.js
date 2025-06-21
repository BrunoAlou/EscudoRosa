const express = require('express');
const path = require('path');
const fs = require('fs');
const homeController = require('./controllers/homeController');

const app = express();
const port = process.env.PORT || 3000;

// Configuração de MIME types para arquivos estáticos
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, filePath) => {
        const ext = path.extname(filePath).toLowerCase();
        const mimeTypes = {
            '.css': 'text/css',
            '.js': 'application/javascript',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.ico': 'image/x-icon',
            '.svg': 'image/svg+xml',
            '.woff': 'font/woff',
            '.woff2': 'font/woff2',
            '.ttf': 'font/ttf',
            '.eot': 'application/vnd.ms-fontobject'
        };
        
        if (mimeTypes[ext]) {
            res.setHeader('Content-Type', mimeTypes[ext]);
        }
    }
}));

// Define o mecanismo de visualização para arquivos .html
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Middleware para logging em produção
if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
        next();
    });
}

// Rota principal
app.get('/', homeController.getIndex);

// Rota para servir páginas HTML da pasta views/pages
app.get('/views/pages/:page.html', (req, res) => {
    const pageName = req.params.page;
    const pagePath = path.join(__dirname, 'views', 'pages', `${pageName}.html`);
    
    // Verifica se o arquivo existe
    if (fs.existsSync(pagePath)) {
        res.sendFile(pagePath, {
            headers: {
                'Content-Type': 'text/html'
            }
        });
    } else {
        res.status(404).send('Página não encontrada');
    }
});

// Rota para favicon
app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'images', 'logo-icon.png'));
});

// Rota de health check para Railway
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Configuração do Livereload apenas em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
    try {
        const connectLivereload = require('connect-livereload');
        app.use(connectLivereload());
        console.log('🔄 Live reload configurado para desenvolvimento!');
    } catch (error) {
        console.log('⚠️  Live reload não disponível:', error.message);
    }
}

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error('Erro:', err.stack);
    res.status(500).send('Algo deu errado!');
});

// Middleware para rotas não encontradas
app.use((req, res) => {
    res.status(404).send('Página não encontrada');
});

app.listen(port, () => {
    console.log(`✅ Servidor rodando na porta ${port}`);
    console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
    if (process.env.NODE_ENV !== 'production') {
        console.log('📝 Modifique os arquivos e veja as mudanças automaticamente!');
    }
});
