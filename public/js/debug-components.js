// Script de debug para verificar componentes
(function() {
    'use strict';
    
    console.log('🔍 Verificando componentes...');
    
    // Lista de componentes esperados
    const expectedComponents = [
        'alertComponent',
        'formComponent', 
        'mapComponent',
        'safeWalkComponent'
    ];
    
    // Função para verificar componentes
    function checkComponents() {
        console.log('🔍 Verificando componentes...');
        
        // Verifica cada componente
        expectedComponents.forEach(componentName => {
            if (window[componentName]) {
                console.log(`✅ ${componentName}: Carregado`);
            } else {
                console.error(`❌ ${componentName}: Não encontrado`);
            }
        });
        
        // Verifica se o pagesLoader está funcionando
        if (window.pagesLoader) {
            console.log('✅ pagesLoader: Carregado');
        } else {
            console.error('❌ pagesLoader: Não encontrado');
        }
        
        // Verifica se a configuração de páginas está disponível
        if (window.PAGES_CONFIG) {
            console.log('✅ PAGES_CONFIG: Carregado');
            console.log('📄 Páginas configuradas:', Object.keys(window.PAGES_CONFIG));
        } else {
            console.error('❌ PAGES_CONFIG: Não encontrado');
        }
        
        console.log('🔍 Verificação concluída!');
    }
    
    // Função para aguardar carregamento dos componentes
    function waitForComponents() {
        const allComponentsLoaded = expectedComponents.every(componentName => window[componentName]);
        
        if (allComponentsLoaded && window.pagesLoader && window.PAGES_CONFIG) {
            console.log('🎉 Todos os componentes carregados com sucesso!');
            checkComponents();
        } else {
            // Aguarda mais um pouco
            setTimeout(waitForComponents, 500);
        }
    }
    
    // Aguarda o DOM estar pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            // Aguarda um pouco para os componentes com defer carregarem
            setTimeout(() => {
                waitForComponents();
            }, 100);
            
            // Verifica novamente após 1 segundo
            setTimeout(() => {
                console.log('🔄 Verificação adicional após 1s...');
                checkComponents();
            }, 1000);
            
            // Verifica novamente após 3 segundos
            setTimeout(() => {
                console.log('🔄 Verificação adicional após 3s...');
                checkComponents();
            }, 3000);
        });
    } else {
        // DOM já está pronto, aguarda um pouco para os componentes carregarem
        setTimeout(() => {
            waitForComponents();
        }, 100);
        
        // Verifica novamente após 1 segundo
        setTimeout(() => {
            console.log('🔄 Verificação adicional após 1s...');
            checkComponents();
        }, 1000);
        
        // Verifica novamente após 3 segundos
        setTimeout(() => {
            console.log('🔄 Verificação adicional após 3s...');
            checkComponents();
        }, 3000);
    }
    
})(); 