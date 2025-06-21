// Teste simples para verificar carregamento
console.log('🧪 Teste simples iniciado...');

// Verifica se os scripts foram carregados
console.log('📜 Scripts carregados:', document.scripts.length);

// Lista todos os scripts
Array.from(document.scripts).forEach((script, index) => {
    console.log(`Script ${index}:`, script.src || 'inline');
});

// Verifica se as classes estão definidas
console.log('🔍 Verificando classes...');
console.log('AlertComponent definido:', typeof AlertComponent !== 'undefined');
console.log('FormComponent definido:', typeof FormComponent !== 'undefined');
console.log('MapComponent definido:', typeof MapComponent !== 'undefined');
console.log('SafeWalkComponent definido:', typeof SafeWalkComponent !== 'undefined');

// Verifica se as instâncias globais estão definidas
console.log('🌐 Verificando instâncias globais...');
console.log('window.alertComponent:', window.alertComponent);
console.log('window.formComponent:', window.formComponent);
console.log('window.mapComponent:', window.mapComponent);
console.log('window.safeWalkComponent:', window.safeWalkComponent);

// Tenta criar uma instância manualmente
try {
    if (typeof AlertComponent !== 'undefined') {
        console.log('✅ AlertComponent está definido, criando instância...');
        window.testAlertComponent = new AlertComponent();
        console.log('✅ Instância criada com sucesso:', window.testAlertComponent);
    }
} catch (error) {
    console.error('❌ Erro ao criar instância:', error);
} 