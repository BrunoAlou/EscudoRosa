/**
 * Middleware de autenticação
 */
module.exports = (req, res, next) => {
    // Simula verificação de autenticação
    const token = req.headers.authorization || req.cookies?.token;
    
    if (!token) {
        // Para rotas que não precisam de autenticação
        if (req.path === '/' || req.path.startsWith('/public') || req.path.startsWith('/api/status')) {
            return next();
        }
        
        // Redireciona para login se não autenticado
        if (req.xhr || req.path.startsWith('/api/')) {
            return res.status(401).json({ error: 'Não autorizado' });
        }
        
        return res.redirect('/login');
    }
    
    // Simula validação do token
    try {
        // Aqui você pode adicionar lógica real de validação de token
        req.user = { id: 1, name: 'Usuário Exemplo' };
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' });
    }
}; 