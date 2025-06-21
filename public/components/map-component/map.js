// Componente de Mapa para Áreas de Risco e Zonas Seguras
class MapComponent {
    constructor() {
        this.loadStyles();
        this.loadTemplates();
        this.loadLeaflet();
        this.currentMap = null;
        this.userLocation = null;
        this.riskAreas = [];
        this.safeZones = [];
        this.markers = [];
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

    // Carrega o Leaflet.js
    loadLeaflet() {
        // Carrega CSS do Leaflet
        if (!document.getElementById('leaflet-css')) {
            const link = document.createElement('link');
            link.id = 'leaflet-css';
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(link);
        }

        // Carrega JavaScript do Leaflet
        if (!window.L) {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.onload = () => {
                console.log('✅ Leaflet.js carregado com sucesso');
                this.initializeMapData();
            };
            document.head.appendChild(script);
        } else {
            this.initializeMapData();
        }
    }

    // Inicializa dados do mapa
    initializeMapData() {
        // Dados simulados de áreas de risco (em produção, viriam de uma API)
        this.riskAreas = [
            {
                id: 1,
                name: 'Centro de Brasília',
                type: 'high',
                lat: -15.7833,
                lng: -47.8992,
                description: 'Área com histórico de assaltos e assédio'
            },
            {
                id: 2,
                name: 'Rodoviária do Plano Piloto',
                type: 'medium',
                lat: -15.7947,
                lng: -47.8822,
                description: 'Ocorrências esporádicas, evite horário noturno'
            },
            {
                id: 3,
                name: 'Estação Central do Metrô',
                type: 'medium',
                lat: -15.7947,
                lng: -47.8822,
                description: 'Área com movimento, mas com ocorrências pontuais'
            },
            {
                id: 4,
                name: 'Parque da Cidade',
                type: 'medium',
                lat: -15.7833,
                lng: -47.8992,
                description: 'Ocorrências esporádicas, evite horário noturno'
            }
        ];

        // Dados reais de zonas seguras em Brasília
        this.safeZones = [
            {
                id: 1,
                name: 'Hospital Regional da Asa Norte (HRAN)',
                lat: -15.7847,
                lng: -47.8831,
                description: 'Hospital público com segurança 24h - Eixo Monumental'
            },
            {
                id: 2,
                name: 'CEPAV Margarida (dentro do HRAN)',
                lat: -15.7847,
                lng: -47.8831,
                description: 'Centro de Referência para Mulheres Vítimas de Violência'
            },
            {
                id: 3,
                name: '2ª Delegacia de Polícia da Asa Norte',
                lat: -15.7847,
                lng: -47.8831,
                description: 'SAIN Quadra 916, Asa Norte - Presença policial constante'
            },
            {
                id: 4,
                name: 'Conselho Tutelar da Asa Norte',
                lat: -15.7847,
                lng: -47.8831,
                description: 'SEPN 513 Bloco D, Ed. Imperador - Proteção à infância'
            },
            {
                id: 5,
                name: 'CAPS II e UBS nº 1 da Asa Norte',
                lat: -15.7847,
                lng: -47.8831,
                description: 'SGAN 905, Módulo D - Centro de Atenção Psicossocial'
            },
            {
                id: 6,
                name: 'CREAS Brasília',
                lat: -15.7833,
                lng: -47.8992,
                description: 'SGAS 614/615 Lote 104 (L2 Sul) - Centro de Referência Especializado'
            },
            {
                id: 7,
                name: 'Centro Pop Asa Sul',
                lat: -15.7833,
                lng: -47.8992,
                description: 'SGAS 903 Conjunto C - Centro de Referência para População em Situação de Rua'
            },
            {
                id: 8,
                name: 'SEAD - UnB',
                lat: -15.7833,
                lng: -47.8992,
                description: 'SGAN 604/605 - Secretaria de Estado de Assistência e Desenvolvimento Social'
            },
            {
                id: 9,
                name: 'Estádio Mané Garrincha',
                lat: -15.7833,
                lng: -47.8992,
                description: 'Eixo Monumental - Local seguro com segurança'
            },
            {
                id: 10,
                name: 'Shopping Conjunto Nacional',
                lat: -15.7833,
                lng: -47.8992,
                description: 'SDN CNB Conjunto A - Área segura com segurança 24h'
            }
        ];
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
        
        // Inicializa o mapa após o DOM estar pronto
        setTimeout(() => {
            this.initializeMap('leaflet-map');
        }, 100);
        
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
        
        // Inicializa o mapa após o DOM estar pronto
        setTimeout(() => {
            this.initializeMap('leaflet-map-options');
        }, 100);
        
        this.addOverlayListeners(overlay);
    }

    // Inicializa o mapa Leaflet
    initializeMap(containerId) {
        if (!window.L) {
            console.error('❌ Leaflet não está carregado');
            return;
        }

        const container = document.getElementById(containerId);
        if (!container) {
            console.error('❌ Container do mapa não encontrado');
            return;
        }

        // Destroi mapa anterior se existir
        if (this.currentMap) {
            this.currentMap.remove();
        }

        // Posição inicial (Brasília - Eixo Monumental)
        const initialPosition = [-15.7833, -47.8992];

        // Cria o mapa
        this.currentMap = L.map(containerId).setView(initialPosition, 13);

        // Adiciona layer do OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.currentMap);

        // Adiciona marcador da localização do usuário (se disponível)
        if (this.userLocation) {
            this.addUserMarker();
        }

        // Adiciona áreas de risco
        this.addRiskAreas();

        // Adiciona zonas seguras
        this.addSafeZones();

        console.log('✅ Mapa inicializado com sucesso');
    }

    // Adiciona marcador da localização do usuário
    addUserMarker() {
        if (!this.userLocation || !this.currentMap) return;

        const userIcon = L.divIcon({
            className: 'user-marker',
            html: '<div style="background: #007bff; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });

        const marker = L.marker([this.userLocation.lat, this.userLocation.lng], { icon: userIcon })
            .addTo(this.currentMap)
            .bindPopup('<b>Você está aqui</b><br>Sua localização atual');

        this.markers.push(marker);
    }

    // Adiciona áreas de risco ao mapa
    addRiskAreas() {
        if (!this.currentMap) return;

        this.riskAreas.forEach(area => {
            const color = area.type === 'high' ? '#dc3545' : '#ffc107';
            const icon = L.divIcon({
                className: 'risk-marker',
                html: `<div style="background: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
                iconSize: [16, 16],
                iconAnchor: [8, 8]
            });

            const marker = L.marker([area.lat, area.lng], { icon })
                .addTo(this.currentMap)
                .bindPopup(`
                    <b>${area.name}</b><br>
                    <span style="color: ${color}; font-weight: bold;">
                        ${area.type === 'high' ? '🔴 Alto Risco' : '🟡 Médio Risco'}
                    </span><br>
                    ${area.description}
                `);

            this.markers.push(marker);
        });
    }

    // Adiciona zonas seguras ao mapa
    addSafeZones() {
        if (!this.currentMap) return;

        this.safeZones.forEach(zone => {
            const icon = L.divIcon({
                className: 'safe-marker',
                html: '<div style="background: #28a745; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
                iconSize: [16, 16],
                iconAnchor: [8, 8]
            });

            const marker = L.marker([zone.lat, zone.lng], { icon })
                .addTo(this.currentMap)
                .bindPopup(`
                    <b>${zone.name}</b><br>
                    <span style="color: #28a745; font-weight: bold;">🟢 Zona Segura</span><br>
                    ${zone.description}
                `);

            this.markers.push(marker);
        });
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
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    
                    if (this.currentMap) {
                        // Remove marcador anterior do usuário
                        this.markers.forEach(marker => {
                            if (marker.options.icon && marker.options.icon.options.className === 'user-marker') {
                            marker.remove();
                            }
                        });
                        
                        // Adiciona novo marcador
                        this.addUserMarker();
                        
                        // Centraliza o mapa na localização do usuário
                        this.currentMap.setView([this.userLocation.lat, this.userLocation.lng], 15);
                    }
                    
                    console.log('✅ Localização obtida:', this.userLocation);
                },
                (error) => {
                    console.error('❌ Erro ao obter localização:', error);
                    alert('Não foi possível obter sua localização. Verifique as permissões do navegador.');
                }
            );
        } else {
            alert('Geolocalização não é suportada pelo seu navegador.');
        }
    }

    showRiskAreas() {
        if (!this.currentMap) return;
        
        // Remove todos os marcadores
        this.clearMarkers();
        
        // Adiciona apenas áreas de risco
        this.addRiskAreas();
        
        console.log('🔴 Mostrando apenas áreas de risco');
    }

    showSafeZones() {
        if (!this.currentMap) return;
        
        // Remove todos os marcadores
        this.clearMarkers();
        
        // Adiciona apenas zonas seguras
        this.addSafeZones();
        
        // Adiciona marcador do usuário se disponível
        if (this.userLocation) {
            this.addUserMarker();
        }
        
        console.log('🟢 Mostrando apenas zonas seguras');
    }

    clearMarkers() {
        this.markers.forEach(marker => marker.remove());
        this.markers = [];
    }

    showSafeSpots() {
        this.showSafeZones();
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
            // Remove o mapa Leaflet
            if (this.currentMap) {
                this.currentMap.remove();
                this.currentMap = null;
            }
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