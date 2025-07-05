# 🧾 Acesso Rápido aos PDVs (1 a 41) — Mix Mateus Sobral

Interface web e aplicativo desktop (Electron) para acessar rapidamente os PDVs da rede local.

---

## 🚀 Funcionalidades

- Interface web responsiva com botões para cada PDV (1 a 41)
- Destaque visual para o PDV 41 (IP fixo)
- Status online/offline dos PDVs (🟢/🔴) com atualização automática
- Painel com quantidade de PDVs online
- Senha local simples para liberar acesso aos botões
- Histórico de acessos salvo no navegador (localStorage)
- Barra de navegação azul fixa no topo
- Pode ser usado como página web ou aplicativo desktop (Electron)

---

## 📋 PDVs processados

- **PDVs 1 a 41**
- **PDV 41** usa IP personalizado: `192.168.222.179`
- Todos os outros: `192.168.222.101` até `192.168.222.140`

---

## 🖥️ Como usar

### Como página web

1. Abra o arquivo `web/index.html` no navegador.
2. Digite a senha (padrão: `1234`) para liberar os botões.
3. Clique no PDV desejado para abrir a tela do caixa.

### Como aplicativo desktop (Electron)

1. Instale o [Node.js](https://nodejs.org/)
2. No terminal, navegue até a pasta `src`:
   ```bash
   cd c:\Code\src
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Gere o instalador `.exe`:
   ```bash
   npm install --save-dev electron-builder
   npm run dist
   ```
   O executável estará na pasta `dist/`.  
   **Sempre utilize o `.exe` da pasta `dist/` para rodar ou distribuir o app.**
   **Não execute o `pdv-app.exe` da pasta `src`, pois ele não é um executável standalone.**

---

## ⚠️ Observações

- Não envie `node_modules/` nem `dist/` para o git (já estão no `.gitignore`).
- O status online/offline depende da resposta HTTP dos PDVs e pode variar conforme firewall/rede.
- A senha padrão é `1234` (pode ser alterada em `script.js`).
- Evite versionar arquivos grandes ou binários no repositório.

---

## 📁 Estrutura do Projeto

```
src/
  web/
    index.html
    style.css
    script.js
  electron-main.js
  package.json
  README.md
```

---

## 🛡️ Aviso de Responsabilidade

Este sistema acessa diretamente os sistemas dos PDVs.  
Use com responsabilidade e apenas com autorização da equipe de TI.

---

