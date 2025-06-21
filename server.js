const express = require('express');
const path = require('path');
const homeController = require('./controllers/homeController');

const app = express();

// Middleware para parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define o diretório de arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'public')));

// Define o mecanismo de visualização para arquivos .html
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Rota principal
app.get('/', homeController.getIndex);

// Rota de health check para o Railway
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Rota para favicon
app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
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

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error('Erro no servidor:', err);
    res.status(500).json({ 
        error: 'Erro interno do servidor',
        message: process.env.NODE_ENV === 'production' ? 'Algo deu errado' : err.message
    });
});

// Rota 404 para páginas não encontradas
app.use('*', (req, res) => {
    res.status(404).json({ 
        error: 'Página não encontrada',
        path: req.originalUrl
    });
});

// Porta para Railway (usa a variável de ambiente PORT)
const port = process.env.PORT || 3000;

// Iniciar servidor com tratamento de erros
const server = app.listen(port, '0.0.0.0', (err) => {
    if (err) {
        console.error('❌ Erro ao iniciar servidor:', err);
        process.exit(1);
    }
    
    console.log(`✅ Servidor rodando na porta ${port}`);
    console.log(`🌐 Host: 0.0.0.0`);
    console.log(`🔧 Ambiente: ${process.env.NODE_ENV || 'development'}`);
    
    if (process.env.NODE_ENV !== 'production') {
        console.log(`🌐 Acesse: http://localhost:${port}`);
        console.log('📝 Modifique os arquivos e veja as mudanças automaticamente!');
        console.log('🔄 O nodemon reinicia o servidor automaticamente quando você salva arquivos');
    } else {
        console.log('🚀 Aplicação em produção!');
    }
});

// Tratamento de erros do servidor
server.on('error', (err) => {
    console.error('❌ Erro no servidor:', err);
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Porta ${port} já está em uso`);
    }
    process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 Recebido SIGTERM, encerrando servidor...');
    server.close(() => {
        console.log('✅ Servidor encerrado');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('🛑 Recebido SIGINT, encerrando servidor...');
    server.close(() => {
        console.log('✅ Servidor encerrado');
        process.exit(0);
    });
});
