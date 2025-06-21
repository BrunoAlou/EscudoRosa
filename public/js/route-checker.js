// Verificador de Rotas para Componentes
class RouteChecker {
    constructor() {
        this.routes = [
            '/components/alert-component/alert.js',
            '/components/form-component/form.js',
            '/components/map-component/map.js',
            '/components/safe-walk-component/safe-walk.js',
            '/components/alert-component/alert.css',
            '/components/form-component/form.css',
            '/components/map-component/map.css',
            '/components/safe-walk-component/safe-walk.css',
            '/components/alert-component/alert.html',
            '/components/form-component/form.html',
            '/components/map-component/map.html',
            '/components/safe-walk-component/safe-walk.html'
        ];
    }

    // Verifica se uma rota está acessível
    async checkRoute(route) {
        try {
            const response = await fetch(route, { method: 'HEAD' });
            return {
                route: route,
                accessible: response.ok,
                status: response.status,
                statusText: response.statusText
            };
        } catch (error) {
            return {
                route: route,
                accessible: false,
                status: 0,
                statusText: error.message
            };
        }
    }

    // Verifica todas as rotas
    async checkAllRoutes() {
        console.log('🔍 Verificando acessibilidade das rotas...');
        
        const results = await Promise.all(
            this.routes.map(route => this.checkRoute(route))
        );
        
        let allAccessible = true;
        
        results.forEach(result => {
            if (result.accessible) {
                console.log(`✅ ${result.route} - ${result.status}`);
            } else {
                console.log(`❌ ${result.route} - ${result.status} (${result.statusText})`);
                allAccessible = false;
            }
        });
        
        if (allAccessible) {
            console.log('🎉 Todas as rotas estão acessíveis!');
        } else {
            console.log('⚠️ Algumas rotas não estão acessíveis');
        }
        
        return results;
    }

    // Verifica apenas os arquivos JavaScript dos componentes
    async checkComponentScripts() {
        const jsRoutes = this.routes.filter(route => route.endsWith('.js'));
        console.log('🔍 Verificando scripts dos componentes...');
        
        const results = await Promise.all(
            jsRoutes.map(route => this.checkRoute(route))
        );
        
        const accessibleScripts = results.filter(result => result.accessible);
        const inaccessibleScripts = results.filter(result => !result.accessible);
        
        console.log(`✅ Scripts acessíveis: ${accessibleScripts.length}/${jsRoutes.length}`);
        
        if (inaccessibleScripts.length > 0) {
            console.log('❌ Scripts inacessíveis:');
            inaccessibleScripts.forEach(result => {
                console.log(`   - ${result.route} (${result.status})`);
            });
        }
        
        return results;
    }
}

// Instância global do verificador
window.routeChecker = new RouteChecker();

// Executa verificação quando solicitado
window.checkRoutes = function() {
    return window.routeChecker.checkAllRoutes();
};

window.checkComponentScripts = function() {
    return window.routeChecker.checkComponentScripts();
};

// Verificação automática em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
    console.log('🔍 Verificação automática de rotas em desenvolvimento...');
    window.routeChecker.checkAllRoutes();
} 