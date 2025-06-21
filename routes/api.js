/**
 * Rotas da API
 */
module.exports = (app, components) => {
    const userService = components.services.userService;
    
    // GET /api/users - Lista todos os usuários
    app.get('/api/users', (req, res) => {
        try {
            const users = userService.getAllUsers();
            res.json({
                success: true,
                data: users,
                count: users.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    });

    // GET /api/users/:id - Busca um usuário específico
    app.get('/api/users/:id', (req, res) => {
        try {
            const user = userService.getUserById(req.params.id);
            
            if (!user) {
                return res.status(404).json({
                    success: false,
                    error: 'Usuário não encontrado'
                });
            }
            
            res.json({
                success: true,
                data: user
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    });

    // POST /api/users - Cria um novo usuário
    app.post('/api/users', (req, res) => {
        try {
            const { name, email } = req.body;
            
            if (!name || !email) {
                return res.status(400).json({
                    success: false,
                    error: 'Nome e email são obrigatórios'
                });
            }
            
            const newUser = userService.createUser({ name, email });
            
            res.status(201).json({
                success: true,
                data: newUser,
                message: 'Usuário criado com sucesso'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    });

    // PUT /api/users/:id - Atualiza um usuário
    app.put('/api/users/:id', (req, res) => {
        try {
            const { name, email } = req.body;
            const updatedUser = userService.updateUser(req.params.id, { name, email });
            
            res.json({
                success: true,
                data: updatedUser,
                message: 'Usuário atualizado com sucesso'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    });

    // DELETE /api/users/:id - Remove um usuário
    app.delete('/api/users/:id', (req, res) => {
        try {
            const deletedUser = userService.deleteUser(req.params.id);
            
            res.json({
                success: true,
                data: deletedUser,
                message: 'Usuário removido com sucesso'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    });
}; 