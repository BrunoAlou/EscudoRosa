// Componente de Mapa para Áreas de Risco
class MapComponent {
    constructor() {
        this.loadStyles();
        this.loadTemplates();
    }

    // Carrega os estilos CSS
    loadStyles() {
        if (!document.getElementById('map-styles')) {
            const link = document.createElement('link');
            link.id = 'map-styles';
            link.rel = 'stylesheet';
            link.href = '/components/map-component/map.css';
            document.head.appendChild(link);
        }
    }

    // Carrega os templates HTML
    loadTemplates() {
        fetch('/components/map-component/map.html')
            .then(response => response.text())
            .then(html => {
                this.templates = this.parseTemplates(html);
            })
            .catch(error => {
                console.error('Erro ao carregar templates do mapa:', error);
            });
    }

    // Parse dos templates HTML
    parseTemplates(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        return {
            risk: doc.querySelector('#risk-map-template').innerHTML,
            riskOptions: doc.querySelector('#risk-map-options-template').innerHTML
        };
    }

    // Mostra mapa de áreas de risco
    showRiskMap() {
        if (!this.templates) {
            this.showFallbackRiskMap();
            return;
        }
        const overlay = document.createElement('div');
        overlay.className = 'map-overlay';
        overlay.innerHTML = this.templates.risk;
        document.body.appendChild(overlay);
        this.addOverlayListeners(overlay);
    }

    // Mostra mapa de áreas de risco + opções
    showRiskMapWithCards() {
        if (!this.templates) {
            this.showFallbackRiskMapWithCards();
            return;
        }
        const overlay = document.createElement('div');
        overlay.className = 'map-overlay';
        overlay.innerHTML = this.templates.riskOptions;
        document.body.appendChild(overlay);
        this.addOverlayListeners(overlay);
    }

    // Adiciona listeners para fechar overlay
    addOverlayListeners(overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeMap();
            }
        });
    }

    // Fallbacks
    showFallbackRiskMap() {
        alert('Não foi possível carregar o mapa de risco.');
    }
    showFallbackRiskMapWithCards() {
        alert('Não foi possível carregar o mapa de risco com opções.');
    }

    // Métodos para funcionalidades do mapa
    getCurrentLocation() {
        const mapContainer = document.querySelector('.map-container');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.showLocationInfo(position);
                },
                (error) => {
                    this.showLocationError();
                }
            );
        } else {
            this.showLocationError();
        }
    }

    showLocationInfo(position) {
        const mapContainer = document.querySelector('.map-container');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div class="map-modal-placeholder">
                    <i class="fas fa-check-circle" style="color: #28a745;"></i>
                    <p>Localização obtida com sucesso!</p>
                    <p style="font-size: 0.9rem;">Lat: ${position.coords.latitude.toFixed(4)}</p>
                    <p style="font-size: 0.9rem;">Lng: ${position.coords.longitude.toFixed(4)}</p>
                </div>
            `;
        }
    }

    showLocationError() {
        const mapContainer = document.querySelector('.map-container');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div class="map-modal-placeholder">
                    <i class="fas fa-exclamation-triangle" style="color: #ff4757;"></i>
                    <p>Não foi possível obter sua localização</p>
                    <p style="font-size: 0.9rem;">Verifique as permissões do navegador</p>
                </div>
            `;
        }
    }

    showRiskAreas() {
        const mapContainer = document.querySelector('.map-container');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div class="map-modal-placeholder">
                    <i class="fas fa-exclamation-triangle" style="color: #ff4757;"></i>
                    <p>Áreas de Risco Identificadas</p>
                    <p style="font-size: 0.9rem;">3 zonas de alto risco próximas</p>
                </div>
            `;
        }
    }

    showSafeSpots() {
        const mapContainer = document.querySelector('.map-container');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div class="map-modal-placeholder">
                    <i class="fas fa-shield-alt" style="color: #2ed573;"></i>
                    <p>Pontos Seguros Encontrados</p>
                    <p style="font-size: 0.9rem;">5 locais seguros próximos</p>
                </div>
            `;
        }
    }

    showEmergencyContacts() {
        const mapContainer = document.querySelector('.map-container');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div class="map-modal-placeholder">
                    <i class="fas fa-phone" style="color: #007bff;"></i>
                    <p>Contatos de Emergência</p>
                    <p style="font-size: 0.9rem;">Polícia: 190 | Bombeiros: 193</p>
                </div>
            `;
        }
    }

    showRouteOptions() {
        const mapContainer = document.querySelector('.map-container');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div class="map-modal-placeholder">
                    <i class="fas fa-route" style="color: #007bff;"></i>
                    <p>Rotas Seguras Calculadas</p>
                    <p style="font-size: 0.9rem;">3 rotas alternativas encontradas</p>
                </div>
            `;
        }
    }

    showEmergencyOptions() {
        const mapContainer = document.querySelector('.map-container');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div class="map-modal-placeholder">
                    <i class="fas fa-exclamation-circle" style="color: #ff4757;"></i>
                    <p>Opções de Emergência</p>
                    <p style="font-size: 0.9rem;">Delegacias e hospitais próximos</p>
                </div>
            `;
        }
    }

    // Fecha o mapa
    closeMap() {
        const overlay = document.querySelector('.map-overlay');
        if (overlay) {
            overlay.remove();
        }
    }
}

// Instância global do componente
console.log('🚀 Inicializando MapComponent...');
try {
    window.mapComponent = new MapComponent();
    console.log('✅ MapComponent inicializado com sucesso');
} catch (error) {
    console.error('❌ Erro ao inicializar MapComponent:', error);
} 