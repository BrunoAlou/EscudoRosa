// Arquivo app.js

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
            
            // Carrega a página correspondente
            const page = this.getAttribute('data-page');
            if (page) {
                loadPage(page);
            }
        });
    });

    // Função para carregar páginas usando arquivos HTML externos
    async function loadPage(pageKey) {
        const pageContainer = document.querySelector('.page-container');
        const pageTitle = document.querySelector('.page-title');
        const pageContent = document.querySelector('.page-content');
        
        console.log('Tentando carregar página:', pageKey);
        
        // Verifica se a página existe na configuração
        if (!PAGES_CONFIG[pageKey]) {
            console.error('Página não encontrada na configuração:', pageKey);
            return;
        }

        const pageConfig = PAGES_CONFIG[pageKey];
        
        try {
            // Atualiza o título
            pageTitle.textContent = pageConfig.title;
            
            // Mostra indicador de carregamento
            pageContent.innerHTML = `
                <div style="text-align: center; padding: 3rem;">
                    <i class="fas fa-spinner fa-spin" style="font-size: 3rem; color: #007bff; margin-bottom: 1rem;"></i>
                    <p>Carregando página...</p>
                </div>
            `;
            
            // Carrega o conteúdo do arquivo HTML
            const content = await window.pagesLoader.loadPageContent(pageConfig.file);
            
            // Atualiza o conteúdo
            pageContent.innerHTML = content;
            
            // Animação de transição
            pageContainer.style.opacity = '0';
            pageContainer.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                pageContainer.style.opacity = '1';
                pageContainer.style.transform = 'translateY(0)';
            }, 150);
            
        } catch (error) {
            console.error('Erro ao carregar página:', error);
            pageContent.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: #666;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem; color: #ff4757;"></i>
                    <h3>Erro ao carregar página</h3>
                    <p>Não foi possível carregar o conteúdo solicitado.</p>
                    <p style="font-size: 0.9rem; color: #999;">Erro: ${error.message}</p>
                </div>
            `;
        }
    }

    // Carregar página inicial automaticamente
    loadPage('home');
    
    // Ativar botão inicial por padrão
    const homeButton = document.querySelector('[data-page="home"]');
    if (homeButton) {
        homeButton.classList.add('active');
    }

    // Adiciona função global para limpar cache (útil para desenvolvimento)
    window.clearPagesCache = function() {
        window.pagesLoader.clearCache();
        console.log('Cache limpo! Recarregue a página para ver as mudanças.');
    };
});
