// Controle do dropdown do header
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    // Toggle do dropdown
    dropdownToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });

    // Fechar dropdown ao clicar fora
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });

    // Controle do menu do footer
    const footerButtons = document.querySelectorAll('.footer-menu-button');
    
    footerButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active de todos os botões
            footerButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adiciona active ao botão clicado
            this.classList.add('active');
            
            // Aqui você pode adicionar lógica para navegar entre páginas
            const page = this.getAttribute('data-page');
            if (page) {
                loadPage(page);
            }
        });
    });

    // Função para carregar páginas (pode ser expandida)
    function loadPage(page) {
        const pageContainer = document.querySelector('.page-container');
        const pageTitle = document.querySelector('.page-title');
        const pageContent = document.querySelector('.page-content');
        
        // Simulação de carregamento de páginas
        const pages = {
            'home': {
                title: 'Página Inicial',
                content: `
                    <h3>Bem-vindo ao Meu App!</h3>
                    <p>Esta é a página inicial do seu aplicativo. Aqui você pode adicionar conteúdo relevante para os usuários.</p>
                    <div style="margin-top: 2rem;">
                        <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 1rem; border-radius: 10px; margin-bottom: 1rem;">
                            <h4>🎉 Funcionalidades</h4>
                            <ul style="margin-top: 0.5rem;">
                                <li>Header com dropdown funcional</li>
                                <li>Footer com navegação</li>
                                <li>Design responsivo</li>
                                <li>Animações suaves</li>
                            </ul>
                        </div>
                    </div>
                `
            },
            'profile': {
                title: 'Perfil',
                content: `
                    <h3>👤 Seu Perfil</h3>
                    <p>Gerencie suas informações pessoais e configurações da conta.</p>
                    <div style="margin-top: 2rem;">
                        <div style="background: #f8f9fa; padding: 1rem; border-radius: 10px; border-left: 4px solid #667eea;">
                            <h4>Informações da Conta</h4>
                            <p><strong>Nome:</strong> Usuário Exemplo</p>
                            <p><strong>Email:</strong> usuario@exemplo.com</p>
                            <p><strong>Membro desde:</strong> Janeiro 2024</p>
                        </div>
                    </div>
                `
            },
            'settings': {
                title: 'Configurações',
                content: `
                    <h3>⚙️ Configurações</h3>
                    <p>Personalize sua experiência no aplicativo.</p>
                    <div style="margin-top: 2rem;">
                        <div style="background: #f8f9fa; padding: 1rem; border-radius: 10px;">
                            <h4>Preferências</h4>
                            <div style="margin: 1rem 0;">
                                <label style="display: flex; align-items: center; gap: 0.5rem;">
                                    <input type="checkbox" checked> Notificações por email
                                </label>
                            </div>
                            <div style="margin: 1rem 0;">
                                <label style="display: flex; align-items: center; gap: 0.5rem;">
                                    <input type="checkbox"> Modo escuro
                                </label>
                            </div>
                        </div>
                    </div>
                `
            },
            'help': {
                title: 'Ajuda',
                content: `
                    <h3>❓ Central de Ajuda</h3>
                    <p>Encontre respostas para suas dúvidas e suporte.</p>
                    <div style="margin-top: 2rem;">
                        <div style="background: #e3f2fd; padding: 1rem; border-radius: 10px; border-left: 4px solid #2196f3;">
                            <h4>Perguntas Frequentes</h4>
                            <ul style="margin-top: 0.5rem;">
                                <li>Como alterar minha senha?</li>
                                <li>Como ativar notificações?</li>
                                <li>Como exportar meus dados?</li>
                                <li>Como entrar em contato com suporte?</li>
                            </ul>
                        </div>
                    </div>
                `
            }
        };

        if (pages[page]) {
            pageTitle.textContent = pages[page].title;
            pageContent.innerHTML = pages[page].content;
            
            // Animação de transição
            pageContainer.style.opacity = '0';
            pageContainer.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                pageContainer.style.opacity = '1';
                pageContainer.style.transform = 'translateY(0)';
            }, 150);
        }
    }

    // Ativar página inicial por padrão
    const homeButton = document.querySelector('[data-page="home"]');
    if (homeButton) {
        homeButton.classList.add('active');
    }
}); 