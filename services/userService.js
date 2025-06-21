/**
 * Service para gerenciamento de usuários
 */
class UserService {
    constructor() {
        this.users = [
            { id: 1, name: 'João Silva', email: 'joao@exemplo.com' },
            { id: 2, name: 'Maria Santos', email: 'maria@exemplo.com' },
            { id: 3, name: 'Pedro Costa', email: 'pedro@exemplo.com' }
        ];
    }

    /**
     * Busca todos os usuários
     */
    getAllUsers() {
        return this.users;
    }

    /**
     * Busca um usuário por ID
     */
    getUserById(id) {
        return this.users.find(user => user.id === parseInt(id));
    }

    /**
     * Cria um novo usuário
     */
    createUser(userData) {
        const newUser = {
            id: this.users.length + 1,
            ...userData
        };
        
        this.users.push(newUser);
        return newUser;
    }

    /**
     * Atualiza um usuário
     */
    updateUser(id, userData) {
        const index = this.users.findIndex(user => user.id === parseInt(id));
        
        if (index === -1) {
            throw new Error('Usuário não encontrado');
        }
        
        this.users[index] = { ...this.users[index], ...userData };
        return this.users[index];
    }

    /**
     * Remove um usuário
     */
    deleteUser(id) {
        const index = this.users.findIndex(user => user.id === parseInt(id));
        
        if (index === -1) {
            throw new Error('Usuário não encontrado');
        }
        
        const deletedUser = this.users.splice(index, 1)[0];
        return deletedUser;
    }
}

module.exports = new UserService(); 