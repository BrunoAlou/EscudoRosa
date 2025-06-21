/**
 * Model para usuários
 */
class UserModel {
    constructor() {
        // Simula uma tabela de banco de dados
        this.table = 'users';
        this.fields = ['id', 'name', 'email', 'created_at', 'updated_at'];
    }

    /**
     * Busca todos os usuários
     */
    async findAll() {
        // Simula uma consulta ao banco de dados
        return [
            { id: 1, name: 'João Silva', email: 'joao@exemplo.com', created_at: '2024-01-01', updated_at: '2024-01-01' },
            { id: 2, name: 'Maria Santos', email: 'maria@exemplo.com', created_at: '2024-01-02', updated_at: '2024-01-02' },
            { id: 3, name: 'Pedro Costa', email: 'pedro@exemplo.com', created_at: '2024-01-03', updated_at: '2024-01-03' }
        ];
    }

    /**
     * Busca um usuário por ID
     */
    async findById(id) {
        const users = await this.findAll();
        return users.find(user => user.id === parseInt(id));
    }

    /**
     * Busca usuários por critérios
     */
    async findBy(criteria) {
        const users = await this.findAll();
        
        return users.filter(user => {
            return Object.keys(criteria).every(key => {
                return user[key] === criteria[key];
            });
        });
    }

    /**
     * Cria um novo usuário
     */
    async create(userData) {
        const users = await this.findAll();
        const newUser = {
            id: users.length + 1,
            ...userData,
            created_at: new Date().toISOString().split('T')[0],
            updated_at: new Date().toISOString().split('T')[0]
        };
        
        // Simula inserção no banco
        console.log(`INSERT INTO ${this.table} VALUES`, newUser);
        
        return newUser;
    }

    /**
     * Atualiza um usuário
     */
    async update(id, userData) {
        const user = await this.findById(id);
        
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        
        const updatedUser = {
            ...user,
            ...userData,
            updated_at: new Date().toISOString().split('T')[0]
        };
        
        // Simula atualização no banco
        console.log(`UPDATE ${this.table} SET`, userData, `WHERE id = ${id}`);
        
        return updatedUser;
    }

    /**
     * Remove um usuário
     */
    async delete(id) {
        const user = await this.findById(id);
        
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        
        // Simula remoção do banco
        console.log(`DELETE FROM ${this.table} WHERE id = ${id}`);
        
        return user;
    }

    /**
     * Valida dados do usuário
     */
    validate(userData) {
        const errors = [];
        
        if (!userData.name || userData.name.trim().length < 2) {
            errors.push('Nome deve ter pelo menos 2 caracteres');
        }
        
        if (!userData.email || !this.isValidEmail(userData.email)) {
            errors.push('Email inválido');
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }

    /**
     * Valida formato de email
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

module.exports = new UserModel(); 