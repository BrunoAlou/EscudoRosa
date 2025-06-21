// Componente de Mapa para Áreas de Risco
class MapComponent {
    constructor() {
        this.createMapStyles();
    }

    // Cria os estilos CSS para o mapa
    createMapStyles() {
        if (!document.getElementById('map-styles')) {
            const style = document.createElement('style');
            style.id = 'map-styles';
            style.textContent = `
                .map-overlay {
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

                .map-modal {
                    background: white;
                    border-radius: 20px;
                    padding: 2rem;
                    max-width: 900px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    animation: slideIn 0.3s ease;
                }

                .map-header {
                    text-align: center;
                    margin-bottom: 2rem;
                }

                .map-icon {
                    font-size: 3rem;
                    color: #ff4757;
                    margin-bottom: 1rem;
                }

                .map-title {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #333;
                    margin-bottom: 0.5rem;
                }

                .map-subtitle {
                    color: #666;
                    font-size: 0.9rem;
                }

                .map-container {
                    background: #f8f9fa;
                    border-radius: 15px;
                    height: 400px;
                    margin-bottom: 2rem;
                    position: relative;
                    overflow: hidden;
                    border: 2px dashed #adb5bd;
                }

                .map-placeholder {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    color: #6c757d;
                }

                .map-placeholder i {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                    display: block;
                }

                .map-controls {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1rem;
                    flex-wrap: wrap;
                }

                .map-btn {
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 8px;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .map-btn-primary {
                    background: linear-gradient(135deg, #ff4757, #ff3742);
                    color: white;
                }

                .map-btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(255, 71, 87, 0.4);
                }

                .map-btn-secondary {
                    background: #e9ecef;
                    color: #495057;
                }

                .map-btn-secondary:hover {
                    background: #dee2e6;
                }

                .map-close {
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

                .map-close:hover {
                    background: #f8f9fa;
                }

                .map-modal {
                    position: relative;
                }

                .risk-cards {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .risk-card {
                    background: white;
                    padding: 1rem;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    border-left: 4px solid #ff4757;
                    transition: transform 0.3s ease;
                }

                .risk-card:hover {
                    transform: translateY(-2px);
                }

                .risk-card-title {
                    font-weight: bold;
                    color: #333;
                    margin-bottom: 0.5rem;
                }

                .risk-card-desc {
                    font-size: 0.9rem;
                    color: #666;
                }

                .risk-level {
                    display: inline-block;
                    padding: 0.25rem 0.5rem;
                    border-radius: 5px;
                    font-size: 0.8rem;
                    font-weight: bold;
                    margin-top: 0.5rem;
                }

                .risk-high {
                    background: #ff4757;
                    color: white;
                }

                .risk-medium {
                    background: #ffa502;
                    color: white;
                }

                .risk-low {
                    background: #2ed573;
                    color: white;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Mostra mapa de áreas de risco
    showRiskMap() {
        const overlay = document.createElement('div');
        overlay.className = 'map-overlay';
        
        overlay.innerHTML = `
            <div class="map-modal">
                <button class="map-close" onclick="mapComponent.closeMap()">
                    <i class="fas fa-times"></i>
                </button>
                
                <div class="map-header">
                    <div class="map-icon">
                        <i class="fas fa-map-marked-alt"></i>
                    </div>
                    <div class="map-title">🗺️ Mapa de Áreas de Risco</div>
                    <div class="map-subtitle">Visualize áreas com histórico de ocorrências e pontos de segurança</div>
                </div>

                <div class="map-controls">
                    <button class="map-btn map-btn-primary" onclick="mapComponent.getCurrentLocation()">
                        <i class="fas fa-location-arrow"></i> Minha Localização
                    </button>
                    <button class="map-btn map-btn-secondary" onclick="mapComponent.showRiskAreas()">
                        <i class="fas fa-exclamation-triangle"></i> Áreas de Risco
                    </button>
                    <button class="map-btn map-btn-secondary" onclick="mapComponent.showSafeSpots()">
                        <i class="fas fa-shield-alt"></i> Pontos Seguros
                    </button>
                    <button class="map-btn map-btn-secondary" onclick="mapComponent.showEmergencyContacts()">
                        <i class="fas fa-phone"></i> Contatos de Emergência
                    </button>
                </div>

                <div class="map-container">
                    <div class="map-placeholder">
                        <i class="fas fa-map"></i>
                        <p>Mapa interativo será carregado aqui</p>
                        <p style="font-size: 0.9rem;">Clique em "Minha Localização" para começar</p>
                    </div>
                </div>

                <div class="risk-cards">
                    <div class="risk-card">
                        <div class="risk-card-title">Centro da Cidade</div>
                        <div class="risk-card-desc">Área com histórico de assaltos e assédio</div>
                        <span class="risk-level risk-high">Alto Risco</span>
                    </div>
                    <div class="risk-card">
                        <div class="risk-card-title">Parque Municipal</div>
                        <div class="risk-card-desc">Ocorrências esporádicas, evite horário noturno</div>
                        <span class="risk-level risk-medium">Médio Risco</span>
                    </div>
                    <div class="risk-card">
                        <div class="risk-card-title">Shopping Center</div>
                        <div class="risk-card-desc">Área segura com segurança 24h</div>
                        <span class="risk-level risk-low">Baixo Risco</span>
                    </div>
                    <div class="risk-card">
                        <div class="risk-card-title">Estação de Metrô</div>
                        <div class="risk-card-desc">Presença policial constante</div>
                        <span class="risk-level risk-low">Baixo Risco</span>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Fecha ao clicar fora
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeMap();
            }
        });
    }

    // Mostra mapa com cards de opções
    showRiskMapWithCards() {
        const overlay = document.createElement('div');
        overlay.className = 'map-overlay';
        
        overlay.innerHTML = `
            <div class="map-modal">
                <button class="map-close" onclick="mapComponent.closeMap()">
                    <i class="fas fa-times"></i>
                </button>
                
                <div class="map-header">
                    <div class="map-icon">
                        <i class="fas fa-map-marked-alt"></i>
                    </div>
                    <div class="map-title">🗺️ Mapa de Áreas de Risco + Opções</div>
                    <div class="map-subtitle">Visualize riscos e escolha ações de segurança</div>
                </div>

                <div class="map-controls">
                    <button class="map-btn map-btn-primary" onclick="mapComponent.getCurrentLocation()">
                        <i class="fas fa-location-arrow"></i> Minha Localização
                    </button>
                    <button class="map-btn map-btn-secondary" onclick="mapComponent.showRouteOptions()">
                        <i class="fas fa-route"></i> Rotas Seguras
                    </button>
                    <button class="map-btn map-btn-secondary" onclick="mapComponent.showEmergencyOptions()">
                        <i class="fas fa-exclamation-circle"></i> Opções de Emergência
                    </button>
                </div>

                <div class="map-container">
                    <div class="map-placeholder">
                        <i class="fas fa-map"></i>
                        <p>Mapa interativo com opções de segurança</p>
                        <p style="font-size: 0.9rem;">Selecione uma opção para ver mais detalhes</p>
                    </div>
                </div>

                <div class="risk-cards">
                    <div class="risk-card" onclick="mapComponent.showRouteOptions()">
                        <div class="risk-card-title">🚶‍♀️ Caminhada Segura</div>
                        <div class="risk-card-desc">Encontre rotas seguras para seu destino</div>
                        <span class="risk-level risk-low">Seguro</span>
                    </div>
                    <div class="risk-card" onclick="mapComponent.showEmergencyOptions()">
                        <div class="risk-card-title">🚨 Emergência</div>
                        <div class="risk-card-desc">Contatos e locais de emergência próximos</div>
                        <span class="risk-level risk-high">Urgente</span>
                    </div>
                    <div class="risk-card" onclick="mapComponent.showSafeSpots()">
                        <div class="risk-card-title">🛡️ Pontos Seguros</div>
                        <div class="risk-card-desc">Locais seguros para se abrigar</div>
                        <span class="risk-level risk-low">Seguro</span>
                    </div>
                    <div class="risk-card" onclick="mapComponent.showRiskAreas()">
                        <div class="risk-card-title">⚠️ Áreas de Risco</div>
                        <div class="risk-card-desc">Zonas com histórico de ocorrências</div>
                        <span class="risk-level risk-high">Perigoso</span>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Fecha ao clicar fora
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeMap();
            }
        });
    }

    // Métodos para funcionalidades do mapa
    getCurrentLocation() {
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
        mapContainer.innerHTML = `
            <div class="map-placeholder">
                <i class="fas fa-check-circle" style="color: #28a745;"></i>
                <p>Localização obtida com sucesso!</p>
                <p style="font-size: 0.9rem;">Lat: ${position.coords.latitude.toFixed(4)}</p>
                <p style="font-size: 0.9rem;">Lng: ${position.coords.longitude.toFixed(4)}</p>
            </div>
        `;
    }

    showLocationError() {
        const mapContainer = document.querySelector('.map-container');
        mapContainer.innerHTML = `
            <div class="map-placeholder">
                <i class="fas fa-exclamation-triangle" style="color: #ff4757;"></i>
                <p>Não foi possível obter sua localização</p>
                <p style="font-size: 0.9rem;">Verifique as permissões do navegador</p>
            </div>
        `;
    }

    showRiskAreas() {
        const mapContainer = document.querySelector('.map-container');
        mapContainer.innerHTML = `
            <div class="map-placeholder">
                <i class="fas fa-exclamation-triangle" style="color: #ff4757;"></i>
                <p>Áreas de Risco Identificadas</p>
                <p style="font-size: 0.9rem;">3 zonas de alto risco próximas</p>
            </div>
        `;
    }

    showSafeSpots() {
        const mapContainer = document.querySelector('.map-container');
        mapContainer.innerHTML = `
            <div class="map-placeholder">
                <i class="fas fa-shield-alt" style="color: #2ed573;"></i>
                <p>Pontos Seguros Encontrados</p>
                <p style="font-size: 0.9rem;">5 locais seguros próximos</p>
            </div>
        `;
    }

    showEmergencyContacts() {
        const mapContainer = document.querySelector('.map-container');
        mapContainer.innerHTML = `
            <div class="map-placeholder">
                <i class="fas fa-phone" style="color: #007bff;"></i>
                <p>Contatos de Emergência</p>
                <p style="font-size: 0.9rem;">Polícia: 190 | Bombeiros: 193</p>
            </div>
        `;
    }

    showRouteOptions() {
        const mapContainer = document.querySelector('.map-container');
        mapContainer.innerHTML = `
            <div class="map-placeholder">
                <i class="fas fa-route" style="color: #007bff;"></i>
                <p>Rotas Seguras Calculadas</p>
                <p style="font-size: 0.9rem;">3 rotas alternativas encontradas</p>
            </div>
        `;
    }

    showEmergencyOptions() {
        const mapContainer = document.querySelector('.map-container');
        mapContainer.innerHTML = `
            <div class="map-placeholder">
                <i class="fas fa-exclamation-circle" style="color: #ff4757;"></i>
                <p>Opções de Emergência</p>
                <p style="font-size: 0.9rem;">Delegacias e hospitais próximos</p>
            </div>
        `;
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
window.mapComponent = new MapComponent(); 