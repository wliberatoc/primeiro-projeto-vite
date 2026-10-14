# PRD — Painel de Despesas

## 1. Visão geral

O Painel de Despesas é uma aplicação web simples para registrar gastos e visualizar o total geral e os valores acumulados por categoria durante a sessão atual.

## 2. Objetivo

Oferecer uma forma rápida e intuitiva de acompanhar despesas pessoais, permitindo ao usuário identificar quanto gastou e como os gastos estão distribuídos.

## 3. Público-alvo

Pessoas que desejam organizar gastos básicos sem precisar criar uma conta ou configurar uma ferramenta financeira complexa.

## 4. Funcionalidades

- Adicionar uma despesa informando título, valor e categoria.
- Exibir todas as despesas cadastradas, com as mais recentes primeiro.
- Excluir uma despesa da lista.
- Calcular automaticamente o valor total das despesas.
- Calcular os totais individuais por categoria.
- Exibir a quantidade de despesas registradas.
- Validar os dados do formulário e informar erros ao usuário.
- Formatar valores no padrão monetário brasileiro.
- Preencher o valor como moeda, interpretando os dígitos informados como centavos.
- Exibir mensagens de confirmação ao adicionar ou remover uma despesa.
- Apresentar um estado vazio quando não houver despesas.

## 5. Categorias disponíveis

- Alimentação
- Transporte
- Lazer
- Saúde
- Outros

## 6. Dados de uma despesa

Cada despesa possui:

- `id`: identificador único do tipo `string`.
- `titulo`: descrição da despesa do tipo `string`.
- `valor`: valor da despesa do tipo `number`.
- `categoria`: uma das categorias fixas disponíveis.

## 7. Requisitos funcionais

- RF01: O sistema deve permitir cadastrar uma despesa válida.
- RF02: O título deve possuir pelo menos dois caracteres.
- RF03: O valor deve ser numérico e maior que zero.
- RF03.1: O campo de valor deve aplicar uma máscara monetária durante a digitação; por exemplo, `44` deve resultar em `0,44`.
- RF04: A categoria deve ser selecionada entre as opções disponíveis.
- RF05: A lista e os totais devem ser atualizados após uma inclusão ou exclusão.
- RF06: O sistema deve permitir excluir despesas cadastradas.
- RF07: Os dados devem permanecer somente durante a sessão atual.

## 8. Requisitos técnicos

- Utilizar Vite com TypeScript Vanilla.
- Utilizar HTML, CSS e TypeScript sem frameworks de interface.
- Manter a estrutura principal da página no `index.html`.
- Utilizar o TypeScript para estado, cálculos, validações e eventos.
- Não utilizar eventos inline no HTML.
- Centralizar os tipos em `src/types.ts`.
- Declarar modelos e estruturas exclusivamente com aliases `type`, sem utilizar `interface`.
- Não utilizar banco de dados, API ou armazenamento local.
- Manter o código simples e de fácil manutenção.
- Oferecer layout responsivo para computadores, tablets e celulares.

## 9. Design e experiência

- Identidade visual: interface financeira moderna, simples e acolhedora.
- Paleta: verde-escuro na barra lateral, verde como cor de ação e tons claros e neutros no conteúdo.
- Tipografia: `Manrope` nos títulos e valores de destaque; `DM Sans` nos textos e controles.
- Estrutura desktop: barra lateral fixa com o resumo financeiro e área principal com formulário e lista de despesas.
- Estrutura mobile: conteúdo organizado em uma única coluna, mantendo totais e ações acessíveis.
- Componentes: cartões com cantos arredondados, bordas suaves e sombras discretas.
- Categorias: identificadas por ícones e cores próprias para facilitar o reconhecimento visual.
- Estados da interface: estado vazio, mensagens de erro nos campos e confirmação temporária após ações.
- Acessibilidade: campos com rótulos, mensagens anunciadas por `aria-live`, foco visível e suporte à preferência por movimento reduzido.
- Responsividade: pontos de adaptação para desktop, tablet e celular, sem rolagem horizontal.

## 10. Fora do escopo

- Cadastro e autenticação de usuários.
- Persistência das despesas após atualizar ou fechar a página.
- Edição de despesas existentes.
- Filtros, relatórios e gráficos.
- Integração com bancos ou serviços financeiros.

## 11. Critérios de sucesso

O produto atende ao objetivo quando o usuário consegue cadastrar e excluir despesas, visualizar a lista e acompanhar corretamente o total geral e os totais por categoria em diferentes tamanhos de tela.
