// Componente de Caminhada Segura
class SafeWalkComponent {
    constructor() {
        this.createSafeWalkStyles();
    }

    // Cria os estilos CSS para caminhada segura
    createSafeWalkStyles() {
        if (!document.getElementById('safe-walk-styles')) {
            const style = document.createElement('style');
            style.id = 'safe-walk-styles';
            style.textContent = `
                .safe-walk-overlay {
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
                    overflow-y: auto;
                    padding: 1rem;
                }

                .safe-walk-modal {
                    background: white;
                    border-radius: 20px;
                    padding: 2rem;
                    max-width: 700px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    animation: slideIn 0.3s ease;
                }

                .safe-walk-header {
                    text-align: center;
                    margin-bottom: 2rem;
                }

                .safe-walk-icon {
                    font-size: 3rem;
                    color: #2ed573;
                    margin-bottom: 1rem;
                }

                .safe-walk-title {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #333;
                    margin-bottom: 0.5rem;
                }

                .safe-walk-subtitle {
                    color: #666;
                    font-size: 0.9rem;
                }

                .safe-walk-form {
                    display: grid;
                    gap: 1.5rem;
                }

                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                }

                .form-label {
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                    color: #333;
                }

                .form-input, .form-select, .form-textarea {
                    padding: 0.75rem;
                    border: 2px solid #e9ecef;
                    border-radius: 10px;
                    font-size: 1rem;
                    transition: border-color 0.3s ease;
                }

                .form-input:focus, .form-select:focus, .form-textarea:focus {
                    outline: none;
                    border-color: #2ed573;
                }

                .form-textarea {
                    resize: vertical;
                    min-height: 80px;
                }

                .safe-walk-options {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 1rem;
                    margin: 1rem 0;
                }

                .option-card {
                    background: #f8f9fa;
                    padding: 1rem;
                    border-radius: 10px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                }

                .option-card:hover {
                    background: #e9ecef;
                    transform: translateY(-2px);
                }

                .option-card.selected {
                    background: #2ed573;
                    color: white;
                    border-color: #2ed573;
                }

                .option-card i {
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                    display: block;
                }

                .safe-walk-buttons {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    margin-top: 2rem;
                }

                .safe-walk-btn {
                    padding: 0.75rem 2rem;
                    border: none;
                    border-radius: 10px;
                    font-size: 1rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .safe-walk-btn-primary {
                    background: linear-gradient(135deg, #2ed573, #1e90ff);
                    color: white;
                }

                .safe-walk-btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(46, 213, 115, 0.4);
                }

                .safe-walk-btn-secondary {
                    background: #f8f9fa;
                    color: #666;
                    border: 2px solid #e9ecef;
                }

                .safe-walk-btn-secondary:hover {
                    background: #e9ecef;
                    color: #333;
                }

                .safe-walk-close {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: #666;
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: 50%;
                    transition: background 0.3s ease;
                }

                .safe-walk-close:hover {
                    background: #f8f9fa;
                }

                .safe-walk-modal {
                    position: relative;
                }

                .safety-tips {
                    background: #e8f5e8;
                    padding: 1rem;
                    border-radius: 10px;
                    margin-top: 1rem;
                    border-left: 4px solid #2ed573;
                }

                .safety-tips h4 {
                    color: #2ed573;
                    margin-bottom: 0.5rem;
                }

                .safety-tips ul {
                    margin: 0;
                    padding-left: 1.5rem;
                    color: #333;
                }

                .safety-tips li {
                    margin-bottom: 0.25rem;
                }

                @media (max-width: 768px) {
                    .form-row {
                        grid-template-columns: 1fr;
                    }
                    
                    .safe-walk-options {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Mostra formulário de caminhada segura
    showSafeWalkForm() {
        const overlay = document.createElement('div');
        overlay.className = 'safe-walk-overlay';
        
        overlay.innerHTML = `
            <div class="safe-walk-modal">
                <button class="safe-walk-close" onclick="safeWalkComponent.closeSafeWalk()">
                    <i class="fas fa-times"></i>
                </button>
                
                <div class="safe-walk-header">
                    <div class="safe-walk-icon">
                        <i class="fas fa-walking"></i>
                    </div>
                    <div class="safe-walk-title">🚶‍♀️ Caminhada Segura</div>
                    <div class="safe-walk-subtitle">Planeje sua rota e receba dicas de segurança</div>
                </div>

                <form id="safeWalkForm">
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Ponto de Partida</label>
                            <input type="text" class="form-input" placeholder="De onde você vai sair?" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Destino</label>
                            <input type="text" class="form-input" placeholder="Para onde você vai?" required>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Horário de Saída</label>
                            <input type="time" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Duração Estimada</label>
                            <select class="form-select" required>
                                <option value="">Selecione</option>
                                <option value="5-15min">5-15 minutos</option>
                                <option value="15-30min">15-30 minutos</option>
                                <option value="30-60min">30-60 minutos</option>
                                <option value="60min+">Mais de 1 hora</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Tipo de Trajeto</label>
                        <div class="safe-walk-options">
                            <div class="option-card" onclick="safeWalkComponent.selectOption(this, 'a-pé')">
                                <i class="fas fa-walking"></i>
                                <div>A Pé</div>
                            </div>
                            <div class="option-card" onclick="safeWalkComponent.selectOption(this, 'transporte')">
                                <i class="fas fa-bus"></i>
                                <div>Transporte</div>
                            </div>
                            <div class="option-card" onclick="safeWalkComponent.selectOption(this, 'bicicleta')">
                                <i class="fas fa-bicycle"></i>
                                <div>Bicicleta</div>
                            </div>
                            <div class="option-card" onclick="safeWalkComponent.selectOption(this, 'carona')">
                                <i class="fas fa-car"></i>
                                <div>Carona</div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Preferências de Segurança</label>
                        <div class="safe-walk-options">
                            <div class="option-card" onclick="safeWalkComponent.selectOption(this, 'rotas-iluminadas')">
                                <i class="fas fa-lightbulb"></i>
                                <div>Rotas Iluminadas</div>
                            </div>
                            <div class="option-card" onclick="safeWalkComponent.selectOption(this, 'áreas-movimentadas')">
                                <i class="fas fa-users"></i>
                                <div>Áreas Movimentadas</div>
                            </div>
                            <div class="option-card" onclick="safeWalkComponent.selectOption(this, 'presença-policial')">
                                <i class="fas fa-shield-alt"></i>
                                <div>Presença Policial</div>
                            </div>
                            <div class="option-card" onclick="safeWalkComponent.selectOption(this, 'câmeras')">
                                <i class="fas fa-video"></i>
                                <div>Câmeras</div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Observações Adicionais</label>
                        <textarea class="form-textarea" placeholder="Alguma informação adicional sobre sua rota?"></textarea>
                    </div>

                    <div class="safety-tips">
                        <h4>💡 Dicas de Segurança</h4>
                        <ul>
                            <li>Mantenha seu telefone carregado e acessível</li>
                            <li>Evite usar fones de ouvido em áreas isoladas</li>
                            <li>Compartilhe sua localização com alguém de confiança</li>
                            <li>Fique atento ao seu entorno</li>
                        </ul>
                    </div>

                    <div class="safe-walk-buttons">
                        <button type="submit" class="safe-walk-btn safe-walk-btn-primary">
                            <i class="fas fa-route"></i> Calcular Rota Segura
                        </button>
                        <button type="button" class="safe-walk-btn safe-walk-btn-secondary" onclick="safeWalkComponent.closeSafeWalk()">
                            <i class="fas fa-times"></i> Cancelar
                        </button>
                    </div>
                </form>
            </div>
        `;

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

    // Seleciona opção
    selectOption(element, value) {
        // Remove seleção de outros elementos no mesmo grupo
        const parent = element.parentElement;
        parent.querySelectorAll('.option-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Adiciona seleção ao elemento clicado
        element.classList.add('selected');
    }

    // Handler para envio do formulário
    handleSafeWalkSubmit() {
        const overlay = document.querySelector('.safe-walk-overlay');
        overlay.innerHTML = `
            <div class="safe-walk-modal">
                <div class="safe-walk-header">
                    <div class="safe-walk-icon">
                        <i class="fas fa-check-circle" style="color: #2ed573;"></i>
                    </div>
                    <div class="safe-walk-title">✅ Rota Segura Calculada!</div>
                    <div class="safe-walk-subtitle">Sua rota foi planejada com base nas melhores práticas de segurança</div>
                </div>

                <div style="text-align: center; margin: 2rem 0;">
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 15px; margin-bottom: 1rem;">
                        <h4 style="color: #2ed573; margin-bottom: 1rem;">🗺️ Rota Recomendada</h4>
                        <p><strong>Distância:</strong> 1.2 km</p>
                        <p><strong>Tempo estimado:</strong> 15 minutos</p>
                        <p><strong>Nível de segurança:</strong> Alto</p>
                    </div>

                    <div style="background: #e8f5e8; padding: 1.5rem; border-radius: 15px;">
                        <h4 style="color: #2ed573; margin-bottom: 1rem;">🛡️ Recursos de Segurança</h4>
                        <p>✅ Rotas bem iluminadas</p>
                        <p>✅ Áreas com movimento</p>
                        <p>✅ Postos policiais próximos</p>
                        <p>✅ Câmeras de segurança</p>
                    </div>
                </div>

                <div class="safe-walk-buttons">
                    <button class="safe-walk-btn safe-walk-btn-primary" onclick="safeWalkComponent.closeSafeWalk()">
                        <i class="fas fa-check"></i> Entendi
                    </button>
                </div>
            </div>
        `;
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
window.safeWalkComponent = new SafeWalkComponent(); 