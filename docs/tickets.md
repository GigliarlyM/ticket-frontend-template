# Ingressos

## Visao geral

Modulo de ingressos da aplicacao Angular. Nao existe backend: os dados sao persistidos em
`localStorage` pelo `TicketService`, o que permite trocar a origem dos dados por uma API HTTP no
futuro sem alterar os componentes.

## Rotas

- `/tickets` - listagem de ingressos (lazy loaded).
- `/tickets/new` - formulario de criacao (lazy loaded).

## Estrutura

- `src/app/core/models/ticket.model.ts` - modelo `Ticket`, tipo `TicketDraft`, helpers de
  formatacao e validacao estrutural.
- `src/app/core/services/ticket.service.ts` - estado com signals, criacao de ingressos e
  persistencia em `localStorage` (protegida por `isPlatformBrowser` para SSR).
- `src/app/features/tickets/ticket-list` - listagem com estado vazio.
- `src/app/features/tickets/ticket-create` - formulario reativo com validacao e feedback de
  sucesso.
- `src/app/features/tickets/ticket-card` - apresentacao reutilizavel do ingresso.
- `src/app/features/tickets/ticket-validators.ts` - validadores de data futura e quantidade
  inteira.

## Regras de negocio

- Campos obrigatorios: titulo, descricao, data do evento, local, preco e quantidade.
- Preco maior ou igual a zero.
- Quantidade inteira e maior ou igual a um.
- Data do evento nao pode estar no passado.
- Todo ingresso nasce com status `rascunho`; o card destaca rascunhos e publicados.
- IDs gerados com `crypto.randomUUID()`.
- Listagem ordenada pela data de criacao, mais recente primeiro.

## Fora de escopo

Autenticacao, edicao, exclusao, compra, pagamento, backend real, paginacao e upload de imagem.
