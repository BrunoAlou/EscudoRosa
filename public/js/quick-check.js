// Verificação rápida de arquivos
console.log('🔍 Verificação rápida de arquivos...');

// Lista de arquivos para verificar
const filesToCheck = [
    '/js/component-loader.js',
    '/js/pages-loader.js',
    '/js/pages-config.js',
    '/js/app.js',
    '/components/alert-component/alert.js',
    '/components/form-component/form.js',
    '/components/map-component/map.js',
    '/components/safe-walk-component/safe-walk.js'
];

// Função para verificar um arquivo
async function checkFile(filePath) {
    try {
        const response = await fetch(filePath, { method: 'HEAD' });
        return {
            file: filePath,
            status: response.status,
            ok: response.ok
        };
    } catch (error) {
        return {
            file: filePath,
            status: 0,
            ok: false,
            error: error.message
        };
    }
}

// Verifica todos os arquivos
async function checkAllFiles() {
    console.log('📋 Verificando arquivos...');
    
    const results = await Promise.all(filesToCheck.map(checkFile));
    
    let allOk = true;
    
    results.forEach(result => {
        if (result.ok) {
            console.log(`✅ ${result.file} - ${result.status}`);
        } else {
            console.log(`❌ ${result.file} - ${result.status} ${result.error || ''}`);
            allOk = false;
        }
    });
    
    if (allOk) {
        console.log('🎉 Todos os arquivos estão acessíveis!');
    } else {
        console.log('⚠️ Alguns arquivos não estão acessíveis');
    }
    
    return results;
}

// Executa a verificação
checkAllFiles();

// Disponibiliza a função globalmente
window.quickCheck = checkAllFiles; 