# 🚀 Guia de Live Reload - Meu App MVC

## ✅ Como funciona atualmente:

1. **Nodemon**: Reinicia automaticamente o servidor quando você salva arquivos `.js`
2. **Live Reload**: Configurado para injetar scripts de live reload nas páginas

## 🔄 Para ter live reload completo no navegador:

### Opção 1: Extensão do Navegador (Recomendado)

1. **Chrome/Edge**: Instale a extensão "LiveReload"
2. **Firefox**: Instale a extensão "LiveReload"
3. **Ative a extensão** clicando no ícone
4. **Acesse** http://localhost:3000
5. **Modifique arquivos** e veja as mudanças automaticamente!

### Opção 2: Script manual no HTML

Adicione este script no seu `views/index.html`:

```html
<script>
    // Live reload simples
    setInterval(() => {
        fetch(window.location.href)
            .then(response => response.text())
            .then(html => {
                if (html !== document.documentElement.outerHTML) {
                    window.location.reload();
                }
            });
    }, 1000);
</script>
```

### Opção 3: Usar Browser-Sync (Alternativa)

```bash
# Instalar browser-sync globalmente
npm install -g browser-sync

# Executar em paralelo com o servidor
browser-sync start --proxy "localhost:3000" --files "public/*, views/*"
```

## 🎯 Como testar:

1. **Abra** http://localhost:3000
2. **Modifique** qualquer arquivo em `public/css/style.css`
3. **Salve** o arquivo
4. **Veja** a mudança automaticamente no navegador

## 📝 Arquivos monitorados:

- `public/css/*` - Arquivos CSS
- `public/js/*` - Arquivos JavaScript  
- `views/*` - Templates HTML
- `controllers/*` - Controllers (reinicia servidor)

## 🔧 Configuração atual:

- **Servidor**: http://localhost:3000
- **Nodemon**: Monitora mudanças em arquivos `.js`
- **Live Reload**: Configurado para injetar scripts

## 💡 Dicas:

- Use a extensão do navegador para melhor experiência
- O nodemon já reinicia o servidor automaticamente
- Para mudanças em CSS/JS, use live reload
- Para mudanças em controllers, o servidor reinicia automaticamente

## 🚨 Solução de problemas:

Se o live reload não funcionar:
1. Verifique se a extensão está ativa
2. Recarregue a página manualmente
3. Verifique se não há erros no console do navegador
4. O servidor sempre reinicia automaticamente com nodemon 