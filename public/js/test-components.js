// Script de teste para verificar componentes
console.log('🧪 Testando carregamento de componentes...');

// Função para aguardar carregamento dos componentes
function waitForComponentsAndTest() {
    const expectedComponents = ['alertComponent', 'formComponent', 'mapComponent', 'safeWalkComponent'];
    const allComponentsLoaded = expectedComponents.every(componentName => window[componentName]);
    
    if (allComponentsLoaded) {
        console.log('🎉 Todos os componentes carregados! Iniciando testes...');
        runComponentTests();
    } else {
        console.log('⏳ Aguardando carregamento dos componentes...');
        setTimeout(waitForComponentsAndTest, 500);
    }
}

// Função para executar os testes
function runComponentTests() {
    console.log('🔍 Verificando componentes...');
    
    if (window.alertComponent) {
        console.log('✅ alertComponent: OK');
        console.log('   - Métodos disponíveis:', Object.getOwnPropertyNames(Object.getPrototypeOf(window.alertComponent)));
        
        // Testa se o método showDangerAlert existe
        if (typeof window.alertComponent.showDangerAlert === 'function') {
            console.log('   - showDangerAlert: ✅ Funcionando');
        } else {
            console.error('   - showDangerAlert: ❌ Não encontrado');
        }
    } else {
        console.error('❌ alertComponent: Não encontrado');
    }
    
    if (window.formComponent) {
        console.log('✅ formComponent: OK');
        console.log('   - Métodos disponíveis:', Object.getOwnPropertyNames(Object.getPrototypeOf(window.formComponent)));
        
        // Testa se o método showInsecurityForm existe
        if (typeof window.formComponent.showInsecurityForm === 'function') {
            console.log('   - showInsecurityForm: ✅ Funcionando');
        } else {
            console.error('   - showInsecurityForm: ❌ Não encontrado');
        }
    } else {
        console.error('❌ formComponent: Não encontrado');
    }
    
    if (window.mapComponent) {
        console.log('✅ mapComponent: OK');
        console.log('   - Métodos disponíveis:', Object.getOwnPropertyNames(Object.getPrototypeOf(window.mapComponent)));
        
        // Testa se o método showRiskMap existe
        if (typeof window.mapComponent.showRiskMap === 'function') {
            console.log('   - showRiskMap: ✅ Funcionando');
        } else {
            console.error('   - showRiskMap: ❌ Não encontrado');
        }
    } else {
        console.error('❌ mapComponent: Não encontrado');
    }
    
    if (window.safeWalkComponent) {
        console.log('✅ safeWalkComponent: OK');
        console.log('   - Métodos disponíveis:', Object.getOwnPropertyNames(Object.getPrototypeOf(window.safeWalkComponent)));
        
        // Testa se o método showSafeWalkForm existe
        if (typeof window.safeWalkComponent.showSafeWalkForm === 'function') {
            console.log('   - showSafeWalkForm: ✅ Funcionando');
        } else {
            console.error('   - showSafeWalkForm: ❌ Não encontrado');
        }
    } else {
        console.error('❌ safeWalkComponent: Não encontrado');
    }
    
    console.log('🧪 Teste concluído!');
    
    // Testa se os botões estão funcionando
    console.log('🔘 Testando botões...');
    const dangerButton = document.querySelector('.danger-button');
    if (dangerButton) {
        console.log('✅ Botão de perigo encontrado');
        dangerButton.addEventListener('click', () => {
            console.log('🔘 Botão de perigo clicado!');
        });
    } else {
        console.error('❌ Botão de perigo não encontrado');
    }
    
    // Testa se o pagesLoader está funcionando
    if (window.pagesLoader) {
        console.log('✅ pagesLoader: OK');
        console.log('   - Métodos disponíveis:', Object.getOwnPropertyNames(Object.getPrototypeOf(window.pagesLoader)));
    } else {
        console.error('❌ pagesLoader: Não encontrado');
    }
    
    // Testa se PAGES_CONFIG está disponível
    if (window.PAGES_CONFIG) {
        console.log('✅ PAGES_CONFIG: OK');
        console.log('   - Páginas configuradas:', Object.keys(window.PAGES_CONFIG));
    } else {
        console.error('❌ PAGES_CONFIG: Não encontrado');
    }
}

// Aguarda o DOM estar pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Aguarda um pouco para os componentes com defer carregarem
        setTimeout(waitForComponentsAndTest, 100);
    });
} else {
    // DOM já está pronto, aguarda um pouco para os componentes carregarem
    setTimeout(waitForComponentsAndTest, 100);
} 