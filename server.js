const App = require('./app');

// Cria e inicializa a aplicação
const app = new App();

// Inicia a aplicação
app.init().catch(error => {
    console.error('❌ Erro fatal ao inicializar aplicação:', error);
    process.exit(1);
});
