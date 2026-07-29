# Desafio Angular Sicoob — Outros Créditos/Débitos

Esse projeto é a minha solução para o desafio técnico de migração do módulo "Outros Créditos/Débitos" do Adobe Flex pra Angular. São duas telas: a consulta de lotes e a modal de inclusão de lançamento.

## Como pensei a solução

Como o desafio não precisava criar um backend, usei apenas as imagens de referência das telas e a descrição funcional. Por isso, toda a camada de dados (`features/services` e `features/data`) é mockada em memória, usei Observables com `delay()` pra simular uma latência de uma chamada real — inclusive com uma taxa de ~15% de erro simulado na busca de lotes, só pra garantir que o tratamento de erro (spinner, mensagem, `catchError`) fosse realizado e não ficasse só no caso de sucesso.

Usei Angular 21 com componentes standalone porque é o padrão recomendado atualmente pelo próprio time do Angular, usei tambem Signals pro estado local dos componentes (seleção de linha, modo de visualização, etc.) com Reactive Forms pros formulários — Signals pra estado síncrono simples, Forms pra tudo que envolve validação e campos.

Um ponto que exigiu mais atenção foi a validação de faixa dos filtros "De/Até" (ID Lote, Valor, Data). O Angular não tem um validador pronto pra comparar dois campos entre si, então fiz um validador custom (`shared/validators/range.validator.ts`). Essa validação, inclusive, teve uma correção no meio do caminho: a primeira versão comparava os valores como texto, o que dava resultado errado em alguns casos (`"9" > "10"` retorna `true` numa comparação de string, por ordem alfabética). Corrigi convertendo os dois lados pra número antes de comparar, e escrevi um teste específico só pra esse caso, pra esse problema nao acontecer mais voltar sem eu perceber.

Pro tema visual, gerei a paleta M3 (verde petróleo) com o schematic oficial do Angular Material (`ng generate @angular/material:theme-color`), tentando chegar o mais perto possível da identidade visual do Sicoob que aparecia nas imagens de referência que recebi.

Pra testes, forcei o Jest no lugar do Vitest, que já vem configurado por padrão no Angular 21. Ainda nao tem um pacote oficial 100% compativel com essa versão, então precisei instalar com `--legacy-peer-deps` — mas achei importante manter o Jest mesmo assim, por ter uma certa familiaridade.

## O que tem em cada tela

**Consulta de Lotes** — painel de filtros retrátil, com os três pares De/Até validados, uma tabela paginada com seleção de linha, e uma barra de ações que habilita ou desabilita cada botão (Confirmar, Enviar, Alterar, Excluir, Visualizar...) dependendo de quantos lotes estão selecionados no momento.

**Incluir Lançamento** (modal) — dividida em Conta Corrente e Documento CSC. A busca de conta e a busca de evento abrem modais próprias (com campo de busca, listagem e paginação), a tabela mostra os lançamentos já incluídos no lote atual, e tem uma seção de anexos com upload e remoção.

## Rodando o projeto

```bash
npm install
ng s -o        # particularmente eu prefiro esse comando pra rodar o app e já abrir uma tela no browser
npm test       # roda os testes
```

## Estrutura de pastas

```
src/app/
├── features/
│   ├── components/   # UI: filtro, tabela, as duas modais
│   ├── pages/        # Tela roteada (consulta-lotes)
│   ├── services/     # Mocks de "backend" (lote, conta-corrente, evento)
│   └── data/         # Os dados mockados em si
└── shared/
    ├── models/        # Interfaces de domínio
    ├── enum/          # Situação do lote
    └── validators/    # Validador customizado de faixa (De/Até)
```
