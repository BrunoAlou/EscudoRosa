// Script de teste para verificar carregamento de templates
console.log('📄 Testando carregamento de templates...');

// Lista de templates para testar
const templatesToTest = [
    '/components/alert-component/alert.html',
    '/components/form-component/form.html',
    '/components/map-component/map.html',
    '/components/safe-walk-component/safe-walk.html'
];

// Função para testar carregamento de templates
async function testTemplateLoading() {
    console.log('🔍 Testando carregamento de templates HTML...');
    
    for (const templatePath of templatesToTest) {
        try {
            const response = await fetch(templatePath);
            if (response.ok) {
                const content = await response.text();
                console.log(`✅ ${templatePath}: Carregado (${content.length} caracteres)`);
            } else {
                console.error(`❌ ${templatePath}: Erro HTTP ${response.status}`);
            }
        } catch (error) {
            console.error(`❌ ${templatePath}: Erro de rede - ${error.message}`);
        }
    }
    
    console.log('📄 Teste de templates concluído!');
}

// Função para testar carregamento de CSS
async function testCSSLoading() {
    console.log('🎨 Testando carregamento de arquivos CSS...');
    
    const cssFiles = [
        '/css/style.css',
        '/components/alert-component/alert.css',
        '/components/form-component/form.css',
        '/components/map-component/map.css',
        '/components/safe-walk-component/safe-walk.css'
    ];
    
    for (const cssPath of cssFiles) {
        try {
            const response = await fetch(cssPath);
            if (response.ok) {
                const content = await response.text();
                console.log(`✅ ${cssPath}: Carregado (${content.length} caracteres)`);
            } else {
                console.error(`❌ ${cssPath}: Erro HTTP ${response.status}`);
            }
        } catch (error) {
            console.error(`❌ ${cssPath}: Erro de rede - ${error.message}`);
        }
    }
    
    console.log('🎨 Teste de CSS concluído!');
}

// Função para testar carregamento de imagens
async function testImageLoading() {
    console.log('🖼️ Testando carregamento de imagens...');
    
    const imageFiles = [
        '/images/logo-icon.png'
    ];
    
    for (const imagePath of imageFiles) {
        try {
            const response = await fetch(imagePath);
            if (response.ok) {
                console.log(`✅ ${imagePath}: Carregado (${response.headers.get('content-length')} bytes)`);
            } else {
                console.error(`❌ ${imagePath}: Erro HTTP ${response.status}`);
            }
        } catch (error) {
            console.error(`❌ ${imagePath}: Erro de rede - ${error.message}`);
        }
    }
    
    console.log('🖼️ Teste de imagens concluído!');
}

// Executa todos os testes
async function runAllTests() {
    console.log('🚀 Iniciando testes de carregamento...');
    
    await testTemplateLoading();
    await testCSSLoading();
    await testImageLoading();
    
    console.log('🎉 Todos os testes de carregamento concluídos!');
}

// Aguarda o DOM estar pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAllTests);
} else {
    runAllTests();
} 