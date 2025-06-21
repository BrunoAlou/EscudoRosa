// Componente de Caminhada Segura
class SafeWalkComponent {
    constructor() {
        this.loadStyles();
        this.loadTemplates();
        this.contacts = [
            { id: 'maria-silva', name: 'Maria Silva', relation: 'Mãe' },
            { id: 'joao-santos', name: 'João Santos', relation: 'Irmão' }
        ];
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
        
        // Configura os event listeners
        this.setupFormListeners();
        
        // Fecha ao clicar fora
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeSafeWalk();
            }
        });
    }

    // Configura os event listeners do formulário
    setupFormListeners() {
        // Handler do formulário
        const form = document.getElementById('safeWalkForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSafeWalkSubmit();
            });
        }

        // Configura os checkboxes de contatos
        const contactCheckboxes = document.querySelectorAll('input[name="contacts"]');
        contactCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.handleContactSelection(e.target);
            });
        });

        // Configura o toggle switch de compartilhamento de localização
        const locationToggle = document.getElementById('locationToggle');
        if (locationToggle) {
            locationToggle.addEventListener('change', (e) => {
                this.handleLocationSharing(e.target.checked);
            });
        }
    }

    // Adiciona novo contato
    addContact() {
        const contactName = prompt('Nome do contato:');
        if (!contactName) return;
        
        const contactRelation = prompt('Relação (ex: Mãe, Irmão, Amigo):');
        if (!contactRelation) return;
        
        const contactId = contactName.toLowerCase().replace(/\s+/g, '-');
        const newContact = {
            id: contactId,
            name: contactName,
            relation: contactRelation
        };
        
        this.contacts.push(newContact);
        this.updateContactList();
        
        console.log('✅ Contato adicionado:', newContact);
    }

    // Atualiza a lista de contatos
    updateContactList() {
        const contactList = document.querySelector('.contact-list');
        if (!contactList) return;
        
        // Remove contatos existentes (exceto os padrões)
        const existingContacts = contactList.querySelectorAll('.contact-item');
        existingContacts.forEach(contact => {
            const checkbox = contact.querySelector('input[name="contacts"]');
            if (checkbox && !['maria-silva', 'joao-santos'].includes(checkbox.value)) {
                contact.remove();
            }
        });
        
        // Adiciona novos contatos
        this.contacts.forEach(contact => {
            if (!['maria-silva', 'joao-santos'].includes(contact.id)) {
                const contactItem = this.createContactItem(contact);
                contactList.appendChild(contactItem);
            }
        });
    }

    // Cria um item de contato
    createContactItem(contact) {
        const contactItem = document.createElement('div');
        contactItem.className = 'contact-item';
        contactItem.innerHTML = `
            <div class="contact-info">
                <div class="contact-name">${contact.name}</div>
                <div class="contact-relation">${contact.relation}</div>
            </div>
            <label class="contact-checkbox">
                <input type="checkbox" name="contacts" value="${contact.id}">
                <span class="checkbox-custom"></span>
            </label>
        `;
        
        // Adiciona event listener ao novo checkbox
        const checkbox = contactItem.querySelector('input[name="contacts"]');
        checkbox.addEventListener('change', (e) => {
            this.handleContactSelection(e.target);
        });
        
        return contactItem;
    }

    // Gerencia seleção de contatos
    handleContactSelection(checkbox) {
        const contactItem = checkbox.closest('.contact-item');
        if (checkbox.checked) {
            contactItem.style.borderColor = '#2ed573';
            contactItem.style.background = '#f0f8f0';
        } else {
            contactItem.style.borderColor = '#e9ecef';
            contactItem.style.background = '#f8f9fa';
        }
    }

    // Gerencia compartilhamento de localização
    handleLocationSharing(enabled) {
        const toggleText = document.getElementById('toggleText');
        const locationStatus = document.getElementById('locationStatus');
        const toggleContainer = document.querySelector('.location-toggle-container');
        
        if (enabled) {
            console.log('📍 Compartilhamento de localização ativado');
            
            // Atualiza texto do toggle
            if (toggleText) {
                toggleText.textContent = 'Compartilhamento ativado';
                toggleText.style.color = '#2ed573';
            }
            
            // Atualiza status
            if (locationStatus) {
                locationStatus.innerHTML = `
                    <span class="status-indicator active">
                        <i class="fas fa-circle"></i>
                        Localização ativa
                    </span>
                `;
            }
            
            // Atualiza container
            if (toggleContainer) {
                toggleContainer.classList.add('active');
            }
            
            // Solicita localização
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        console.log('✅ Localização obtida:', position.coords);
                        // Aqui você pode implementar o envio da localização para os contatos
                    },
                    (error) => {
                        console.error('❌ Erro ao obter localização:', error);
                        // Reverte o toggle se não conseguir obter localização
                        this.handleLocationSharing(false);
                        const locationToggle = document.getElementById('locationToggle');
                        if (locationToggle) {
                            locationToggle.checked = false;
                        }
                        alert('Não foi possível obter sua localização. Verifique as permissões do navegador.');
                    }
                );
            } else {
                alert('Geolocalização não é suportada pelo seu navegador.');
                this.handleLocationSharing(false);
                const locationToggle = document.getElementById('locationToggle');
                if (locationToggle) {
                    locationToggle.checked = false;
                }
            }
        } else {
            console.log('📍 Compartilhamento de localização desativado');
            
            // Atualiza texto do toggle
            if (toggleText) {
                toggleText.textContent = 'Compartilhamento desativado';
                toggleText.style.color = '#333';
            }
            
            // Atualiza status
            if (locationStatus) {
                locationStatus.innerHTML = `
                    <span class="status-indicator inactive">
                        <i class="fas fa-circle"></i>
                        Localização inativa
                    </span>
                `;
            }
            
            // Atualiza container
            if (toggleContainer) {
                toggleContainer.classList.remove('active');
            }
        }
    }

    // Fallback para formulário
    showFallbackSafeWalkForm() {
        alert('Não foi possível carregar o formulário de caminhada segura.');
    }

    // Handler para envio do formulário
    handleSafeWalkSubmit() {
        const overlay = document.querySelector('.safe-walk-overlay');
        
        // Coleta dados do formulário
        const selectedContacts = Array.from(document.querySelectorAll('input[name="contacts"]:checked'))
            .map(checkbox => checkbox.value);
        const shareLocation = document.querySelector('input[name="shareLocation"]').checked;
        const busInfo = document.querySelector('input[placeholder*="ônibus"]').value;
        
        console.log('📋 Dados do formulário:', {
            selectedContacts,
            shareLocation,
            busInfo
        });
        
        if (!this.templates) {
            overlay.innerHTML = `<div class='safe-walk-modal'><div class='safe-walk-header'><div class='safe-walk-icon'><i class='fas fa-check-circle' style='color: #2ed573;'></i></div><div class='safe-walk-title'>✅ Caminhada Segura Iniciada!</div><div class='safe-walk-subtitle'>Seus contatos foram notificados e sua localização está sendo compartilhada</div></div></div>`;
            return;
        }
        
        overlay.innerHTML = this.templates.success;
        
        // Simula notificação dos contatos
        this.notifyContacts(selectedContacts);
    }

    // Notifica contatos selecionados
    notifyContacts(contactIds) {
        contactIds.forEach(contactId => {
            const contact = this.contacts.find(c => c.id === contactId);
            if (contact) {
                console.log(`📱 Notificando ${contact.name} (${contact.relation})`);
                // Aqui você pode implementar a lógica real de notificação
            }
        });
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