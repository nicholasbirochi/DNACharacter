# COMMIT_HISTORY.md

Roteiro em português com commits sugeridos caso você queira montar um repositório Git partindo deste protótipo e ter um histórico coerente até chegar exatamente ao estado atual dos arquivos. Basta seguir a ordem, fazer os comandos indicados e confirmar que os arquivos correspondem às alterações descritas.

> Os hashes foram omitidos de propósito: serão gerados automaticamente pelo Git da sua máquina.

---

## Como usar este roteiro

1. Dentro da pasta `DNACharacterWeb`, inicialize um repositório (`git init`).  
2. Depois de cada etapa abaixo, valide com `git status`, execute o comando `git add ...` indicado e finalize o commit.  
3. Nas etapas que não listam arquivos, use `git add .` para incluir tudo.  
4. Ao final do commit 08 você terá exatamente os mesmos arquivos e conteúdo que já estão neste diretório.

---

### Commit 01 — Estrutura base do app
```
git add index.html style.css script.js
git commit -m "feat: estrutura estática do criador paramétrico"
```
- Marca a criação inicial com layout HTML, estilos principais e lógica básica dos sliders.
- Corpo ainda sem animações elaboradas ou exportação.

### Commit 02 — Refinamento visual e tipografia
```
git add style.css
git commit -m "style: tema escuro responsivo e identidade visual"
```
- Adiciona gradientes, sombras e responsividade.
- Ajusta fontes, espaçamentos e paleta dos traços.

### Commit 03 — Motor paramétrico completo
```
git add script.js
git commit -m "feat: mapa corporal para todos os traços"
```
- Implementa `applyTraitsToBody`, normalização e funções auxiliares.
- Ativa animações suaves no avatar e garante que o resumo textual seja atualizado em tempo real.

### Commit 04 — Ações de usuário (reset, random, export)
```
git add script.js index.html
git commit -m "feat: botões de reset, randomizar e salvar avatar"
```
- Inclui botões na UI, integra `html2canvas`/`jsPDF` via CDN.
- Cria handlers `savePNG`, `savePDF` e `randomizeTraits`.

### Commit 05 — Questionário paramétrico
```
git add script.js index.html style.css
git commit -m "feat: questionário configurável para estimar traços"
```
- Adiciona painel com seletor de quantidade de perguntas.
- Implementa lógica do quiz, normaliza resultados e sincroniza sliders.

### Commit 06 — Copy e seção de contato
```
git add index.html
git commit -m "content: copywriting e rodapé de portfólio"
```
- Revê textos explicativos do header, dicas do avatar e rodapé de contato.
- Garante linguagem consistente com o portfólio de Nicholas Birochi.

### Commit 07 — Documentação reestruturada
```
git add README.md
git commit -m "docs: reorganiza readme com sumário e roadmap"
```
- Atualiza README com sumário, visão geral, mapa corporal, personalização e roadmap.
- Deixa claro que se trata de protótipo lúdico (não clínico).

### Commit 08 — Registro desta linha do tempo
```
git add COMMIT_HISTORY.md
git commit -m "docs: adiciona roteiro de commits sugeridos"
```
- Acrescenta este arquivo descrevendo o passo a passo para reproduzir o histórico.
- Estado final dos arquivos coincide com o diretório entregue ao portfólio.

---

Pronto! Com esses oito commits você terá um histórico limpo, progressivo e que facilita explicar cada incremento do projeto em revisões ou entrevistas.
