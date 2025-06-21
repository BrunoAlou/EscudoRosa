// Componente de Alerta para "Estou em Perigo"
class AlertComponent {
    constructor() {
        this.createAlertStyles();
    }

    // Cria os estilos CSS para o alerta
    createAlertStyles() {
        if (!document.getElementById('alert-styles')) {
            const style = document.createElement('style');
            style.id = 'alert-styles';
            style.textContent = `
                .alert-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10000;
                    animation: fadeIn 0.3s ease;
                }

                .alert-modal {
                    background: white;
                    border-radius: 20px;
                    padding: 2rem;
                    max-width: 400px;
                    width: 90%;
                    text-align: center;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    animation: slideIn 0.3s ease;
                }

                .alert-icon {
                    font-size: 4rem;
                    color: #ff4757;
                    margin-bottom: 1rem;
                }

                .alert-title {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #333;
                    margin-bottom: 1rem;
                }

                .alert-message {
                    color: #666;
                    margin-bottom: 2rem;
                    line-height: 1.6;
                }

                .alert-buttons {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                }

                .alert-btn {
                    padding: 0.75rem 2rem;
                    border: none;
                    border-radius: 10px;
                    font-size: 1rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .alert-btn-yes {
                    background: linear-gradient(135deg, #ff4757, #ff3742);
                    color: white;
                }

                .alert-btn-yes:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(255, 71, 87, 0.4);
                }

                .alert-btn-no {
                    background: #f8f9fa;
                    color: #666;
                    border: 2px solid #e9ecef;
                }

                .alert-btn-no:hover {
                    background: #e9ecef;
                    color: #333;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideIn {
                    from { 
                        opacity: 0;
                        transform: translateY(-50px) scale(0.9);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Mostra o alerta de perigo
    showDangerAlert() {
        const overlay = document.createElement('div');
        overlay.className = 'alert-overlay';
        
        overlay.innerHTML = `
            <div class="alert-modal">
                <div class="alert-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="alert-title">EMERGENCIA</div>
                <div class="alert-message">
                    Voce esta em uma situacao de perigo?<br>
                    <strong>Precisa de ajuda imediata?</strong>
                </div>
                <div class="alert-buttons">
                    <button class="alert-btn alert-btn-yes" onclick="alertComponent.handleYes()">
                        <i class="fas fa-check"></i> SIM, PRECISO DE AJUDA
                    </button>
                    <button class="alert-btn alert-btn-no" onclick="alertComponent.handleNo()">
                        <i class="fas fa-times"></i> NAO, ESTOU BEM
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
        
        // Mostra alerta de confirmacao
        setTimeout(() => {
            this.showConfirmationAlert();
        }, 300);
    }

    // Handler para resposta NAO
    handleNo() {
        this.closeAlert();
        
        // Mostra mensagem de alivio
        setTimeout(() => {
            this.showReliefMessage();
        }, 300);
    }

    // Alerta de confirmacao para ajuda
    showConfirmationAlert() {
        const overlay = document.createElement('div');
        overlay.className = 'alert-overlay';
        
        overlay.innerHTML = `
            <div class="alert-modal">
                <div class="alert-icon">
                    <i class="fas fa-phone"></i>
                </div>
                <div class="alert-title">ACIONANDO AJUDA</div>
                <div class="alert-message">
                    <strong>Ligando para emergencia...</strong><br>
                    Mantenha a calma, ajuda esta a caminho.
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

    // Mensagem de alivio
    showReliefMessage() {
        const overlay = document.createElement('div');
        overlay.className = 'alert-overlay';
        
        overlay.innerHTML = `
            <div class="alert-modal">
                <div class="alert-icon">
                    <i class="fas fa-heart" style="color: #2ed573;"></i>
                </div>
                <div class="alert-title">Que bom!</div>
                <div class="alert-message">
                    Ficamos felizes que voce esteja bem!<br>
                    Continue se cuidando e mantenha-se seguro.
                </div>
                <div class="alert-buttons">
                    <button class="alert-btn alert-btn-yes" onclick="alertComponent.closeAlert()">
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

// Instancia global do componente
window.alertComponent = new AlertComponent(); 