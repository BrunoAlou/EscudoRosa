# 🗺️ Mapa de Segurança com Leaflet.js - Brasília

## 📋 Visão Geral

O componente de mapa foi atualizado para usar **Leaflet.js** com **OpenStreetMap**, oferecendo uma experiência mais interativa e personalizada para visualizar áreas de risco e zonas seguras em **Brasília**.

## 🏛️ **Localização: Brasília - DF**

### 📍 **Posição Inicial**
- **Centro**: Eixo Monumental (-15.7833, -47.8992)
- **Referência**: Estádio Mané Garrincha
- **Zoom**: 13 (vista geral da cidade)

### 🏥 **Locais Seguros Implementados**

#### **Hospital Regional da Asa Norte (HRAN)**
- **Coordenadas**: -15.7847, -47.8831
- **Descrição**: Hospital público com segurança 24h
- **Especialidade**: CEPAV Margarida (Centro de Referência para Mulheres Vítimas de Violência)

#### **Centros de Proteção**
- **2ª Delegacia de Polícia da Asa Norte** (SAIN Quadra 916)
- **Conselho Tutelar da Asa Norte** (SEPN 513 Bloco D)
- **CAPS II e UBS nº 1 da Asa Norte** (SGAN 905, Módulo D)
- **CREAS Brasília** (SGAS 614/615 Lote 104)
- **Centro Pop Asa Sul** (SGAS 903 Conjunto C)
- **SEAD - UnB** (SGAN 604/605)

#### **Locais de Referência**
- **Estádio Mané Garrincha** (Eixo Monumental)
- **Shopping Conjunto Nacional** (SDN CNB Conjunto A)

## ✨ Funcionalidades

### 🎯 Localização do Usuário
- **Botão "Minha Localização"**: Obtém a localização atual do usuário
- **Marcador Azul**: Indica onde o usuário está no mapa
- **Centralização Automática**: O mapa centraliza na localização do usuário

### 🔴 Áreas de Risco
- **Marcadores Vermelhos**: Áreas de alto risco
- **Marcadores Amarelos**: Áreas de médio risco
- **Popups Informativos**: Detalhes sobre cada área de risco
- **Filtro Exclusivo**: Botão para mostrar apenas áreas de risco

### 🟢 Zonas Seguras
- **Marcadores Verdes**: Locais seguros (hospitais, delegacias, centros de proteção)
- **Popups Informativos**: Descrição de cada zona segura
- **Filtro Exclusivo**: Botão para mostrar apenas zonas seguras

### 🎛️ Controles Interativos
- **Zoom**: Controles de zoom do Leaflet
- **Pan**: Arrastar para navegar no mapa
- **Legenda**: Explicação das cores dos marcadores

## 🛠️ Como Personalizar

### 1. Adicionar Novas Áreas de Risco

No arquivo `public/components/map-component/map.js`, localize o método `initializeMapData()` e adicione novos pontos:

```javascript
this.riskAreas = [
    // ... pontos existentes ...
    {
        id: 5,
        name: 'Nova Área de Risco em Brasília',
        type: 'high', // 'high' ou 'medium'
        lat: -15.7847,
        lng: -47.8831,
        description: 'Descrição da área de risco'
    }
];
```

### 2. Adicionar Novas Zonas Seguras

```javascript
this.safeZones = [
    // ... pontos existentes ...
    {
        id: 11,
        name: 'Novo Local Seguro',
        lat: -15.7847,
        lng: -47.8831,
        description: 'Descrição do local seguro'
    }
];
```

### 3. Obter Coordenadas Precisas

Para locais sem coordenadas específicas, use:

```bash
# Nominatim (OpenStreetMap)
curl "https://nominatim.openstreetmap.org/search?q=ENDEREÇO+Brasilia&format=json"
```

### 4. Personalizar Cores dos Marcadores

No método `addRiskAreas()`:

```javascript
const color = area.type === 'high' ? '#ff0000' : '#ffff00'; // Cores personalizadas
```

## 📱 Responsividade

O mapa é totalmente responsivo:
- **Desktop**: Altura de 400px
- **Mobile**: Altura de 300px
- **Controles**: Empilhados verticalmente em telas pequenas

## 🔧 Integração com APIs

### Para Produção

Em um ambiente de produção, você pode integrar com APIs reais:

```javascript
// Exemplo de integração com API
async loadRiskAreasFromAPI() {
    try {
        const response = await fetch('/api/risk-areas');
        this.riskAreas = await response.json();
        this.addRiskAreas();
    } catch (error) {
        console.error('Erro ao carregar áreas de risco:', error);
    }
}
```

### Dados Dinâmicos

Para carregar dados baseados na localização do usuário:

```javascript
async loadNearbyAreas(lat, lng) {
    const response = await fetch(`/api/nearby-areas?lat=${lat}&lng=${lng}`);
    const data = await response.json();
    this.riskAreas = data.riskAreas;
    this.safeZones = data.safeZones;
}
```

## 🎨 Personalização Visual

### Estilos CSS

Os estilos estão em `public/components/map-component/map.css`:

- **Marcadores**: Cores e tamanhos personalizáveis
- **Popups**: Estilo dos popups informativos
- **Legenda**: Cores e layout da legenda
- **Responsividade**: Breakpoints para diferentes telas

### Ícones Personalizados

Para usar ícones personalizados:

```javascript
const customIcon = L.divIcon({
    className: 'custom-marker',
    html: '<i class="fas fa-exclamation-triangle"></i>',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
});
```

## 🚀 Deploy

O mapa funciona em produção sem configurações adicionais:
- **CDN**: Leaflet carregado via CDN
- **OpenStreetMap**: Gratuito e sem limites
- **Geolocalização**: Funciona em HTTPS

## 📊 Monitoramento

Para monitorar o uso do mapa:

```javascript
// Adicione logs para analytics
showRiskAreas() {
    console.log('Usuário visualizou áreas de risco em Brasília');
    // ... resto do código
}
```

## 🔒 Segurança

- **HTTPS**: Necessário para geolocalização
- **Permissões**: Usuário deve autorizar localização
- **Fallbacks**: Tratamento de erros implementado

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique o console do navegador
2. Confirme se o Leaflet foi carregado
3. Teste a geolocalização
4. Verifique as permissões do navegador

## 📍 Referências

- **Arquivo de Coordenadas**: `COORDENADAS_BRASILIA.md`
- **Documentação Leaflet**: https://leafletjs.com/
- **OpenStreetMap**: https://www.openstreetmap.org/ 