# Tickets

Funcionalidade de lista de tickets criada para validar o fluxo do MCP.

## Objetivo

Permitir que o usuario crie tickets e visualize a lista de tickets cadastrados.

## Funcionalidades

- Criar ticket
- Listar tickets

## Regras de negocio

- O titulo do ticket e obrigatorio e nao pode ser composto apenas por espacos.
- O titulo aceita no maximo 120 caracteres.
- A descricao e opcional e aceita no maximo 500 caracteres.
- Todo ticket criado nasce com a situacao `open` (aberto).
- O ticket pode ser fechado ou reaberto pela acao do card.

## Criterios de aceite

- Criar ticket: ao preencher um titulo valido e enviar o formulario, o ticket aparece no topo da lista com a situacao "Aberto" e o formulario e limpo.
- Listar tickets: a lista apresenta todos os tickets cadastrados, exibindo titulo, situacao, descricao (quando houver) e data de criacao.
- Quando a lista esta vazia, a tela exibe a mensagem "Nenhum ticket cadastrado ainda".
- Ao tentar criar um ticket sem titulo, a mensagem "O titulo do ticket e obrigatorio" e apresentada e nenhum ticket e criado.

## Telas e componentes

| Item | Arquivo |
| --- | --- |
| Tela de lista | `src/app/tickets/pages/ticket-list/ticket-list.component.ts` |
| Componente TicketCard | `src/app/tickets/components/ticket-card/ticket-card.component.ts` |
| Modelos | `src/app/tickets/models/ticket.model.ts` |
| Servico de tickets | `src/app/tickets/services/ticket.service.ts` |
| Rotas da feature | `src/app/tickets/tickets.routes.ts` |

## Como integrar

O componente `TicketListComponent` e standalone. Para exibi-lo, adicione a rota da feature
em `src/app/app.routes.ts`:

```ts
{
  path: 'tickets',
  loadChildren: () => import('./tickets/tickets.routes').then((m) => m.TICKETS_ROUTES),
}
```

## Fora de escopo

- Login e autenticacao.
- Persistencia em backend (o estado e mantido em memoria).
