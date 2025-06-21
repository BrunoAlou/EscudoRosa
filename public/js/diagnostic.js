// Script de diagnóstico completo
console.log('🔧 Iniciando diagnóstico completo...');

// Função para verificar se um script foi carregado
function checkScriptLoaded(scriptName) {
    const scripts = document.querySelectorAll('script');
    for (let script of scripts) {
        if (script.src && script.src.includes(scriptName)) {
            return true;
        }
    }
    return false;
}

// Função para verificar se um arquivo existe
async function checkFileExists(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
}

// Função para verificar o estado do DOM
function checkDOMState() {
    console.log('📋 Estado do DOM:');
    console.log(`   - readyState: ${document.readyState}`);
    console.log(`   - URL: ${window.location.href}`);
    console.log(`   - User Agent: ${navigator.userAgent}`);
}

// Função para verificar scripts carregados
function checkLoadedScripts() {
    console.log('📜 Scripts carregados:');
    const scripts = document.querySelectorAll('script');
    scripts.forEach((script, index) => {
        if (script.src) {
            console.log(`   ${index + 1}. ${script.src}`);
        } else {
            console.log(`   ${index + 1}. Script inline (${script.textContent.length} caracteres)`);
        }
    });
}

// Função para verificar componentes globais
function checkGlobalComponents() {
    console.log('🌐 Componentes globais:');
    const expectedComponents = ['alertComponent', 'formComponent', 'mapComponent', 'safeWalkComponent'];
    
    expectedComponents.forEach(componentName => {
        if (window[componentName]) {
            console.log(`   ✅ ${componentName}: Disponível`);
            console.log(`      - Tipo: ${typeof window[componentName]}`);
            console.log(`      - Construtor: ${window[componentName].constructor.name}`);
        } else {
            console.log(`   ❌ ${componentName}: Não encontrado`);
        }
    });
}

// Função para verificar variáveis globais
function checkGlobalVariables() {
    console.log('🌍 Variáveis globais:');
    const expectedVars = ['pagesLoader', 'PAGES_CONFIG'];
    
    expectedVars.forEach(varName => {
        if (window[varName]) {
            console.log(`   ✅ ${varName}: Disponível`);
            console.log(`      - Tipo: ${typeof window[varName]}`);
        } else {
            console.log(`   ❌ ${varName}: Não encontrado`);
        }
    });
}

// Função para verificar erros no console
function checkConsoleErrors() {
    console.log('🚨 Verificando erros no console...');
    
    // Intercepta erros futuros
    const originalError = console.error;
    const originalWarn = console.warn;
    
    let errorCount = 0;
    let warningCount = 0;
    
    console.error = function(...args) {
        errorCount++;
        originalError.apply(console, args);
    };
    
    console.warn = function(...args) {
        warningCount++;
        originalWarn.apply(console, args);
    };
    
    // Restaura após 5 segundos
    setTimeout(() => {
        console.error = originalError;
        console.warn = originalWarn;
        console.log(`📊 Estatísticas de erro: ${errorCount} erros, ${warningCount} avisos`);
    }, 5000);
}

// Função para verificar performance
function checkPerformance() {
    console.log('⚡ Performance:');
    
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        const domReadyTime = timing.domContentLoadedEventEnd - timing.navigationStart;
        
        console.log(`   - Tempo de carregamento: ${loadTime}ms`);
        console.log(`   - DOM pronto: ${domReadyTime}ms`);
    } else {
        console.log('   - Performance API não disponível');
    }
}

// Função para verificar rede
async function checkNetwork() {
    console.log('🌐 Verificando conectividade de rede...');
    
    const testUrls = [
        '/js/pages-config.js',
        '/components/alert-component/alert.js',
        '/css/style.css',
        '/images/logo-icon.png'
    ];
    
    for (const url of testUrls) {
        const exists = await checkFileExists(url);
        console.log(`   ${exists ? '✅' : '❌'} ${url}`);
    }
}

// Função principal de diagnóstico
async function runDiagnostic() {
    console.log('🔧 === DIAGNÓSTICO COMPLETO ===');
    
    checkDOMState();
    checkLoadedScripts();
    checkGlobalComponents();
    checkGlobalVariables();
    checkConsoleErrors();
    checkPerformance();
    await checkNetwork();
    
    console.log('🔧 === FIM DO DIAGNÓSTICO ===');
}

// Executa diagnóstico após carregamento
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(runDiagnostic, 1000);
    });
} else {
    setTimeout(runDiagnostic, 1000);
}

// Executa diagnóstico adicional após 5 segundos
setTimeout(() => {
    console.log('🔄 Executando diagnóstico adicional...');
    checkGlobalComponents();
    checkGlobalVariables();
}, 5000); 