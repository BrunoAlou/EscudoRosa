// Script para resolver conflitos de extensões de carteira Ethereum
(function() {
    'use strict';
    
    // Verifica se já existe um provider Ethereum
    if (typeof window.ethereum !== 'undefined') {
        console.log('✅ Provider Ethereum já está disponível');
        return;
    }
    
    // Cria um provider dummy para evitar erros
    const dummyProvider = {
        isMetaMask: false,
        isConnected: () => false,
        request: () => Promise.reject(new Error('Provider não configurado')),
        on: () => {},
        removeListener: () => {},
        autoRefreshOnNetworkChange: false
    };
    
    // Define o provider de forma segura
    try {
        Object.defineProperty(window, 'ethereum', {
            value: dummyProvider,
            writable: false,
            configurable: false
        });
        console.log('✅ Provider Ethereum dummy configurado');
    } catch (error) {
        console.log('⚠️ Não foi possível configurar o provider Ethereum:', error.message);
    }
    
    // Intercepta tentativas de redefinir o provider
    const originalDefineProperty = Object.defineProperty;
    Object.defineProperty = function(obj, prop, descriptor) {
        if (obj === window && prop === 'ethereum') {
            console.log('🛡️ Tentativa de redefinir ethereum bloqueada');
            return obj;
        }
        return originalDefineProperty.call(this, obj, prop, descriptor);
    };
    
})(); 