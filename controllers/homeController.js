const path = require('path');

exports.getIndex = (req, res) => {
    try {
        console.log('📄 Renderizando página inicial');
        res.render('index');
    } catch (error) {
        console.error('❌ Erro ao renderizar página inicial:', error);
        res.status(500).json({ 
            error: 'Erro ao carregar página',
            message: process.env.NODE_ENV === 'production' ? 'Erro interno' : error.message
        });
    }
};