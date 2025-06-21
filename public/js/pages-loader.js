// Sistema de carregamento de paginas HTML externas
class PagesLoader {
    constructor() {
        this.cache = new Map(); // Cache para melhorar performance
        this.basePath = '/views/pages/';
    }

    // Carrega conteudo de um arquivo HTML
    async loadPageContent(pageName) {
        const filePath = `${this.basePath}${pageName}.html`;
        
        // Verifica se ja esta em cache
        if (this.cache.has(filePath)) {
            console.log('Carregando do cache:', pageName);
            return this.cache.get(filePath);
        }

        try {
            console.log('Carregando arquivo:', filePath);
            const response = await fetch(filePath);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const content = await response.text();
            
            // Armazena no cache
            this.cache.set(filePath, content);
            
            console.log('Arquivo carregado com sucesso:', pageName);
            return content;
            
        } catch (error) {
            console.error('Erro ao carregar pagina:', error);
            return this.getFallbackContent(pageName, error.message);
        }
    }

    // Conteudo de fallback em caso de erro
    getFallbackContent(pageName, errorMessage) {
        return `
            <div style="text-align: center; padding: 3rem; color: #666;">
                <i class="fas fa-exclamation-triangle" style="font-size: 4rem; margin-bottom: 1rem; color: #ff4757;"></i>
                <h3>Erro ao carregar pagina</h3>
                <p>Nao foi possivel carregar: <strong>${pageName}</strong></p>
                <p style="font-size: 0.9rem; color: #999;">Erro: ${errorMessage}</p>
                <div style="margin-top: 2rem;">
                    <button onclick="location.reload()" style="background: #007bff; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;">
                        Tentar Novamente
                    </button>
                </div>
            </div>
        `;
    }

    // Limpa o cache (util para desenvolvimento)
    clearCache() {
        this.cache.clear();
        console.log('Cache limpo');
    }
}

// Instancia global do carregador
window.pagesLoader = new PagesLoader(); 