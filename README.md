# DNA de Traços do Corpo – Avatar Paramétrico V23

Protótipo web que transforma cinco traços de caráter (Oral, Esquizoide, Masoquista, Psicopatia e Rígido) em um avatar 2D paramétrico. O objetivo é demonstrar, de maneira lúdica e visual, como diferentes intensidades desses traços podem alterar a morfologia corporal, a postura e a “expressão energética” do personagem.

> Projeto configurado para o portfólio de **Nicholas Birochi** (Data Analytics & Automation). Uso livre para fins de estudo e demonstração, desde que citado como protótipo conceitual.

---

## Sumário

1. [Visão geral](#visão-geral)  
2. [Recursos principais](#recursos-principais)  
3. [Mapa corporal por traço](#mapa-corporal-por-traço)  
4. [Fluxo rápido de uso](#fluxo-rápido-de-uso)  
5. [Exportações e questionário](#exportações-e-questionário)  
6. [Tecnologias e estrutura](#tecnologias-e-estrutura)  
7. [Como executar localmente](#como-executar-localmente)  
8. [Personalização rápida](#personalização-rápida)  
9. [Roadmap sugerido](#roadmap-sugerido)  
10. [Contato](#contato)

---

## Visão geral

- Os cinco *sliders* representam os traços de caráter.  
- Os valores são normalizados para sempre somar **100%** (DNA).  
- O avatar reage em tempo real: proporções, curvas, ombros, postura e expressão facial mudam à medida que os traços são alterados.  
- Um resumo textual explica como ficou a combinação final.  
- Há botões para **Randomizar**, **Resetar** e exportar em **PNG/PDF**.  
- Um **questionário paramétrico** opcional calcula automaticamente os percentuais.

Trata-se de um protótipo artístico interpretativo; não substitui avaliações clínicas ou psicológicas.

---

## Recursos principais

- **Motor paramétrico em JavaScript** que calcula proporções (altura, largura do tronco, quadril, espessura de membros e formato da cabeça) com base na mistura dos traços.  
- **UI responsiva** em CSS puro com tema escuro, animações sutis e foco em leitura confortável.  
- **Resumo textual dinâmico** destacando as porcentagens de cada traço.  
- **Ferramentas de exportação** via `html2canvas` e `jsPDF` para gerar imagens ou PDFs do avatar configurado.  
- **Questionário configurável** (10, 20 ou 50 perguntas) para estimar automaticamente o DNA de traços.  
- **Painel de contato e sobre** com informações do profissional que apresenta o protótipo.

---

## Mapa corporal por traço

| Traço        | Tendência visual | Significado simbólico |
|--------------|-----------------|-----------------------|
| **Oral**     | Tronco arredondado, barriga evidente, braços macios. | Busca por acolhimento, prazer sensorial e nutrição afetiva. |
| **Esquizoide** | Corpo alto, estreito, ombros recolhidos, cabeça retangular. | Proteção do mundo interno, criatividade abstrata, foco intelectual. |
| **Masoquista** | Tronco blocado/pesado, braços grossos, quadril discreto. | Emoção contida, suporte de cargas, tendência a segurar energia. |
| **Psicopatia** | Silhueta em V, peito aberto, cabeça triangular. | Postura de comando, sedução, controle do cenário. |
| **Rígido**     | Corpo alinhado, definição equilibrada, pernas estáveis. | Desejo de performance, estética, medo de rejeição/fracasso. |

Os efeitos podem se combinar (ex.: Oral + Rígido → tronco arredondado com postura alinhada).

---

## Fluxo rápido de uso

1. Ajuste os *sliders* laterais até obter a distribuição desejada.  
2. Observe o avatar reagir instantaneamente (há animação “breathing” suave).  
3. Leia o texto de **Perfil geral** para validar o mix percentual.  
4. Opcionalmente, rode o **questionário** para gerar os percentuais automaticamente.  
5. Exporte o avatar em PNG ou PDF se quiser arquivar ou compartilhar o resultado.

---

## Exportações e questionário

- **PNG**: usa `html2canvas` para rasterizar o contêiner do avatar em 1080×1080px.  
- **PDF**: usa `jsPDF` para gerar um documento em A4 contendo avatar + resumo textual.  
- **Questionário**:
  - O usuário escolhe entre 10/20/50 perguntas.  
  - Cada pergunta tem peso relativo aos cinco traços.  
  - Ao término, os valores são normalizados para 100% e aplicados ao avatar.  
  - Resultados são exibidos em texto e replicados nos *sliders*.

---

## Tecnologias e estrutura

- **HTML5** (`index.html`): layout principal (avatar, sliders, questionário, contato).  
- **CSS3** (`style.css`): tema, responsividade, grid principal, efeitos visuais do avatar.  
- **JavaScript** (`script.js`): normalização dos traços, deformação corporal, exportação, questionário.  
- **README.md**: documentação principal (este arquivo).  
- **COMMIT_HISTORY.md**: narrativa simulada de commits sugeridos para quem quiser iniciar um repositório Git a partir deste protótipo.

Não há frameworks, bundlers ou dependências externas além das libs CDN para exportação.

---

## Como executar localmente

1. Faça download ou clone os arquivos deste diretório.  
2. Certifique-se de manter `index.html`, `style.css`, `script.js`, `README.md` e `COMMIT_HISTORY.md` na mesma pasta.  
3. Dê duplo clique em `index.html` (ou arraste para o navegador).  
4. Use os sliders para modificar os traços e acompanhar as mudanças do avatar.  
5. Se quiser exportar, permita pop-ups para que navegador baixe o PNG/PDF.

> É totalmente estático: não exige Node, npm, servidor local ou back-end.

---

## Personalização rápida

- **Cores dos traços**: altere as CSS custom properties no `:root`.  
- **Resposta corporal**: ajuste as fórmulas em `applyTraitsToBody()` no `script.js`.  
- **Perguntas do questionário**: edite a lista `QUESTION_BANK` (próximo ao final do `script.js`).  
- **Branding/Portfólio**: atualize textos e contatos no `<footer>` do `index.html`.  
- **Exportações**: mude resoluções ou layout direto nas funções `savePNG()` e `savePDF()`.

---

## Roadmap sugerido

- Adicionar “presets” salvos (JSON) para compartilhar combinações específicas.  
- Incluir barra temporal para animar uma evolução de traços.  
- Expor API simples (por ex., via URL com query params) para carregar percentuais automaticamente.  
- Criar conjunto adicional de perguntas com linguagem alternativa (versão corporativa).  
- Disponibilizar modo “comparar” para colocar dois avatares lado a lado.

---

## Contato

- **Nome:** Nicholas Birochi  
- **Localização:** São Bernardo do Campo, SP · Brasil  
- **LinkedIn:** [linkedin.com/in/nicholas-birochi](https://www.linkedin.com/in/nicholas-birochi)  
- **GitHub:** [github.com/nicholasbirochi](https://github.com/nicholasbirochi)  
- **Rocketseat:** [app.rocketseat.com.br/me/nicholas-birochi-1501](https://app.rocketseat.com.br/me/nicholas-birochi-1501)  
- **E‑mail:** [nicholas.birochi@gmail.com](mailto:nicholas.birochi@gmail.com)

> Este projeto nasceu como vitrine para o portfólio pessoal. Caso reutilize, cite o protótipo original e mantenha o caráter experimental/lúdico da aplicação.
