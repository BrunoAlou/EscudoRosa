const path = require('path');

/**
 * Controller para gerenciamento de usuários
 */
class UserController {
    /**
     * Página de listagem de usuários
     */
    getUsers(req, res) {
        res.render('users', {
            title: 'Usuários',
            message: 'Lista de usuários do sistema'
        });
    }

    /**
     * Página de criação de usuário
     */
    getCreateUser(req, res) {
        res.render('users/create', {
            title: 'Criar Usuário',
            message: 'Formulário para criar novo usuário'
        });
    }

    /**
     * Página de edição de usuário
     */
    getEditUser(req, res) {
        const userId = req.params.id;
        res.render('users/edit', {
            title: 'Editar Usuário',
            message: `Editando usuário ID: ${userId}`,
            userId: userId
        });
    }

    /**
     * Página de visualização de usuário
     */
    getUserDetails(req, res) {
        const userId = req.params.id;
        res.render('users/details', {
            title: 'Detalhes do Usuário',
            message: `Detalhes do usuário ID: ${userId}`,
            userId: userId
        });
    }

    /**
     * API: Lista todos os usuários
     */
    async apiGetUsers(req, res) {
        try {
            // Aqui você pode usar o model ou service
            const users = [
                { id: 1, name: 'João Silva', email: 'joao@exemplo.com' },
                { id: 2, name: 'Maria Santos', email: 'maria@exemplo.com' },
                { id: 3, name: 'Pedro Costa', email: 'pedro@exemplo.com' }
            ];

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
    }

    /**
     * API: Busca um usuário específico
     */
    async apiGetUser(req, res) {
        try {
            const userId = req.params.id;
            const user = { id: userId, name: 'Usuário Exemplo', email: 'usuario@exemplo.com' };

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
    }

    /**
     * API: Cria um novo usuário
     */
    async apiCreateUser(req, res) {
        try {
            const { name, email } = req.body;

            if (!name || !email) {
                return res.status(400).json({
                    success: false,
                    error: 'Nome e email são obrigatórios'
                });
            }

            const newUser = {
                id: Date.now(),
                name,
                email,
                created_at: new Date().toISOString()
            };

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
    }

    /**
     * API: Atualiza um usuário
     */
    async apiUpdateUser(req, res) {
        try {
            const userId = req.params.id;
            const { name, email } = req.body;

            const updatedUser = {
                id: parseInt(userId),
                name: name || 'Usuário Atualizado',
                email: email || 'atualizado@exemplo.com',
                updated_at: new Date().toISOString()
            };

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
    }

    /**
     * API: Remove um usuário
     */
    async apiDeleteUser(req, res) {
        try {
            const userId = req.params.id;

            res.json({
                success: true,
                message: `Usuário ID ${userId} removido com sucesso`
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
}

module.exports = new UserController(); 