# 📍 Coordenadas de Locais Seguros - Brasília

## 🏥 **Hospital Regional da Asa Norte (HRAN)**
- **Nome**: Hospital Regional da Asa Norte
- **Latitude**: -15.7847
- **Longitude**: -47.8831
- **Endereço**: Eixo Monumental, Brasília - DF
- **Descrição**: Hospital público com segurança 24h
- **Referência**: Próximo ao estádio Mané Garrincha

## 🛡️ **Centros de Referência e Proteção**

### CEPAV Margarida
- **Localização**: Dentro do HRAN
- **Latitude**: -15.7847
- **Longitude**: -47.8831
- **Descrição**: Centro de Referência para Mulheres Vítimas de Violência

### 2ª Delegacia de Polícia da Asa Norte
- **Endereço**: SAIN Quadra 916, Asa Norte
- **Latitude**: -15.7847 (aproximada)
- **Longitude**: -47.8831 (aproximada)
- **Descrição**: Presença policial constante

### Conselho Tutelar da Asa Norte
- **Endereço**: SEPN 513 Bloco D, Ed. Imperador
- **Latitude**: -15.7847 (aproximada)
- **Longitude**: -47.8831 (aproximada)
- **Descrição**: Proteção à infância

### CAPS II e UBS nº 1 da Asa Norte
- **Endereço**: SGAN 905, Módulo D
- **Latitude**: -15.7847 (aproximada)
- **Longitude**: -47.8831 (aproximada)
- **Descrição**: Centro de Atenção Psicossocial

### CREAS Brasília
- **Endereço**: SGAS 614/615 Lote 104 (L2 Sul)
- **Latitude**: -15.7833 (aproximada)
- **Longitude**: -47.8992 (aproximada)
- **Descrição**: Centro de Referência Especializado

### Centro Pop Asa Sul
- **Endereço**: SGAS 903 Conjunto C
- **Latitude**: -15.7833 (aproximada)
- **Longitude**: -47.8992 (aproximada)
- **Descrição**: Centro de Referência para População em Situação de Rua

### SEAD - UnB
- **Endereço**: SGAN 604/605
- **Latitude**: -15.7833 (aproximada)
- **Longitude**: -47.8992 (aproximada)
- **Descrição**: Secretaria de Estado de Assistência e Desenvolvimento Social

## 🏟️ **Locais de Referência**

### Estádio Mané Garrincha
- **Endereço**: Eixo Monumental, Brasília - DF
- **Latitude**: -15.7833
- **Longitude**: -47.8992
- **Descrição**: Local seguro com segurança

### Shopping Conjunto Nacional
- **Endereço**: SDN CNB Conjunto A
- **Latitude**: -15.7833 (aproximada)
- **Longitude**: -47.8992 (aproximada)
- **Descrição**: Área segura com segurança 24h

## 🎯 **Pontos de Referência Centrais**

### Eixo Monumental (Centro)
- **Latitude**: -15.7833
- **Longitude**: -47.8992
- **Descrição**: Ponto central de Brasília

### Rodoviária do Plano Piloto
- **Latitude**: -15.7947
- **Longitude**: -47.8822
- **Descrição**: Terminal de ônibus central

## 📋 **Como Obter Coordenadas Precisas**

Para obter coordenadas mais precisas dos locais sem coordenadas específicas, use:

### 1. **Nominatim (OpenStreetMap)**
```bash
curl "https://nominatim.openstreetmap.org/search?q=SAIN+Quadra+916+Asa+Norte+Brasilia&format=json"
```

### 2. **Google Maps Geocoding API**
```javascript
const address = "SAIN Quadra 916, Asa Norte, Brasília, DF";
const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=YOUR_API_KEY`);
```

### 3. **Sites de Geocodificação**
- [LatLong.net](https://www.latlong.net/)
- [GPS Coordinates](https://www.gps-coordinates.net/)
- [Google Maps](https://maps.google.com/)

## 🔄 **Atualização do Mapa**

Para atualizar as coordenadas no mapa:

1. Edite o arquivo `public/components/map-component/map.js`
2. Localize o método `initializeMapData()`
3. Atualize as coordenadas na seção `this.safeZones`
4. Teste no navegador

## 📱 **Formato das Coordenadas**

### Decimal (usado no código)
```javascript
{
    lat: -15.7847,
    lng: -47.8831
}
```

### Graus, Minutos, Segundos
```
15°47′5″ S, 47°52′59″ W
```

## 🚀 **Próximos Passos**

1. **Obter coordenadas precisas** dos locais sem coordenadas específicas
2. **Adicionar mais pontos seguros** conforme necessário
3. **Implementar geocodificação automática** para endereços
4. **Integrar com APIs de dados reais** de segurança 