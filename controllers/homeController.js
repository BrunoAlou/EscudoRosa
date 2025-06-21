const path = require('path');

exports.getIndex = (req, res) => {
    try {
        console.log('📄 Renderizando página inicial');
        res.render('index');
    } catch (error) {
        console.error('❌ Erro ao renderizar página inicial:', error);
        res.status(500).send('Erro ao carregar página');
    }
};