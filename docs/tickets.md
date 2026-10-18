# Funcionalidade de Tickets

Aplicação Angular para criar e listar tickets, usada para validar o rebuild do boilerplate.

## Funcionalidades

- Criar ticket com título (obrigatório) e descrição (opcional).
- Listar tickets cadastrados em cartões.
- Persistência local via `localStorage`.

## Estrutura

- `src/app/tickets/models/ticket.model.ts`: modelo de dados do ticket.
- `src/app/tickets/services/ticket.service.ts`: serviço reativo com signals.
- `src/app/tickets/components/ticket-card`: componente de exibição do ticket.
- `src/app/tickets/components/ticket-form`: formulário reativo de criação.
- `src/app/tickets/pages/ticket-list`: tela de listagem.
- `src/app/tickets/tickets.routes.ts`: rotas do domínio de tickets.
- `src/app/app.routes.ts`: rotas raiz com redirect para `/tickets`.

## Como executar

1. Instale as dependências: `npm install`.
2. Inicie o servidor de desenvolvimento: `npm start`.
3. Acesse `http://localhost:4200` e navegue até `/tickets`.

## Regras de negócio

- Todo ticket deve ter título obrigatório.
- A descrição é opcional.
