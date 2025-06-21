// Componente de Formulário para "Insegurança" e "Denúncia"
class FormComponent {
    constructor() {
        this.loadStyles();
        this.loadTemplates();
    }

    // Carrega os estilos CSS
    loadStyles() {
        if (!document.getElementById('form-styles')) {
            const link = document.createElement('link');
            link.id = 'form-styles';
            link.rel = 'stylesheet';
            link.href = '/components/form-component/form.css';
            document.head.appendChild(link);
        }
    }

    // Carrega os templates HTML
    loadTemplates() {
        fetch('/components/form-component/form.html')
            .then(response => response.text())
            .then(html => {
                this.templates = this.parseTemplates(html);
            })
            .catch(error => {
                console.error('Erro ao carregar templates do formulário:', error);
            });
    }

    // Parse dos templates HTML
    parseTemplates(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        return {
            insecurity: doc.querySelector('#insecurity-form-template').innerHTML,
            denunciation: doc.querySelector('#denunciation-form-template').innerHTML,
            success: doc.querySelector('#success-template').innerHTML
        };
    }

    // Função para selecionar papel (vítima ou testemunha)
    selectRole(role) {
        // Remove seleção anterior
        const victimOption = document.getElementById('victim-option');
        const witnessOption = document.getElementById('witness-option');
        
        if (victimOption) victimOption.classList.remove('selected');
        if (witnessOption) witnessOption.classList.remove('selected');
        
        // Aplica seleção atual
        if (role === 'victim' && victimOption) {
            victimOption.classList.add('selected');
        } else if (role === 'witness' && witnessOption) {
            witnessOption.classList.add('selected');
        }
    }

    // Configura os event listeners do formulário de denúncia
    setupDenunciationFormListeners() {
        // Configura os radio buttons de vítima/testemunha
        const victimOption = document.getElementById('victim-option');
        const witnessOption = document.getElementById('witness-option');
        
        if (victimOption) {
            victimOption.addEventListener('click', () => {
                this.selectRole('victim');
                // Atualiza o input hidden
                const hiddenInput = document.querySelector('input[name="role"]');
                if (hiddenInput) hiddenInput.value = 'victim';
            });
        }
        
        if (witnessOption) {
            witnessOption.addEventListener('click', () => {
                this.selectRole('witness');
                // Atualiza o input hidden
                const hiddenInput = document.querySelector('input[name="role"]');
                if (hiddenInput) hiddenInput.value = 'witness';
            });
        }

        // Configura o upload de arquivos
        const fileInput = document.querySelector('.form-file-input');
        const fileLabel = document.querySelector('.form-file-label');
        
        if (fileInput && fileLabel) {
            fileInput.addEventListener('change', (e) => {
                const files = e.target.files;
                if (files.length > 0) {
                    fileLabel.innerHTML = `<i class="fas fa-check"></i> ${files.length} arquivo(s) selecionado(s)`;
                    fileLabel.style.color = '#28a745';
                } else {
                    fileLabel.innerHTML = `<i class="fas fa-cloud-upload-alt"></i> Escolher Arquivos`;
                    fileLabel.style.color = '#6c757d';
                }
            });
        }
    }

    // Mostra formulário de insegurança
    showInsecurityForm() {
        if (!this.templates) {
            this.showFallbackInsecurityForm();
            return;
        }

        const overlay = document.createElement('div');
        overlay.className = 'form-overlay';
        overlay.innerHTML = this.templates.insecurity;
        
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

    // Fallback para formulário de insegurança
    showFallbackInsecurityForm() {
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
        if (!this.templates) {
            this.showFallbackDenunciationForm();
            return;
        }

        const overlay = document.createElement('div');
        overlay.className = 'form-overlay';
        overlay.innerHTML = this.templates.denunciation;
        
        document.body.appendChild(overlay);

        // Configura os event listeners específicos do formulário de denúncia
        this.setupDenunciationFormListeners();

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

    // Fallback para formulário de denúncia
    showFallbackDenunciationForm() {
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
        const overlay = document.querySelector('.form-overlay');
        
        if (!this.templates) {
            // Fallback para sucesso
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
            return;
        }

        // Usa template de sucesso
        overlay.innerHTML = this.templates.success;
        
        // Atualiza a mensagem de sucesso
        const successMessage = overlay.querySelector('#success-message');
        if (successMessage) {
            successMessage.textContent = type === 'insecurity' 
                ? 'Seu relatório foi registrado e será analisado.' 
                : 'Sua denúncia foi enviada para as autoridades competentes.';
        }
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
console.log('🚀 Inicializando FormComponent...');
try {
    window.formComponent = new FormComponent();
    console.log('✅ FormComponent inicializado com sucesso');
} catch (error) {
    console.error('❌ Erro ao inicializar FormComponent:', error);
} 