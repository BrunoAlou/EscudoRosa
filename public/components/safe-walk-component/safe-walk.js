// Componente de Caminhada Segura
class SafeWalkComponent {
    constructor() {
        this.loadStyles();
        this.loadTemplates();
    }

    // Carrega os estilos CSS
    loadStyles() {
        if (!document.getElementById('safe-walk-styles')) {
            const link = document.createElement('link');
            link.id = 'safe-walk-styles';
            link.rel = 'stylesheet';
            link.href = '/components/safe-walk-component/safe-walk.css';
            document.head.appendChild(link);
        }
    }

    // Carrega os templates HTML
    loadTemplates() {
        fetch('/components/safe-walk-component/safe-walk.html')
            .then(response => response.text())
            .then(html => {
                this.templates = this.parseTemplates(html);
            })
            .catch(error => {
                console.error('Erro ao carregar templates do safe walk:', error);
            });
    }

    // Parse dos templates HTML
    parseTemplates(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        return {
            form: doc.querySelector('#safe-walk-form-template').innerHTML,
            success: doc.querySelector('#safe-walk-success-template').innerHTML
        };
    }

    // Mostra formulário de caminhada segura
    showSafeWalkForm() {
        if (!this.templates) {
            this.showFallbackSafeWalkForm();
            return;
        }
        const overlay = document.createElement('div');
        overlay.className = 'safe-walk-overlay';
        overlay.innerHTML = this.templates.form;
        document.body.appendChild(overlay);
        // Handler do formulário
        const form = document.getElementById('safeWalkForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSafeWalkSubmit();
        });
        // Fecha ao clicar fora
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeSafeWalk();
            }
        });
    }

    // Fallback para formulário
    showFallbackSafeWalkForm() {
        alert('Não foi possível carregar o formulário de caminhada segura.');
    }

    // Seleciona opção
    selectOption(element, value) {
        const parent = element.parentElement;
        parent.querySelectorAll('.option-card').forEach(card => {
            card.classList.remove('selected');
        });
        element.classList.add('selected');
    }

    // Handler para envio do formulário
    handleSafeWalkSubmit() {
        const overlay = document.querySelector('.safe-walk-overlay');
        if (!this.templates) {
            overlay.innerHTML = `<div class='safe-walk-modal'><div class='safe-walk-header'><div class='safe-walk-icon'><i class='fas fa-check-circle' style='color: #2ed573;'></i></div><div class='safe-walk-title'>✅ Rota Segura Calculada!</div><div class='safe-walk-subtitle'>Sua rota foi planejada com base nas melhores práticas de segurança</div></div></div>`;
            return;
        }
        overlay.innerHTML = this.templates.success;
    }

    // Fecha o formulário
    closeSafeWalk() {
        const overlay = document.querySelector('.safe-walk-overlay');
        if (overlay) {
            overlay.remove();
        }
    }
}

// Instância global do componente
console.log('🚀 Inicializando SafeWalkComponent...');
try {
    window.safeWalkComponent = new SafeWalkComponent();
    console.log('✅ SafeWalkComponent inicializado com sucesso');
} catch (error) {
    console.error('❌ Erro ao inicializar SafeWalkComponent:', error);
} 