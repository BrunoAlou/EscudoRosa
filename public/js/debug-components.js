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
    
    // Aguarda o DOM estar pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            // Verifica imediatamente após o DOM estar pronto
            checkComponents();
            
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
        // DOM já está pronto, verifica imediatamente
        checkComponents();
        
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