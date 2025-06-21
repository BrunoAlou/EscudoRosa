const express = require('express');
const path = require('path');
const fs = require('fs');
const homeController = require('./controllers/homeController');

const app = express();
const port = process.env.PORT || 3000;

// Configuração de MIME types para arquivos estáticos
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        } else if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        } else if (path.endsWith('.png')) {
            res.setHeader('Content-Type', 'image/png');
        } else if (path.endsWith('.jpg') || path.endsWith('.jpeg')) {
            res.setHeader('Content-Type', 'image/jpeg');
        } else if (path.endsWith('.ico')) {
            res.setHeader('Content-Type', 'image/x-icon');
        }
    }
}));

// Define o mecanismo de visualização para arquivos .html
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

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

// Configuração simples do Livereload (apenas em desenvolvimento)
if (process.env.NODE_ENV !== 'production') {
    try {
        const connectLivereload = require('connect-livereload');
        
        // Middleware para injetar o script do livereload
        app.use(connectLivereload());
        
        console.log('🔄 Live reload configurado!');
        console.log('💡 Dica: Use uma extensão de live reload no navegador para melhor experiência');
        
    } catch (error) {
        console.log('⚠️  Live reload não disponível:', error.message);
    }
}

app.listen(port, () => {
    console.log(`✅ Servidor rodando em http://localhost:${port}`);
    console.log('📝 Modifique os arquivos e veja as mudanças automaticamente!');
    console.log('🔄 O nodemon reinicia o servidor automaticamente quando você salva arquivos');
});
