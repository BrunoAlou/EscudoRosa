// Componente de Formulario para "Inseguranca" e "Fazer denuncia"
class FormComponent {
    constructor() {
        this.createFormStyles();
    }

    // Cria os estilos CSS para o formulario
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
                }

                .form-modal {
                    background: white;
                    border-radius: 20px;
                    padding: 2rem;
                    max-width: 500px;
                    width: 90%;
                    max-height: 80vh;
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
                    color: #007bff;
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
                    border-color: #007bff;
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
                    background: linear-gradient(135deg, #007bff, #0056b3);
                    color: white;
                }

                .form-btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(0, 123, 255, 0.4);
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

    // Mostra formulario de inseguranca
    showInsecurityForm() {
        const overlay = document.createElement('div');
        overlay.className = 'form-overlay';
        
        overlay.innerHTML = `
            <div class="form-modal">
                <div class="form-header">
                    <div class="form-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="form-title">Reportar Inseguranca</div>
                    <div class="form-subtitle">Ajude-nos a melhorar a seguranca da area</div>
                </div>
                
                <form id="insecurityForm">
                    <div class="form-group">
                        <label class="form-label">Tipo de Inseguranca</label>
                        <select class="form-select" required>
                            <option value="">Selecione uma opcao</option>
                            <option value="assalto">Assalto</option>
                            <option value="violencia">Violencia</option>
                            <option value="iluminacao">Falta de Iluminacao</option>
                            <option value="pessoas-suspeitas">Pessoas Suspeitas</option>
                            <option value="outro">Outro</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Localizacao</label>
                        <input type="text" class="form-input" placeholder="Endereco ou ponto de referencia" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Data e Hora</label>
                        <input type="datetime-local" class="form-input" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Descricao</label>
                        <textarea class="form-textarea" placeholder="Descreva o que aconteceu..." required></textarea>
                    </div>
                    
                    <div class="form-buttons">
                        <button type="button" class="form-btn form-btn-secondary" onclick="formComponent.closeForm()">
                            <i class="fas fa-times"></i> Cancelar
                        </button>
                        <button type="submit" class="form-btn form-btn-primary">
                            <i class="fas fa-paper-plane"></i> Enviar
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(overlay);
        this.setupFormHandlers(overlay, 'insecurity');
    }

    // Mostra formulario de denuncia
    showReportForm() {
        const overlay = document.createElement('div');
        overlay.className = 'form-overlay';
        
        overlay.innerHTML = `
            <div class="form-modal">
                <div class="form-header">
                    <div class="form-icon">
                        <i class="fas fa-gavel"></i>
                    </div>
                    <div class="form-title">Fazer Denuncia</div>
                    <div class="form-subtitle">Reporte um crime ou incidente</div>
                </div>
                
                <form id="reportForm">
                    <div class="form-group">
                        <label class="form-label">Tipo de Denuncia</label>
                        <select class="form-select" required>
                            <option value="">Selecione uma opcao</option>
                            <option value="furto">Furto</option>
                            <option value="roubo">Roubo</option>
                            <option value="agressao">Agressao</option>
                            <option value="ameaca">Ameaca</option>
                            <option value="outro">Outro</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Local do Incidente</label>
                        <input type="text" class="form-input" placeholder="Endereco completo" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Data e Hora</label>
                        <input type="datetime-local" class="form-input" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Descricao Detalhada</label>
                        <textarea class="form-textarea" placeholder="Descreva o incidente em detalhes..." required></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Testemunhas (se houver)</label>
                        <input type="text" class="form-input" placeholder="Nome ou descricao das testemunhas">
                    </div>
                    
                    <div class="form-buttons">
                        <button type="button" class="form-btn form-btn-secondary" onclick="formComponent.closeForm()">
                            <i class="fas fa-times"></i> Cancelar
                        </button>
                        <button type="submit" class="form-btn form-btn-primary">
                            <i class="fas fa-paper-plane"></i> Enviar Denuncia
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(overlay);
        this.setupFormHandlers(overlay, 'report');
    }

    // Configura os handlers do formulario
    setupFormHandlers(overlay, formType) {
        const form = overlay.querySelector('form');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(formType, form);
        });

        // Fecha ao clicar fora
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeForm();
            }
        });

        // Fecha com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeForm();
            }
        });
    }

    // Handler para envio do formulario
    handleFormSubmit(formType, form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        console.log(`${formType} form submitted:`, data);
        
        // Simula envio
        this.showSuccessMessage(formType);
    }

    // Mostra mensagem de sucesso
    showSuccessMessage(formType) {
        const overlay = document.createElement('div');
        overlay.className = 'form-overlay';
        
        const message = formType === 'insecurity' 
            ? 'Relatorio de inseguranca enviado com sucesso!'
            : 'Denuncia enviada com sucesso!';
        
        overlay.innerHTML = `
            <div class="form-modal">
                <div class="form-header">
                    <div class="form-icon">
                        <i class="fas fa-check-circle" style="color: #28a745;"></i>
                    </div>
                    <div class="form-title">Enviado!</div>
                    <div class="form-subtitle">${message}</div>
                </div>
                
                <div class="form-buttons">
                    <button class="form-btn form-btn-primary" onclick="formComponent.closeForm()">
                        <i class="fas fa-check"></i> OK
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
    }

    // Fecha o formulario
    closeForm() {
        const overlay = document.querySelector('.form-overlay');
        if (overlay) {
            overlay.remove();
        }
    }
}

// Instancia global do componente
window.formComponent = new FormComponent(); 