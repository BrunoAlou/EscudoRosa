// Componente de Alerta para "Estou em Perigo"
class AlertComponent {
    constructor() {
        this.loadStyles();
        this.loadTemplates();
    }

    // Carrega os estilos CSS
    loadStyles() {
        if (!document.getElementById('alert-styles')) {
            const link = document.createElement('link');
            link.id = 'alert-styles';
            link.rel = 'stylesheet';
            link.href = '/components/alert-component/alert.css';
            document.head.appendChild(link);
        }
    }

    // Carrega os templates HTML
    loadTemplates() {
        fetch('/components/alert-component/alert.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                this.templates = this.parseTemplates(html);
                console.log('✅ Templates do alerta carregados com sucesso');
                this.notifyReady();
            })
            .catch(error => {
                console.warn('⚠️ Erro ao carregar templates do alerta:', error);
                console.log('🔄 Usando fallback interno');
                this.templates = null;
                this.notifyReady();
            });
    }

    // Notifica que o componente está pronto
    notifyReady() {
        const event = new CustomEvent('componentReady', {
            detail: { component: 'alertComponent', templates: !!this.templates }
        });
        document.dispatchEvent(event);
    }

    // Parse dos templates HTML
    parseTemplates(html) {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            return {
                danger: doc.querySelector('.alert-overlay').outerHTML,
                confirmation: doc.querySelector('#confirmation-alert').outerHTML,
                relief: doc.querySelector('#relief-alert').outerHTML
            };
        } catch (error) {
            console.error('Erro ao fazer parse dos templates:', error);
            return null;
        }
    }

    // Mostra o alerta de perigo
    showDangerAlert() {
        if (!this.templates) {
            // Fallback se os templates não foram carregados
            this.showFallbackAlert();
            return;
        }

        const overlay = document.createElement('div');
        overlay.innerHTML = this.templates.danger;
        const alertElement = overlay.firstElementChild;
        
        document.body.appendChild(alertElement);

        // Fecha o alerta ao clicar fora
        alertElement.addEventListener('click', (e) => {
            if (e.target === alertElement) {
                this.closeAlert();
            }
        });

        // Fecha com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAlert();
            }
        });
    }

    // Fallback se os templates não carregarem
    showFallbackAlert() {
        const overlay = document.createElement('div');
        overlay.className = 'alert-overlay';
        
        overlay.innerHTML = `
            <div class="alert-modal">
                <div class="alert-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="alert-title">🚨 EMERGÊNCIA</div>
                <div class="alert-message">
                    Você está em uma situação de perigo?<br>
                    <strong>Precisa de ajuda imediata?</strong>
                </div>
                <div class="alert-buttons">
                    <button class="alert-btn alert-btn-yes" onclick="alertComponent.handleYes()">
                        <i class="fas fa-check"></i> SIM, PRECISO DE AJUDA
                    </button>
                    <button class="alert-btn alert-btn-no" onclick="alertComponent.handleNo()">
                        <i class="fas fa-times"></i> NÃO, ESTOU BEM
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Fecha o alerta ao clicar fora
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeAlert();
            }
        });

        // Fecha com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAlert();
            }
        });
    }

    // Handler para resposta SIM
    handleYes() {
        this.closeAlert();
        
        // Mostra alerta de confirmação
        setTimeout(() => {
            this.showConfirmationAlert();
        }, 300);
    }

    // Handler para resposta NÃO
    handleNo() {
        this.closeAlert();
        
        // Mostra mensagem de alívio
        setTimeout(() => {
            this.showReliefMessage();
        }, 300);
    }

    // Alerta de confirmação para ajuda
    showConfirmationAlert() {
        if (!this.templates) {
            this.showFallbackConfirmation();
            return;
        }

        const overlay = document.createElement('div');
        overlay.innerHTML = this.templates.confirmation;
        const alertElement = overlay.firstElementChild;
        alertElement.style.display = 'flex';
        
        document.body.appendChild(alertElement);
    }

    // Fallback para confirmação
    showFallbackConfirmation() {
        const overlay = document.createElement('div');
        overlay.className = 'alert-overlay';
        
        overlay.innerHTML = `
            <div class="alert-modal">
                <div class="alert-icon">
                    <i class="fas fa-phone"></i>
                </div>
                <div class="alert-title">📞 ACIONANDO AJUDA</div>
                <div class="alert-message">
                    <strong>Ligando para emergência...</strong><br>
                    Mantenha a calma, ajuda está a caminho.
                </div>
                <div class="alert-buttons">
                    <button class="alert-btn alert-btn-yes" onclick="alertComponent.closeAlert()">
                        <i class="fas fa-check"></i> ENTENDI
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
    }

    // Mensagem de alívio
    showReliefMessage() {
        if (!this.templates) {
            this.showFallbackRelief();
            return;
        }

        const overlay = document.createElement('div');
        overlay.innerHTML = this.templates.relief;
        const alertElement = overlay.firstElementChild;
        alertElement.style.display = 'flex';
        
        document.body.appendChild(alertElement);
    }

    // Fallback para mensagem de alívio
    showFallbackRelief() {
        const overlay = document.createElement('div');
        overlay.className = 'alert-overlay';
        
        overlay.innerHTML = `
            <div class="alert-modal">
                <div class="alert-icon">
                    <i class="fas fa-heart"></i>
                </div>
                <div class="alert-title">💙 Ficamos Aliviados</div>
                <div class="alert-message">
                    Que bom que você está bem!<br>
                    Lembre-se: estamos aqui para ajudar sempre que precisar.
                </div>
                <div class="alert-buttons">
                    <button class="alert-btn alert-btn-no" onclick="alertComponent.closeAlert()">
                        <i class="fas fa-check"></i> OBRIGADO
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
    }

    // Fecha o alerta
    closeAlert() {
        const overlay = document.querySelector('.alert-overlay');
        if (overlay) {
            overlay.remove();
        }
    }
}

// Instância global do componente
console.log('🚀 Inicializando AlertComponent...');
try {
    window.alertComponent = new AlertComponent();
    console.log('✅ AlertComponent inicializado com sucesso');
} catch (error) {
    console.error('❌ Erro ao inicializar AlertComponent:', error);
} 