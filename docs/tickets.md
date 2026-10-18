# Tickets

Documentacao da funcionalidade de lista de tickets do boilerplate.

## Contexto

Aplicacao Angular (standalone components) para validar o boilerplate, permitindo
criar tickets e visualizar a lista de tickets cadastrados.

## Funcionalidades

- Criar ticket com titulo e descricao.
- Listar tickets cadastrados (mais recentes primeiro).

## Regras de negocio

- Todo ticket deve ter titulo obrigatorio: o titulo e normalizado com `trim()` e
  nao pode ficar vazio.
- O titulo aceita no maximo 120 caracteres (`TITULO_MAX_LENGTH`).
- A descricao e opcional e aceita no maximo 500 caracteres (`DESCRICAO_MAX_LENGTH`).
- Cada ticket recebe um `id` gerado localmente e a data de criacao (`criadoEm`).

## Criterios de aceite

- Usuario consegue criar um ticket.
- Usuario consegue visualizar a lista de tickets.

## Estrutura

| Caminho | Descricao |
| --- | --- |
| `src/app/tickets/models/ticket.model.ts` | Tipos e limites de campos |
| `src/app/tickets/services/ticket.service.ts` | Estado em memoria e regras de negocio |
| `src/app/tickets/components/ticket-form/ticket-form.component.ts` | Formulario de criacao de ticket |
| `src/app/tickets/components/ticket-card/ticket-card.component.ts` | Card de exibicao do ticket |
| `src/app/tickets/pages/ticket-list/ticket-list.component.ts` | Tela de listagem de tickets |
| `src/app/app.routes.ts` | Rotas da aplicacao |

## Fora de escopo

- Autenticacao de usuarios.
