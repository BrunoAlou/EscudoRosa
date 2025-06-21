// Teste simples para verificar se o servidor está funcionando
console.log('✅ Teste do servidor: Arquivo carregado com sucesso!');
console.log('📅 Timestamp:', new Date().toISOString());
console.log('🌍 URL:', window.location.href);
console.log('📁 Pathname:', window.location.pathname);

// Teste de verificação de componentes
window.testServer = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    url: window.location.href,
    components: {
        alertComponent: !!window.alertComponent,
        formComponent: !!window.formComponent,
        mapComponent: !!window.mapComponent,
        safeWalkComponent: !!window.safeWalkComponent
    }
};

console.log('🔍 Status dos componentes:', window.testServer.components); 