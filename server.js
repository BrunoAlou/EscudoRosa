const express = require('express');
const path = require('path');
const homeController = require('./controllers/homeController');

const app = express();

// Define o diretório de arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'public')));

// Define o mecanismo de visualização para arquivos .html
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Rota principal
app.get('/', homeController.getIndex);

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

// Porta para Railway (usa a variável de ambiente PORT)
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`✅ Servidor rodando na porta ${port}`);
    if (process.env.NODE_ENV !== 'production') {
        console.log(`🌐 Acesse: http://localhost:${port}`);
        console.log('📝 Modifique os arquivos e veja as mudanças automaticamente!');
        console.log('🔄 O nodemon reinicia o servidor automaticamente quando você salva arquivos');
    } else {
        console.log('🚀 Aplicação em produção!');
    }
});
