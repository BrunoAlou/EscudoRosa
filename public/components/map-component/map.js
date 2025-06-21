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
        this.currentRoute = null;
        this.routeControl = null;
        this.destination = null;
        this.homeMap = null;
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
                this.loadRoutingPlugin();
            };
            document.head.appendChild(script);
        } else {
            this.loadRoutingPlugin();
        }
    }

    // Carrega o plugin de roteamento
    loadRoutingPlugin() {
        // Carrega CSS do Leaflet Routing Machine
        if (!document.getElementById('leaflet-routing-css')) {
            const link = document.createElement('link');
            link.id = 'leaflet-routing-css';
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css';
            document.head.appendChild(link);
        }

        // Carrega JavaScript do Leaflet Routing Machine
        if (!window.L.Routing) {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js';
            script.onload = () => {
                console.log('✅ Leaflet Routing Machine carregado com sucesso');
                this.initializeMapData();
                this.initializeHomeMap();
            };
            document.head.appendChild(script);
        } else {
            this.initializeMapData();
            this.initializeHomeMap();
        }
    }

    // Inicializa dados do mapa
    initializeMapData() {
        // Dados de áreas de risco próximas ao Estádio Mané Garrincha
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
            },
            {
                id: 5,
                name: 'Setor Comercial Sul (SCS)',
                type: 'high',
                lat: -15.7900,
                lng: -47.8900,
                description: 'Área comercial com ocorrências de assaltos'
            },
            {
                id: 6,
                name: 'Setor Comercial Norte (SCN)',
                type: 'medium',
                lat: -15.7850,
                lng: -47.8850,
                description: 'Área comercial com movimento intenso'
            },
            {
                id: 7,
                name: 'Setor de Diversões Sul (SDS)',
                type: 'high',
                lat: -15.7950,
                lng: -47.8950,
                description: 'Área de bares e restaurantes, evite horário noturno'
            },
            {
                id: 8,
                name: 'Setor de Diversões Norte (SDN)',
                type: 'medium',
                lat: -15.7800,
                lng: -47.8800,
                description: 'Área de entretenimento com ocorrências pontuais'
            }
        ];

        // Dados de zonas seguras próximas ao Estádio Mané Garrincha
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
            },
            {
                id: 11,
                name: 'Shopping Pátio Brasil',
                lat: -15.7900,
                lng: -47.8900,
                description: 'SCS Qd. 7 - Shopping com segurança 24h'
            },
            {
                id: 12,
                name: 'Shopping Brasília',
                lat: -15.7850,
                lng: -47.8850,
                description: 'SCN Qd. 5 - Shopping com segurança'
            },
            {
                id: 13,
                name: 'Hospital de Base do DF',
                lat: -15.7950,
                lng: -47.8950,
                description: 'SMHS Qd. 101 - Hospital público com segurança'
            },
            {
                id: 14,
                name: 'Hospital Universitário de Brasília (HUB)',
                lat: -15.7800,
                lng: -47.8800,
                description: 'UnB - Hospital universitário com segurança'
            },
            {
                id: 15,
                name: 'Delegacia Especializada de Atendimento à Mulher (DEAM)',
                lat: -15.7850,
                lng: -47.8900,
                description: 'Especializada em violência contra mulheres'
            },
            {
                id: 16,
                name: 'Centro de Referência Especializado de Assistência Social (CREAS)',
                lat: -15.7900,
                lng: -47.8850,
                description: 'Centro de assistência social especializada'
            },
            {
                id: 17,
                name: 'Centro de Referência da Assistência Social (CRAS)',
                lat: -15.7800,
                lng: -47.8850,
                description: 'Centro de assistência social'
            },
            {
                id: 18,
                name: 'Unidade Básica de Saúde (UBS)',
                lat: -15.7850,
                lng: -47.8950,
                description: 'UBS da Asa Norte - Atendimento de saúde'
            },
            {
                id: 19,
                name: 'Centro de Atenção Psicossocial (CAPS)',
                lat: -15.7900,
                lng: -47.8800,
                description: 'CAPS da Asa Norte - Saúde mental'
            },
            {
                id: 20,
                name: 'Conselho Tutelar da Asa Sul',
                lat: -15.7950,
                lng: -47.8900,
                description: 'Proteção à infância e adolescência'
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

    // Mostra mapa com filtro específico aplicado
    showRiskMapWithFilter(filterType) {
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
            
            // Atualiza título e subtítulo baseado no filtro
            this.updateMapTitle(filterType);
            
            // Aplica o filtro específico
            if (filterType === 'risk') {
                this.showRiskAreas();
                console.log('🔴 Mapa aberto com filtro: Áreas de Risco');
            } else if (filterType === 'safe') {
                this.showSafeZones();
                console.log('🟢 Mapa aberto com filtro: Zonas Seguras');
            }
        }, 100);
        
        this.addOverlayListeners(overlay);
    }

    // Atualiza título e subtítulo do mapa baseado no filtro
    updateMapTitle(filterType) {
        const mapTitle = document.querySelector('.map-title');
        const mapSubtitle = document.querySelector('.map-subtitle');
        
        if (filterType === 'risk') {
            if (mapTitle) mapTitle.textContent = '🔴 Mapa de Áreas de Risco';
            if (mapSubtitle) mapSubtitle.textContent = 'Visualize áreas perigosas e pontos de atenção';
        } else if (filterType === 'safe') {
            if (mapTitle) mapTitle.textContent = '🟢 Mapa de Pontos Seguros';
            if (mapSubtitle) mapSubtitle.textContent = 'Encontre locais seguros e pontos de apoio próximos';
        }
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
                    ${zone.description}<br>
                    <button onclick="mapComponent.calculateRouteToLocation(${zone.lat}, ${zone.lng}, '${zone.name}')" 
                            style="background: #007bff; color: white; border: none; padding: 5px 10px; border-radius: 5px; margin-top: 5px; cursor: pointer;">
                        🗺️ Calcular Rota
                    </button>
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
        // Não limpa rotas aqui para permitir manter rotas ativas
    }

    // Limpa tudo (marcadores e rotas)
    clearAll() {
        this.clearMarkers();
        this.clearRoute();
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

    // Calcula rota para local seguro mais próximo
    calculateSafeRoute() {
        if (!this.userLocation || !this.currentMap || !window.L.Routing) {
            alert('Localização não disponível ou plugin de roteamento não carregado.');
            return;
        }

        // Encontra o local seguro mais próximo
        const nearestSafeZone = this.findNearestSafeZone();
        if (!nearestSafeZone) {
            alert('Nenhum local seguro encontrado próximo.');
            return;
        }

        this.destination = nearestSafeZone;
        this.showRoute(nearestSafeZone.lat, nearestSafeZone.lng);
    }

    // Encontra o local seguro mais próximo
    findNearestSafeZone() {
        if (!this.userLocation || this.safeZones.length === 0) {
            return null;
        }

        let nearest = null;
        let minDistance = Infinity;

        this.safeZones.forEach(zone => {
            const distance = this.calculateDistance(
                this.userLocation.lat,
                this.userLocation.lng,
                zone.lat,
                zone.lng
            );

            if (distance < minDistance) {
                minDistance = distance;
                nearest = zone;
            }
        });

        return nearest;
    }

    // Calcula distância entre dois pontos (fórmula de Haversine)
    calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // Raio da Terra em km
        const dLat = this.deg2rad(lat2 - lat1);
        const dLng = this.deg2rad(lng2 - lng1);
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c; // Distância em km
        return distance;
    }

    // Converte graus para radianos
    deg2rad(deg) {
        return deg * (Math.PI/180);
    }

    // Exibe rota no mapa
    showRoute(destLat, destLng) {
        if (!this.currentMap || !window.L.Routing) {
            console.error('❌ Mapa ou plugin de roteamento não disponível');
            return;
        }

        // Remove rota anterior se existir
        this.clearRoute();

        try {
            // Cria o controle de roteamento
            this.routeControl = L.Routing.control({
                waypoints: [
                    L.latLng(this.userLocation.lat, this.userLocation.lng),
                    L.latLng(destLat, destLng)
                ],
                routeWhileDragging: true,
                showAlternatives: false,
                fitSelectedRoutes: true,
                lineOptions: {
                    styles: [
                        {
                            color: '#007bff',
                            opacity: 0.8,
                            weight: 6
                        }
                    ]
                },
                createMarker: function() { return null; }, // Não cria marcadores automáticos
                language: 'pt-BR'
            }).addTo(this.currentMap);

            // Adiciona marcador de destino
            this.addDestinationMarker(destLat, destLng);

            console.log('✅ Rota calculada com sucesso');
        } catch (error) {
            console.error('❌ Erro ao calcular rota:', error);
            alert('Erro ao calcular rota. Tente novamente.');
        }
    }

    // Adiciona marcador de destino
    addDestinationMarker(lat, lng) {
        if (!this.currentMap || !this.destination) return;

        const destIcon = L.divIcon({
            className: 'destination-marker',
            html: '<div style="background: #28a745; width: 18px; height: 18px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 12px; color: white; font-weight: bold;">✓</div>',
            iconSize: [18, 18],
            iconAnchor: [9, 9]
        });

        const marker = L.marker([lat, lng], { icon: destIcon })
            .addTo(this.currentMap)
            .bindPopup(`
                <b>${this.destination.name}</b><br>
                <span style="color: #28a745; font-weight: bold;">🟢 Destino Seguro</span><br>
                ${this.destination.description}<br>
                <small>Clique para remover rota</small>
            `);

        // Adiciona evento para remover rota
        marker.on('click', () => {
            this.clearRoute();
        });

        this.markers.push(marker);
    }

    // Remove rota atual
    clearRoute() {
        if (this.routeControl) {
            this.currentMap.removeControl(this.routeControl);
            this.routeControl = null;
        }
        this.currentRoute = null;
        this.destination = null;
    }

    // Calcula rota para local específico
    calculateRouteToLocation(lat, lng, name) {
        if (!this.userLocation) {
            alert('Primeiro obtenha sua localização atual.');
            return;
        }

        this.destination = { lat, lng, name };
        this.showRoute(lat, lng);
    }

    // Inicializa o mapa da página inicial (sem filtros)
    initializeHomeMap() {
        if (!window.L) {
            console.error('❌ Leaflet não está carregado');
            return;
        }

        const container = document.getElementById('home-map');
        if (!container) {
            console.error('❌ Container do mapa inicial não encontrado');
            return;
        }

        // Posição inicial (Brasília - Eixo Monumental)
        const initialPosition = [-15.7833, -47.8992];

        // Cria o mapa
        this.homeMap = L.map('home-map').setView(initialPosition, 12);

        // Adiciona layer do OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.homeMap);

        // Adiciona algumas áreas de risco principais
        this.addHomeRiskAreas();

        // Adiciona algumas zonas seguras principais
        this.addHomeSafeZones();

        console.log('✅ Mapa da página inicial inicializado com sucesso');
    }

    // Adiciona áreas de risco principais no mapa da página inicial
    addHomeRiskAreas() {
        if (!this.homeMap) return;

        // Adiciona apenas algumas áreas de risco principais para não sobrecarregar
        const mainRiskAreas = this.riskAreas.slice(0, 3); // Primeiras 3 áreas

        mainRiskAreas.forEach(area => {
            const color = area.type === 'high' ? '#dc3545' : '#ffc107';
            const icon = L.divIcon({
                className: 'risk-marker',
                html: `<div style="background: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
                iconSize: [12, 12],
                iconAnchor: [6, 6]
            });

            const marker = L.marker([area.lat, area.lng], { icon })
                .addTo(this.homeMap)
                .bindPopup(`
                    <b>${area.name}</b><br>
                    <span style="color: ${color}; font-weight: bold;">
                        ${area.type === 'high' ? '🔴 Alto Risco' : '🟡 Médio Risco'}
                    </span><br>
                    ${area.description}
                `);
        });
    }

    // Adiciona zonas seguras principais no mapa da página inicial
    addHomeSafeZones() {
        if (!this.homeMap) return;

        // Adiciona apenas algumas zonas seguras principais para não sobrecarregar
        const mainSafeZones = this.safeZones.slice(0, 4); // Primeiras 4 zonas

        mainSafeZones.forEach(zone => {
            const icon = L.divIcon({
                className: 'safe-marker',
                html: '<div style="background: #28a745; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
                iconSize: [12, 12],
                iconAnchor: [6, 6]
            });

            const marker = L.marker([zone.lat, zone.lng], { icon })
                .addTo(this.homeMap)
                .bindPopup(`
                    <b>${zone.name}</b><br>
                    <span style="color: #28a745; font-weight: bold;">🟢 Zona Segura</span><br>
                    ${zone.description}
                `);
        });
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