// Carregador de Componentes Robusto
class ComponentLoader {
    constructor() {
        this.components = {
            alertComponent: '/components/alert-component/alert.js',
            formComponent: '/components/form-component/form.js',
            mapComponent: '/components/map-component/map.js',
            safeWalkComponent: '/components/safe-walk-component/safe-walk.js'
        };
        this.loadedComponents = {};
        this.loadPromises = [];
    }

    // Carrega um componente específico
    async loadComponent(name, path) {
        try {
            console.log(`🔄 Carregando ${name}...`);
            
            // Cria um script element
            const script = document.createElement('script');
            script.src = path;
            script.async = false;
            
            // Cria uma promise para aguardar o carregamento
            const loadPromise = new Promise((resolve, reject) => {
                script.onload = () => {
                    console.log(`✅ ${name} carregado com sucesso`);
                    this.loadedComponents[name] = true;
                    resolve(name);
                };
                script.onerror = () => {
                    console.error(`❌ Erro ao carregar ${name} de ${path}`);
                    reject(new Error(`Falha ao carregar ${name}`));
                };
            });
            
            // Adiciona o script ao DOM
            document.head.appendChild(script);
            
            return loadPromise;
        } catch (error) {
            console.error(`❌ Erro ao carregar ${name}:`, error);
            throw error;
        }
    }

    // Carrega todos os componentes
    async loadAllComponents() {
        console.log('🚀 Iniciando carregamento de componentes...');
        
        const loadPromises = Object.entries(this.components).map(([name, path]) => {
            return this.loadComponent(name, path);
        });
        
        try {
            await Promise.all(loadPromises);
            console.log('🎉 Todos os componentes foram carregados com sucesso!');
            this.verifyComponents();
        } catch (error) {
            console.error('❌ Erro ao carregar componentes:', error);
            this.handleLoadError();
        }
    }

    // Verifica se os componentes foram carregados corretamente
    verifyComponents() {
        console.log('🔍 Verificando componentes carregados...');
        
        const expectedComponents = ['alertComponent', 'formComponent', 'mapComponent', 'safeWalkComponent'];
        let allVerified = true;
        
        expectedComponents.forEach(component => {
            if (window[component]) {
                console.log(`✅ ${component}: Verificado e disponível`);
            } else {
                console.log(`❌ ${component}: Não encontrado no escopo global`);
                allVerified = false;
            }
        });
        
        if (allVerified) {
            console.log('🎉 Todos os componentes estão funcionais!');
        } else {
            console.log('⚠️ Alguns componentes não estão disponíveis');
        }
        
        return allVerified;
    }

    // Trata erros de carregamento
    handleLoadError() {
        console.log('🔄 Tentando carregamento alternativo...');
        
        // Tenta carregar componentes um por vez
        Object.entries(this.components).forEach(([name, path]) => {
            if (!window[name]) {
                console.log(`🔄 Tentando carregar ${name} novamente...`);
                this.loadComponent(name, path).catch(error => {
                    console.error(`❌ Falha definitiva ao carregar ${name}:`, error);
                });
            }
        });
    }

    // Retorna o status dos componentes
    getComponentStatus() {
        const status = {};
        Object.keys(this.components).forEach(component => {
            status[component] = {
                loaded: this.loadedComponents[component] || false,
                available: !!window[component]
            };
        });
        return status;
    }
}

// Instância global do carregador
window.componentLoader = new ComponentLoader();

// Carrega os componentes quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.componentLoader.loadAllComponents();
    });
} else {
    window.componentLoader.loadAllComponents();
} 