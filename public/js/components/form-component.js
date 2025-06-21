// Componente de Formulário para "Insegurança"
class FormComponent {
    constructor() {
        this.createFormStyles();
    }

    // Cria os estilos CSS para o formulário
    createFormStyles() {
        if (!document.getElementById('form-styles')) {
            const style = document.createElement('style');
            style.id = 'form-styles';
            style.textContent = `
                .form-overlay {
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

                .form-modal {
                    background: white;
                    border-radius: 20px;
                    padding: 2rem;
                    max-width: 600px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    animation: slideIn 0.3s ease;
                }

                .form-header {
                    text-align: center;
                    margin-bottom: 2rem;
                }

                .form-icon {
                    font-size: 3rem;
                    color: #6c757d;
                    margin-bottom: 1rem;
                }

                .form-title {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #333;
                    margin-bottom: 0.5rem;
                }

                .form-subtitle {
                    color: #666;
                    font-size: 0.9rem;
                }

                .form-group {
                    margin-bottom: 1.5rem;
                }

                .form-label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                    color: #333;
                }

                .form-input, .form-textarea, .form-select {
                    width: 100%;
                    padding: 0.75rem;
                    border: 2px solid #e9ecef;
                    border-radius: 10px;
                    font-size: 1rem;
                    transition: border-color 0.3s ease;
                }

                .form-input:focus, .form-textarea:focus, .form-select:focus {
                    outline: none;
                    border-color: #667eea;
                }

                .form-textarea {
                    resize: vertical;
                    min-height: 100px;
                }

                .form-buttons {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    margin-top: 2rem;
                }

                .form-btn {
                    padding: 0.75rem 2rem;
                    border: none;
                    border-radius: 10px;
                    font-size: 1rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .form-btn-primary {
                    background: linear-gradient(135deg, #6c757d, #495057);
                    color: white;
                }

                .form-btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(108, 117, 125, 0.4);
                }

                .form-btn-secondary {
                    background: #f8f9fa;
                    color: #666;
                    border: 2px solid #e9ecef;
                }

                .form-btn-secondary:hover {
                    background: #e9ecef;
                    color: #333;
                }

                .form-close {
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

                .form-close:hover {
                    background: #f8f9fa;
                }

                .form-modal {
                    position: relative;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Mostra formulário de insegurança
    showInsecurityForm() {
        const overlay = document.createElement('div');
        overlay.className = 'form-overlay';
        
        overlay.innerHTML = `
            <div class="form-modal">
                <button class="form-close" onclick="formComponent.closeForm()">
                    <i class="fas fa-times"></i>
                </button>
                
                <div class="form-header">
                    <div class="form-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="form-title">🛡️ Relatar Insegurança</div>
                    <div class="form-subtitle">Conte-nos sobre a situação que está causando insegurança</div>
                </div>

                <form id="insecurityForm">
                    <div class="form-group">
                        <label class="form-label">Tipo de Situação</label>
                        <select class="form-select" required>
                            <option value="">Selecione uma opção</option>
                            <option value="assédio">Assédio</option>
                            <option value="ameaça">Ameaça</option>
                            <option value="perseguição">Perseguição</option>
                            <option value="violência">Violência</option>
                            <option value="outro">Outro</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Localização</label>
                        <input type="text" class="form-input" placeholder="Rua, bairro, cidade..." required>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Data e Hora</label>
                        <input type="datetime-local" class="form-input" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Descrição da Situação</label>
                        <textarea class="form-textarea" placeholder="Descreva detalhadamente o que aconteceu..." required></textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Envolvidos</label>
                        <input type="text" class="form-input" placeholder="Quantas pessoas estavam envolvidas?">
                    </div>

                    <div class="form-group">
                        <label class="form-label">Precisa de Ajuda Imediata?</label>
                        <select class="form-select" required>
                            <option value="">Selecione uma opção</option>
                            <option value="sim">Sim, preciso de ajuda urgente</option>
                            <option value="não">Não, apenas quero registrar</option>
                        </select>
                    </div>

                    <div class="form-buttons">
                        <button type="submit" class="form-btn form-btn-primary">
                            <i class="fas fa-paper-plane"></i> Enviar Relatório
                        </button>
                        <button type="button" class="form-btn form-btn-secondary" onclick="formComponent.closeForm()">
                            <i class="fas fa-times"></i> Cancelar
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(overlay);

        // Handler do formulário
        const form = document.getElementById('insecurityForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit('insecurity');
        });

        // Fecha ao clicar fora
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeForm();
            }
        });
    }

    // Mostra formulário de denúncia
    showDenunciationForm() {
        const overlay = document.createElement('div');
        overlay.className = 'form-overlay';
        
        overlay.innerHTML = `
            <div class="form-modal">
                <button class="form-close" onclick="formComponent.closeForm()">
                    <i class="fas fa-times"></i>
                </button>
                
                <div class="form-header">
                    <div class="form-icon">
                        <i class="fas fa-bullhorn"></i>
                    </div>
                    <div class="form-title">📢 Fazer Denúncia</div>
                    <div class="form-subtitle">Denuncie uma ocorrência de violência ou crime</div>
                </div>

                <form id="denunciationForm">
                    <div class="form-group">
                        <label class="form-label">Tipo de Violência</label>
                        <select class="form-select" required>
                            <option value="">Selecione uma opção</option>
                            <option value="violência-doméstica">Violência Doméstica</option>
                            <option value="assédio-sexual">Assédio Sexual</option>
                            <option value="agressão-física">Agressão Física</option>
                            <option value="violência-psicológica">Violência Psicológica</option>
                            <option value="discriminação">Discriminação</option>
                            <option value="outro">Outro</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Local da Ocorrência</label>
                        <input type="text" class="form-input" placeholder="Endereço completo..." required>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Data e Hora</label>
                        <input type="datetime-local" class="form-input" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Descrição Detalhada</label>
                        <textarea class="form-textarea" placeholder="Descreva o que aconteceu, quem estava envolvido..." required></textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Testemunhas</label>
                        <input type="text" class="form-input" placeholder="Havia testemunhas? Quantas?">
                    </div>

                    <div class="form-group">
                        <label class="form-label">Evidências</label>
                        <textarea class="form-textarea" placeholder="Fotos, vídeos, mensagens, etc."></textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Anonimato</label>
                        <select class="form-select" required>
                            <option value="">Selecione uma opção</option>
                            <option value="sim">Quero denunciar anonimamente</option>
                            <option value="não">Posso fornecer meus dados</option>
                        </select>
                    </div>

                    <div class="form-buttons">
                        <button type="submit" class="form-btn form-btn-primary">
                            <i class="fas fa-paper-plane"></i> Enviar Denúncia
                        </button>
                        <button type="button" class="form-btn form-btn-secondary" onclick="formComponent.closeForm()">
                            <i class="fas fa-times"></i> Cancelar
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(overlay);

        // Handler do formulário
        const form = document.getElementById('denunciationForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit('denunciation');
        });

        // Fecha ao clicar fora
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeForm();
            }
        });
    }

    // Handler para envio do formulário
    handleFormSubmit(type) {
        // Simula envio
        const overlay = document.querySelector('.form-overlay');
        overlay.innerHTML = `
            <div class="form-modal">
                <div class="form-header">
                    <div class="form-icon">
                        <i class="fas fa-check-circle" style="color: #28a745;"></i>
                    </div>
                    <div class="form-title">✅ Enviado com Sucesso!</div>
                    <div class="form-subtitle">
                        ${type === 'insecurity' ? 'Seu relatório foi registrado e será analisado.' : 'Sua denúncia foi enviada para as autoridades competentes.'}
                    </div>
                </div>
                <div class="form-buttons">
                    <button class="form-btn form-btn-primary" onclick="formComponent.closeForm()">
                        <i class="fas fa-check"></i> Entendi
                    </button>
                </div>
            </div>
        `;
    }

    // Fecha o formulário
    closeForm() {
        const overlay = document.querySelector('.form-overlay');
        if (overlay) {
            overlay.remove();
        }
    }
}

// Instância global do componente
window.formComponent = new FormComponent(); 