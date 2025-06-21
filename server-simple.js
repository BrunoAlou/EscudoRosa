const express = require('express');
const path = require('path');

const app = express();

// Middleware para parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configurar EJS
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Favicon
app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});

// Rota principal
app.get('/', (req, res) => {
    try {
        res.render('index');
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).send('Erro interno');
    }
});

// 404
app.use((req, res) => {
    res.status(404).send('Página não encontrada');
});

// Iniciar servidor
const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${port}`);
    console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
}); 